# GEMI On-Chain Address Model

As of: 2026-07-14T01:44:43.300Z

## Bottom Line

Trade relevance verdict: **neutral**.

- External flow proxy is not strong enough to override the existing Q2 proxy model.
- Existing Gemini exchange API proxy was -38.8% QoQ.
- Existing Q2 proxy base revenue estimate remains $45.3M.

This model uses a provided address list plus public explorer and chain data. It does not treat custody wallet transfers as Gemini trading volume.

## Address Inventory

| Chain | Address | Label | Role | Confidence | Explorer check |
|---|---|---|---|---|---|
| base | `0x5f65...f1e932` |  | contract | low | verified_page_loaded |
| base | `0xd244...f46853` |  | exchange_wallet_candidate | high | verified_page_loaded |
| ethereum | `0x056f...b6d5cd` | Gemini dollar token | token_contract | high | verified_page_loaded |
| ethereum | `0x07ee...513eca` | Gemini contract 1 | contract | medium | verified_page_loaded |
| ethereum | `0x4b7e...26deda` | Gemini eFIL token | token_contract | high | verified_page_loaded |
| ethereum | `0x4c2f...de5346` | Gemini deployer 2 | deployer | high | verified_page_loaded |
| ethereum | `0x5f65...f1e932` | Gemini 4 | contract | medium | verified_page_loaded |
| ethereum | `0x61ed...a56eea` | Gemini 3 | contract | medium | verified_page_loaded |
| ethereum | `0x6fc8...5263f8` | Gemini 2 | contract | medium | verified_page_loaded |
| ethereum | `0x8d6f...e045bd` | Gemini 6 | contract | medium | verified_page_loaded |
| ethereum | `0xb302...0dac05` | Gemini 5 | contract | medium | verified_page_loaded |
| ethereum | `0xd244...f46853` | Gemini | exchange_wallet_candidate | high | verified_page_loaded |
| ethereum | `0xd69b...f00303` | Gemini 7 | contract | medium | verified_page_loaded |
| ethereum | `0xdd51...ced9bc` | Gemini deployer 1 | deployer | high | verified_page_loaded |
| ethereum | `0xdec0...67fde5` | Gemini old contract 1 | contract | medium | verified_page_loaded |
| solana | `CtkFWf...brTb2w` |  | provided_wallet_candidate | low | blocked |
| solana | `E4jre6...JACJ3o` |  | provided_wallet_candidate | low | blocked |
| solana | `GGdoUH...tdfgkc` |  | provided_wallet_candidate | low | blocked |
| solana | `HFWv1r...qAA8Y6` |  | provided_wallet_candidate | low | blocked |

## Public Explorer Metadata

| Chain | Address | Type | Explorer tx count | Balance across chains | Token price |
|---|---|---:|---:|---:|---:|
| base | `0x5f65...f1e932` | unverified_contract | 6911 | $12.24M |  |
| base | `0xd244...f46853` | eoa | 11438 | $1.68M |  |
| ethereum | `0x056f...b6d5cd` | verified_contract | 252134 |  | $1.00 |
| ethereum | `0x07ee...513eca` | unverified_contract | 1709 | $2.4K |  |
| ethereum | `0x4b7e...26deda` | verified_contract | 216 |  | $0.00 |
| ethereum | `0x4c2f...de5346` | eoa | 67245 | $20.4K |  |
| ethereum | `0x5f65...f1e932` | unverified_contract | 2765755 | $12.24M |  |
| ethereum | `0x61ed...a56eea` | unverified_contract | 888 | $1.7K |  |
| ethereum | `0x6fc8...5263f8` | unverified_contract | 324740 | $0.00 |  |
| ethereum | `0x8d6f...e045bd` | unverified_contract | 436 | $1.00 |  |
| ethereum | `0xb302...0dac05` | unverified_contract | 30 | $0.00 |  |
| ethereum | `0xd244...f46853` | eoa | 4546519 | $1.68M |  |
| ethereum | `0xd69b...f00303` | unverified_contract | 243 | $63.41M |  |
| ethereum | `0xdd51...ced9bc` | eoa | 11 | $585.37 |  |
| ethereum | `0xdec0...67fde5` | unverified_contract | 93 | $0.00 |  |

## Per-Address Deep Dive

| Chain | Address | Role | Explorer activity | Explorer tx count | Q1 sample tx/external | Q2 sample tx/external | Q2 DEX proxy |
|---|---|---|---:|---:|---:|---:|---:|
| base | `0x5f65...f1e932` | contract | low | 6911 | 0/$0.00 | 0/$0.00 | $0.00 |
| base | `0xd244...f46853` | exchange_wallet_candidate | moderate | 11438 | 0/$0.00 | 0/$0.00 | $0.00 |
| ethereum | `0x056f...b6d5cd` | token_contract | high | 252134 | 1016/$1.00 | 794/$0.00 | $0.00 |
| ethereum | `0x07ee...513eca` | contract | low | 1709 | 17/$0.00 | 4/$0.02 | $0.00 |
| ethereum | `0x4b7e...26deda` | token_contract | low | 216 | 0/$0.00 | 4/$0.00 | $0.00 |
| ethereum | `0x4c2f...de5346` | deployer | moderate | 67245 | 4725/$0.00 | 2468/$0.00 | $0.00 |
| ethereum | `0x5f65...f1e932` | contract | very_high | 2765755 | 20000/$328.94M | 20000/$255.02M | $0.00 |
| ethereum | `0x61ed...a56eea` | contract | low | 888 | 3/$0.00 | 3/$33.95 | $0.00 |
| ethereum | `0x6fc8...5263f8` | contract | high | 324740 | 0/$0.00 | 0/$0.00 | $0.00 |
| ethereum | `0x8d6f...e045bd` | contract | low | 436 | 0/$0.00 | 0/$0.00 | $0.00 |
| ethereum | `0xb302...0dac05` | contract | low | 30 | 0/$0.00 | 0/$0.00 | $0.00 |
| ethereum | `0xd244...f46853` | exchange_wallet_candidate | very_high | 4546519 | 401/$1.5K | 192/$0.00 | $0.00 |
| ethereum | `0xd69b...f00303` | contract | low | 243 | 8/$0.00 | 10007/$0.02 | $0.00 |
| ethereum | `0xdd51...ced9bc` | deployer | low | 11 | 0/$0.00 | 0/$0.00 | $0.00 |
| ethereum | `0xdec0...67fde5` | contract | low | 93 | 0/$0.00 | 0/$0.00 | $0.00 |
| solana | `CtkFWf...brTb2w` | provided_wallet_candidate | unknown |  | 0/$0.00 | 7/$0.00 | $0.00 |
| solana | `E4jre6...JACJ3o` | provided_wallet_candidate | unknown |  | 5/$0.00 | 3/$0.00 | $0.00 |
| solana | `GGdoUH...tdfgkc` | provided_wallet_candidate | unknown |  | 0/$0.00 | 10/$0.00 | $0.00 |
| solana | `HFWv1r...qAA8Y6` | provided_wallet_candidate | unknown |  | 0/$0.00 | 0/$0.00 | $0.00 |

