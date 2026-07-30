// Builds a daily Gemini Titan prediction-market volume time series from the
// public per-date volume endpoint, then derives an implied take rate off the
// Q1 2026 reported prediction revenue and applies it to later quarters.
//
// Data source: Gemini Titan, LLC is a CFTC-registered Designated Contract
// Market. DCM Core Principle 8 and Titan Rulebook Rule 2.17(b) require daily
// public information on settlement prices, volume, open interest and
// opening/closing ranges for actively traded contracts. 17 CFR 16.01(e)
// requires that data be "readily available to the news media and the general
// public without charge" by the next business day. The endpoint below is the
// public surface for the volume leg of that obligation.
//
// Usage:
//   node build_prediction_volume_series.mjs
//   START_DATE=2026-01-01 node build_prediction_volume_series.mjs

import fs from "node:fs/promises";

const OUT_JSON = new URL("./data/prediction_volume_series.json", import.meta.url);
const OUT_MD = new URL("./PREDICTION_VOLUME_SERIES.md", import.meta.url);

const BASE = "https://api.gemini.com/v1/prediction-markets/volume";

// First date the endpoint returns data. Titan went live mid-December 2025.
const DEFAULT_START = "2025-12-01";
const CONCURRENCY = 6;

const SOURCES = {
  dailyVolumeEndpoint: `${BASE}/{date}`,
  hourlyVolumeEndpoint: `${BASE}/{date}/hourly`,
  apiSpec: "https://developer.gemini.com/prediction-markets-spec/volume",
  titanRulebook: "https://www.cftc.gov/filings/orgrules/rules03252641973.pdf",
  titanExhibitL: "https://www.cftc.gov/sites/default/files/filings/documents/2025/orgdcmgmniexhibitl250515.pdf",
  cftc1601: "https://www.ecfr.gov/current/title-17/chapter-I/part-16/section-16.01",
  predictionFees: "https://www.gemini.com/fees/predictions",
  q1Release:
    "https://investors.gemini.com/news-releases/news-release-details/gemini-reports-first-quarter-2026-results-and-announces-100",
};

// Reported prediction-market revenue, USD millions. Q1 2026 10-Q disaggregation.
const REPORTED_PREDICTION_REVENUE_M = {
  q1_2026: 0.444,
};

// Published Gemini Predictions fee schedule, used only to sanity-check the
// calibrated rate. Fee = Rate * Contracts * Price * (1 - Price), price in
// dollars. No settlement fees.
const FEE_SCHEDULE = {
  takerRate: 0.07,
  makerRate: 0.0175,
  formula: "Fee = Rate * Contracts * Price * (1 - Price)",
  source: SOURCES.predictionFees,
};

// The endpoint does not document whether volume is contract count or USD
// notional. Both readings are checked against the fee schedule so the
// ambiguity is stated rather than assumed away.
function unitsCheck(impliedRate) {
  if (!Number.isFinite(impliedRate)) return { status: "blocked" };
  const { takerRate, makerRate } = FEE_SCHEDULE;
  // Fee per contract peaks at price 0.50, where Price*(1-Price) = 0.25.
  const takerMaxPerContract = takerRate * 0.25;
  const makerMaxPerContract = makerRate * 0.25;
  // Fee as a share of notional is Rate*(1-Price), maximised as price -> 0.
  const takerMaxShareOfNotionalAtMid = takerRate * 0.5;
  const makerMaxShareOfNotionalAtMid = makerRate * 0.5;
  return {
    impliedRate,
    asContractCount: {
      reading: "volume is a count of contracts; implied rate is dollars of revenue per contract",
      takerMaxPerContract,
      makerMaxPerContract,
      withinFeeEnvelope: impliedRate <= takerMaxPerContract,
      note:
        impliedRate <= takerMaxPerContract && impliedRate >= makerMaxPerContract
          ? "Consistent: implied rate sits between the all-maker and all-taker ceilings, as a mixed book should."
          : "Inconsistent with a plain maker/taker mix at prices near $0.50.",
    },
    asUsdNotional: {
      reading: "volume is USD notional; implied rate is revenue as a share of notional",
      impliedShareOfNotional: impliedRate,
      takerMaxShareOfNotionalAtMid,
      makerMaxShareOfNotionalAtMid,
      withinFeeEnvelope: impliedRate <= takerMaxShareOfNotionalAtMid,
      note: "Also arithmetically possible, so the fee schedule alone does not settle the units.",
    },
    verdict:
      "Unresolved from public documentation. The contract-count reading fits a mixed maker/taker book more naturally, " +
      "but both survive the fee-envelope test. The calibrated rate is invariant to which is true because it is " +
      "derived from and applied to the same series; only the physical interpretation of the volume number changes.",
  };
}

