# GEMI Q2 2026 Earnings Estimate

> **CORROBORATING — as of 29 July 2026.** One of four independent Q2 estimates, and **not** the published call. The Excel model `gemi_consolidated_model_2025a_2030e.xlsx` is the source of truth: canonical Q2 revenue is **$43.78M** with **$124.0M** of GAAP opex and a **$39.4M / $43.8M / $47.7M** band. This document's $45.0M, $133.0M and wider band are superseded. All four are reconciled line by line in `METHODOLOGY.md`.

Originally 13/14 July 2026. Prediction-revenue line and Robinhood read-across refreshed 29 July 2026.

## Bottom Line

- Q1 operating expenses did include meaningful noisy items, but they were **not simply IPO costs**. The main adjustments are stock-based compensation, restructuring/severance, non-recurring legal costs, and depreciation/amortization.
- Stripping those items makes the business look **less bad**, but not close to profitable. Even on a cleaner adjusted EBITDA-style basis, Q2 likely remains a **large loss quarter** unless revenue materially beats the current proxy work.
- This document's own base case is **$45.0M of revenue**, **$133M of GAAP operating expenses**, and **-$60M of adjusted EBITDA**. The canonical figures are the Excel model's **$43.78M** and **$124M** of GAAP opex; see `Q2_2026_SCORECARD.md`. The gap is $1.2M of revenue, mostly OTC, and $9M of opex.
- The fundamental long case therefore cannot rest on Q2 earnings power alone. It needs prediction-market KPI acceleration, cost-cut evidence, and forward commentary that Q3/Q4 operating leverage is improving.
- Latest refresh, July 29, 2026: still no official GEMI Q2 release. The base case is unchanged at $45.0M, but the prediction-revenue line is no longer an assumption. Titan's daily volume publication, required of it as a CFTC-designated contract market, now gives a full daily series back to December 15, 2025, and Q2 volume of 115.25M contracts against Q1's 59.67M implies $0.858M of Q2 prediction revenue at Q1's realized take rate. That lands where the prior estimate already sat, so the estimate survives contact with the data rather than being revised by it.
- Robinhood's Q2 print on July 29, 2026 is the sharpest read-across so far: event-contract revenue of $156M overtook crypto revenue of $100M for the first time, on 13.6B contracts traded, while crypto notional fell to $40B from $65.8B. Prediction-market economics can inflect violently while crypto spot keeps sliding. GEMI has the same directional setup with roughly two orders of magnitude less prediction volume, which is the whole problem with the bull case: the mix shift is real, the scale is not.

## Official Q1 Baseline

Gemini's official Q1 2026 statement of operations reported:

| Metric | Q1 2026 |
|---|---:|
| Net revenue | $48.578M |
| Other revenue | $1.694M |
| Total revenue | $50.272M |
| Salaries and compensation | $65.428M |
| Technology | $22.090M |
| General and administrative | $21.680M |
| Transaction losses | $11.090M |
| Sales and marketing | $19.071M |
| Transaction processing | $5.101M |
| Total operating expenses | $144.460M |
| Operating loss | -$94.188M |
| Net loss | -$108.978M |
| Adjusted EBITDA | -$59.925M |

Sources: Gemini Q1 2026 earnings release and Q1 2026 10-Q revenue table.

## Opex Normalization

Q1 GAAP opex was **$144.460M**. The items that create the biggest gap between GAAP loss and the cleaner operating run-rate are:

| Adjustment | Q1 2026 | Treatment |
|---|---:|---|
| Stock-based compensation | $24.178M | Strip for adjusted EBITDA, but do not treat as permanently disappearing. Management says SBC will remain significant. |
| Restructuring charges | $7.866M | Strip for adjusted EBITDA. Mostly tied to workforce reduction and international exits. |
| Non-recurring legal/settlement-related costs | $0.424M | Strip for adjusted EBITDA. |
| Depreciation and amortization | $7.482M | Strip for EBITDA view, keep in GAAP operating expense. |

Approximate cleaner cash/EBITDA-style operating expense:

`$144.460M - $24.178M - $7.866M - $0.424M - $7.482M = $104.510M`

This compares with official Q1 adjusted EBITDA of **-$59.925M**, which is broadly consistent after including interest, tax, and other non-GAAP bridge items.

## Were These IPO Costs?

- **Partially, but not cleanly.** SBC stepped up after the IPO and is IPO/public-company-related in the broad sense, but it is also an ongoing compensation cost.
- The more defensible adjustment is to show both **GAAP opex** and **adjusted EBITDA-style opex**.
- I would not market the entire Q1 opex burden as one-time IPO cost. That would overstate the profitability improvement.
- The cleaner message is: Q1 contained noisy post-IPO/SBC/restructuring costs, Q2 should benefit from cost actions, but adjusted losses likely remain substantial.

## Q2 Revenue Bridge

This document's base Q2 revenue estimate is **$45.0M**, modestly below Q1's **$50.3M**. The canonical figure is **$43.78M**.

