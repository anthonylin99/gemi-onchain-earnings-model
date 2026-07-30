# Review — Artemis GEMI Simple Model (v1)

Reviewed 2026-07-29 against the Gemini Titan published volume series, GEMI's Q1 2026
10-Q balance sheet, Robinhood's Q2 2026 print, and an independent CoinGecko spot
series.

- **Input reviewed:** `GEMI_simple_model_v1_original.xlsx` (unmodified archive of the file as delivered)
- **Repaired output:** `GEMI_simple_model_v2.xlsx`, plus `SIMPLE_MODEL_V2_TABLES.md` for reading without Excel
- **Builder:** `build_simple_model_v2.py`

## Bottom Line

The thesis is right and the spreadsheet does not support it yet.

The Q3 call — that consensus wants $47.0M of revenue and $13.7M of exchange revenue
while the July tape implies roughly half the exchange number — **checks out against an
independent source** and is the most valuable thing in the analysis. The materiality
argument on prediction markets also checks out: the segment is ~1.8% of revenue and
$0.006 of EPS whichever volume convention you use.

Three things do not hold:

1. **The workbook does not compute.** Sales was placeholder text, so EV/Sales, EBIT,
   EBITDA, Opex % and every growth rate errored out. The revenue scenario table had no
   upside column at all — the model's headline output was missing, which is visible in
   the rendered screenshot.
2. **The "$803M of cash" asset-support argument counts customer money.** $483.8M of the
   $803.1M is customer custodial funds, offset almost exactly by a $483.7M liability.
   Unencumbered corporate cash is $215.6M.
3. **The prediction-market deterioration claim is mislabeled and the share series does
   not reconcile.** "Down 26% in the first half of July" is actually the *second* half
   of July versus the second half of June. Jul 1–15 was **up 49%**, and July ran the
   highest per-day volume since launch.

Point 3 matters because it is the leg of the bear case that is *not* the spot tape. The
spot argument stands on its own; the prediction-market argument as written does not.

## Findings

Severity: **Blocking** = the file does not produce the number it claims. **Material** =
the number computes but the conclusion drawn from it does not hold. **Confirmed** =
checked against an independent source and stands.

### Blocking

**B1 — `Sales` was placeholder text, breaking most of the model.**
`Model!B18:I18` held the string `—`. Everything referencing it errored: `EV / Sales`
(`L7:S7`), `Opex %`, `EBIT`, `EBIT %`, `EBITDA`, `EBITDA ex SBC`, `Sales Y/Y`, and all
CAGRs. `Transaction revenue` (row 15), both take-rate rows (5 and 7) and
`Prediction % of Sales` (row 20) were placeholders too.
*Fixed in v2:* real formulas throughout. Sales ties to $179.6M for FY2025 and $335.0M
for 2030, matching the scenario inputs.

**B2 — the revenue scenario table had no upside column.**
`Market Cap` and `Net Cash` were populated only for 2026–2030 (columns O–S), leaving the
base-year EV cell `N6` empty. Every `Ups/Downs` formula (`=(N35/N6)-1`) divided by zero.
This is why the screenshot's revenue table stops at "Implied EV" while the EPS table has
an "Ups/Downs" column — the most important output of the model was silently absent.
*Fixed in v2:* scenarios reference an explicit selected-EV cell.

**B3 — the EPS / PE scenario table is analytically void.**
As rendered:

| Scenario | EPS | P/E | Implied Share Price | Ups/Downs |
|---|---:|---:|---:|---:|
| Bull | $0.20 | 35.0x | $7.00 | +72.2% |
| Base | -$1.39 | 0.0x | $0.00 | -100.0% |
| Bear | -$2.60 | 0.0x | $0.00 | -100.0% |

Base and Bear report -100% because a negative EPS was multiplied by a zero multiple. A
PE cannot value negative earnings, and a company holding $456.1M of book equity and
$215.6M of corporate cash is not worth zero. The Bull row is a PE on the first
profitable year with no discounting.
*Fixed in v2:* removed. Equity value comes off EV/Sales, floored at tangible book per
share ($2.55).