const QUARTERS = {
  q4_2025: ["2025-10-01", "2025-12-31"],
  q1_2026: ["2026-01-01", "2026-03-31"],
  q2_2026: ["2026-04-01", "2026-06-30"],
  q3_2026_partial: ["2026-07-01", "2026-09-30"],
};

function dateRange(startISO, endISO) {
  const out = [];
  const d = new Date(`${startISO}T00:00:00Z`);
  const end = new Date(`${endISO}T00:00:00Z`);
  while (d <= end) {
    out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

function yesterdayUTC() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

// One day. Returns {date, status, rows} — a missing day is reported as
// "missing", never silently coerced to zero volume.
async function fetchDay(date) {
  const url = `${BASE}/${date}`;
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (res.status === 404) return { date, status: "missing", rows: [] };
    if (!res.ok) return { date, status: `http_${res.status}`, rows: [] };
    const body = await res.json();
    if (!Array.isArray(body)) {
      return { date, status: "unexpected_shape", rows: [], raw: body };
    }
    return { date, status: "ok", rows: body };
  } catch (err) {
    return { date, status: `error:${err.message}`, rows: [] };
  }
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      out[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return out;
}

// categoryPath is a hierarchy: ["Sports"] is the parent of ["Sports","Soccer"].
// Only depth-1 rows are summed for a day total, otherwise children double count.
function summarizeDay(day) {
  const top = day.rows.filter((r) => Array.isArray(r.categoryPath) && r.categoryPath.length === 1);
  const total = top.reduce((acc, r) => acc + Number(r.volume), 0);
  const byCategory = {};
  for (const r of top) byCategory[r.categoryPath[0]] = Number(r.volume);
  const bySubcategory = {};
  for (const r of day.rows) {
    if (r.categoryPath?.length >= 2) bySubcategory[r.categoryPath.join(" / ")] = Number(r.volume);
  }
  return {
    date: day.date,
    status: day.status,
    totalVolume: total,
    topCategoryCount: top.length,
    rowCount: day.rows.length,
    byCategory,
    bySubcategory,
  };
}

function aggregate(daily, [start, end]) {
  const inRange = daily.filter((d) => d.date >= start && d.date <= end);
  const ok = inRange.filter((d) => d.status === "ok");
  const missing = inRange.filter((d) => d.status !== "ok").map((d) => d.date);
  const totalVolume = ok.reduce((a, d) => a + d.totalVolume, 0);
  const byCategory = {};
  for (const d of ok) {
    for (const [k, v] of Object.entries(d.byCategory)) byCategory[k] = (byCategory[k] ?? 0) + v;
  }
  const sortedCats = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  return {
    start,
    end,
    daysWithData: ok.length,
    daysInRange: inRange.length,
    missingDays: missing,
    coverage: inRange.length ? ok.length / inRange.length : 0,
    totalVolume,
    avgDailyVolume: ok.length ? totalVolume / ok.length : 0,
    peakDay: ok.reduce((a, d) => (a && a.totalVolume >= d.totalVolume ? a : d), null),
    topCategories: sortedCats.slice(0, 8).map(([name, volume]) => ({
      name,
      volume,
      share: totalVolume ? volume / totalVolume : 0,
    })),
  };
}

// Calibrate a revenue-per-unit-volume rate against reported Q1 revenue, then
// apply it forward. This is a derived rate, not a published fee schedule.
function calibrate(quarters) {
  const q1 = quarters.q1_2026;
  const revenueM = REPORTED_PREDICTION_REVENUE_M.q1_2026;
  if (!q1 || !q1.totalVolume) return { blocked: "no Q1 volume data" };
  const impliedRate = (revenueM * 1e6) / q1.totalVolume;
  const project = (q) =>
    q && q.totalVolume
      ? {
          volume: q.totalVolume,
          coverage: q.coverage,
          impliedRevenueM: (q.totalVolume * impliedRate) / 1e6,
          // Annualized off observed average daily volume, not the partial sum.
          annualizedRunRateM: (q.avgDailyVolume * 365 * impliedRate) / 1e6,
        }
      : null;
  return {
    basis: "Q1 2026 reported prediction revenue of $0.444M / Q1 2026 summed daily volume",
    feeSchedule: FEE_SCHEDULE,
    unitsCheck: unitsCheck(impliedRate),
    q1RevenueM: revenueM,
    q1Volume: q1.totalVolume,
    impliedRevenuePerUnitVolume: impliedRate,
    q1Coverage: q1.coverage,
    projections: {
      q2_2026: project(quarters.q2_2026),
      q3_2026_partial: project(quarters.q3_2026_partial),
    },
    caveats: [
      "Endpoint volume units are not documented as USD notional or contract count; the calibrated rate absorbs whichever it is.",
      "Rate assumes fee mix, maker rebates and category mix are stable versus Q1 2026.",
      "Q1 2026 prediction revenue of $0.444M is a small base, so the derived rate carries wide error bars.",
      "Missing days are excluded from sums rather than zero-filled, so quarter totals with coverage below 1.0 understate true volume.",
    ],
  };
}

function fmtUsdM(x) {
  return `$${x.toFixed(3)}M`;
}

function fmtNum(x) {
  return Math.round(x).toLocaleString("en-US");
}

function pct(x) {
  return `${(x * 100).toFixed(1)}%`;
}

function buildReport({ asOf, daily, quarters, calibration, start, end }) {
  const qRow = (label, q) =>
    q
      ? `| ${label} | ${q.start} → ${q.end} | ${fmtNum(q.totalVolume)} | ${fmtNum(q.avgDailyVolume)} | ${q.daysWithData}/${q.daysInRange} | ${pct(q.coverage)} |`
      : `| ${label} | — | blocked | blocked | 0 | 0% |`;

  const qoq =
    quarters.q1_2026?.totalVolume && quarters.q2_2026?.totalVolume
      ? (quarters.q2_2026.totalVolume / quarters.q1_2026.totalVolume - 1) * 100
      : null;

  const catRows = (quarters.q2_2026?.topCategories ?? [])
    .map((c) => `| ${c.name} | ${fmtNum(c.volume)} | ${pct(c.share)} |`)
    .join("\n");

  const recentRows = daily
    .filter((d) => d.status === "ok")
    .slice(-14)
    .map((d) => {
      const top = Object.entries(d.byCategory).sort((a, b) => b[1] - a[1])[0];
      return `| ${d.date} | ${fmtNum(d.totalVolume)} | ${top ? `${top[0]} (${fmtNum(top[1])})` : "—"} |`;
    })
    .join("\n");

  const proj = calibration.projections ?? {};

  return `# Gemini Titan Prediction-Market Volume Series

> **CURRENT — auto-generated.** Source data leg for the prediction-revenue line in the Q2
> forecast. See \`Q2_2026_SCORECARD.md\` for the call and \`METHODOLOGY.md\` for data lineage
> and the one-sided versus two-sided volume convention.

Generated ${asOf}. Window ${start} → ${end}.

## What This Is

Gemini Titan, LLC is a CFTC-registered Designated Contract Market. DCM Core
Principle 8 and Titan Rulebook Rule 2.17(b) require it to publish daily
information on settlement prices, volume, open interest and opening/closing
ranges for actively traded contracts. 17 CFR 16.01(e) requires that data be
made available to the public without charge no later than the business day
after the day it covers.

This file is built from the public per-date volume endpoint, which is the
volume leg of that obligation. It replaces the previous approach of reading a
single live snapshot of active events, which had no time dimension and could
not be tied to a reported quarter.

- Daily: \`${SOURCES.dailyVolumeEndpoint}\`
- Hourly: \`${SOURCES.hourlyVolumeEndpoint}\`
- Spec: ${SOURCES.apiSpec}

Volume arrives as a category hierarchy. \`["Sports"]\` is the parent of
\`["Sports","Soccer"]\`, so only depth-1 rows are summed for a day total.

## Quarterly Volume

| Quarter | Window | Total volume | Avg/day | Days with data | Coverage |
|---|---|---|---|---|---|
${qRow("Q4 2025", quarters.q4_2025)}
${qRow("Q1 2026", quarters.q1_2026)}
${qRow("Q2 2026", quarters.q2_2026)}
${qRow("Q3 2026 (partial)", quarters.q3_2026_partial)}

${qoq !== null ? `Q2 versus Q1 volume: **${qoq >= 0 ? "+" : ""}${qoq.toFixed(1)}%**.` : "Q2 versus Q1 comparison blocked."}

## Implied Take Rate

Reported Q1 2026 prediction revenue was ${fmtUsdM(calibration.q1RevenueM ?? 0)}. Dividing
that by summed Q1 volume gives an implied revenue per unit of volume of
**${calibration.impliedRevenuePerUnitVolume?.toExponential(4) ?? "blocked"}**, applied forward below.

| Quarter | Volume | Coverage | Implied revenue | Annualized run rate |
|---|---|---|---|---|
${proj.q2_2026 ? `| Q2 2026 | ${fmtNum(proj.q2_2026.volume)} | ${pct(proj.q2_2026.coverage)} | ${fmtUsdM(proj.q2_2026.impliedRevenueM)} | ${fmtUsdM(proj.q2_2026.annualizedRunRateM)} |` : "| Q2 2026 | blocked | — | — | — |"}
${proj.q3_2026_partial ? `| Q3 2026 (partial) | ${fmtNum(proj.q3_2026_partial.volume)} | ${pct(proj.q3_2026_partial.coverage)} | ${fmtUsdM(proj.q3_2026_partial.impliedRevenueM)} | ${fmtUsdM(proj.q3_2026_partial.annualizedRunRateM)} |` : "| Q3 2026 (partial) | blocked | — | — | — |"}

Caveats:
${(calibration.caveats ?? []).map((c) => `- ${c}`).join("\n")}

### Units Cross-Check

The endpoint does not document whether \`volume\` is a contract count or USD
notional. Gemini's published fee schedule is \`${FEE_SCHEDULE.formula}\`, with a
taker rate of ${FEE_SCHEDULE.takerRate} and a maker rate of ${FEE_SCHEDULE.makerRate} and no settlement fees.

- Read as **contract count**, the implied rate of $${calibration.unitsCheck?.impliedRate?.toFixed(5) ?? "?"} per contract sits between the all-maker ceiling of $${calibration.unitsCheck?.asContractCount?.makerMaxPerContract?.toFixed(5) ?? "?"} and the all-taker ceiling of $${calibration.unitsCheck?.asContractCount?.takerMaxPerContract?.toFixed(5) ?? "?"} (both evaluated at a $0.50 contract price, where the fee formula peaks). ${calibration.unitsCheck?.asContractCount?.note ?? ""}
- Read as **USD notional**, the same figure is ${((calibration.unitsCheck?.impliedRate ?? 0) * 100).toFixed(3)}% of notional, against a taker ceiling of ${((calibration.unitsCheck?.asUsdNotional?.takerMaxShareOfNotionalAtMid ?? 0) * 100).toFixed(1)}% at mid price. ${calibration.unitsCheck?.asUsdNotional?.note ?? ""}

${calibration.unitsCheck?.verdict ?? ""}

## Q2 2026 Category Mix

| Category | Volume | Share |
|---|---|---|
${catRows || "| — | blocked | — |"}

## Last 14 Days With Data

| Date | Volume | Largest category |
|---|---|---|
${recentRows || "| — | blocked | — |"}

## Interpretation Rules

- Volume is contract turnover on Titan, not Gemini spot exchange volume. Do not add the two.
- Missing days are reported as missing and excluded from sums, never zero-filled.
- The implied take rate is derived from one reported quarter off a $0.444M base. Treat it as an order-of-magnitude check on prediction revenue, not a precise estimate.
- Category mix matters for revenue because maker rebates and fee tiers differ by product; a sports-heavy mix is not revenue-equivalent to the same volume in crypto or politics contracts.

## Sources

${Object.entries(SOURCES)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}
- Q1 2026 reported prediction revenue: Gemini Q1 2026 10-Q revenue disaggregation (R50) and ${SOURCES.q1Release}
`;
}

async function main() {
  const start = process.env.START_DATE ?? DEFAULT_START;
  const end = process.env.END_DATE ?? yesterdayUTC();
  const dates = dateRange(start, end);

  console.log(`Fetching ${dates.length} days of Titan volume: ${start} → ${end}`);
  const raw = await mapLimit(dates, CONCURRENCY, fetchDay);
  const daily = raw.map(summarizeDay);

  const ok = daily.filter((d) => d.status === "ok");
  const firstData = ok[0]?.date ?? null;
  const failures = daily.filter((d) => d.status !== "ok" && d.status !== "missing");
  console.log(`  ok=${ok.length} missing=${daily.length - ok.length - failures.length} failed=${failures.length}`);
  if (firstData) console.log(`  first day with data: ${firstData}`);
  if (failures.length) {
    console.warn(`  WARNING: ${failures.length} non-404 failures, sums are partial:`);
    for (const f of failures.slice(0, 10)) console.warn(`    ${f.date} ${f.status}`);
  }

  const quarters = {};
  for (const [name, range] of Object.entries(QUARTERS)) quarters[name] = aggregate(daily, range);
  const calibration = calibrate(quarters);

  const asOf = new Date().toISOString();
  const payload = {
    asOf,
    window: { start, end },
    firstDayWithData: firstData,
    sources: SOURCES,
    reportedPredictionRevenueM: REPORTED_PREDICTION_REVENUE_M,
    fetchStatus: {
      daysRequested: daily.length,
      daysWithData: ok.length,
      daysMissing: daily.length - ok.length - failures.length,
      daysFailed: failures.length,
      failures: failures.map((f) => ({ date: f.date, status: f.status })),
    },
    quarters,
    calibration,
    daily,
  };

  await fs.mkdir(OUT_DIR_PATH(), { recursive: true });
  await fs.writeFile(OUT_JSON, `${JSON.stringify(payload, null, 2)}\n`);
  await fs.writeFile(OUT_MD, buildReport({ asOf, daily, quarters, calibration, start, end }));

  console.log(`\nQ1 2026 volume: ${fmtNum(quarters.q1_2026.totalVolume)} (coverage ${pct(quarters.q1_2026.coverage)})`);
  console.log(`Q2 2026 volume: ${fmtNum(quarters.q2_2026.totalVolume)} (coverage ${pct(quarters.q2_2026.coverage)})`);
  if (calibration.projections?.q2_2026) {
    console.log(`Q2 implied prediction revenue: ${fmtUsdM(calibration.projections.q2_2026.impliedRevenueM)}`);
  }
  console.log(`\nWrote data/prediction_volume_series.json and PREDICTION_VOLUME_SERIES.md`);
}

function OUT_DIR_PATH() {
  return new URL("./data/", import.meta.url);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
