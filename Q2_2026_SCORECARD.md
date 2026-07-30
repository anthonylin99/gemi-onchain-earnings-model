# GEMI Q2 2026 — The Call

> ## Revenue **$43.8M** · EPS ex-crypto-marks **-$0.68**
>
> Quarter ended **30 Jun 2026**. Reports **August 2026**.
> Locked **29 Jul 2026** with GEMI at **$4.065**. Status: **OPEN — not yet scored.**
>
> Consensus at lock: revenue **$42.84M**, EPS **-$0.69** (6 analysts, 29 Jul 2026).
> So this is an **in-line call**: +2.2% on revenue, +$0.01 on EPS. No edge either direction.

**Read this before scoring:** GAAP EPS will include crypto mark-to-market, which is not
forecastable. Q1 2026 carried a **-$101M** gross swing on crypto assets, partly offset by
**+$90M** on crypto loans payable, netting about **-$0.09** per share. Consensus implicitly
assumes zero marks. Reported GAAP EPS can differ from -$0.68 by dollars with no operational
change. **A GAAP miss caused by marks is not a model miss.** Score against an
ex-marks figure, or back the marks out of the reported number first.

Machine-readable version: [`data/q2_2026_prediction.json`](data/q2_2026_prediction.json)
(`status: "OPEN"`, every `actual` field `null`).

---

## Scoring Table

Fill the **Actual** column when the print lands. A line counts as a hit within **±$1.0M**
on revenue lines and **±$0.03** on EPS.

| Line | Q1 2026A | **Q2 2026E** | Consensus | Var vs cons | Actual | Hit? |
|---|---:|---:|---:|---:|---:|:---:|
| **Total Revenue** | $50.27M | **$43.78M** | $42.84M | +2.2% | | |
| **EPS ex-crypto marks** | -$0.84 | **-$0.68** | -$0.69 | +1.4% | | |
| Net Revenue | $48.58M | $42.08M | $41.55M | +1.3% | | |
| Transaction Revenue | $24.13M | $17.58M | $16.40M | +7.2% | | |
| Exchange Revenue | $17.20M | $12.60M | $12.36M | +1.9% | | |
| Prediction Revenue | $0.44M | $0.78M | n/a | — | | |
| OTC Revenue | $6.30M | $4.00M | n/a | — | | |
| Service Revenue | $21.82M | $21.90M | $21.10M | +3.8% | | |
| GAAP Opex | $144.46M | $124.00M | n/a | — | | |
| Operating Income | -$94.19M | -$80.22M | n/a | — | | |
| Net Loss ex-marks | -$98.06M | -$86.22M | -$86.86M | +0.7% | | |
| Diluted Shares | 116.6M | 126.0M | 125.9M | — | | |

### Scenario Bands

| Scenario | Revenue | GAAP Opex | Net Loss | EPS |
|---|---:|---:|---:|---:|
| Bull | $47.7M | $121M | -$78.3M | -$0.62 |
| **Base** | **$43.8M** | **$124M** | **-$86.2M** | **-$0.68** |
| Bear | $39.4M | $128M | -$95.6M | -$0.76 |

A print outside $39.4M–$47.7M means the revenue build was wrong, not just imprecise.

### How Each Q2 Line Was Built

| Line | Basis |
|---|---|
| Prediction notional | $229.2M measured from the venue tape, +92.1% QoQ |
| Prediction take rate | 34 bps, down from 37.2 bps; Kalshi compressed 119.5 → 102.1 bps QoQ |
| Prediction revenue | $0.78M, range $0.69M (30 bps) to $0.87M (38 bps) |
| Exchange revenue | $4.5B volume × 28 bps |
| OTC revenue | $4.0M; the Q1 $6.3M was lumpy block flow, not a run rate |
| Service revenue | Card growth offsets staking decay |
| GAAP opex | $124M as restructuring and legal costs fade from Q1's $144.5M |
| Tax | Held at zero |

---

## The Part That Actually Matters

Q2 is a non-event: in line with consensus, and prediction markets are **1.8% of revenue
and $0.006 of EPS**. Triple the segment and EPS moves about two cents.

**The risk is Q3, and it is not priced.** Consensus wants **$47.0M** of Q3 revenue
(+9.7% QoQ) with **$13.7M** of exchange revenue. The July tape says otherwise: Gemini spot
ran **$27.9M/day** against **$48.4M/day** in Q2, **-42%**, implying roughly **$7.5M** of Q3
exchange revenue — about half the estimate. Verified independently: a CoinGecko series gives
**-38.7%** over the same window, different levels but the same direction and magnitude.

FY2026 modelled Sales of **$174.1M** sits ~10% below consensus **$193.2M**, and the entire
gap is Q3.

So: **the Q2 print is not the trade. The Q3 guide is.** When you come back to score this,
score the Q3 commentary at least as carefully as the Q2 numbers.

### Two Claims Not To Carry Forward

Both were in the accompanying note and both fail verification. Detail in
[`REVIEW_ARTEMIS_MODEL.md`](REVIEW_ARTEMIS_MODEL.md).

1. **"Prediction volume fell 26% in the first half of July."** It rose. The July cell in the
   comps table is single-counted while every other month in the same column is
   double-counted. On a like-for-like basis July 1–15 was **+49%** versus June, and the
   Gemini share of three-venue notional was **18.8 bps**, not 9.29 bps.
2. **"$803M of total cash is real asset support."** $483.8M of that is customer custodial
   funds offset by a near-identical liability, plus $103.7M of restricted cash. Unencumbered
   corporate cash is **$215.6M**.

Neither affects the Q2 numbers above. Both affect the Q3 bear case, which now rests on the
spot tape alone — where it is, on the evidence, strong enough to stand.

---

## Verify Against

- [Gemini investor news releases](https://investors.gemini.com/news-releases)
- [GEMI filings on EDGAR](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002055592&type=10-Q) — CIK 0002055592
- Prediction revenue is a separate XBRL line in the 10-Q revenue disaggregation. Q1 2026 was
  **$444,000**, which IR materials round to $0.4M. Use the XBRL figure.

## After The Print

1. Fill the **Actual** and **Hit?** columns above.
2. Set `status` to `SCORED` in `data/q2_2026_prediction.json` and populate each `actual`.
3. Note whether the Q3 guide confirmed or refuted the exchange-revenue gap — that is the
   real result of this exercise.
