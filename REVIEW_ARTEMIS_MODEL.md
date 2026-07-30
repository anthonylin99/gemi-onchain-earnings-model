# Review — Artemis GEMI Consolidated Model

Independent verification, 2026-07-29, against Gemini Titan's published volume series, GEMI's
Q1 2026 10-Q balance sheet, Robinhood's Q2 2026 print, and a CoinGecko spot series.

- **Model:** `gemi_consolidated_model_2025a_2030e.xlsx` — 4 sheets: `Model` (2025A–2030E), `Q2-26 Bridge vs Consensus`, `Prediction Market Comps`, `Sources & Notes`
- **Plain-text render:** `CONSOLIDATED_MODEL_TABLES.md` (read this if you have no spreadsheet program)
- **The call:** `Q2_2026_SCORECARD.md` and `data/q2_2026_prediction.json`

## Bottom Line

**Safe to use for the Q2 call.** The Q2 bridge is arithmetically airtight — all twelve lines
tie, and every subtotal reconciles from its components. The load-bearing Q3 claim verifies
against an independent source.

**Two things to correct before quoting anything else from it.** One is an arithmetic error in
a single cell that inverts a conclusion; the other makes every valuation multiple in the model
roughly 16% too high. Neither touches the Q2 forecast.

## Verified Sound

**V1 — the Q2 bridge is internally consistent.** Every subtotal recomputes from its parts:

| Check | Recomputed | Stated |
|---|---:|---:|
| exchange + OTC + prediction + other | $17.58M | $17.58M |
| transaction + service + interest | $42.08M | $42.08M |
| net revenue + other revenue | $43.78M | $43.78M |
| revenue − opex | -$80.22M | -$80.22M |
| operating income + non-operating | -$86.22M | -$86.22M |
| net loss / diluted shares | -$0.684 | -$0.68 |
| prediction revenue / notional | 34.0 bps | 34 bps |
| exchange: $4.5B × 28 bps | $12.60M | $12.60M |

**V2 — the spot volume collapse is real, and it is the load-bearing claim.**

| Period | Artemis CEX tape | CoinGecko (independent) |
|---|---:|---:|
| Q2 2026 | $48.4M/day | $37.5M/day |
| Jul 1–28 | $27.9M/day | $23.0M/day |
| Change | **-42%** | **-38.7%** |

Levels differ by source and methodology; direction and magnitude agree. At ~27–28 bps a
~$2.6B Q3 volume quarter implies roughly **$7.2–7.5M** of Q3 exchange revenue against
**$13.7M** consensus. FY2026 modelled Sales of $174.1M sits ~10% below consensus $193.2M, and
`Sources & Notes` correctly attributes the entire gap to Q3.

**V3 — prediction-market materiality is right.** At 34 bps on $229.2M of notional, Q2
prediction revenue is ~$0.78M: 1.8% of $43.8M and ~$0.006 of EPS on 126M shares. An
independent calibration off Q1's reported $444,000 against one-sided published volume gives
$0.858M. Two methods, same conclusion.

**V4 — full-quarter venue share reconciles.** `Prediction Market Comps` Tables A and B check
out: Gemini's 19.8 → 23.0 bps share of three-venue notional recomputes exactly from $119.3M /
$229.2M over Kalshi+Polymarket of $60.2B / $99.5B. Kalshi's take-rate compression from 119.5
to 102.1 bps is the right reason to mark Gemini's rate down from 37.2 to 34 bps.

**V5 — the crypto marks warning is correct and belongs where it is.** Q1 2026's -$101M gross
crypto swing against +$90M on crypto loans payable netted about -$0.09 per share. Consensus
implicitly assumes zero marks. GAAP EPS is genuinely unforecastable, and leading the bridge
sheet with that is the right call — it is why the scorecard scores an ex-marks figure.

**V6 — `Sources & Notes` is good practice.** It discloses two warehouse scale errors it worked
around (Q1 2025 adjusted EBITDA stored as -$59,925,000,000 and Q2 2025 D&A as $7,534,000,000,
both 1,000x), flags that `retail_trading_volume` for Q1 2026 is mis-tagged and is actually
total volume, states feed coverage windows, and names net cash as the model's weakest
assumption. That last disclosure is what made C1 below findable.

