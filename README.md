# GEMI Earnings And On-Chain Model

Research tooling for GEMI/Gemini earnings work. The model separates venue-reported exchange activity, public prediction-market activity, public-chain address flow, and relative stock trading behavior.

## Start Here

New to this repo, whether reading manually or with an AI assistant? Read in this order.

1. **`REVIEW_ARTEMIS_SIMPLE_MODEL.md`** — review of the Artemis GEMI valuation model: what
   holds, what doesn't, and why. Start here if you want the argument rather than the plumbing.
2. **`SIMPLE_MODEL_V2_TABLES.md`** — every sheet of the repaired workbook as plain-text
   tables with formulas already resolved to values. Read this instead of the `.xlsx` if you
   have no spreadsheet program, or if you are an AI assistant.
3. **`GEMI_simple_model_v2.xlsx`** — the repaired workbook. Six sheets: `Model`,
   `EV Bridge`, `Scenarios`, `Prediction Volume`, `Review`, `Sources`. Values are cached, so
   it opens correctly in Excel, Numbers, Sheets and LibreOffice.
   `GEMI_simple_model_v1_original.xlsx` is the unmodified original, kept for comparison.
4. **`PREDICTION_VOLUME_SERIES.md`** — the Gemini Titan daily volume series and how the
   implied take rate is derived.
5. **`Q2_2026_EARNINGS_ESTIMATE.md`** — the Q2 earnings estimate itself.
6. **`MANAGER_ONCHAIN_FINDINGS.md`** and **`ONCHAIN_EARNINGS_REPORT.md`** — the on-chain
   address work. Note the caveat in Refresh Status below: the EVM legs are stale.

Every claim in the markdown files carries its source inline. The `Sources` sheet of the v2
workbook (also rendered in `SIMPLE_MODEL_V2_TABLES.md`) is the consolidated list, including
the Artemis warehouse references from the original file.

Two conventions to know before reading any volume number:

- **Prediction volume is published one-sided** by Gemini's public endpoint and counted
  **two-sided** in the Artemis warehouse series. The warehouse figures are exactly 2.00x the
  public ones. Revenue is unaffected; cross-venue share comparisons are not. See M4 in the
  review.
- **Prediction contract volume is not spot exchange volume.** Never add them.

## AI-Readable Gist

- **Conclusion:** the on-chain address work does **not** support a clean fundamental long on GEMI by itself. It shows real Gemini-linked activity, but Q2 2026 external gross flow fell versus Q1 and there was no meaningful priced DEX/router trading proxy, so the address set looks more like custody/liquidity/infrastructure monitoring than hidden trading-volume evidence.
- **Q2 earnings estimate:** base case is roughly **$45M revenue**, **$133M GAAP opex**, **-$60M adjusted EBITDA**, and **~-$98M net loss before crypto marks**. Stripping Q1 stock-based compensation, restructuring/severance, non-recurring legal costs, and D&A makes expenses look less bad, but GEMI still likely remains a large-loss business in Q2.
- **Methodology:** combine Gemini official Q1 financials, the Gemini Titan published daily prediction-market volume series, Gemini/Coinbase exchange-volume proxies, DeFiLlama DEX volume, Robinhood crypto/event metrics, and public-chain address flows from Etherscan/Solana RPC. Treat on-chain transfer flow as a narrow custody/liquidity proxy, not reported Gemini trading volume.
- **Key on-chain signal:** Q2 external gross flow was about **$255M** versus about **$329M** in Q1, or roughly **-22.5% QoQ**. Q2 priced trading proxy was effectively **$0**, even though some DEX/router-style interactions appeared.
- **Prediction-market volume is now a real time series, not a snapshot (July 29, 2026):** Gemini Titan, LLC is a CFTC-registered Designated Contract Market, so DCM Core Principle 8 and Titan Rulebook Rule 2.17(b) oblige it to publish daily volume, settlement price, open interest and opening/closing ranges, and 17 CFR 16.01(e) requires that data be public without charge by the next business day. The volume leg is reachable at `https://api.gemini.com/v1/prediction-markets/volume/{date}` with full daily coverage since **December 15, 2025**. This replaces the old single live snapshot of active events, which had no time dimension and could not be tied to a reported quarter.
- **Titan volume, published data:** Q1 2026 **59.67M** contracts, Q2 2026 **115.25M** (**+93.2% QoQ**), Q3 quarter-to-date through July 28 **45.65M** at **1.63M/day** versus Q2's **1.27M/day**. Q2 mix was **55.5% Crypto** and **42.3% Sports**, with Politics under 1%.
- **Implied prediction revenue:** dividing Q1 reported prediction revenue of **$0.444M** by Q1 published volume gives a take rate of **$0.00744 per unit of volume**, which sits between the all-maker and all-taker ceilings of Gemini's published fee formula. Applied to Q2 volume this implies **$0.858M** of Q2 prediction revenue, and July's pace annualizes to roughly **$4.4M**. Prediction revenue is now derived from published volume rather than a multiple of Q1.
- **Robinhood Q2 2026 read-across, reported July 29, 2026:** crypto notional **$40B** (app $18B, Bitstamp $22B) against $65.8B in Q1, crypto revenue **$100M** down 38% year over year, while event contracts traded hit **13.6B** and event-contract revenue of **$156M** exceeded crypto revenue for the first time. The divergence is the point: prediction KPIs can inflect hard while crypto spot revenue keeps deteriorating.
- **Bull case to monitor:** prediction-market KPI acceleration, DCO/futures optionality, and cost-cut follow-through. Titan volume nearly doubled QoQ and is accelerating again in July, but off a base so small that even a doubling adds under $1M of quarterly revenue against a roughly $50M revenue line. Volume momentum is real; materiality is not there yet.
- **Artemis valuation model review, July 29, 2026:** the parallel Artemis model's Q3 thesis holds and its spreadsheet does not yet support it. Confirmed independently: Gemini spot fell **-38.7%** in July on a CoinGecko series against the note's -42%, so the ~$7.2M implied Q3 exchange revenue versus **$13.7M** consensus is a real gap. Not confirmed: the "$803M of cash" asset-support figure counts **$483.8M of customer custodial funds** offset by a near-identical liability, so unencumbered corporate cash is **$215.6M**; and the "-26% in the first half of July" prediction-volume claim reconciles to the *second* half of July versus the second half of June, when Jul 1-15 was actually **+49.3%** and July was the strongest month since launch. The quoted bps share series cannot be reconciled with either the published Gemini volume or the note's own "Kalshi and Polymarket grew 63%". Full detail in `REVIEW_ARTEMIS_SIMPLE_MODEL.md`.
- **Canonical files for AI readers:** start with `REVIEW_ARTEMIS_SIMPLE_MODEL.md`, `SIMPLE_MODEL_V2_TABLES.md`, `Q2_2026_EARNINGS_ESTIMATE.md`, `PREDICTION_VOLUME_SERIES.md`, `MANAGER_ONCHAIN_FINDINGS.md`, `ONCHAIN_EARNINGS_REPORT.md`, and `data/q2_2026_earnings_estimate.json`.

