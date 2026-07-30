# Gemini Titan Prediction-Market Volume Series

> **CURRENT — auto-generated.** Source data leg for the prediction-revenue line in the Q2
> forecast. See `Q2_2026_SCORECARD.md` for the call and `METHODOLOGY.md` for data lineage
> and the one-sided versus two-sided volume convention.

Generated 2026-07-30T01:28:52.679Z. Window 2025-12-01 → 2026-07-29.

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

- Daily: `https://api.gemini.com/v1/prediction-markets/volume/{date}`
- Hourly: `https://api.gemini.com/v1/prediction-markets/volume/{date}/hourly`
- Spec: https://developer.gemini.com/prediction-markets-spec/volume

Volume arrives as a category hierarchy. `["Sports"]` is the parent of
`["Sports","Soccer"]`, so only depth-1 rows are summed for a day total.

## Quarterly Volume

| Quarter | Window | Total volume | Avg/day | Days with data | Coverage |
|---|---|---|---|---|---|
| Q4 2025 | 2025-10-01 → 2025-12-31 | 1,387,082 | 81,593 | 17/31 | 54.8% |
| Q1 2026 | 2026-01-01 → 2026-03-31 | 59,667,196 | 662,969 | 90/90 | 100.0% |
| Q2 2026 | 2026-04-01 → 2026-06-30 | 115,249,040 | 1,266,473 | 91/91 | 100.0% |
| Q3 2026 (partial) | 2026-07-01 → 2026-09-30 | 47,319,508 | 1,631,707 | 29/29 | 100.0% |

Q2 versus Q1 volume: **+93.2%**.

## Implied Take Rate

Reported Q1 2026 prediction revenue was $0.444M. Dividing
that by summed Q1 volume gives an implied revenue per unit of volume of
**7.4413e-3**, applied forward below.

| Quarter | Volume | Coverage | Implied revenue | Annualized run rate |
|---|---|---|---|---|
| Q2 2026 | 115,249,040 | 100.0% | $0.858M | $3.440M |
| Q3 2026 (partial) | 47,319,508 | 100.0% | $0.352M | $4.432M |

Caveats:
- Endpoint volume units are not documented as USD notional or contract count; the calibrated rate absorbs whichever it is.
- Rate assumes fee mix, maker rebates and category mix are stable versus Q1 2026.
- Q1 2026 prediction revenue of $0.444M is a small base, so the derived rate carries wide error bars.
- Missing days are excluded from sums rather than zero-filled, so quarter totals with coverage below 1.0 understate true volume.

### Units Cross-Check

The endpoint does not document whether `volume` is a contract count or USD
notional. Gemini's published fee schedule is `Fee = Rate * Contracts * Price * (1 - Price)`, with a
taker rate of 0.07 and a maker rate of 0.0175 and no settlement fees.

- Read as **contract count**, the implied rate of $0.00744 per contract sits between the all-maker ceiling of $0.00438 and the all-taker ceiling of $0.01750 (both evaluated at a $0.50 contract price, where the fee formula peaks). Consistent: implied rate sits between the all-maker and all-taker ceilings, as a mixed book should.
- Read as **USD notional**, the same figure is 0.744% of notional, against a taker ceiling of 3.5% at mid price. Also arithmetically possible, so the fee schedule alone does not settle the units.

Unresolved from public documentation. The contract-count reading fits a mixed maker/taker book more naturally, but both survive the fee-envelope test. The calibrated rate is invariant to which is true because it is derived from and applied to the same series; only the physical interpretation of the volume number changes.

## Q2 2026 Category Mix

| Category | Volume | Share |
|---|---|---|
| Crypto | 64,005,495 | 55.5% |
| Sports | 48,737,941 | 42.3% |
| Politics | 799,542 | 0.7% |
| Economics | 481,176 | 0.4% |
| Business | 466,664 | 0.4% |
| Commodities | 329,090 | 0.3% |
| Weather | 203,169 | 0.2% |
| Culture | 139,192 | 0.1% |

## Last 14 Days With Data

| Date | Volume | Largest category |
|---|---|---|
| 2026-07-16 | 955,231 | Crypto (606,010) |
| 2026-07-17 | 1,058,100 | Crypto (643,555) |
| 2026-07-18 | 1,887,436 | Sports (1,232,718) |
| 2026-07-19 | 2,672,152 | Sports (1,746,925) |
| 2026-07-20 | 1,357,613 | Crypto (1,137,187) |
| 2026-07-21 | 962,099 | Crypto (656,705) |
| 2026-07-22 | 1,057,934 | Crypto (536,173) |
| 2026-07-23 | 854,181 | Crypto (558,715) |
| 2026-07-24 | 1,097,351 | Crypto (789,921) |
| 2026-07-25 | 1,160,194 | Crypto (796,376) |
| 2026-07-26 | 2,501,903 | Crypto (2,016,993) |
| 2026-07-27 | 1,400,670 | Crypto (1,177,692) |
| 2026-07-28 | 1,162,405 | Crypto (818,241) |
| 2026-07-29 | 1,672,978 | Crypto (1,122,676) |

## Interpretation Rules

- Volume is contract turnover on Titan, not Gemini spot exchange volume. Do not add the two.
- Missing days are reported as missing and excluded from sums, never zero-filled.
- The implied take rate is derived from one reported quarter off a $0.444M base. Treat it as an order-of-magnitude check on prediction revenue, not a precise estimate.
- Category mix matters for revenue because maker rebates and fee tiers differ by product; a sports-heavy mix is not revenue-equivalent to the same volume in crypto or politics contracts.

## Sources

- dailyVolumeEndpoint: https://api.gemini.com/v1/prediction-markets/volume/{date}
- hourlyVolumeEndpoint: https://api.gemini.com/v1/prediction-markets/volume/{date}/hourly
- apiSpec: https://developer.gemini.com/prediction-markets-spec/volume
- titanRulebook: https://www.cftc.gov/filings/orgrules/rules03252641973.pdf
- titanExhibitL: https://www.cftc.gov/sites/default/files/filings/documents/2025/orgdcmgmniexhibitl250515.pdf
- cftc1601: https://www.ecfr.gov/current/title-17/chapter-I/part-16/section-16.01
- predictionFees: https://www.gemini.com/fees/predictions
- q1Release: https://investors.gemini.com/news-releases/news-release-details/gemini-reports-first-quarter-2026-results-and-announces-100
- Q1 2026 reported prediction revenue: Gemini Q1 2026 10-Q revenue disaggregation (R50) and https://investors.gemini.com/news-releases/news-release-details/gemini-reports-first-quarter-2026-results-and-announces-100
