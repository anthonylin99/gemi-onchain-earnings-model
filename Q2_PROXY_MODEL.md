# GEMI Q2 2026 Proxy Model

As of: 2026-07-30T00:11:08.554Z

## Bottom Line

My base-case Q2 revenue estimate is $45.3M versus Q1 reported revenue of $50.3M, down 9.9% sequentially. The model says Q2 probably misses the original bull narrative unless OTC/services hold up better than spot-volume proxies imply. Prediction markets are the story vector, but not yet the P&L driver unless management discloses a much bigger contract-volume KPI than the public active-event API implies.

## Reported GEMI Baseline

| Period | Total revenue | Transaction revenue | Exchange revenue | OTC | Prediction | Services revenue | Trading volume |
|---|---:|---:|---:|---:|---:|---:|---:|
| Q3 2025 | $50.6M | $26.3M | n/a | n/a | n/a | n/a | $16.4B |
| Q4 2025 | $60.3M | $26.7M | n/a | n/a | n/a | n/a | $11.5B |
| Q1 2026 | $50.3M | $24.1M | $17.2M | $6.3M | $0.4M | $21.8M | $6.3B |

## External Proxies

| Proxy | Q1 2026 | Q2 2026 | QoQ |
|---|---:|---:|---:|
| Gemini API exchange volume proxy | $5.6B | $3.4B | -39.5% |
| Coinbase exchange API volume proxy | $182.7B | $142.0B | -22.3% |
| DeFiLlama DEX/on-chain volume | $913.1B | $622.9B | -31.8% |
| Robinhood crypto notional (Q2 reported) | $65.8B | $40.0B | -39.2% |
| Titan prediction contract volume | 59,667,196 | 115,249,040 | 93.2% |
| BTC average price | $76723 | $71751 | -6.5% |

Robinhood's Q2 print (July 29, 2026) is the read-across, and it is now actual rather than estimated. Event contracts traded hit 13.6B, up over 10x year over year, and event-contract revenue of $156.0M exceeded crypto revenue of $100.0M for the first time. Crypto revenue fell 38% year over year while crypto notional fell to $40.0B. The pattern that matters for GEMI is the divergence: prediction-market KPIs can inflect hard while crypto spot revenue keeps deteriorating, and the market rewarded the former.

Gemini Titan published volume series (CFTC DCM Core Principle 8 / Titan Rule 2.17(b) daily
publication, surfaced via the public per-date volume endpoint):
- Q1 2026 contract volume: 59,667,196
- Q2 2026 contract volume: 115,249,040 (93.2% QoQ)
- Q3 2026 partial contract volume: 45,646,530
- Implied take rate from Q1 reported revenue: $0.00744 per contract
- Q2 implied prediction revenue: $0.9M
- Q3 annualized run rate at observed July pace: $4.4M

Live active-event snapshot, retained as a cross-check only:
- Active events: 470
- Active contracts: 3279
- Active-event lifetime volume: $4.2M

## Q2 Scenario Estimate

| Scenario | Total revenue | Exchange | OTC | Prediction | Services + interest | Net loss before crypto marks |
|---|---:|---:|---:|---:|---:|---:|
| Bear | $37.0M | $8.7M | $3.5M | $0.6M | $22.5M | $-103.0M |
| Base | $45.3M | $13.7M | $5.0M | $0.9M | $24.0M | $-87.7M |
| Bull | $54.6M | $18.0M | $7.5M | $1.4M | $26.0M | $-73.4M |

Interpretation:
- Bear: Spot is still weak, prediction markets remain sub-scale, and cost cuts do not offset the revenue gap.
- Base: Q2 revenue lands around $45.3M, with prediction revenue near $0.9M and the stock reaction depending mostly on forward KPIs.
- Bull: Exchange stabilizes, OTC rebounds, prediction revenue clears $1.4M, and management gives a QTD event-contract acceleration metric.

## Trade Read

The setup is better as a KPI/narrative acceleration trade than an EPS trade. I would want three confirms before pressing size:

1. Prediction revenue above $1M, or a disclosed QTD run-rate that makes $3M+ plausible in Q3.
2. Exchange/OTC transaction revenue not worse than Q1, meaning transaction revenue stays near or above $24M.
3. Operating expense run-rate falls materially from Q1 after severance and stock comp noise.

If Q2 revenue is only around consensus-ish levels and prediction revenue is below $1M, the trade probably becomes sell-the-pop unless management gives an unusually strong July/August KPI.

## Data Notes

- Allium was not directly accessible from this environment, so I used DeFiLlama DEX volume as the public on-chain trading-volume proxy and Gemini/CoinGecko/Coinbase public endpoints for exchange proxies.
- Gemini and Coinbase API exchange-volume proxies are not perfect GAAP revenue proxies. They are useful for directionality, not exact reported trading volume.
- Gemini prediction-market trades are venue-internal and do not reliably appear on-chain. On-chain data is therefore a macro activity proxy, not a direct prediction-revenue feed.

## Sources

- Gemini Q1 2026 release: https://investors.gemini.com/news-releases/news-release-details/gemini-reports-first-quarter-2026-results-and-announces-100
- Gemini Q1 2026 10-Q revenue table: https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R50.htm
- Gemini 2025 10-K revenue table: https://www.sec.gov/Archives/edgar/data/2055592/000205559226000026/R60.htm
- Gemini prediction events API: https://api.gemini.com/v1/prediction-markets/events
- CoinGecko exchange volume API: https://api.coingecko.com/api/v3/exchanges/{id}/volume_chart
- DeFiLlama DEX overview API: https://api.llama.fi/overview/dexs
- Robinhood Q2 2026 results release (July 29, 2026): https://investors.robinhood.com/news-releases/
- Gemini Titan daily volume endpoint: https://api.gemini.com/v1/prediction-markets/volume/{date}
- Gemini prediction markets volume API spec: https://developer.gemini.com/prediction-markets-spec/volume
- Gemini Titan rulebook (Rule 2.17 public information): https://www.cftc.gov/filings/orgrules/rules03252641973.pdf
- 17 CFR 16.01 daily market data publication: https://www.ecfr.gov/current/title-17/chapter-I/part-16/section-16.01
- Coinbase Q1 2026 release/deck: https://investor.coinbase.com/