## Runbook

```bash
node gemi_earnings_model/build_prediction_volume_series.mjs
node gemi_earnings_model/build_q2_proxy_model.mjs
node gemi_earnings_model/build_onchain_model.mjs
python3 gemi_earnings_model/build_simple_model_v2.py
```

Run the volume series first. `build_q2_proxy_model.mjs` reads
`data/prediction_volume_series.json` to anchor prediction revenue; if the file is
absent it warns and falls back to Q1 multiples. `build_simple_model_v2.py` also reads that
file, needs `openpyxl`, and recalculates through LibreOffice if `soffice` is on PATH so the
workbook carries cached values; without it the formulas still work in Excel but the plain-text
render will be empty.

Optional deeper on-chain runs:

```bash
ETHERSCAN_API_KEY=... node gemi_earnings_model/build_onchain_model.mjs
ETHERSCAN_API_KEY=... MAX_ETHERSCAN_PAGES_PER_WINDOW=2 node gemi_earnings_model/build_onchain_model.mjs
MAX_SOLANA_SIGNATURES_PER_ADDRESS=500 MAX_SOLANA_TX_FETCH_PER_ADDRESS=100 node gemi_earnings_model/build_onchain_model.mjs
```

From inside this repository, the equivalent commands are:

```bash
node build_q2_proxy_model.mjs
ETHERSCAN_API_KEY=... MAX_ETHERSCAN_PAGES_PER_WINDOW=2 node build_onchain_model.mjs
```

The on-chain model defaults to `data/address_seeds.md`. To use a private local seed file, run:

```bash
ADDRESS_FILE=/path/to/addresses.md ETHERSCAN_API_KEY=... node build_onchain_model.mjs
```

Open the dashboard locally:

```bash
cd gemi_earnings_model
python3 -m http.server 8765
```

Then visit `http://localhost:8765/dashboard/`.

## Main Outputs

