# GEMI — Q2 2026 Pre-Earnings Research

Independent research on **Gemini Space Station (NASDAQ: GEMI)**, built to produce a
falsifiable Q2 2026 forecast and to verify an accompanying sell-side-style note against
primary sources.

**As of 29 July 2026.** GEMI last close **$4.065**. Research and educational material only —
not investment advice. See [`DISCLAIMER.md`](DISCLAIMER.md).

---

## The Call

> # Q2 2026: revenue $43.8M · EPS ex-marks -$0.68
>
> Quarter ended **30 June 2026**. Reports **August 2026**.
> Locked **29 July 2026** at **$4.065**. Status: **OPEN — not yet scored.**
>
> | | Forecast | Consensus | Variance |
> |---|---:|---:|---:|
> | Total revenue | **$43.78M** | $42.84M | +2.2% |
> | EPS ex-crypto marks | **-$0.68** | -$0.69 | +1.4% |
>
> Scenario band: bear **$39.4M / -$0.76** · base **$43.8M / -$0.68** · bull **$47.7M / -$0.62**.
> An in-line call. No edge in either direction on the quarter.

**GAAP EPS will not match this, and that is by design.** GAAP includes crypto
mark-to-market, which is not forecastable — Q1 2026 carried a -$101M gross swing on crypto
assets against +$90M on crypto loans payable, roughly -$0.09 per share net. Consensus
implicitly assumes zero marks. Score against an ex-marks figure; a GAAP miss driven by marks
is not a model miss.

→ **[`Q2_2026_SCORECARD.md`](Q2_2026_SCORECARD.md)** — 12-line scoring table with blank
`Actual` columns, hit bands, per-line build basis, post-print checklist
→ **[`data/q2_2026_prediction.json`](data/q2_2026_prediction.json)** — same forecast,
machine-readable, `status: "OPEN"`, all `actual` fields null

### The quarter is not the trade — Q3 is

Consensus wants **$47.0M** of Q3 revenue (+9.7% QoQ) on **$13.7M** of exchange revenue. The
July tape implies roughly **$7.5M**, about half. Gemini spot ran **$27.9M/day** in July
against **$48.4M/day** in Q2, and an independent CoinGecko series puts the same decline at
**-38.7%** — different levels, same direction and magnitude. This is the one claim in the
analysis that survives every check, and after the corrections below it carries the bear case
on its own.

Prediction markets will be the headline and are **1.8% of revenue, $0.006 of EPS**. Triple
the segment and EPS moves about two cents.

---

## Reading Order

| # | Document | What it is |
|---|---|---|
| 1 | [`Q2_2026_SCORECARD.md`](Q2_2026_SCORECARD.md) | The call and how to score it. **Start here.** |
| 2 | [`REVIEW_ARTEMIS_MODEL.md`](REVIEW_ARTEMIS_MODEL.md) | Independent verification: 7 items confirmed sound, 5 corrections required, corrected valuation multiples |
| 3 | [`METHODOLOGY.md`](METHODOLOGY.md) | Scope, data lineage, reconciliation of the four Q2 estimates, known limitations, document status |
| 4 | [`CONSOLIDATED_MODEL_TABLES.md`](CONSOLIDATED_MODEL_TABLES.md) | Every model sheet as plain-text tables — read this if you have no spreadsheet program, or if you are an AI assistant |
| 5 | `gemi_consolidated_model_2025a_2030e.xlsx` | The model. Sheets: `Model` (2025A–2030E), `Q2-26 Bridge vs Consensus`, `Prediction Market Comps`, `Sources & Notes` |
| 6 | [`PREDICTION_VOLUME_SERIES.md`](PREDICTION_VOLUME_SERIES.md) | Gemini Titan daily volume series and the implied take rate |
| 7 | [`DISCLAIMER.md`](DISCLAIMER.md) | Scope and limitations of use |

Older documents carry a **STALE**, **SUPERSEDED** or **CORROBORATING** banner at the top.
They are retained deliberately as the record of what was believed and when — that is what
makes the forecast auditable rather than retrofitted. Do not quote a figure from a bannered
document without checking it against the current ones. Full status table in
[`METHODOLOGY.md`](METHODOLOGY.md).

