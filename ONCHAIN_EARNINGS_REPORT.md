# GEMI On-Chain Earnings Report

As of: 2026-07-14T01:44:43.301Z

## Executive Read

The address set is useful as a proprietary **activity and custody-flow monitor**, but it is not strong enough to call reported Gemini trading volume by itself. Gemini spot and prediction-market matching happens primarily inside the venue. Public-chain data helps most when it shows unusual external deposits/withdrawals, token infrastructure activity, or DEX/router interactions around known Gemini wallets.

Current verdict: **neutral**.

- External flow proxy is not strong enough to override the existing Q2 proxy model.
- Existing Gemini exchange API proxy was -38.8% QoQ.

The base earnings bridge estimates Q2 revenue at **$44.5M**, GAAP operating expenses at **$133.0M**, and adjusted EBITDA at **$-60.5M**. The prior non-on-chain proxy base was $45.3M.

## How The Address Data Feeds Earnings

1. **External gross flow**: directional proxy for deposits, withdrawals, liquidity movement, and customer/counterparty activity.
2. **Net flow**: custody inflow/outflow proxy after removing known Gemini-to-Gemini transfers.
3. **Trading proxy**: only DEX/router/program interactions. This is the only bucket that can be described as on-chain trading proxy.
4. **Explorer activity**: validates whether an address is actually active, labeled, contract-like, or likely infrastructure.

The model gives on-chain flow only a small revenue tilt, capped at +/-5%, because custody transfer volume is not equivalent to exchange fee revenue. Opex is modeled as a fixed/semi-fixed scenario assumption rather than a percentage of revenue, because Q1 GAAP opex included stock-based compensation, restructuring/severance, legal noise, and platform costs.

## Previous Earnings Baseline

| Period | Total revenue | Transaction revenue | Exchange | OTC | Prediction | Services | Opex | Net loss |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Q1 2026 | $50.3M | $24.1M | $17.2M | $6.3M | $0.4M | $21.8M | $144.5M | $-109.0M |

## On-Chain Flow Summary

| Period | Tx count | Gross transfer | External gross | Internal gross | Net flow | Trading proxy | Coverage |
|---|---:|---:|---:|---:|---:|---:|---|
| q1_2026 | 26175 | $331.64M | $328.94M | $2.70M | $1.74M | $0.00 | partial_if_sampled |
| q2_2026 | 33492 | $255.82M | $255.02M | $800.5K | $-5.92M | $0.00 | partial_if_sampled |
| q3_2026_partial | 9911 | $347.21M | $343.37M | $3.84M | $-689.8K | $0.00 | partial_if_sampled |

Q2 external gross flow vs Q1: **-22.5%**. Q1 external gross was $328.94M and Q2 external gross was $255.02M.

## Latest Daily Timeseries

| Date | Tx count | External gross | Internal gross | Trading proxy |
|---|---:|---:|---:|---:|
| 2026-07-05 | 231 | $376.5K | $0.00 | $0.00 |
| 2026-07-06 | 716 | $40.03M | $0.00 | $0.00 |
| 2026-07-07 | 640 | $17.17M | $0.00 | $0.00 |
| 2026-07-08 | 549 | $14.40M | $0.00 | $0.00 |
| 2026-07-09 | 501 | $20.69M | $0.00 | $0.00 |
| 2026-07-10 | 850 | $21.00M | $0.00 | $0.00 |
| 2026-07-11 | 321 | $2.62M | $0.00 | $0.00 |
| 2026-07-12 | 207 | $19.75M | $0.00 | $0.00 |
| 2026-07-13 | 894 | $59.00M | $3.84M | $0.00 |
| 2026-07-14 | 34 | $285.2K | $0.00 | $0.00 |

## Q2 Earnings Scenarios

| Scenario | Revenue | Exchange | OTC | Prediction | GAAP opex | Adjusted EBITDA | Operating loss | Net loss before marks |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Bear | $36.4M | $8.6M | $3.5M | $0.5M | $132.0M | $-68.6M | $-95.6M | $-107.6M |
| Base | $44.5M | $13.5M | $5.0M | $0.9M | $133.0M | $-60.5M | $-88.5M | $-98.5M |
| Bull | $54.0M | $17.7M | $7.5M | $1.8M | $137.0M | $-55.0M | $-83.0M | $-91.0M |

## Address Depth

| Chain | Address | Role | Confidence | Explorer activity | Explorer tx count | Q2 external | Q2 trading proxy |
|---|---|---|---|---:|---:|---:|---:|
| base | `0x5f65...f1e932` | contract | low | low | 6911 | $0.00 | $0.00 |
| base | `0xd244...f46853` | exchange_wallet_candidate | high | moderate | 11438 | $0.00 | $0.00 |
| ethereum | `0x056f...b6d5cd` | token_contract | high | high | 252134 | $0.00 | $0.00 |
| ethereum | `0x07ee...513eca` | contract | medium | low | 1709 | $0.02 | $0.00 |
| ethereum | `0x4b7e...26deda` | token_contract | high | low | 216 | $0.00 | $0.00 |
| ethereum | `0x4c2f...de5346` | deployer | high | moderate | 67245 | $0.00 | $0.00 |
| ethereum | `0x5f65...f1e932` | contract | medium | very_high | 2765755 | $255.02M | $0.00 |
| ethereum | `0x61ed...a56eea` | contract | medium | low | 888 | $33.95 | $0.00 |
| ethereum | `0x6fc8...5263f8` | contract | medium | high | 324740 | $0.00 | $0.00 |
| ethereum | `0x8d6f...e045bd` | contract | medium | low | 436 | $0.00 | $0.00 |
| ethereum | `0xb302...0dac05` | contract | medium | low | 30 | $0.00 | $0.00 |
| ethereum | `0xd244...f46853` | exchange_wallet_candidate | high | very_high | 4546519 | $0.00 | $0.00 |
| ethereum | `0xd69b...f00303` | contract | medium | low | 243 | $0.02 | $0.00 |
| ethereum | `0xdd51...ced9bc` | deployer | high | low | 11 | $0.00 | $0.00 |
| ethereum | `0xdec0...67fde5` | contract | medium | low | 93 | $0.00 | $0.00 |
| solana | `CtkFWf...brTb2w` | provided_wallet_candidate | low | unknown |  | $0.00 | $0.00 |
| solana | `E4jre6...JACJ3o` | provided_wallet_candidate | low | unknown |  | $0.00 | $0.00 |
| solana | `GGdoUH...tdfgkc` | provided_wallet_candidate | low | unknown |  | $0.00 | $0.00 |
| solana | `HFWv1r...qAA8Y6` | provided_wallet_candidate | low | unknown |  | $0.00 | $0.00 |

## Trade Implication

The best use of this address watchlist is an alerting and variant-perception edge, not a standalone EPS model. If the dashboard starts showing accelerating external flow plus actual DEX/router interactions while Gemini API spot volume and prediction-market KPIs improve, that would support pressing the trade. If on-chain flow is mostly internal churn or contract infrastructure while spot proxies remain weak, the address work should not override the bear case.

## Files

- `gemi_earnings_model/data/onchain_timeseries.json`
- `gemi_earnings_model/data/onchain_earnings_model.json`
- `gemi_earnings_model/data/onchain_dashboard_data.json`
- `gemi_earnings_model/dashboard/index.html`

## Caveats

- Address labels from the provided list are treated as leads until public labels or behavior support them.
- Public-chain transfer flow is not reported Gemini trading volume.
- EVM windows can still be partial when high-volume addresses hit the free API row cap.
- Solana remains a bounded RPC sample unless a Solscan/Helius/Allium export is added.