- `REVIEW_ARTEMIS_SIMPLE_MODEL.md`: review of the Artemis GEMI valuation model, graded blocking / material / minor / confirmed, with the repaired scenario output.
- `GEMI_simple_model_v2.xlsx`: repaired workbook (`Model`, `EV Bridge`, `Scenarios`, `Prediction Volume`, `Review`, `Sources`) with cached values.
- `GEMI_simple_model_v1_original.xlsx`: the original Artemis workbook, unmodified.
- `SIMPLE_MODEL_V2_TABLES.md`: every v2 sheet as plain-text tables with formulas resolved, for reading without Excel.
- `PREDICTION_VOLUME_SERIES.md`: daily Gemini Titan prediction-market volume series from the DCM daily-publication endpoint, quarterly aggregates, implied take rate, category mix, and a units cross-check against the published fee schedule.
- `Q2_PROXY_MODEL.md`: Q2 revenue proxy using Gemini/Coinbase exchange volume, DeFiLlama DEX volume, reported Robinhood metrics, and the Titan published volume series.
- `Q2_2026_EARNINGS_ESTIMATE.md`: Q2 earnings estimate with GAAP opex, normalized adjusted opex, IPO/SBC/severance treatment, and scenario table.
- `ONCHAIN_MODEL.md`: address inventory, explorer metadata, sampled flow model, and trade-relevance read.
- `ONCHAIN_EARNINGS_REPORT.md`: on-chain earnings bridge, Q1 baseline, Q2 scenarios, and trade implication.
- `MANAGER_ONCHAIN_FINDINGS.md`: manager-ready summary of the on-chain findings, revenue reconciliation, and August earnings read.
- `DEEP_RELATIVE_VALUE.md`: GEMI vs BTC/COIN/HOOD/brokerage peers.
- `data/prediction_volume_series.json`: per-day Titan volume with category breakdown, per-quarter aggregates, fetch status, and take-rate calibration.
- `data/onchain_address_deep_dive.json`: per-address explorer and sampled-flow diagnostics.
- `data/onchain_timeseries.json`: daily external/internal/trading-proxy time series.
- `data/onchain_earnings_model.json`: scenario output using fixed/semi-fixed GAAP opex and adjusted EBITDA-style expense assumptions.
- `data/q2_2026_earnings_estimate.json`: machine-readable Q2 earnings scenario and expense-normalization assumptions.
- `data/onchain_dashboard_data.json`: compact data bundle for `dashboard/index.html`.
- `dashboard/index.html`: local UI for the address and earnings model.

## Interpretation Rules

- Transfer volume is not trading volume.
- Titan prediction contract volume is not Gemini spot exchange volume. Never add the two.
- Days the volume endpoint does not serve are recorded as missing and excluded from sums, never zero-filled. Check `coverage` before quoting a quarter total.
- The Titan take rate is calibrated on one reported quarter off a $0.444M base. Treat implied prediction revenue as an order-of-magnitude check, not a point estimate.
- Titan volume is published one-sided; the Artemis warehouse series is two-sided and exactly 2.00x. State the convention whenever quoting a level, and normalise before comparing venues.
- Balance-sheet cash excludes customer custodial funds and restricted cash. Custodial funds carry a near-identical offsetting liability and are not shareholder value.
- A PE multiple cannot value negative earnings. Use EV/Sales with a tangible-book floor while the company is loss-making.
- DEX/router/program interactions are the only on-chain events counted as trading proxy.
- Internal cluster transfers are excluded from external gross flow and net flow.
- Missing API keys must be reported as blocked or partial, not zero.
- Address labels are leads until public explorer labels or behavior support them.

## Current Read

The Q2 earnings read stays neutral, but it is better evidenced than it was. Q2 external gross flow was about **$255M**, down **22.5% QoQ**, and the Q2 priced DEX/router trading proxy remained **$0**. Partial Q3 external gross flow of about **$343M** makes July address activity worth monitoring for Q3 rather than a reason to revise Q2.

What changed on July 29, 2026 is the quality of the prediction-market evidence, not the conclusion. Titan volume is now a published daily series instead of a live snapshot, and it says Q2 contract volume nearly doubled QoQ to **115.25M** and is accelerating again in July at **1.63M/day**. Calibrated against Q1's reported **$0.444M**, that is still only **$0.858M** of Q2 prediction revenue on a roughly **$45M** revenue base. Robinhood's Q2 print the same day shows what this line looks like when it does scale: **$156M** of event-contract revenue overtaking **$100M** of crypto revenue. GEMI is on the same curve, roughly two orders of magnitude behind. The volume trend supports watching the name; it does not yet support underwriting prediction markets as a Q2 or Q3 earnings driver.

### Refresh Status

| Leg | Status | Through |
|---|---|---|
| Titan prediction volume | complete, full daily coverage | 2026-07-28 |
| Gemini/Coinbase/DEX volume proxies | complete | latest available |
| Robinhood metrics | reported actuals, no longer estimated | Q2 2026 |
| Solana address flow | partial public RPC sample | current |
| Ethereum and Base address flow | **blocked, needs `ETHERSCAN_API_KEY`** | 2026-07-14 |

The EVM leg carries 15 of the 19 tracked addresses, so the on-chain outputs in this
repo are still the July 14 run. Rerun with the key to refresh them; a keyless run
degrades those files rather than updating them.