**V7 — structural hygiene.** 2023 and 2024 are marked `n/a` with the reason stated (IPO'd
2025) rather than implying history that does not exist. Exchange volume and revenue are on
consistent units, and `KEY MODEL RELATIONSHIPS` documents every derivation. Diluted shares are
an explicit row (37.6M in 2025A, a pre-IPO weighted average, rising to 137M by 2030E) instead
of something a reader has to back out of net income and EPS.

## Corrections Required

### C1 — the July cell in `Prediction Market Comps` Table C is single-counted

Table C reports Gemini volume for days 1–15 of each month. Against the public one-sided
endpoint:

| Month | Public endpoint, one-sided | Table C | Ratio | Basis |
|---|---:|---:|---:|---|
| Mar 2026 | $10.01M | $20.0M | 2.00 | two-sided |
| Apr 2026 | $10.30M | $20.6M | 2.00 | two-sided |
| May 2026 | $22.80M | $45.6M | 2.00 | two-sided |
| Jun 2026 | $18.43M | $36.9M | 2.00 | two-sided |
| **Jul 2026** | **$27.52M** | **$27.2M** | **0.99** | **one-sided** |

Four months at exactly 2.00x; July alone at 0.99x. The July figure is missing its second leg.
This is not a window problem — `Sources & Notes` correctly discloses the Gemini feed runs
through 15-Jul while Kalshi and Polymarket run through 28-Jul, so the dates are handled
properly. The defect is the doubling.

That one cell produces both of the conclusions drawn from the table:

| Claim | As reported | Corrected |
|---|---:|---:|
| Jul 1–15 versus Jun 1–15 | **-26%** | **+49.2%** |
| Gemini share of three-venue notional, Jul | **9.29 bps** | **18.80 bps** |

The stated conclusion is *"share loss into an accelerating category, not World Cup
seasonality."* On corrected numbers Gemini's share went 20.46 → 18.80 bps, a mild drift, and
Gemini's own volume **grew 49%** into that accelerating category rather than falling 26%.

There *is* a genuine deceleration in the back half of July — 1.39M/day for Jul 16–28 against
1.89M/day for Jun 16–30, about -26%, which is likely where the figure originated — but July as
a whole ran **1.63M/day**, the highest of any month since launch, against a Q2 average of
1.27M/day. "Late July decelerating from a record first half" is both defensible and more
informative than a first-half decline that did not happen.

**Fix:** double the July cell to $55.0M, restate the two conclusions above, and label the
convention (see C3).

### C2 — `Net Cash / (Debt)` is one debt line, so every multiple is ~16% too high

The input is -$252.8M, which is the *related-party loans* line ($252.574M) on its own. From
the Q1 2026 balance sheet it omits:

| Line | Amount | Effect if included |
|---|---:|---|
| Cash and cash equivalents | $215.6M | reduces net debt |
| Third party loans | $75.3M | increases net debt |
| Funding debt | $140.5M | increases net debt, but is matched by $184.0M of pledged credit-card receivables |
| Lease liabilities | $18.8M | increases net debt |

Total debt across all four lines is **$487.1M**. Net of corporate cash, **$271.5M**. Excluding
the matched credit-card book — a funding book, not a shareholder claim — net debt is
**$131.1M** and EV is **$644.1M**, not $765.8M.

Because `EV / Sales` is the model's only valuation output, this flows straight through:

| Year | Sales | EV/Sales as shown | Corrected |
|---|---:|---:|---:|
| 2026E | $174.1M | 4.40x | **3.70x** |
| 2027E | $210.3M | 3.64x | **3.06x** |
| 2028E | $250.1M | 3.06x | **2.58x** |
| 2029E | $289.5M | 2.65x | **2.22x** |
| 2030E | $335.0M | 2.29x | **1.92x** |

