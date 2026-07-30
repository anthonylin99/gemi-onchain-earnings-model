import fs from "node:fs/promises";

const OUT_DIR = new URL("./data/", import.meta.url);
const REPORT_PATH = new URL("./Q2_PROXY_MODEL.md", import.meta.url);

const SEC_SOURCES = {
  gemi10q: "https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R50.htm",
  gemi10kRevenue: "https://www.sec.gov/Archives/edgar/data/2055592/000205559226000026/R60.htm",
  gemiQ1Release: "https://investors.gemini.com/news-releases/news-release-details/gemini-reports-first-quarter-2026-results-and-announces-100",
};

const periods = {
  q4_2025: ["2025-10-01", "2025-12-31"],
  q1_2026: ["2026-01-01", "2026-03-31"],
  q2_2026: ["2026-04-01", "2026-06-30"],
  apr_2026: ["2026-04-01", "2026-04-30"],
  may_2026: ["2026-05-01", "2026-05-31"],
  jun_2026: ["2026-06-01", "2026-06-30"],
};

const reported = {
  gemi: {
    quarters: {
      q3_2025: {
        totalRevenue: 50.6,
        netRevenue: 49.8,
        transactionRevenue: 26.3,
        tradingVolume: 16.4,
        source: "Gemini Q3 2025 shareholder letter snippets from investor relations/search results",
      },
      q4_2025: {
        totalRevenue: 60.3,
        netRevenue: 56.4,
        transactionRevenue: 26.7,
        tradingVolume: 11.5,
        netLoss: -140.8,
        source: "Gemini Q4 2025 press/slides and WSJ/Barron's summaries",
      },
      q1_2026: {
        totalRevenue: 50.272,
        transactionRevenue: 24.128,
        exchangeRevenue: 17.172,
        otcRevenue: 6.325,
        predictionRevenue: 0.444,
        servicesRevenue: 21.815,
        creditCardRevenue: 14.7,
        stakingRevenue: 2.137,
        custodialFeeRevenue: 1.868,
        advisoryFeeRevenue: 2.71,
        interestIncome: 2.635,
        corporateInterest: 1.612,
        tradingVolume: 6.3,
        netLoss: -108.978,
        opex: 144.46,
        source: "Gemini Q1 2026 10-Q R4/R50 and Q1 release",
      },
    },
    annual: {
      fy2025: {
        totalRevenue: 179.572,
        transactionRevenue: 98.02,
        exchangeRevenue: 93.426,
        otcRevenue: 4.013,
        servicesRevenue: 64.639,
        creditCardRevenue: 33.12,
        stakingRevenue: 16.774,
        custodialFeeRevenue: 8.739,
        advisoryFeeRevenue: 4.808,
        tradingVolume: 52.7,
        source: "Gemini 2025 10-K R60 and Q4 slides",
      },
    },
  },
  robinhood: {
    q1_2026: {
      cryptoNotional: 65.8,
      cryptoRevenue: 134,
      eventRevenueInOtherTransactionRevenue: 147,
      source: "Robinhood Q1 2026 release; Jan/Feb/Mar crypto volume assembled from monthly metrics",
    },
    // Reported July 29, 2026. These are actuals; the prior estimates the model
    // carried are kept alongside so the estimate-versus-actual gap stays visible.
    q2_2026: {
      reported: true,
      cryptoNotional: 40.0,
      appCryptoNotional: 18.0,
      bitstampNotional: 22.0,
      eventContracts: 13.6,
      cryptoRevenue: 100,
      eventContractsRevenue: 156,
      transactionRevenue: 776,
      totalNetRevenue: 1310,
      netIncome: 573,
      dilutedEps: 0.62,
      // What this model projected before the print, for calibration.
      priorEstimates: {
        cryptoNotionalEstimate: 38.1,
        appCryptoNotionalEstimate: 17.3,
        bitstampNotionalEstimate: 20.8,
        eventContractsEstimate: 12.3,
      },
      source: "Robinhood Q2 2026 results release, July 29 2026",
    },
    monthly: {
      apr: { crypto: 11.9, appCrypto: 5.4, bitstamp: 6.5, eventContracts: 3.2 },
      may: { crypto: 12.2, appCrypto: 5.9, bitstamp: 6.3, eventContracts: 3.9 },
      junEstimate: { crypto: 14.0, appCrypto: 6.0, bitstamp: 8.0, eventContracts: 5.2 },
    },
  },
  coinbase: {
    q4_2025: {
      revenue: 1_780,
      transactionRevenue: 983,
      subscriptionAndServicesRevenue: 727,
      marketShare: 0.08,
      source: "Coinbase Q4 2025 results snippets",
    },
    q1_2026: {
      revenue: 1_410,
      transactionRevenue: 756,
      consumerTransactionRevenue: 567,
      institutionalTransactionRevenue: 136,
      assetsOnPlatform: 294_000,
      marketShare: 0.086,
      source: "Coinbase Q1 2026 release/deck snippets",
    },
  },
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(url, label, { retries = 4, delayMs = 1000 } = {}) {
  let lastText = "";
  for (let i = 0; i <= retries; i += 1) {
    const response = await fetch(url, {
      headers: {
        accept: "application/json,text/plain,*/*",
        "user-agent": "gemi-q2-proxy-model/0.1",
      },
    });
    lastText = await response.text();
    if (response.ok) {
      try {
        return JSON.parse(lastText);
      } catch (error) {
        throw new Error(`${label}: JSON parse failed: ${error.message}`);
      }
    }
    if (![429, 500, 502, 503, 504].includes(response.status) || i === retries) {
      throw new Error(`${label}: HTTP ${response.status}: ${lastText.slice(0, 300)}`);
    }
    await sleep(delayMs * (i + 1));
  }
  throw new Error(`${label}: failed after retries`);
}

function dayKey(ts) {
  const ms = ts > 1e12 ? ts : ts * 1000;
  return new Date(ms).toISOString().slice(0, 10);
}

function inRange(date, [start, end]) {
  return date >= start && date <= end;
}

function nearest(rows, key, date) {
  const exact = rows.find((row) => row.date === date);
  if (exact && Number.isFinite(exact[key])) return exact[key];
  const target = Date.parse(`${date}T00:00:00Z`);
  let best = null;
  for (const row of rows) {
    if (!Number.isFinite(row[key])) continue;
    const delta = Math.abs(Date.parse(`${row.date}T00:00:00Z`) - target);
    if (!best || delta < best.delta) best = { value: row[key], delta };
  }
  return best?.value ?? null;
}

function sum(rows, key, period) {
  return rows.filter((row) => inRange(row.date, period)).reduce((total, row) => total + (Number(row[key]) || 0), 0);
}

function avg(rows, key, period) {
  const values = rows.filter((row) => inRange(row.date, period)).map((row) => row[key]).filter(Number.isFinite);
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function pct(next, prev) {
  return prev ? next / prev - 1 : null;
}

function normalizeCoin(coin, key) {
  return (coin.prices ?? []).map(([ts, price]) => ({
    date: dayKey(ts),
    [key]: Number(price),
  }));
}

function normalizeExchangeVolume(data, btcRows, key) {
  return data.map(([ts, volumeBtc]) => {
    const date = dayKey(ts);
    const btcPrice = nearest(btcRows, "btcPrice", date) ?? 0;
    const btcVolume = Number(volumeBtc) || 0;
    return {
      date,
      [`${key}VolumeBtc`]: btcVolume,
      [`${key}VolumeUsd`]: btcVolume * btcPrice,
    };
  });
}

function normalizeDexVolume(data) {
  return (data.totalDataChart ?? []).map(([ts, volumeUsd]) => ({
    date: dayKey(ts),
    dexVolumeUsd: Number(volumeUsd) || 0,
  }));
}

async function collectPredictionSnapshot() {
  const page = await fetchJson("https://api.gemini.com/v1/prediction-markets/events?limit=100", "gemini prediction events");
  let offset = 100;
  const events = [...(page.data ?? [])];
  while (page.data?.length === 100 && offset <= 600) {
    const nextPage = await fetchJson(`https://api.gemini.com/v1/prediction-markets/events?limit=100&offset=${offset}`, `gemini prediction events ${offset}`);
    events.push(...(nextPage.data ?? []));
    if ((nextPage.data ?? []).length < 100) break;
    offset += 100;
  }
  const volume = events.reduce((total, event) => total + (Number(event.volume) || 0), 0);
  const contracts = events.reduce((total, event) => total + (event.contracts?.length ?? 0), 0);
  return { events: events.length, contracts, activeEventLifetimeVolume: volume };
}

function modelQ2({ geminiVolume, coinbaseVolume, dexVolume, btcRows, prediction, volumeSeries }) {
  const q1GemiApi = sum(geminiVolume, "geminiVolumeUsd", periods.q1_2026) / 1e9;
  const q2GemiApi = sum(geminiVolume, "geminiVolumeUsd", periods.q2_2026) / 1e9;
  const q1CoinbaseApi = sum(coinbaseVolume, "coinbaseVolumeUsd", periods.q1_2026) / 1e9;
  const q2CoinbaseApi = sum(coinbaseVolume, "coinbaseVolumeUsd", periods.q2_2026) / 1e9;
  const q1Dex = sum(dexVolume, "dexVolumeUsd", periods.q1_2026) / 1e9;
  const q2Dex = sum(dexVolume, "dexVolumeUsd", periods.q2_2026) / 1e9;
  const q1BtcAvg = avg(btcRows, "btcPrice", periods.q1_2026);
  const q2BtcAvg = avg(btcRows, "btcPrice", periods.q2_2026);

  const q1 = reported.gemi.quarters.q1_2026;
  const q2VolumeProxy = q2GemiApi > 0 && q1GemiApi > 0 ? pct(q2GemiApi, q1GemiApi) : pct(reported.robinhood.q2_2026.cryptoNotional, reported.robinhood.q1_2026.cryptoNotional);
  const exchangeRevenueBase = q1.exchangeRevenue * (1 + Math.max(-0.2, Math.min(0.4, q2VolumeProxy ?? 0)));
  const exchangeRevenueBear = q1.exchangeRevenue * (1 + Math.min(-0.05, (q2VolumeProxy ?? -0.1) - 0.1));
  const exchangeRevenueBull = q1.exchangeRevenue * (1 + Math.max(0.05, (q2VolumeProxy ?? 0) + 0.15));

  // Prediction revenue is now anchored to the published Titan daily volume
  // series rather than a multiple of Q1. The take rate is calibrated on Q1
  // reported revenue, so the base case is Q2 volume at the Q1 rate. The band
  // reflects take-rate uncertainty (fee mix, maker rebates, category mix), not
  // volume uncertainty, since Q2 volume is observed at full coverage.
  const titanQ2 = volumeSeries?.calibration?.projections?.q2_2026 ?? null;
  const predictionBase = titanQ2 ? titanQ2.impliedRevenueM : Math.max(0.8, q1.predictionRevenue * 2.0);
  const predictionBear = titanQ2 ? titanQ2.impliedRevenueM * 0.7 : Math.max(0.45, q1.predictionRevenue * 1.2);
  const predictionBull = titanQ2 ? titanQ2.impliedRevenueM * 1.6 : Math.max(1.8, q1.predictionRevenue * 4.0);

  const servicesBase = 24.0;
  const servicesBear = 22.5;
  const servicesBull = 26.0;
  const otcBase = 5.0;
  const otcBear = 3.5;
  const otcBull = 7.5;
  const corporateInterest = 1.5;
  const otherTransaction = 0.2;

  const scenario = (name, exchange, otc, predictionRevenue, servicesInterest) => {
    const totalRevenue = exchange + otc + predictionRevenue + otherTransaction + servicesInterest + corporateInterest;
    const opex = name === "Bull" ? 118 : name === "Bear" ? 130 : 123;
    const netLossBeforeMarks = totalRevenue - opex - 10;
    return { name, exchange, otc, predictionRevenue, servicesInterest, corporateInterest, totalRevenue, opex, netLossBeforeMarks };
  };

  return {
    marketProxies: {
      geminiApiVolume: { q1B: q1GemiApi, q2B: q2GemiApi, qoq: pct(q2GemiApi, q1GemiApi) },
      coinbaseApiVolume: { q1B: q1CoinbaseApi, q2B: q2CoinbaseApi, qoq: pct(q2CoinbaseApi, q1CoinbaseApi) },
      dexOnchainVolume: { q1B: q1Dex, q2B: q2Dex, qoq: pct(q2Dex, q1Dex) },
      robinhoodCryptoNotional: {
        q1B: reported.robinhood.q1_2026.cryptoNotional,
        q2B: reported.robinhood.q2_2026.cryptoNotional,
        q2Reported: true,
        qoq: pct(reported.robinhood.q2_2026.cryptoNotional, reported.robinhood.q1_2026.cryptoNotional),
      },
      robinhoodEventContracts: {
        q2B: reported.robinhood.q2_2026.eventContracts,
        q2RevenueM: reported.robinhood.q2_2026.eventContractsRevenue,
        q2CryptoRevenueM: reported.robinhood.q2_2026.cryptoRevenue,
        q2Reported: true,
      },
      btcAveragePrice: { q1: q1BtcAvg, q2: q2BtcAvg, qoq: pct(q2BtcAvg, q1BtcAvg) },
      predictionSnapshot: prediction,
      titanVolumeSeries: volumeSeries
        ? {
            q1Volume: volumeSeries.quarters?.q1_2026?.totalVolume ?? null,
            q2Volume: volumeSeries.quarters?.q2_2026?.totalVolume ?? null,
            q3PartialVolume: volumeSeries.quarters?.q3_2026_partial?.totalVolume ?? null,
            qoq: pct(volumeSeries.quarters?.q2_2026?.totalVolume, volumeSeries.quarters?.q1_2026?.totalVolume),
            impliedTakeRate: volumeSeries.calibration?.impliedRevenuePerUnitVolume ?? null,
            q2ImpliedRevenueM: volumeSeries.calibration?.projections?.q2_2026?.impliedRevenueM ?? null,
            q3AnnualizedRunRateM: volumeSeries.calibration?.projections?.q3_2026_partial?.annualizedRunRateM ?? null,
            asOf: volumeSeries.asOf ?? null,
          }
        : { status: "blocked_missing_series", hint: "run node build_prediction_volume_series.mjs first" },
    },
    scenarios: [
      scenario("Bear", exchangeRevenueBear, otcBear, predictionBear, servicesBear),
      scenario("Base", exchangeRevenueBase, otcBase, predictionBase, servicesBase),
      scenario("Bull", exchangeRevenueBull, otcBull, predictionBull, servicesBull),
    ],
  };
}

function money(value, digits = 1) {
  return `$${value.toFixed(digits)}M`;
}

function pctText(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "n/a";
  return `${(value * 100).toFixed(1)}%`;
}

function bText(value) {
  return `$${value.toFixed(1)}B`;
}

function renderMarkdown(model, raw) {
  const m = model.marketProxies;
  const rows = model.scenarios.map((s) => `| ${s.name} | ${money(s.totalRevenue)} | ${money(s.exchange)} | ${money(s.otc)} | ${money(s.predictionRevenue)} | ${money(s.servicesInterest)} | ${money(s.netLossBeforeMarks)} |`).join("\n");
  const baseVsQ1 = pct(model.scenarios[1].totalRevenue, reported.gemi.quarters.q1_2026.totalRevenue);
  const bottomLine = baseVsQ1 < 0
    ? `My base-case Q2 revenue estimate is ${money(model.scenarios[1].totalRevenue)} versus Q1 reported revenue of ${money(reported.gemi.quarters.q1_2026.totalRevenue)}, down ${pctText(Math.abs(baseVsQ1))} sequentially. The model says Q2 probably misses the original bull narrative unless OTC/services hold up better than spot-volume proxies imply.`
    : `My base-case Q2 revenue estimate is ${money(model.scenarios[1].totalRevenue)} versus Q1 reported revenue of ${money(reported.gemi.quarters.q1_2026.totalRevenue)}, up ${pctText(baseVsQ1)} sequentially. The model says Q2 can improve if OTC and services hold up.`;

  return `# GEMI Q2 2026 Proxy Model

As of: ${new Date().toISOString()}

## Bottom Line

${bottomLine} Prediction markets are the story vector, but not yet the P&L driver unless management discloses a much bigger contract-volume KPI than the public active-event API implies.

## Reported GEMI Baseline

| Period | Total revenue | Transaction revenue | Exchange revenue | OTC | Prediction | Services revenue | Trading volume |
|---|---:|---:|---:|---:|---:|---:|---:|
| Q3 2025 | ${money(reported.gemi.quarters.q3_2025.totalRevenue)} | ${money(reported.gemi.quarters.q3_2025.transactionRevenue)} | n/a | n/a | n/a | n/a | ${bText(reported.gemi.quarters.q3_2025.tradingVolume)} |
| Q4 2025 | ${money(reported.gemi.quarters.q4_2025.totalRevenue)} | ${money(reported.gemi.quarters.q4_2025.transactionRevenue)} | n/a | n/a | n/a | n/a | ${bText(reported.gemi.quarters.q4_2025.tradingVolume)} |
| Q1 2026 | ${money(reported.gemi.quarters.q1_2026.totalRevenue)} | ${money(reported.gemi.quarters.q1_2026.transactionRevenue)} | ${money(reported.gemi.quarters.q1_2026.exchangeRevenue)} | ${money(reported.gemi.quarters.q1_2026.otcRevenue)} | ${money(reported.gemi.quarters.q1_2026.predictionRevenue)} | ${money(reported.gemi.quarters.q1_2026.servicesRevenue)} | ${bText(reported.gemi.quarters.q1_2026.tradingVolume)} |

## External Proxies

| Proxy | Q1 2026 | Q2 2026 | QoQ |
|---|---:|---:|---:|
| Gemini API exchange volume proxy | ${bText(m.geminiApiVolume.q1B)} | ${bText(m.geminiApiVolume.q2B)} | ${pctText(m.geminiApiVolume.qoq)} |
| Coinbase exchange API volume proxy | ${bText(m.coinbaseApiVolume.q1B)} | ${bText(m.coinbaseApiVolume.q2B)} | ${pctText(m.coinbaseApiVolume.qoq)} |
| DeFiLlama DEX/on-chain volume | ${bText(m.dexOnchainVolume.q1B)} | ${bText(m.dexOnchainVolume.q2B)} | ${pctText(m.dexOnchainVolume.qoq)} |
| Robinhood crypto notional (Q2 reported) | ${bText(m.robinhoodCryptoNotional.q1B)} | ${bText(m.robinhoodCryptoNotional.q2B)} | ${pctText(m.robinhoodCryptoNotional.qoq)} |
| Titan prediction contract volume | ${m.titanVolumeSeries.q1Volume?.toLocaleString("en-US") ?? "blocked"} | ${m.titanVolumeSeries.q2Volume?.toLocaleString("en-US") ?? "blocked"} | ${pctText(m.titanVolumeSeries.qoq)} |
| BTC average price | $${m.btcAveragePrice.q1.toFixed(0)} | $${m.btcAveragePrice.q2.toFixed(0)} | ${pctText(m.btcAveragePrice.qoq)} |

Robinhood's Q2 print (July 29, 2026) is the read-across, and it is now actual rather than estimated. Event contracts traded hit ${m.robinhoodEventContracts.q2B.toFixed(1)}B, up over 10x year over year, and event-contract revenue of ${money(m.robinhoodEventContracts.q2RevenueM)} exceeded crypto revenue of ${money(m.robinhoodEventContracts.q2CryptoRevenueM)} for the first time. Crypto revenue fell 38% year over year while crypto notional fell to ${bText(m.robinhoodCryptoNotional.q2B)}. The pattern that matters for GEMI is the divergence: prediction-market KPIs can inflect hard while crypto spot revenue keeps deteriorating, and the market rewarded the former.

Gemini Titan published volume series (CFTC DCM Core Principle 8 / Titan Rule 2.17(b) daily
publication, surfaced via the public per-date volume endpoint):
- Q1 2026 contract volume: ${m.titanVolumeSeries.q1Volume?.toLocaleString("en-US") ?? "blocked"}
- Q2 2026 contract volume: ${m.titanVolumeSeries.q2Volume?.toLocaleString("en-US") ?? "blocked"} (${pctText(m.titanVolumeSeries.qoq)} QoQ)
- Q3 2026 partial contract volume: ${m.titanVolumeSeries.q3PartialVolume?.toLocaleString("en-US") ?? "blocked"}
- Implied take rate from Q1 reported revenue: ${m.titanVolumeSeries.impliedTakeRate ? `$${m.titanVolumeSeries.impliedTakeRate.toFixed(5)} per contract` : "blocked"}
- Q2 implied prediction revenue: ${m.titanVolumeSeries.q2ImpliedRevenueM ? money(m.titanVolumeSeries.q2ImpliedRevenueM) : "blocked"}
- Q3 annualized run rate at observed July pace: ${m.titanVolumeSeries.q3AnnualizedRunRateM ? money(m.titanVolumeSeries.q3AnnualizedRunRateM) : "blocked"}

Live active-event snapshot, retained as a cross-check only:
- Active events: ${m.predictionSnapshot.events}
- Active contracts: ${m.predictionSnapshot.contracts}
- Active-event lifetime volume: ${money(m.predictionSnapshot.activeEventLifetimeVolume / 1e6)}

## Q2 Scenario Estimate

| Scenario | Total revenue | Exchange | OTC | Prediction | Services + interest | Net loss before crypto marks |
|---|---:|---:|---:|---:|---:|---:|
${rows}

Interpretation:
- Bear: Spot is still weak, prediction markets remain sub-scale, and cost cuts do not offset the revenue gap.
- Base: Q2 revenue lands around ${money(model.scenarios[1].totalRevenue)}, with prediction revenue near ${money(model.scenarios[1].predictionRevenue)} and the stock reaction depending mostly on forward KPIs.
- Bull: Exchange stabilizes, OTC rebounds, prediction revenue clears ${money(model.scenarios[2].predictionRevenue)}, and management gives a QTD event-contract acceleration metric.

## Trade Read

The setup is better as a KPI/narrative acceleration trade than an EPS trade. I would want three confirms before pressing size:

1. Prediction revenue above $1M, or a disclosed QTD run-rate that makes $3M+ plausible in Q3.
2. Exchange/OTC transaction revenue not worse than Q1, meaning transaction revenue stays near or above $24M.
3. Operating expense run-rate falls materially from Q1 after severance and stock comp noise.

If Q2 revenue is only around consensus-ish levels and prediction revenue is below $1M, the trade probably becomes sell-the-pop unless management gives an unusually strong July/August KPI.

## Data Notes

- Allium was not directly accessible from this environment, so I used DeFiLlama DEX volume as the public on-chain trading-volume proxy and Gemini/CoinGecko/Coinbase public endpoints for exchange proxies.
- Gemini and Coinbase API exchange-volume proxies are not perfect GAAP revenue proxies. They are useful for directionality, not exact reported trading volume.
- Gemini prediction-market trades are venue-internal and do not reliably appear on-chain. On-chain data is therefore a macro activity proxy, not a direct prediction-revenue feed.

## Sources

- Gemini Q1 2026 release: ${SEC_SOURCES.gemiQ1Release}
- Gemini Q1 2026 10-Q revenue table: ${SEC_SOURCES.gemi10q}
- Gemini 2025 10-K revenue table: ${SEC_SOURCES.gemi10kRevenue}
- Gemini prediction events API: https://api.gemini.com/v1/prediction-markets/events
- CoinGecko exchange volume API: https://api.coingecko.com/api/v3/exchanges/{id}/volume_chart
- DeFiLlama DEX overview API: https://api.llama.fi/overview/dexs
- Robinhood Q2 2026 results release (July 29, 2026): https://investors.robinhood.com/news-releases/
- Gemini Titan daily volume endpoint: https://api.gemini.com/v1/prediction-markets/volume/{date}
- Gemini prediction markets volume API spec: https://developer.gemini.com/prediction-markets-spec/volume
- Gemini Titan rulebook (Rule 2.17 public information): https://www.cftc.gov/filings/orgrules/rules03252641973.pdf
- 17 CFR 16.01 daily market data publication: https://www.ecfr.gov/current/title-17/chapter-I/part-16/section-16.01
- Coinbase Q1 2026 release/deck: https://investor.coinbase.com/
`;
}

// Reads the Titan daily volume series produced by build_prediction_volume_series.mjs.
// Absent file is reported as blocked, not treated as zero volume.
async function loadVolumeSeries() {
  try {
    const raw = await fs.readFile(new URL("./data/prediction_volume_series.json", import.meta.url), "utf8");
    const parsed = JSON.parse(raw);
    console.log(`  titan volume series loaded, asOf ${parsed.asOf}`);
    return parsed;
  } catch (error) {
    console.warn(`  WARNING: Titan volume series unavailable (${error.code ?? error.message}). Prediction revenue falls back to Q1 multiples.`);
    return null;
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const start = Math.floor(Date.UTC(2025, 9, 1) / 1000);
  const end = Math.floor(Date.UTC(2026, 6, 5) / 1000);

  const [btcRaw, geminiRaw, coinbaseRaw, dexRaw, prediction] = await Promise.all([
    fetchJson(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${start}&to=${end}`, "bitcoin"),
    fetchJson("https://api.coingecko.com/api/v3/exchanges/gemini/volume_chart?days=365", "gemini exchange volume"),
    fetchJson("https://api.coingecko.com/api/v3/exchanges/gdax/volume_chart?days=365", "coinbase exchange volume"),
    fetchJson("https://api.llama.fi/overview/dexs?excludeTotalDataChart=false&excludeTotalDataChartBreakdown=true", "defillama dexs"),
    collectPredictionSnapshot(),
  ]);

  const btcRows = normalizeCoin(btcRaw, "btcPrice");
  const geminiVolume = normalizeExchangeVolume(geminiRaw, btcRows, "gemini");
  const coinbaseVolume = normalizeExchangeVolume(coinbaseRaw, btcRows, "coinbase");
  const dexVolume = normalizeDexVolume(dexRaw);
  const volumeSeries = await loadVolumeSeries();
  const model = modelQ2({ geminiVolume, coinbaseVolume, dexVolume, btcRows, prediction, volumeSeries });
  const output = { asOf: new Date().toISOString(), reported, model, raw: { btcRows, geminiVolume, coinbaseVolume, dexVolume, prediction } };

  await fs.writeFile(new URL("./q2_proxy_model.json", OUT_DIR), JSON.stringify(output, null, 2));
  await fs.writeFile(REPORT_PATH, renderMarkdown(model, output));
  console.log(JSON.stringify(model, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
