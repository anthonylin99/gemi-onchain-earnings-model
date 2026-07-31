# GEMI — Q2 2026 Pre-Earnings Research

Independent research on **Gemini Space Station (NASDAQ: GEMI)**, built to produce a
falsifiable Q2 2026 forecast and to verify an accompanying sell-side-style note against
primary sources.

**Updated 30 July 2026** with Robinhood's and Coinbase's Q2 prints and the spot tape through
29 July. GEMI last close **$4.065** (29 Jul). Research and educational material only — not
investment advice. See [`DISCLAIMER.md`](DISCLAIMER.md).

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

Consensus wants **$46.99M** of Q3 revenue. The model implies about **$39.8M**, roughly **$7.2M**
light, with exchange revenue near **$7.5M** against roughly $13.7M implied by consensus.

The July collapse is **market-wide, not GEMI-specific** — a distinction the update makes
possible for the first time:

| Venue | Q2 2026 | July 2026 | Change |
|---|---:|---:|---:|
| Gemini spot | $48.4M/day | $28.7M/day | **-40.7%** |
| Coinbase spot | $1,577M/day | $1,040M/day | **-34.1%** |

Coinbase confirms it from the other side: total market spot volume fell 25% in Q2 while its own
share hit an all-time-high 10.3%. So GEMI's problem is ~34 points of beta plus about **6.7
points of idiosyncratic underperformance**. Narrower than "GEMI is losing share," and honest.

### GEMI is being lapped in prediction markets

| Venue | Q2 2026 prediction / event revenue | Trajectory |
|---|---:|---|
| Robinhood | **$156M** | +50% QoQ, 13.6B contracts |
| Coinbase | **>$100M annualised** | +106% QoQ |
| Gemini | **~$0.78M** | +92% QoQ on notional |

GEMI's *entire modelled FY2026* prediction revenue of **$2.4M** is about 2.4% of Coinbase's
annualised run rate, and roughly a week and a half of Robinhood's quarterly event revenue. The
growth rate is comparable; the scale is not remotely. Prediction markets are 1.4% of GEMI's
FY2026 sales and are not going to rescue the equity story on any horizon this model covers.

---

## Reading Order

| # | Document | What it is |
|---|---|---|
| 1 | [`Q2_2026_SCORECARD.md`](Q2_2026_SCORECARD.md) | The call and how to score it. **Start here.** |
| 2 | [`REVIEW_ARTEMIS_MODEL.md`](REVIEW_ARTEMIS_MODEL.md) | Independent verification: 7 items confirmed sound, 5 corrections required, corrected valuation multiples |
| 3 | [`METHODOLOGY.md`](METHODOLOGY.md) | Scope, data lineage, reconciliation of the four Q2 estimates, known limitations, document status |
| 4 | [`ANNUAL_MODEL_TABLES.md`](ANNUAL_MODEL_TABLES.md) | The current annual model as plain-text tables — read this if you have no spreadsheet program, or if you are an AI assistant |
| 5 | `GEMI_simple_model_2026-07-30.xlsx` | **The annual model.** Source of truth for every annual and valuation figure, 2025A–2030E |
| 5b | `gemi_consolidated_model_2025a_2030e.xlsx` + [`CONSOLIDATED_MODEL_TABLES.md`](CONSOLIDATED_MODEL_TABLES.md) | Retained **only** for its `Q2-26 Bridge vs Consensus` sheet, which is the source of the locked Q2 call. Its annual sheet is superseded |
| 6 | [`PREDICTION_VOLUME_SERIES.md`](PREDICTION_VOLUME_SERIES.md) | Gemini Titan daily volume series and the implied take rate |
| 7 | [`DISCLAIMER.md`](DISCLAIMER.md) | Scope and limitations of use |

Older documents carry a **STALE**, **SUPERSEDED** or **CORROBORATING** banner at the top.
They are retained deliberately as the record of what was believed and when — that is what
makes the forecast auditable rather than retrofitted. Do not quote a figure from a bannered
document without checking it against the current ones. Full status table in
[`METHODOLOGY.md`](METHODOLOGY.md).

---

## Verification Summary

Every number was checked against primary sources. Detail in
[`REVIEW_ARTEMIS_MODEL.md`](REVIEW_ARTEMIS_MODEL.md).