---

## Verification Summary

Every number in the model was checked against primary sources. Detail in
[`REVIEW_ARTEMIS_MODEL.md`](REVIEW_ARTEMIS_MODEL.md).

**Confirmed sound (7).** The Q2 bridge is arithmetically airtight — all twelve lines and
every subtotal recompute from their components. The July spot collapse verifies against an
independent source. Prediction materiality agrees across two independent calibrations.
Full-quarter venue share reconciles exactly. The crypto-marks warning, the vendor
data-quality disclosures, and the structural hygiene all check out.

**Corrections required (5).** In priority order:

| # | Correction | Effect |
|---|---|---|
| C1 | One cell in the venue comps table is single-counted while the four months above it are all exactly 2.00x the public endpoint | Inverts July prediction volume from **-26% to +49.2%**; share is **18.80 bps**, not 9.29. The "share loss" conclusion does not hold as written |
| C2 | `Net Cash / (Debt)` captures only the related-party loans line, omitting $215.6M of cash and three other debt lines | EV is **$644.1M**, not $765.8M. Every `EV / Sales` is ~19% too high — 2026E is **3.70x**, not 4.40x |
| C3 | The one-sided vs two-sided volume convention is never declared | Makes C1 possible; the 34 bps take rate is half its one-sided equivalent of ~74 bps |
| C4 | FY2030 is 15% below consensus on revenue but $0.39 better on EPS | An unstated call that margins beat the street on a smaller base |
| C5 | The note's "$803M of cash" includes $483.8M of customer custodial funds offset by a near-identical liability | Unencumbered corporate cash is **$215.6M**. The asset-support argument does not survive |

**None of these affects the Q2 forecast.** C1 and C5 do block the Q3 prediction-market bear
case as written.

### Four independent Q2 estimates — the Excel model governs

**Where any document here disagrees with `gemi_consolidated_model_2025a_2030e.xlsx`, the
workbook is the source of truth and the document is wrong.**

| Method | Total revenue | GAAP opex | Scenario band | vs consensus |
|---|---:|---:|---:|---:|
| **Excel bottom-up bridge (the call)** | **$43.78M** | **$124.0M** | **$39.4 / 43.8 / 47.7M** | +2.2% |
| On-chain earnings bridge | $44.50M | $133.0M | $36.4 / 44.5 / 54.0M | +3.9% |
| Longer-form earnings estimate | $45.00M | $133.0M | $37.5 / 45.0 / 54.0M | +5.0% |
| Volume-proxy model | $45.30M | — | $37.0 / 45.3 / 54.6M | +5.7% |

Revenue converges tightly: a $1.52M spread, 3.5% of the midpoint, all four above consensus,
with the published call the most conservative. **Opex and the scenario bands do not converge,
and the Excel figures win.** The three older builds predate the July volume tape that narrowed
the plausible range, and they model opex as a share of revenue rather than on fixed and
semi-fixed assumptions. Quote **$39.4M / $43.8M / $47.7M** and **$124.0M**. Reconciled line by
line in [`METHODOLOGY.md`](METHODOLOGY.md).

---

## Key Data Source

