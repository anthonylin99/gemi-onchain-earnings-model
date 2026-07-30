# Review — Artemis GEMI Consolidated Model

Reviewed 2026-07-29 against Gemini Titan's published volume series, GEMI's Q1 2026 10-Q
balance sheet, Robinhood's Q2 2026 print, and an independent CoinGecko spot series.

- **Current model:** `gemi_consolidated_model_2025a_2030e.xlsx` — 4 sheets: `Model`, `Q2-26 Bridge vs Consensus`, `Prediction Market Comps`, `Sources & Notes`
- **Plain-text render:** `CONSOLIDATED_MODEL_TABLES.md` (read this if you have no spreadsheet program)
- **The call:** `Q2_2026_SCORECARD.md` and `data/q2_2026_prediction.json`
- **Superseded:** an earlier `GEMI_simple_model.xlsx`, removed from the repo. Its defects are recorded below because most of them were fixed, and knowing which ones were *not* is the point of this document.

## Bottom Line

The consolidated model is a substantial improvement and is safe to use for the Q2 call. Ten
of the twelve defects in the earlier simple model are fixed, and the two new sheets
(`Q2-26 Bridge vs Consensus`, `Prediction Market Comps`) are the most useful additions —
the quarterly bridge is what makes the forecast scoreable at all.

Two things remain wrong, and one of them is worse than I could establish last pass:

1. **The July cell in the prediction comps table is single-counted** while every other month
   in the same column is double-counted. That one cell produces both the "-26% in the first
   half of July" and the "9.29 bps" share figure. Corrected, July was **+49%** and share was
   **18.8 bps**. This is a hard arithmetic error, not a judgment call.
2. **`Net Cash / (Debt)` is still -$252.8M**, which is the related-party loans line on its
   own. It nets no cash and omits three other debt lines. To the model's credit, the
   `Sources & Notes` sheet now flags this as "the weakest assumption in the model."

Neither touches the Q2 numbers. Both touch the Q3 bear case — which, after the corrections,
rests on the spot tape alone. That leg verifies independently and is strong enough to carry
the argument by itself.

## What Changed Between The Two Models

### Fixed