| Segment | Q1 2026 actual | Q2 base estimate | Rationale |
|---|---:|---:|---|
| Exchange revenue | $17.2M | $13.5M | Gemini API exchange-volume proxy and broader crypto volume proxies declined QoQ. |
| OTC revenue | $6.3M | $5.0M | Q1 benefited from larger institutional trades. Keep some eOTC traction, but do not extrapolate Q1 strength. |
| Prediction revenue | $0.4M | $0.9M | Now bottom-up rather than assumed. Titan's published daily volume shows Q2 contract volume of 115.25M against 59.67M in Q1, up 93.2%. Applying the take rate implied by Q1's $0.444M reported revenue gives $0.858M. The revenue base stays small despite volume nearly doubling. |
| Services and interest | $24.5M | $25.4M | Credit card, advisory, custody, staking, and interest provide diversification; assume modest stability. |
| Other transaction revenue | $0.2M | $0.2M | Small placeholder. |
| Total revenue | $50.3M | $45.0M | Softer spot/OTC more than offsets early prediction growth. |

## Q2 Scenario Estimate

> **The Excel model is the source of truth.** Canonical Q2 2026 figures are revenue
> **$43.78M**, GAAP opex **$124M**, EPS ex-crypto-marks **-$0.68**, scenario band
> **$39.4M / $43.8M / $47.7M** — see `Q2_2026_SCORECARD.md`. The figures in this section come
> from an independent earlier build and are retained as a cross-check only. Where they differ,
> the Excel model governs.


| Scenario | Revenue | GAAP opex | Adjusted opex | GAAP operating loss | Adjusted EBITDA | Net loss before crypto marks |
|---|---:|---:|---:|---:|---:|---:|
| Bear | $37.5M | $132.0M | $105.0M | -$94.5M | -$67.5M | -$106.5M |
| Base | $45.0M | $133.0M | $105.0M | -$88.0M | -$60.0M | -$98.0M |
| Bull | $54.0M | $137.0M | $109.0M | -$83.0M | -$55.0M | -$91.0M |

Notes:

- GAAP opex is assumed to fall from Q1's **$144.5M** because restructuring/severance should fade and some Q1 noise does not repeat.
- GAAP opex does **not** collapse because SBC remains elevated, technology/G&A remain sizable, and credit-card rewards/losses continue to scale with the card business.
- Adjusted opex uses a cleaner cash/EBITDA-style base around **$105M**, consistent with Q1 normalized expense after stripping SBC, restructuring, non-recurring legal, and D&A.
- Adjusted EBITDA is a **company-definition proxy**, not a GAAP substitute. Gemini's official reconciliation excludes stock-based compensation, restructuring charges, D&A, interest, tax, impairment, certain non-recurring legal costs, and other fair-value/noise items.
- Net loss before crypto marks includes a placeholder **$8M to $12M** non-operating burden for interest and other items, excluding crypto mark-to-market volatility.

## On-Chain Cross-Check

- The on-chain address model does not support a hidden Q2 trading-volume acceleration.
- Q2 observed external gross flow was **$255.0M**, down from **$328.9M in Q1**, or roughly **-22.5% QoQ**.
- Q2 had no meaningful priced DEX/router trading proxy.
- Partial Q3 external gross flow is now about **$343.4M**, already above full Q2 modeled external flow, but priced trading proxy remains **$0**. Treat this as a July custody/liquidity activity pickup, not proof of exchange trading revenue.
- Because Gemini spot, OTC, and prediction-market matching are primarily venue-internal, the on-chain address set is a narrow custody/liquidity monitor, not a full revenue tape.

## What Would Change The Estimate

- **Upside:** prediction-market revenue above **$1.5M**, Q2 transaction revenue near or above Q1's **$24.1M**, or management indicating July/August prediction/futures momentum is accelerating materially.
- **Downside:** exchange revenue below **$12M**, OTC below **$4M**, credit-card transaction losses staying elevated, or adjusted EBITDA failing to improve despite restructuring.
- **Key watch item:** management commentary on cost actions flowing through Q2 and whether prediction-market contracts translate into actual revenue, not just headline volume.

## Trade Read

- Stripping Q1 noise makes the model less ugly, but it does not make GEMI a fundamental earnings long by itself.
- The most defensible setup is a **high-risk narrative and operating leverage trade**: investors may look through Q2 losses if prediction markets, DCO/futures optionality, and cost cuts show enough forward momentum.
- If Q2 adjusted EBITDA is still around **-$60M** and prediction revenue remains below **$1M**, the fundamental setup remains weak even if headline revenue is near expectations.

## Sources

- Gemini Q1 2026 earnings release: https://investors.gemini.com/news-releases/news-release-details/gemini-reports-first-quarter-2026-results-and-announces-100
- Gemini Q1 2026 SEC revenue table: https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R50.htm
- Local model outputs: `Q2_PROXY_MODEL.md`, `ONCHAIN_EARNINGS_REPORT.md`, `data/onchain_earnings_model.json`, `data/onchain_dashboard_data.json`
