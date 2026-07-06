# GEMI Earnings And On-Chain Model

Research tooling for GEMI/Gemini earnings work. The model separates venue-reported exchange activity, public prediction-market activity, public-chain address flow, and relative stock trading behavior.

## Runbook

```bash
node gemi_earnings_model/build_q2_proxy_model.mjs
node gemi_earnings_model/build_onchain_model.mjs
```

Optional deeper on-chain runs:

```bash
ETHERSCAN_API_KEY=... node gemi_earnings_model/build_onchain_model.mjs
ETHERSCAN_API_KEY=... MAX_ETHERSCAN_PAGES_PER_WINDOW=2 node gemi_earnings_model/build_onchain_model.mjs
MAX_SOLANA_SIGNATURES_PER_ADDRESS=500 MAX_SOLANA_TX_FETCH_PER_ADDRESS=100 node gemi_earnings_model/build_onchain_model.mjs
```

From inside this repository, the equivalent commands are:

```bash
node build_q2_proxy_model.mjs
ETHERSCAN_API_KEY=... MAX_ETHERSCAN_PAGES_PER_WINDOW=2 node build_onchain_model.mjs
```

The on-chain model defaults to `data/address_seeds.md`. To use a private local seed file, run:

```bash
ADDRESS_FILE=/path/to/addresses.md ETHERSCAN_API_KEY=... node build_onchain_model.mjs
```

Open the dashboard locally:

```bash
cd gemi_earnings_model
python3 -m http.server 8765
```

Then visit `http://localhost:8765/dashboard/`.

## Main Outputs

- `Q2_PROXY_MODEL.md`: Q2 revenue proxy using Gemini/Coinbase exchange volume, DeFiLlama DEX volume, Robinhood metrics, and Gemini prediction-market API data.
- `ONCHAIN_MODEL.md`: address inventory, explorer metadata, sampled flow model, and trade-relevance read.
- `ONCHAIN_EARNINGS_REPORT.md`: on-chain earnings bridge, Q1 baseline, Q2 scenarios, and trade implication.
- `MANAGER_ONCHAIN_FINDINGS.md`: manager-ready summary of the on-chain findings, revenue reconciliation, and August earnings read.
- `DEEP_RELATIVE_VALUE.md`: GEMI vs BTC/COIN/HOOD/brokerage peers.
- `data/onchain_address_deep_dive.json`: per-address explorer and sampled-flow diagnostics.
- `data/onchain_timeseries.json`: daily external/internal/trading-proxy time series.
- `data/onchain_earnings_model.json`: scenario output using Q1 opex as a percentage of revenue.
- `data/onchain_dashboard_data.json`: compact data bundle for `dashboard/index.html`.
- `dashboard/index.html`: local UI for the address and earnings model.

## Interpretation Rules

- Transfer volume is not trading volume.
- DEX/router/program interactions are the only on-chain events counted as trading proxy.
- Internal cluster transfers are excluded from external gross flow and net flow.
- Missing API keys must be reported as blocked or partial, not zero.
- Address labels are leads until public explorer labels or behavior support them.

## Current Public-Only Read

The explorer metadata shows high lifetime activity on some EVM addresses, especially the labeled Gemini EOA and several contract-like addresses. The bounded Solana RPC sample does not show material external Q1/Q2 flow or DEX/router trading proxy. The current trade relevance verdict is neutral.