| Was broken in the simple model | Now |
|---|---|
| `Sales` was the literal string `—`, so EV/Sales, EBIT, EBITDA, Opex % and every growth rate errored | All populated: Sales $179.6M → $335.0M across 2025A–2030E |
| `Transaction Revenue` was a placeholder | Populated, $98.0M → $127.0M |
| Both take-rate rows were placeholders, hiding a real assumption | Exchange 17.7 → 28.5 → 24.0 bps; prediction 0 → 33.6 → 28.1 bps, both explicit |
| `Prediction % of Sales` was a placeholder | Populated, 0% → 2.3% |
| Revenue scenarios had no upside column: the base-year EV cell was empty so every `Ups/Downs` divided by zero | `EV / Sales` now computes for every forecast year (4.40x → 2.29x) |
| EPS/PE table valued Base and Bear at negative EPS × a zero multiple, printing $0.00 and -100% | Table removed entirely |
| Diluted share count was implicit and had to be backed out of NI/EPS | Explicit row: 37.6M (2025A, pre-IPO weighted) → 137M (2030E) |
| Exchange volume was in $B while revenue was in $M, so take rates were off by 1,000x if computed naively | Both in $M consistently; the unit convention is stated in `KEY MODEL RELATIONSHIPS` |
| CAGR columns raised a negative-to-positive EPS ratio to a fractional power | Removed |
| Header said "VALUED 2029" while the scenarios used 2030 estimates | Gone; the model is a clean 2025A–2030E grid |
| No quarterly view, so the forecast could not be checked against a print | New `Q2-26 Bridge vs Consensus` sheet, line by line against consensus |
| Crypto marks unmentioned despite dominating GAAP EPS | Explicit warning on the bridge sheet quantifying the Q1 swing |
| 2023/2024 columns implied history that does not exist | Marked `n/a` throughout with the reason stated (IPO'd 2025) |

The `Sources & Notes` sheet is also new and genuinely good practice. It discloses two
warehouse data-quality bugs that were found and worked around (a 1,000x scale error on Q1
2025 adjusted EBITDA and Q2 2025 D&A), warns that `retail_trading_volume` for Q1 2026 is
mis-tagged and actually total volume, and states the feed coverage windows. That last
disclosure is what let me isolate the July error below.

### Not Fixed

**N1 — the July prediction-volume cell breaks its own column's convention.**

`Prediction Market Comps` Table C reports Gemini volume for days 1–15 of each month. Against
the public one-sided endpoint:

| Month | Public endpoint, one-sided | Table C | Ratio | Basis |
|---|---:|---:|---:|---|
| Mar 2026 | $10.01M | $20.0M | 2.00 | two-sided |
| Apr 2026 | $10.30M | $20.6M | 2.00 | two-sided |
| May 2026 | $22.80M | $45.6M | 2.00 | two-sided |
| Jun 2026 | $18.43M | $36.9M | 2.00 | two-sided |
| **Jul 2026** | **$27.52M** | **$27.2M** | **0.99** | **one-sided** |

Four months at exactly 2.00x, July alone at 0.99x. The July figure is missing its second
leg. Consequences:

| Claim | As reported | Corrected |
|---|---:|---:|
| Jul 1–15 vs Jun 1–15 | **-26%** | **+49.2%** |
| Gemini share of three-venue notional, Jul | **9.29 bps** | **18.80 bps** |

The `Sources & Notes` sheet states the Gemini feed is "current through 15-Jul-2026" while
Kalshi and Polymarket run through 28-Jul — so the *window* is handled correctly and
disclosed. The defect is the doubling, not truncation.

This matters because the conclusion drawn from it is strong: *"share loss into an
accelerating category, not World Cup seasonality."* On corrected numbers Gemini's share
went 20.46 → 18.80 bps, a mild decline, not 20.46 → 9.29. Gemini's own volume **grew 49%**
into that accelerating category rather than falling 26%. There is a real deceleration in the
back half of July — 1.39M/day for Jul 16–28 against 1.89M/day for Jun 16–30, about -26%,
which is probably where the figure came from originally — but July as a whole ran
**1.63M/day**, the highest of any month since launch, against a Q2 average of 1.27M/day.

*Correction to my previous pass:* I attributed the -26% to a half-month window misalignment.
That was the wrong diagnosis. It reproduces exactly from the single-counted July cell
(27.2 / 36.9 − 1 = -26.3%), which is a more specific and more fixable cause.

Note that Table A and Table B are **correct**: the full-quarter share figures (19.8 → 23.0
bps) reconcile exactly against two-sided Q1/Q2 volume of $119.3M/$229.2M over
Kalshi+Polymarket of $60.2B/$99.5B. Only the Table C July cell is wrong.

**N2 — `Net Cash / (Debt)` is one debt line, not net cash.**

The input is -$252.8M, which is the *related-party loans* line ($252.574M) alone. From the
Q1 2026 balance sheet it omits:

| Line | Amount | Effect if included |
|---|---:|---|
| Cash and cash equivalents | $215.6M | reduces net debt |
| Third party loans | $75.3M | increases net debt |
| Funding debt | $140.5M | increases net debt (but is matched by $184.0M of pledged receivables) |
| Lease liabilities | $18.8M | increases net debt |

Total debt across all four lines is **$487.1M**; net of corporate cash, **$271.5M**.
Excluding the matched credit-card book gives **$131.1M**, an EV of **$644.1M** rather than
$765.8M — roughly 16% lower, which flows straight through to every `EV / Sales` figure.

The model does not claim more than it should here: `Sources & Notes` says net cash is "held
flat at -$252.8M across all forecast years on a funding-neutral assumption. FY2025 FCF was
-$220M, so this is the weakest assumption in the model and should be replaced with a full
cash-flow schedule before any liquidity conclusion is drawn." That is the right disclosure.
The remaining issue is that the level is wrong, not just static.

**N3 — the $803M cash claim (from the accompanying note, not the workbook).**

$215.6M cash + $103.7M restricted cash + $483.8M customer custodial funds = $803.1M. But
customer custodial funds are offset by **$483.7M of "custodial funds due to customers"**, and
restricted cash is unavailable by definition. Unencumbered corporate cash is **$215.6M**. An
asset-support argument against a $513M market cap does not survive the correction — and it
directly contradicts the workbook's own positive $765.8M EV. The two cannot coexist.

Relatedly, the note's **$372M of crypto** does not tie to any filed figure: the balance sheet
shows **$272.0M** at 2026-03-31 and $439.6M at 2025-12-31.

**N4 — the volume convention is still undeclared at the top level.**

`Sources & Notes` describes the feed as "$1-face notional" but never says it counts both
legs, and the `Model` sheet row is labelled simply `Prediction Notional`. This is why N1 was
possible at all: with no stated convention, a single-counted cell looks like a decline
rather than a units break, and nothing in the sheet contradicts it. It also
means the 34 bps take rate is half its one-sided equivalent of ~74 bps, which reads very
differently against Kalshi at 102–119 bps — closer to normal than to a structural discount.

**N5 — below consensus on revenue, above it on EPS.**

FY2030 revenue of $335.0M is 15.0% below consensus $394.15M, while FY2030 EPS of -$1.39 is
**$0.39 better** than consensus -$1.775. Better margins on a smaller base is a real call, and
it is not stated. `Sources & Notes` explains the FY2026 gap (all Q3, marked to the July tape)
but not the FY2030 margin divergence.

## Confirmed

**C1 — the spot volume collapse is real, and it is the load-bearing claim.**

| Period | Artemis CEX tape | CoinGecko (independent) |
|---|---:|---:|
| Q2 2026 | $48.4M/day | $37.5M/day |
| Jul 1–28 | $27.9M/day | $23.0M/day |
| Change | **-42%** | **-38.7%** |

Levels differ by source and methodology; direction and magnitude agree. At ~27–28 bps, a
~$2.6B Q3 volume quarter implies roughly **$7.2–7.5M** of Q3 exchange revenue against
**$13.7M** consensus. After N1 removes the prediction-market leg, this is what the Q3 bear
case rests on — and it holds on its own.

**C2 — prediction-market materiality is right.** At 34 bps on $229.2M two-sided notional,
Q2 prediction revenue is ~$0.78M: 1.8% of $43.8M and ~$0.006 of EPS on 126M shares. An
independent one-sided calibration off Q1's reported $444,000 gives $0.858M. Two methods,
same conclusion.

**C3 — the Q2 bridge is internally consistent.** Exchange $4.5B × 28 bps = $12.6M ✓.
Transaction revenue sums to $17.58M ✓. Net revenue plus other revenue reconciles to total
$43.78M ✓. Net loss ex-marks of -$86.22M over 126.0M shares gives -$0.684 ✓. Q1 take rate
of 0.44/119.3 = 36.9 bps against the 37.2 bps shown ✓.

**C4 — the crypto marks warning is correct and important.** Q1 2026's -$101M gross crypto
swing against +$90M on crypto loans payable netted about -$0.09 per share. Consensus
implicitly assumes zero marks. This is the right caveat to lead the scorecard with.

## Recommended Changes, In Priority Order

1. **Fix the July cell in `Prediction Market Comps` Table C** (N1) and restate the two
   conclusions that depend on it. This is the only outstanding item that changes a
   conclusion rather than a number.
2. **Declare the two-sided convention** wherever prediction notional appears (N4), and
   normalise before any cross-venue comparison.
3. **Rebuild `Net Cash / (Debt)`** off the full balance sheet (N2). Every `EV / Sales` figure
   moves ~16%.
4. **Drop the $803M asset-support line** from the note, or restate it as $215.6M (N3).
5. **Reconcile the FY2030 revenue-versus-margin divergence** (N5).

None of these blocks using the model for the Q2 call. Items 1 and 4 do block the Q3
prediction-market bear case as currently written.

## Sources

- Titan daily volume: `https://api.gemini.com/v1/prediction-markets/volume/{date}` · [spec](https://developer.gemini.com/prediction-markets-spec/volume)
- [Titan rulebook v1.8](https://www.cftc.gov/filings/orgrules/rules03252641973.pdf) (Rule 2.17(b)) · [Exhibit L](https://www.cftc.gov/sites/default/files/filings/documents/2025/orgdcmgmniexhibitl250515.pdf) (Core Principle 8)
- [17 CFR 16.01](https://www.law.cornell.edu/cfr/text/17/16.01) — paragraph (e) is the public-availability requirement; 16.02 transaction-level trade data is reported to the CFTC and is **not** published
- [GEMI Q1 2026 10-Q balance sheet](https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R2.htm) · [revenue disaggregation](https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R50.htm)
- [Gemini Predictions fee schedule](https://www.gemini.com/fees/predictions)
- CoinGecko Gemini spot volume: `https://api.coingecko.com/api/v3/exchanges/gemini/volume_chart`
- [Robinhood Q2 2026 results](https://investors.robinhood.com/news-releases)
- Artemis warehouse references: `Sources & Notes` sheet, also rendered in `CONSOLIDATED_MODEL_TABLES.md`