**B4 — `Net Cash` is one debt line, not net cash.**
The input was `-252.8`, which is the *related-party loans* line ($252.574M) on its own.
It nets no cash and omits third-party loans ($75.3M), funding debt ($140.5M) and lease
liabilities ($18.8M). It lands near a defensible net-debt figure by coincidence.
*Fixed in v2:* new `EV Bridge` sheet with four variants off the filed balance sheet.

| # | Definition | Net debt | EV |
|---|---|---:|---:|
| 1 | v1 as delivered: cap + related-party loans only | $252.6M | $765.6M |
| 2 | cap + all debt − corporate cash | $271.5M | $784.5M |
| 3 | variant 2, excluding the matched credit-card book **(selected)** | $131.1M | **$644.1M** |
| 4 | variant 3, also crediting crypto assets held | -$140.9M | $372.1M |

Variant 3 drops funding debt ($140.5M) together with the credit card receivables pledged
against it ($184.0M), since a matched funding book is not a shareholder claim. Variant 4
is the most generous and risks double counting, because the crypto assets are partly
financed by the very loan lines still being counted as debt.

### Material

**M1 — the $803M cash figure counts customer money.**
$215.6M cash + $103.7M restricted cash + $483.8M customer custodial funds = $803.1M. But
customer custodial funds are offset by **$483.7M of "custodial funds due to customers"**,
and restricted cash is unavailable by definition. Unencumbered corporate cash is
**$215.6M**. An asset-support argument against a $513M market cap does not survive this
correction — which also means the "$803M cash + $372M crypto vs $513M cap" framing and
the model's own $766M positive EV are **mutually contradictory**. They cannot both be in
the same analysis.

**M2 — the July prediction-volume claim is the wrong window.**
Titan's published one-sided daily volume, per day:

| Window | Per day | Days |
|---|---:|---:|
| Q2 2026 average | 1,266,473 | 91 |
| Jun 1–15 | 1,228,638 | 15 |
| Jun 16–30 | 1,890,727 | 15 |
| Jul 1–15 | 1,834,617 | 15 |
| Jul 16–28 | 1,394,405 | 13 |

| Comparison | Change |
|---|---:|
| Jul 1–15 vs Jun 1–15 | **+49.3%** |
| Jul 1–15 vs Jun 16–30 | -3.0% |
| Jul 1–15 vs Q2 average | **+44.9%** |
| Jul 16–28 vs Jul 1–15 | -24.0% |
| Jul 16–28 vs Jun 16–30 | **-26.3%** ← matches the quoted -26% |

The -26% reconciles exactly to **Jul 16–28 versus Jun 16–30**, the back half of each
month. The first half of July was up 49% year-on-month and up 45% on the Q2 average, and
July as a whole (1.63M/day) is the strongest month since launch. There *is* a genuine
late-July deceleration worth tracking, but it is the second half of the month and the
level is still above the Q2 average, not below it. As written the claim inverts the sign
of the first-half comparison.

**M3 — the bps share series cannot be reconciled.**
The note quotes Gemini's share of three-venue notional at 36.35 / 20.46 / 9.29 bps for
days 1–15 of May / June / July. Holding those shares against actual Gemini volume implies
the three-venue denominator went $12.5B → $18.0B → $59.2B, a **4.7x increase in two
months** — against the note's own statement that Kalshi and Polymarket combined grew 63%.
Those two claims cannot both be true. The likeliest cause is a truncated July window on
the Gemini numerator, which would depress both the volume figure in M2 and the share
figure here from the same root cause. **The share-loss conclusion should not be used
until this is rebuilt.** Note the direction of the argument may well survive a rebuild;
the current numbers just don't support it.

**M4 — the volume convention is undeclared, and it is two-sided.**
The warehouse series is **exactly 2.0000x** the public endpoint:

