# Review — GEMI Annual Model (updated 30 July 2026)

Independent verification against Gemini Titan's published volume series, GEMI's Q1 2026 10-Q
balance sheet, Robinhood's and Coinbase's Q2 2026 prints, and a CoinGecko spot series.

- **Annual model:** `GEMI_simple_model_2026-07-30.xlsx` — sheets `Model` (2025A–2030E) and `Sources`. Source of truth for every annual and valuation figure.
- **Q2 quarterly bridge:** `gemi_consolidated_model_2025a_2030e.xlsx`, sheet `Q2-26 Bridge vs Consensus`. Still the source of the locked Q2 call; the annual model has no quarterly view.
- **Plain-text renders:** `ANNUAL_MODEL_TABLES.md`, `CONSOLIDATED_MODEL_TABLES.md`
- **The call:** `Q2_2026_SCORECARD.md`, `data/q2_2026_prediction.json`

## Bottom Line

**Eight of the twelve defects from the previous review are fixed.** The model now computes:
Sales, transaction revenue, both take rates, prediction % of sales and EV/Sales all resolve
where they previously returned errors or held placeholder text. Diluted shares are an explicit
row. Exchange volume and revenue are on consistent units. The prediction-market comps sheet,
which contained the single worst error in the previous version, has been removed entirely.

**Four defects persist and one is new.** The most consequential is unchanged: the July
prediction-volume figure is still counted on a different basis from the month it is compared
against, which flips the sign of the conclusion.

**The Q2 2026 call is unaffected and unchanged at $43.78M / -$0.68.** Nothing in the new data
touches a quarter that ended 30 June. What changed is the forward view, which was cut
materially, and the competitive picture, which got considerably worse.

## What The New Data Says

The update folds in Robinhood's and Coinbase's Q2 prints and extends the spot tape through
29 July. Three things fall out, and two of them are new.

**1. The July collapse is market-wide, not GEMI-specific.**

| Venue | Q2 2026 | July 2026 | Change |
|---|---:|---:|---:|
| Gemini spot | $48.4M/day | $28.7M/day | **-40.7%** |
| Coinbase spot | $1,577M/day | $1,040M/day | **-34.1%** |

Coinbase corroborates from the other side: total market spot volume fell 25% in Q2 while
Coinbase's own share rose to 10.3%, an all-time high, from 9.1%. So GEMI's July problem is
roughly 34 points of beta and about **6.7 points of idiosyncratic underperformance**. That is
a real but much narrower claim than "GEMI is losing share," and it is the honest version.

**2. GEMI is being lapped in prediction markets, badly.**

| Venue | Q2 2026 prediction/event revenue | Trajectory |
|---|---:|---|
| Robinhood | **$156M** | +50% QoQ, 13.6B contracts |
| Coinbase | **>$100M annualised** | +106% QoQ |
| Gemini | **~$0.78M** | +92% QoQ on notional |

GEMI's *entire modelled FY2026* prediction revenue of **$2.4M** is about 2.4% of Coinbase's
annualised run rate and roughly a week and a half of Robinhood's quarterly event revenue. The
growth rate is comparable; the scale is not remotely. This is the sharpest single insight in
the update and it argues against prediction markets rescuing the equity story on any horizon
the model covers.

**3. Consensus Q3 is now explicitly in the sources and the model implies a large miss.**

Consensus Q3 2026 revenue is **$46.99M**. The model's FY2026 Sales of $173.6M, less Q1 actual
$50.27M and the Q2 call of $43.78M, leaves **$79.55M for H2**, roughly **$39.8M per quarter**
— about **$7.2M** below consensus for Q3 alone. On exchange revenue specifically, July's
$28.7M/day annualised over a 92-day quarter at the model's 28.5 bps take rate gives about
**$7.5M**, against roughly $13.7M implied by consensus. The gap is real and it is the reason
to care about this name in August.

## Forward Estimates Were Cut

| Line | Previous (29 Jul) | Updated (30 Jul) | Change |
|---|---:|---:|---:|
| FY2026 Sales | $174.1M | $173.6M | -0.3% |
| FY2027 Sales | $210.3M | $198.5M | -5.6% |
| FY2028 Sales | $250.1M | $232.4M | -7.1% |
| FY2029 Sales | $289.5M | $268.5M | -7.3% |
| FY2030 Sales | $335.0M | $310.8M | **-7.2%** |
| FY2030 exchange volume | $38.0B | $33.0B | -13.2% |
| FY2030 prediction notional | $2,700M | $2,000M | **-25.9%** |
| FY2030 EPS | -$1.39 | -$1.47 | -$0.08 |
| Bull 2030 revenue @ multiple | $470M @ 5.0x | $430M @ 4.5x | both cut |
| Base 2030 revenue | $335M @ 3.0x | $311M @ 3.0x | -7.2% |
| Bear 2030 revenue | $210M @ 1.75x | $200M @ 1.75x | -4.8% |