## Quarterly Flow Summary

| Period | Tx count | Gross transfer | External gross | Net flow | Trading proxy | DEX/router tx | Coverage |
|---|---:|---:|---:|---:|---:|---:|---|
| q1_2026 | 26175 | $331.64M | $328.94M | $1.74M | $0.00 | 0 | partial_if_sampled |
| q2_2026 | 33492 | $255.82M | $255.02M | $-5.92M | $0.00 | 11 | partial_if_sampled |
| q3_2026_partial | 9911 | $347.21M | $343.37M | $-689.8K | $0.00 | 0 | partial_if_sampled |

## Collection Status

### Solana

| Chain | Address | Status | Signatures | Transactions parsed | Sample window |
|---|---|---:|---:|---:|---|
| solana | `CtkFWf...brTb2w` | partial_bounded_sample | 60 | 10 | 2026-06-10 to 2026-07-13 |
| solana | `E4jre6...JACJ3o` | partial_bounded_sample | 60 | 10 | 2026-02-20 to 2026-07-13 |
| solana | `GGdoUH...tdfgkc` | partial_bounded_sample | 60 | 10 | 2026-06-10 to 2026-06-10 |
| solana | `HFWv1r...qAA8Y6` | partial_bounded_sample | 60 | 8 | 2026-07-13 to 2026-07-14 |

### EVM

| Chain | Address | Status | Normal rows | Token rows | API window |
|---|---|---:|---:|---:|---|
| base | `0x5f65...f1e932` | partial | 0 | 0 |  to  |
| base | `0xd244...f46853` | partial | 0 | 0 |  to  |
| ethereum | `0x056f...b6d5cd` | complete_api_window | 1882 | 12 | 2026-01-01 to 2026-07-13 |
| ethereum | `0x07ee...513eca` | complete_api_window | 17 | 4 | 2026-02-21 to 2026-04-08 |
| ethereum | `0x4b7e...26deda` | partial | 5 | 0 | 2026-04-15 to 2026-07-03 |
| ethereum | `0x4c2f...de5346` | complete_api_window | 7422 | 38 | 2026-01-02 to 2026-07-13 |
| ethereum | `0x5f65...f1e932` | partial | 24907 | 24624 | 2026-01-01 to 2026-07-14 |
| ethereum | `0x61ed...a56eea` | partial | 3 | 3 | 2026-02-21 to 2026-04-09 |
| ethereum | `0x6fc8...5263f8` | partial | 0 | 0 |  to  |
| ethereum | `0x8d6f...e045bd` | partial | 0 | 0 |  to  |
| ethereum | `0xb302...0dac05` | partial | 0 | 0 |  to  |
| ethereum | `0xd244...f46853` | complete_api_window | 480 | 127 | 2026-01-02 to 2026-07-13 |
| ethereum | `0xd69b...f00303` | partial | 8 | 10008 | 2026-01-03 to 2026-07-01 |
| ethereum | `0xdd51...ced9bc` | partial | 0 | 0 |  to  |
| ethereum | `0xdec0...67fde5` | partial | 0 | 0 |  to  |

## Interpretation

- Address labels are treated as unverified leads unless a public explorer label confirms them.
- Transfer volume is not trading volume.
- Trading proxy means DEX/router/program interaction only.
- Missing API keys are shown as blocked or partial, never as zero activity.

The current public-only run is most useful for validating address labels and recent Solana activity. It is not enough to replace Gemini's reported trading volume or the existing Gemini API spot-volume proxy unless indexed EVM/Solana history is supplied through API keys or exports.

## Data Files

- `gemi_earnings_model/data/onchain_address_inventory.json`
- `gemi_earnings_model/data/onchain_flows.json`
- `gemi_earnings_model/data/onchain_timeseries.json`
- `gemi_earnings_model/data/onchain_earnings_model.json`
- `gemi_earnings_model/data/onchain_dashboard_data.json`
- `gemi_earnings_model/data/q2_proxy_model.json`
- `gemi_earnings_model/dashboard/index.html`

## Next Upgrade

Set `SOLSCAN_API_KEY`, `HELIUS_API_KEY`, or provide Allium exports to replace bounded Solana RPC sampling with full indexed token-transfer history. Raise `MAX_ETHERSCAN_PAGES_PER_WINDOW` when you want to spend more API budget on high-volume EVM windows.
