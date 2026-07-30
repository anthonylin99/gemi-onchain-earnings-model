# Methodology, Data Lineage and Limitations

As of **29 July 2026** (all dates US Eastern unless stated). GEMI last close **$4.065**.

This document exists so a reader can audit every number in the repo without taking anything
on trust. It covers what the estimates are, where the inputs come from, how four independent
Q2 estimates reconcile, and what is known to be wrong.

## Scope

**What this is.** Independent pre-earnings research on Gemini Space Station (NASDAQ: GEMI),
built to produce a falsifiable Q2 2026 forecast and to test the claims in an accompanying
sell-side-style note against primary sources.

**What this is not.** Not investment advice, not a recommendation to buy or sell any security,
and not a personalised suitability assessment. Nothing here accounts for any reader's
position, cost basis, risk tolerance or horizon. Figures are estimates and will be wrong to
some degree. See `DISCLAIMER.md`.

**Use of comparables.** Robinhood (NASDAQ: HOOD) appears here only as a valuation and
read-across comparable. Its Q2 2026 print is cited to show how prediction-market economics can
inflect while crypto spot revenue deteriorates — the same directional setup GEMI has at roughly
two orders of magnitude less scale. Kalshi and Polymarket appear as venue comparables on volume
and take rate. No inference about any of those businesses beyond the figures quoted is intended.

**Independence.** This is a personal research project. No compensation was received from any
company named, and no company named reviewed or had input into it.

## The Forecast Being Tested

| | Value |
|---|---:|
| Q2 2026 total revenue | **$43.78M** |
| Q2 2026 EPS excluding crypto marks | **-$0.68** |
| Consensus revenue at lock (6 analysts) | $42.84M |
| Consensus EPS at lock | -$0.69 |
| Locked | 29 Jul 2026 |
| Scores against | The Q2 10-Q / press release, August 2026 |

Recorded in `Q2_2026_SCORECARD.md` and `data/q2_2026_prediction.json` with `status: "OPEN"`
and null `actual` fields, so it cannot be quietly revised after the fact.

## Four Independent Q2 Estimates

**The Excel model is the source of truth.** Where any document in this repo disagrees with
`gemi_consolidated_model_2025a_2030e.xlsx`, the workbook governs and the document is wrong.

The repo contains four Q2 revenue estimates built by different methods. Only the first is the
published call. The other three are independent checks, and their convergence is the main
reason to have confidence in the number — but they do not override it.

| Line | Excel bridge **(the call)** | On-chain bridge | Earnings estimate | Proxy model |
|---|---:|---:|---:|---:|
| Exchange revenue | $12.60M | $13.50M | $13.50M | $13.74M |
| OTC revenue | $4.00M | $5.00M | $5.00M | $5.00M |
| Prediction revenue | $0.78M | $0.90M | $0.90M | $0.86M |
| Other transaction | $0.20M | — | $0.20M | — |
| Service + interest | $24.50M | $25.10M | $25.40M | $25.50M |
| Other revenue | $1.70M | — | — | — |
| **Total revenue** | **$43.78M** | **$44.50M** | **$45.00M** | **$45.30M** |
| vs consensus $42.84M | +2.2% | +3.9% | +5.0% | +5.7% |
| GAAP opex | **$124.0M** | $133.0M | $133.0M | — |
| Scenario band | **$39.4 / 43.8 / 47.7M** | $36.4 / 44.5 / 54.0M | $37.5 / 45.0 / 54.0M | $37.0 / 45.3 / 54.6M |

**Spread: $43.78M to $45.30M**, a range of $1.52M or 3.5% of the midpoint. All four land
*above* consensus. The published call is the **lowest** of the four.

**The scenario bands and opex do not agree, and the Excel model wins both.** The three older
builds carry a wider band ($36.4M–$54.6M) and $133.0M of GAAP opex against the Excel model's
$39.4M–$47.7M and $124.0M. The older bands were drawn before the July volume tape narrowed the
plausible range and before opex was rebuilt on fixed and semi-fixed assumptions rather than as
a percentage of revenue. Quote **$39.4M / $43.8M / $47.7M** and **$124.0M**. Every document
carrying the older figures now says so at the point of use.

**Why they differ, line by line:**

- **Exchange ($1.14M spread).** The Excel bridge applies 28 bps to an observed $4.5B of Q2
  volume. The other three scale Q1's $17.2M down by a volume proxy — the proxy model using a
  CoinGecko daily series, the other two using a blend. Direct observation beats scaling.
- **OTC ($1.00M spread).** The Excel bridge cuts OTC to $4.0M on the view that Q1's $6.3M was
  lumpy block flow. The other three hold $5.0M. OTC is the least forecastable line in the
  model; a $1M miss here is well within normal.
- **Service + interest ($1.00M spread).** All four assume card growth roughly offsets staking
  decay, and differ only in rounding and in where interest income is classified.
- **GAAP opex ($9.0M spread).** The Excel bridge carries $124.0M against $133.0M in the two
  older bridges, on the view that Q1's restructuring and legal costs fade faster. This is the
  largest single disagreement in the repo and the one with the biggest EPS consequence: $9M is
  roughly $0.07 per share on 126M shares.

**Which to use:** the Excel bridge, **$43.78M**, with **$124.0M** of opex and a
**$39.4M / $43.8M / $47.7M** band. It is built bottom-up per line from observed Q2 data rather
than scaled from Q1, it is the only one with a quarterly consensus comparison per line, and it
is the most conservative on revenue. The other three are corroboration and do not override it.

## Data Lineage

Every input, what it feeds, and its coverage.