| Window | Public endpoint (one-sided) | Artemis warehouse | Ratio |
|---|---:|---:|---:|
| 2025-12-15 to 2025-12-31 | 1,387,082 | 2,774,094 | 2.0000 |
| Q1 2026 | 59,667,196 | 119,336,290 | 2.0000 |
| Q2 2026 | 115,249,040 | 229,207,575 | 1.9888 |

The December window contains a single category row and no subcategory children, yet the
ratio is still exactly 2.00x — which **rules out hierarchy double counting** and points
to a two-sided convention counting both legs of each match. This is a convention
difference, not an error.

It does not change revenue: calibrating and applying the take rate on the same basis
gives the same answer either way ($0.853M two-sided at 37.2 bps versus $0.858M one-sided
at 74.4 bps for Q2). It *does* change cross-venue comparisons. The quoted 34 bps is half
the one-sided equivalent of ~74 bps, which reads very differently against Kalshi at
102–119 bps — closer to normal than to a structural discount. Any venue comparison has to
normalise convention first, and this is a second reason M3 needs a rebuild.

**M5 — below consensus on revenue, above it on EPS.**

| Metric | Model | Consensus | Gap |
|---|---:|---:|---:|
| FY2026 revenue | $174.1M | $193.18M | -$19.1M |
| FY2026 EPS | -$2.97 | -$2.897 | -$0.07 |
| FY2030 revenue | $335.0M | $394.15M | -$59.2M |
| FY2030 EPS | -$1.39 | -$1.775 | **+$0.39** |

FY2030 revenue is 15.0% below consensus while EPS is $0.39 *better*. That requires
materially better margins than the street assumes on a smaller base, and the file never
states it. Either the opex path (declining to $500M while revenue nearly doubles) is too
optimistic, or the revenue path is too conservative. Worth resolving, because the
EV/Sales scenarios key off the revenue line while the equity story keys off the earnings
line.

### Minor

**m1 — $372M of crypto does not tie to the filings.** The last filed balance sheet shows
**$272.0M** of crypto assets held at 2026-03-31 and $439.6M at 2025-12-31. Neither is
$372M. Treat as unverified until the Q2 10-Q.

**m2 — take-rate rows were hidden.** With both rows as `—`, a real assumption was
invisible: exchange take rate steps from 17.7 bps (FY2025) to 28.5 bps (FY2026), then
decays to 24.0 bps by 2030. The FY2026 step is **supported** by Q1 2026 actuals
($17.172M on $6.3B = 27.3 bps); the FY2025 blend was lower because institutional volume
dominated. Defensible, but it should be on the page.

**m3 — CAGR formulas are undefined.** The EPS CAGR raises the ratio of 2030 EPS to FY2025
EPS to a fractional power across a sign change (`(0.20/-15.52)^(1/5)`), and the revenue
CAGR divided by the broken Sales row. Removed in v2 — FY2025 EPS reflects a pre-IPO
37.6M weighted share count against ~126M today, so per-share growth off 2025 is
meaningless regardless.

**m4 — "20k traders, 50% holding the Gemini card" is unsourced.** Not in the Sources tab
and not verifiable from public data.

**m5 — header says "VALUED 2029" but the scenarios use 2030 estimates**, and the CAGR
columns discount from 2025. Pick one convention.

### Confirmed

**C1 — the spot volume collapse is real.** Independent CoinGecko series:

| Period | Artemis | CoinGecko (independent) |
|---|---:|---:|
| Q2 2026 | $48.4M/day | $37.5M/day |
| Jul 1–28 | $27.9M/day | $23.0M/day |
| Change | **-42%** | **-38.7%** |

Absolute levels differ by source and methodology; direction and magnitude agree. At a
27 bps take rate, a ~$2.6B Q3 volume quarter gives roughly **$7.2M** of exchange revenue
against consensus $13.7M. The gap is real and large. This is the strongest part of the
analysis and it does not depend on any of the disputed prediction-market numbers.