Gemini Titan, LLC is a **CFTC-registered Designated Contract Market**. DCM Core Principle 8
and Titan Rulebook Rule 2.17(b) require it to publish daily volume, settlement prices, open
interest and opening/closing ranges, and
[17 CFR 16.01(e)](https://www.law.cornell.edu/cfr/text/17/16.01) requires that data be public
without charge by the next business day. The volume leg is served per-date, unauthenticated:

```
https://api.gemini.com/v1/prediction-markets/volume/{YYYY-MM-DD}
```

Complete daily coverage since **15 December 2025**. This is the primary source for the
prediction-revenue line and is reproducible by anyone. Note that 17 CFR **16.02**
transaction-level trade data goes to the Commission and is **not** published — there is no
public tick file for this venue.

Two conventions that cause real errors if ignored:

- **Prediction volume is one-sided in the public API and two-sided in the vendor series**,
  which runs at exactly 2.00x. Revenue is unaffected when the take rate is calibrated and
  applied on the same basis; cross-venue share comparisons are not. This is the root of C1.
- **Prediction contract volume is not spot exchange volume.** Never add them.

---

## Reproducing

Public sources regenerate from the scripts below. Vendor consensus, venue comps and the
internal CEX tape require a licence and are cited as-quoted; where load-bearing, each was
cross-checked against a public equivalent (see [`METHODOLOGY.md`](METHODOLOGY.md)).

```bash
node build_prediction_volume_series.mjs      # Titan daily volume -> data/ + report
node build_q2_proxy_model.mjs                # volume-proxy estimate (reads the series above)
python3 render_consolidated_model.py         # model -> markdown + data/q2_2026_prediction.json
node build_onchain_model.mjs                 # on-chain flows (see key note below)
```

Run the volume series first — `build_q2_proxy_model.mjs` reads
`data/prediction_volume_series.json` to anchor prediction revenue, and warns and falls back
to Q1 multiples if it is absent. `render_consolidated_model.py` needs `openpyxl`; it reads
the workbook only and will never overwrite the model, so it is safe to re-run at any time.

**On-chain requires a key.** The Ethereum and Base legs cover 15 of 19 tracked addresses and
need `ETHERSCAN_API_KEY`. A keyless run **degrades** those files rather than refreshing them
— the EVM legs return `blocked_missing_api_key` and zero out. Solana refreshes on public RPC.

```bash
ETHERSCAN_API_KEY=... MAX_ETHERSCAN_PAGES_PER_WINDOW=2 node build_onchain_model.mjs
MAX_SOLANA_SIGNATURES_PER_ADDRESS=500 MAX_SOLANA_TX_FETCH_PER_ADDRESS=100 node build_onchain_model.mjs
ADDRESS_FILE=/path/to/private_seeds.md ETHERSCAN_API_KEY=... node build_onchain_model.mjs
```

Address seeds default to `data/address_seeds.md`, which holds public explorer links only.
Local dashboard: `python3 -m http.server 8765`, then `http://localhost:8765/dashboard/`.

---

## Interpretation Rules

House rules the analysis follows. Each exists because it was violated at some point and
produced a wrong answer.

- Transfer volume is not trading volume. Prediction contract volume is not spot volume.
- Missing data is recorded as missing and **never zero-filled**. Check `coverage` before
  quoting any period total.
- Missing API keys are reported as blocked or partial, never as zero.
- State the volume convention whenever quoting a level, and normalise before comparing venues.
- Balance-sheet cash excludes customer custodial funds and restricted cash. Custodial funds
  carry a near-identical offsetting liability and are not shareholder value.
- A P/E multiple cannot value negative earnings. Use EV/Sales with a tangible-book floor while
  the company is loss-making.
- The Titan take rate is calibrated on one quarter off a $0.444M base. Treat implied
  prediction revenue as an order-of-magnitude check, not a point estimate.
- Address labels are leads until public explorer metadata or observed behaviour supports them.

---

## Refresh Status

| Leg | Status | Through |
|---|---|---|
| Titan prediction volume | Complete, full daily coverage | 28 Jul 2026 |
| Spot / DEX volume proxies | Complete | 28 Jul 2026 |
| Robinhood read-across | Reported actuals | Q2 2026 |
| Consolidated model + Q2 bridge | Current | 29 Jul 2026 |
| Solana address flow | Partial public RPC sample | Current |
| Ethereum and Base address flow | **Stale — needs `ETHERSCAN_API_KEY`** | 14 Jul 2026 |

---

*Research and educational material. Not investment advice. Not a recommendation to buy or
sell any security. Figures are estimates and some are known to be wrong — see
[`METHODOLOGY.md`](METHODOLOGY.md). Read [`DISCLAIMER.md`](DISCLAIMER.md) before relying on
anything here.*
