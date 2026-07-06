# GEMI Q2 2026 Proxy Model

As of: 2026-07-06T13:41:12.852Z

## Bottom Line

My base-case Q2 revenue estimate is $45.3M versus Q1 reported revenue of $50.3M, down 9.8% sequentially. The model says Q2 probably misses the original bull narrative unless OTC/services hold up better than spot-volume proxies imply. Prediction markets are the story vector, but not yet the P&L driver unless management discloses a much bigger contract-volume KPI than the public active-event API implies.

## Reported GEMI Baseline

| Period | Total revenue | Transaction revenue | Exchange revenue | OTC | Prediction | Services revenue | Trading volume |
|---|---:|---:|---:|---:|---:|---:|---:|
| Q3 2025 | $50.6M | $26.3M | n/a | n/a | n/a | n/a | $16.4B |
| Q4 2025 | $60.3M | $26.7M | n/a | n/a | n/a | n/a | $11.5B |
| Q1 2026 | $50.3M | $24.1M | $17.2M | $6.3M | $0.4M | $21.8M | $6.3B |

## External Proxies

| Proxy | Q1 2026 | Q2 2026 | QoQ |
|---|---:|---:|---:|
| Gemini API exchange volume proxy | $5.7B | $3.4B | -39.5% |
| Coinbase exchange API volume proxy | $186.0B | $143.5B | -22.8% |
| DeFiLlama DEX/on-chain volume | $916.8B | $628.7B | -31.4% |
| Robinhood crypto notional | $65.8B | $38.1B | -42.1% |
| BTC average price | $76723 | $71751 | -6.5% |

Robinhood event contracts are the warning shot: Q2 selected/monthly metrics imply roughly 12.3B event contracts in Q2, with May up 22% from April and June month-to-date already above May. That supports the idea that investors may reward a prediction-market KPI even when crypto spot remains soft.

Gemini public prediction snapshot:
- Active events: 293
- Active contracts: 2186
- Active-event lifetime volume: $4.1M

## Q2 Scenario Estimate

| Scenario | Total revenue | Exchange | OTC | Prediction | Services + interest | Net loss before crypto marks |
|---|---:|---:|---:|---:|---:|---:|
| Bear | $36.9M | $8.7M | $3.5M | $0.5M | $22.5M | $-103.1M |
| Base | $45.3M | $13.7M | $5.0M | $0.9M | $24.0M | $-87.7M |
| Bull | $55.0M | $18.0M | $7.5M | $1.8M | $26.0M | $-73.0M |

Interpretation:
- Bear: Spot is still weak, prediction markets remain sub-scale, and cost cuts do not offset the revenue gap.
- Base: Q2 revenue lands around $45.3M, with prediction revenue near $0.9M and the stock reaction depending mostly on forward KPIs.
- Bull: Exchange stabilizes, OTC rebounds, prediction revenue clears $1.8M, and management gives a QTD event-contract acceleration metric.

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
- Robinhood April/May/June 2026 operating metrics: https://investors.robinhood.com/news-releases/
- Coinbase Q1 2026 release/deck: https://investor.coinbase.com/