**C2 — prediction-market materiality is right.** At 34 bps on $229.2M of two-sided
notional, Q2 prediction revenue is ~$0.78M: 1.8% of a $43.8M revenue estimate and
~$0.006 of EPS on 126.2M shares. Independent one-sided calibration off Q1's reported
$0.444M gives $0.858M. Two methods, same conclusion — immaterial to Q2. The "triple it
and you move EPS two cents" framing is fair (3x takes the total contribution to ~$0.019).

**C3 — the Robinhood read-across is directionally apt.** Reported 2026-07-29:
event-contract revenue of $156M overtook crypto revenue of $100M for the first time on
13.6B contracts, while crypto notional fell to $40B from $65.8B. Prediction economics can
inflect hard while crypto spot deteriorates. GEMI has the same directional setup roughly
two orders of magnitude smaller, which is precisely why the mix shift is real and the
scale is not.

## Recommended Changes, in Priority Order

1. **Rebuild the bps share series** (M3, M4). Put all three venues on one convention,
   verify the July window is complete, then re-derive. This is the only finding that
   changes a conclusion rather than a number.
2. **Drop the $803M asset-support line** (M1), or restate it as $215.6M of corporate cash.
   As written it contradicts the model's own positive EV.
3. **Relabel the July prediction comparison** (M2). "Late July decelerating from a record
   first half" is both defensible and more interesting than a false first-half decline.
4. **Reconcile the revenue-versus-margin inconsistency** (M5) before quoting FY2030
   scenarios.
5. **Use v2 for any valuation output** (B1–B4). The v1 revenue scenarios produce no
   upside figure at all.

## What the Repaired Scenarios Say

Selected EV of $644.1M, equity floored at tangible book of $2.55/share, against the
$4.065 close:

| Scenario | 2030 revenue | EV/Sales | Implied EV | Implied equity | Implied price | Upside |
|---|---:|---:|---:|---:|---:|---:|
| Bull | $470M | 5.0x | $2,350M | $2,218.9M | $17.58 | **+332.5%** |
| Base | $335M | 3.0x | $1,005M | $873.9M | $6.93 | **+70.4%** |
| Bear | $210M | 1.75x | $367.5M | $236.4M | $2.55 | **-37.3%** |

Bear is floored at tangible book; the raw EV/Sales output was $1.87/share. Note this is a
wide, undiscounted 2030 payoff on a business the same model has losing $190M in 2030 —
the scenarios are a sizing exercise, not a target price. The conclusion in the note
("wait for the guide, or for August dailies to turn") is not changed by any of this.

## Sources

- Titan daily volume: `https://api.gemini.com/v1/prediction-markets/volume/{date}` · [spec](https://developer.gemini.com/prediction-markets-spec/volume)
- [Titan rulebook v1.8](https://www.cftc.gov/filings/orgrules/rules03252641973.pdf) (Rule 2.17(b)) · [Exhibit L](https://www.cftc.gov/sites/default/files/filings/documents/2025/orgdcmgmniexhibitl250515.pdf) (Core Principle 8)
- [17 CFR 16.01](https://www.law.cornell.edu/cfr/text/17/16.01) — paragraph (e) is the public-availability requirement; 16.02 trade data is not published
- [GEMI Q1 2026 10-Q balance sheet](https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R2.htm) · [revenue disaggregation](https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R50.htm)
- [Gemini Predictions fee schedule](https://www.gemini.com/fees/predictions)
- CoinGecko Gemini spot volume: `https://api.coingecko.com/api/v3/exchanges/gemini/volume_chart`
- [Robinhood Q2 2026 results](https://investors.robinhood.com/news-releases)
- Full source list including the v1 warehouse references: `Sources` sheet of `GEMI_simple_model_v2.xlsx`, also rendered in `SIMPLE_MODEL_V2_TABLES.md`