The prediction-notional cut is the largest and is consistent with finding 2 above: the
previous path implicitly assumed GEMI would keep pace in a category where Coinbase and
Robinhood are compounding far faster off a base hundreds of times larger.

Note the base scenario ties exactly to the model: 2030 Sales of $310.8M against a base
scenario value of $311M. That internal consistency was present before and is preserved.

## Fixed Since The Last Review

| Was broken | Now |
|---|---|
| `Sales` held placeholder text, so every downstream cell errored | Computes: $179.57M (2025A) → $310.80M (2030E) |
| `Transaction Revenue` was a placeholder | Computes: $98.02M → $112.80M |
| Both take-rate rows were placeholders, hiding a real assumption | Compute in bps. Exchange 17.7 → 28.5 → 24.0; prediction 0 → 32.6 → 27.0 |
| `Prediction % of Sales` was a placeholder | Computes: 0% → 1.7% |
| `EV / Sales` errored | Computes: 4.41x (2026E) → 2.46x (2030E) |
| Diluted shares had to be backed out of net income and EPS | Explicit row: 37.55M (2025A, pre-IPO weighted) → 137M (2030E) |
| Exchange volume in $B against revenue in $M | Both in $M; take-rate formula is unit-correct |
| Revenue CAGR divided by the broken Sales row | Computes: bull 19.1%, base 11.6%, bear 2.2% |
| Prediction-market comps sheet carried a mis-counted share series | Sheet removed |

## Defects That Persist

### D1 — the July prediction figure is counted on a different basis from the month it is compared against

`Sources` row 6 states: *"July 1-15 27,212,006 ($1.94M/day vs June $3.08M/day)."*

The public Gemini Titan endpoint gives **27,519,261** for 1–15 July on a one-sided basis. The
model's 27,212,006 is within 1.1% of that, so it is the **one-sided** figure. But the June
comparator of $3.08M/day is **two-sided** — it matches full-June two-sided volume of
$3.12M/day, and every earlier month in this series has been two-sided at exactly 2.00x the
public endpoint.

Comparing a one-sided July against a two-sided June halves the July number before the
comparison is made:

| | As stated | Like-for-like |
|---|---:|---:|
| July 1–15 | $1.94M/day | **$3.67M/day** |
| June | $3.08M/day | $3.12M/day |
| Change | **-37%** | **+17.6%** |

July prediction volume **rose**. It did not fall 37%. This is the same defect flagged in the
previous review, surviving into the new file in a different location — previously a cell in
the comps sheet, now a line in `Sources`. It is the only finding here that changes a
conclusion rather than a number.

The genuine observation underneath is that July's *rate of increase* slowed against a very
strong June second half. That is worth saying. "Down 37%" is not.

### D2 — `Net Cash` is one debt line, so every valuation multiple is ~16% too high

Unchanged at **-$252.8M**, which is the related-party loans line alone. From the Q1 2026
balance sheet it omits $215.6M of cash, $75.3M of third-party loans, $140.5M of funding debt
and $18.8M of lease liabilities. Total debt is $487.1M; net of corporate cash, $271.5M;
excluding the matched credit-card funding book, **$131.1M**. EV is **$644.1M**, not $765.8M.

| Year | Sales | EV/Sales as shown | Corrected |
|---|---:|---:|---:|
| 2026E | $173.6M | 4.41x | **3.71x** |
| 2027E | $198.5M | 3.86x | **3.24x** |
| 2028E | $232.4M | 3.30x | **2.77x** |
| 2029E | $268.5M | 2.85x | **2.40x** |
| 2030E | $310.8M | 2.46x | **2.07x** |

Use the corrected column.

### D3 — the revenue scenarios still cannot compute upside

`Ups/Downs` is `=(N36/N6)-1`, where `N6` is the 2025 EV cell. Market Cap and Net Cash are
populated only for 2026–2030 (columns O–S), so `N6` evaluates to zero and all three rows
return **`#DIV/0!`**. The headline output of the valuation block is still missing.

Computed manually against the model's own EV of $765.8M, and against the corrected $644.1M:

| Scenario | 2030 revenue | Multiple | Implied EV | Upside (model EV) | Upside (corrected EV) |
|---|---:|---:|---:|---:|---:|
| Bull | $430M | 4.5x | $1,935M | +152.7% | **+200.4%** |
| Base | $311M | 3.0x | $933M | +21.8% | **+44.9%** |
| Bear | $200M | 1.75x | $350M | -54.3% | **-45.7%** |

**Fix:** populate Market Cap and Net Cash in column N, or point the formula at a dedicated
current-EV cell.

### D4 — the EPS / PE scenario table remains analytically void

| Scenario | 2030 EPS | PE | Implied price | Stated return |
|---|---:|---:|---:|---:|
| Bull | $0.25 | 35.0x | $8.75 | +115.3% |
| Base | -$1.47 | 0.0x | **$0.00** | **-100%** |
| Bear | -$2.75 | 0.0x | **$0.00** | **-100%** |

A PE multiple cannot value negative earnings. Reporting -100% for both base and bear says the
equity is worthless in the model's own central case, for a company carrying $456.1M of book
equity and $215.6M of corporate cash. The EPS CAGR column compounds the problem: it computes a
growth rate across a sign change from -$15.52 to -$1.47, which is not a meaningful quantity.

**Fix:** delete the table. Value off EV/Sales with a tangible-book floor ($2.55/share) while
the company is loss-making.

### D5 — new: the 2023 and 2024 columns display a wall of `#DIV/0!`

Every ratio row — both take rates, Sales Y/Y, Prediction % of Sales, Opex %, Operating Margin,
EV/Sales — returns `#DIV/0!` in columns B and C because GEMI has no pre-IPO annual data. The
previous consolidated model handled this by marking those cells `n/a`.

This is cosmetic in that no downstream number depends on it, but a sheet that opens on visible
errors reads as unfinished. **Fix:** wrap the ratio rows in `IFERROR(..., "n/a")`, or drop the
two columns.

## Confirmed Sound

- **Take rates are internally consistent and defensible.** Exchange steps from 17.7 bps in
  FY2025 to 28.5 bps in FY2026, then decays to 24.0 bps by 2030. The step is supported by Q1
  2026 actuals ($17.172M on $6.3B = 27.3 bps); the FY2025 blend was lower because institutional
  volume dominated.
- **Sales ties to the scenario table.** 2030 Sales of $310.8M against a base scenario input of
  $311M.
- **The revenue build recomputes.** Transaction revenue sums from its four components in every
  year; Sales sums from transaction, service and other income in every year.
- **The spot tape is corroborated.** An independent CoinGecko series gives Gemini July at
  -38.7% against the warehouse tape's -40.7%; different levels, same direction and magnitude.
- **The HOOD and COIN figures check out** against both companies' reported Q2 releases.

## Priority

1. **Fix D1** and restate the July prediction comparison. Only item that changes a conclusion.
2. **Use the corrected EV/Sales column** (D2), or rebuild the net cash input.
3. **Populate the 2025 EV cell** so the revenue scenarios produce upside (D3).
4. **Delete the EPS/PE table** (D4).
5. **Suppress the `#DIV/0!` columns** (D5).

None of these blocks the Q2 call, which comes from a different workbook and a different
period.

## Sources

- Titan daily volume: `https://api.gemini.com/v1/prediction-markets/volume/{date}` · [spec](https://developer.gemini.com/prediction-markets-spec/volume)
- [Titan rulebook v1.8](https://www.cftc.gov/filings/orgrules/rules03252641973.pdf) (Rule 2.17(b)) · [Exhibit L](https://www.cftc.gov/sites/default/files/filings/documents/2025/orgdcmgmniexhibitl250515.pdf) (Core Principle 8)
- [17 CFR 16.01](https://www.law.cornell.edu/cfr/text/17/16.01) — paragraph (e) is the public-availability requirement; 16.02 transaction-level trade data is reported to the CFTC and is **not** published
- [GEMI Q1 2026 10-Q balance sheet](https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R2.htm) · [revenue disaggregation](https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R50.htm)
- [Coinbase Q2 2026 results](https://investor.coinbase.com/news/news-details/2026/Coinbase-Q2-Earnings-Everything-Exchange-Drives-3rd-Consecutive-Quarter-of-Record-Crypto-Trading-Volume-Market-Share-Revenue-Diversification-and-Resilience/default.aspx)
- [Robinhood Q2 2026 results](https://investors.robinhood.com/news-releases)
- CoinGecko Gemini spot volume: `https://api.coingecko.com/api/v3/exchanges/gemini/volume_chart`
- Warehouse references: `Sources` sheet of the annual model, rendered in `ANNUAL_MODEL_TABLES.md`