| Source | Type | Feeds | Coverage / as-of |
|---|---|---|---|
| [Gemini Titan volume API](https://developer.gemini.com/prediction-markets-spec/volume) `/v1/prediction-markets/volume/{date}` | Public exchange API, unauthenticated | Prediction volume series, implied take rate | Daily, complete 15 Dec 2025 → 28 Jul 2026 |
| [GEMI Q1 2026 10-Q](https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R50.htm) | SEC filing (XBRL) | Q1 actuals, revenue disaggregation, balance sheet | Quarter ended 31 Mar 2026 |
| [GEMI FY2025 10-K](https://www.sec.gov/Archives/edgar/data/2055592/000205559226000026/R60.htm) | SEC filing (XBRL) | FY2025 actuals | Year ended 31 Dec 2025 |
| [Gemini Predictions fee schedule](https://www.gemini.com/fees/predictions) | Issuer disclosure | Take-rate sanity check | Current |
| CoinGecko `exchanges/gemini/volume_chart` | Third-party market data | Independent spot-volume check | Daily, trailing 365d |
| DeFiLlama `overview/dexs` | Third-party market data | Crypto-activity context | Daily |
| Etherscan v2 / Solana public RPC | Chain explorers | On-chain address flow | See staleness note below |
| [Robinhood Q2 2026 results](https://investors.robinhood.com/news-releases) | Issuer press release | Read-across on prediction economics | Reported 29 Jul 2026 |
| Artemis warehouse | Vendor data platform | Consensus, venue comps, CEX tape | 29 Jul 2026; not independently reproducible |

**Reproducibility.** Everything except the Artemis warehouse lines can be regenerated from
public sources by running the scripts in the runbook. The warehouse figures — consensus
estimates, Kalshi and Polymarket volumes, the internal CEX tape — cannot be reproduced without
a licence, and are cited as-quoted in the model's `Sources & Notes` sheet. Where a warehouse
figure was load-bearing, it was checked against a public equivalent: the CEX tape against
CoinGecko (agrees on direction and magnitude), and the Gemini prediction volume against the
Titan API (a 2.00x convention difference, documented below).

## Conventions

Two that cause real errors if ignored:

**Prediction volume is one-sided in Gemini's public API and two-sided in the Artemis
warehouse**, which runs at exactly 2.00x. A matched trade creates one contract for each side;
the warehouse counts both legs, the API counts one. This does not affect revenue as long as
the take rate is calibrated and applied on the same basis, and both methods agree Q2
prediction revenue is $0.78–0.86M. It does affect any cross-venue share comparison, and it is
the root of correction C1 in `REVIEW_ARTEMIS_MODEL.md`.

**Prediction contract volume is not spot exchange volume.** Different products, different take
rates, different disclosure. Never add them.

## Known Limitations

Listed most to least consequential. Full detail in `REVIEW_ARTEMIS_MODEL.md`.

1. **Valuation multiples in the model are ~19% too high.** `Net Cash / (Debt)` captures only
   the related-party loans line, omitting $215.6M of cash and three other debt lines. Corrected
   EV is $644.1M, not $765.8M, so 2026E EV/Sales is **3.70x**, not 4.40x. Use the corrected
   column in the review.
2. **One cell in the venue comps table is single-counted**, which inverts the July
   prediction-volume comparison from -26% to +49.2%. The conclusion drawn from it — share loss
   into an accelerating category — does not hold as written.
3. **Ethereum and Base on-chain flows are stale**, last refreshed 14 Jul 2026. They cover 15 of
   19 tracked addresses and require an `ETHERSCAN_API_KEY` to update. A keyless run degrades
   rather than refreshes those files. Solana refreshes on public RPC.
4. **The take rate is calibrated on a single quarter off a $0.444M base.** Treat implied
   prediction revenue as an order-of-magnitude check, not a point estimate.
5. **GAAP EPS is not forecastable.** Crypto mark-to-market dominates it: Q1 2026 carried a
   -$101M gross swing on crypto assets against +$90M on crypto loans payable, about -$0.09 per
   share net. The forecast is explicitly ex-marks and must be scored that way.
6. **FY2030 is below consensus on revenue but above it on EPS**, implying better margins on a
   smaller base than the street assumes. This is an unstated call in the model.
7. **Missing days are never zero-filled.** Where a data feed does not serve a day, it is
   recorded as missing and excluded from sums. Check `coverage` before quoting a period total.

## Document Status

| Document | As of | Status |
|---|---|---|
| `Q2_2026_SCORECARD.md` | 29 Jul 2026 | Current — the live forecast |
| `REVIEW_ARTEMIS_MODEL.md` | 29 Jul 2026 | Current |
| `PREDICTION_VOLUME_SERIES.md` | 29 Jul 2026 | Current, auto-generated |
| `CONSOLIDATED_MODEL_TABLES.md` | 29 Jul 2026 | Current, auto-generated |
| `Q2_PROXY_MODEL.md` | 29 Jul 2026 | Current, auto-generated. Corroborating estimate |
| `Q2_2026_EARNINGS_ESTIMATE.md` | 29 Jul 2026 | Current. Corroborating estimate, longer-form |
| `ONCHAIN_MODEL.md`, `ONCHAIN_EARNINGS_REPORT.md`, `MANAGER_ONCHAIN_FINDINGS.md` | 14 Jul 2026 | **Stale** — EVM legs not refreshed |
| `TRADE_PLAN.md`, `TRADE_VECTOR.md` | 5 Jul 2026 | **Superseded** — written at $4.23 before the July tape and the Robinhood print |
| `DEEP_RELATIVE_VALUE.md` | 14 Jul 2026 | **Stale** — peer multiples not refreshed |

Stale and superseded documents are retained deliberately: they are the record of what was
believed and when, which is what makes the forecast auditable rather than retrofitted. Each
carries a banner at the top. Do not quote a figure from a stale document without checking it
against the current ones.