**Eight defects fixed in the 30 July update.** Sales, transaction revenue, both take rates,
prediction % of sales and EV/Sales now all compute where they previously held placeholder text
or returned errors. Diluted shares are an explicit row. Volume and revenue are on consistent
units. The prediction-market comps sheet, which held the worst error in the prior version, was
removed.

**Five defects remain.** In priority order:

| # | Defect | Effect |
|---|---|---|
| D1 | The July prediction figure is one-sided while its June comparator is two-sided | Turns a **+17.6%** rise into a stated **-37%** fall. The only item that changes a conclusion |
| D2 | `Net Cash` captures only the related-party loans line, omitting $215.6M of cash and three other debt lines | EV is **$644.1M**, not $765.8M. Every `EV / Sales` is ~16% too high — 2026E is **3.71x**, not 4.41x |
| D3 | The 2025 EV cell is empty, so `Ups/Downs` divides by zero | Revenue scenarios show `#DIV/0!`. Computed manually: bull **+200.4%**, base **+44.9%**, bear **-45.7%** on corrected EV |
| D4 | The EPS/PE table values base and bear at negative EPS × a zero multiple | Prints **$0.00** and **-100%** for a company holding $456.1M of book equity |
| D5 | 2023 and 2024 ratio rows have no denominator | A wall of visible `#DIV/0!`. Cosmetic, but reads as unfinished |

**None affects the Q2 call**, which comes from a different workbook and a different period.

### Forward estimates were cut

| | Previous (29 Jul) | Updated (30 Jul) | Change |
|---|---:|---:|---:|
| FY2030 Sales | $335.0M | $310.8M | **-7.2%** |
| FY2030 prediction notional | $2,700M | $2,000M | **-25.9%** |
| FY2030 EPS | -$1.39 | -$1.47 | -$0.08 |
| Bull 2030 revenue @ multiple | $470M @ 5.0x | $430M @ 4.5x | both cut |

The prediction-notional cut is the largest, and follows directly from the competitive picture
above: the prior path implicitly assumed GEMI would keep pace in a category where Coinbase and
Robinhood are compounding far faster off a base hundreds of times larger.

### Which model governs what

Two workbooks, two scopes, no overlap in authority:

| Figure | Governed by |
|---|---|
| Every annual and valuation figure, 2025A–2030E | **`GEMI_simple_model_2026-07-30.xlsx`** |
| The Q2 2026 quarterly call | **`gemi_consolidated_model_2025a_2030e.xlsx`**, sheet `Q2-26 Bridge vs Consensus` |

The consolidated model's *annual* sheet is superseded and should not be quoted. Four Q2 revenue
estimates exist across the repo — the bridge's **$43.78M**, plus $44.50M, $45.00M and $45.30M
from earlier builds. They converge inside a $1.52M spread and the bridge is the most
conservative; it governs. Every document carrying a divergent figure names the canonical one at
the point of use. Full reconciliation in [`METHODOLOGY.md`](METHODOLOGY.md).

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
python3 render_consolidated_model.py         # both models -> markdown + data/q2_2026_prediction.json
node build_onchain_model.mjs                 # on-chain flows (see key note below)
```

Run the volume series first — `build_q2_proxy_model.mjs` reads
`data/prediction_volume_series.json` to anchor prediction revenue, and warns and falls back
to Q1 multiples if it is absent.

`render_consolidated_model.py` needs `openpyxl` and renders both workbooks. The annual model
ships without cached formula results, so the script recalculates it through LibreOffice
(`soffice` on PATH) — always on a **copy in a temp directory**, never the original. Without
LibreOffice it warns and computed cells render blank. Neither workbook is ever modified.

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
| Annual model (2025A-2030E) | Current | 30 Jul 2026 |
| Robinhood + Coinbase read-across | Reported actuals | Q2 2026 |
| Spot tape (Gemini + Coinbase) | Complete | 29 Jul 2026 |
| Titan prediction volume | Complete, full daily coverage | 28 Jul 2026 |
| Q2 bridge (consolidated model) | Current, call unchanged | 29 Jul 2026 |
| Solana address flow | Partial public RPC sample | Current |
| Ethereum and Base address flow | **Stale — needs `ETHERSCAN_API_KEY`** | 14 Jul 2026 |

---

*Research and educational material. Not investment advice. Not a recommendation to buy or
sell any security. Figures are estimates and some are known to be wrong — see
[`METHODOLOGY.md`](METHODOLOGY.md). Read [`DISCLAIMER.md`](DISCLAIMER.md) before relying on
anything here.*