Anyone quoting "GEMI trades at 4.4x 2026E sales" from this model is quoting a number ~19% too
high. Use the corrected column until the input is rebuilt.

To the model's credit, `Sources & Notes` already says net cash is "held flat at -$252.8M
across all forecast years on a funding-neutral assumption. FY2025 FCF was -$220M, so this is
the weakest assumption in the model and should be replaced with a full cash-flow schedule
before any liquidity conclusion is drawn." The disclosure is right; the level is still wrong.

### C3 — the volume convention is never declared

`Sources & Notes` describes the feed as "$1-face notional" but never says it counts both legs
of a match, and the `Model` sheet row is labelled simply `Prediction Notional`. This is what
made C1 possible: with no stated convention, a single-counted cell looks like a decline rather
than a units break, and nothing in the workbook contradicts it.

It also means the 34 bps take rate is half its one-sided equivalent of ~74 bps, which reads
very differently against Kalshi at 102–119 bps — closer to normal than to a structural
discount. Normalise convention before any cross-venue comparison.

### C4 — FY2030 is below consensus on revenue but above it on EPS

FY2030 revenue of $335.0M is 15.0% below consensus $394.15M, while FY2030 EPS of -$1.39 is
**$0.39 better** than consensus -$1.775. Better margins on a smaller revenue base is a real
call. `Sources & Notes` explains the FY2026 gap (all Q3, marked to the July tape) but not this
one. Either the opex path — declining to $500M while revenue nearly doubles — is too
optimistic, or the revenue path is too conservative.

### C5 — the "$803M of cash" figure (from the accompanying note, not the workbook)

$215.6M cash + $103.7M restricted cash + $483.8M customer custodial funds = $803.1M. But
customer custodial funds are offset by **$483.7M of "custodial funds due to customers"**, and
restricted cash is unavailable by definition. Unencumbered corporate cash is **$215.6M**. An
asset-support argument against a $513M market cap does not survive the correction, and it
contradicts the workbook's own positive EV.

Relatedly, the note's **$372M of crypto** does not tie to any filed figure: the balance sheet
shows **$272.0M** at 2026-03-31 and $439.6M at 2025-12-31.

## Priority

1. **Fix the July cell** (C1) and restate the two conclusions that depend on it. This is the
   only item that changes a conclusion rather than a number.
2. **Use the corrected EV/Sales column** (C2), or rebuild the net cash input off the full
   balance sheet.
3. **Declare the two-sided convention** (C3) wherever prediction notional appears.
4. **Drop the $803M line** from the note, or restate it as $215.6M (C5).
5. **Reconcile the FY2030 revenue-versus-margin divergence** (C4).

None of these blocks the Q2 call. C1 and C5 do block the Q3 prediction-market bear case as
currently written — which is survivable, because after C1 the Q3 case rests on the spot tape
(V2), and that leg holds on its own.

## Sources

- Titan daily volume: `https://api.gemini.com/v1/prediction-markets/volume/{date}` · [spec](https://developer.gemini.com/prediction-markets-spec/volume)
- [Titan rulebook v1.8](https://www.cftc.gov/filings/orgrules/rules03252641973.pdf) (Rule 2.17(b)) · [Exhibit L](https://www.cftc.gov/sites/default/files/filings/documents/2025/orgdcmgmniexhibitl250515.pdf) (Core Principle 8)
- [17 CFR 16.01](https://www.law.cornell.edu/cfr/text/17/16.01) — paragraph (e) is the public-availability requirement; 16.02 transaction-level trade data is reported to the CFTC and is **not** published
- [GEMI Q1 2026 10-Q balance sheet](https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R2.htm) · [revenue disaggregation](https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R50.htm)
- [Gemini Predictions fee schedule](https://www.gemini.com/fees/predictions)
- CoinGecko Gemini spot volume: `https://api.coingecko.com/api/v3/exchanges/gemini/volume_chart`
- [Robinhood Q2 2026 results](https://investors.robinhood.com/news-releases)
- Artemis warehouse references: `Sources & Notes` sheet, also rendered in `CONSOLIDATED_MODEL_TABLES.md`
