# GEMI On-Chain Address Findings For Manager

As of: July 13/14, 2026

## Executive Takeaway

- We analyzed 19 Gemini-linked address records across Ethereum, Base, and Solana using public explorer metadata plus Etherscan V2 history for Q1 2026, Q2 2026, and partial Q3 through the latest refresh.
- The key read is **neutral to slightly negative for August earnings**: the address set shows real on-chain activity, but it does **not** show evidence of a hidden trading-volume acceleration that would change the fundamental earnings setup.
- Q2 external gross flow was **$255.0M**, down from **$328.9M in Q1**, a decline of roughly **22.5% QoQ**. That suggests less dollar activity moving through the observed Gemini-linked cluster heading into Q2 earnings.
- Transaction count increased from **11,470 in Q1** to **33,492 in Q2** in the latest indexed run, but dollar flow declined. That means there were more movements, but they were smaller or lower-value on average. I would not interpret this as stronger monetizable activity. Because high-volume EVM windows are API-capped, I put more weight on the dollar-flow direction than on exact transaction count.
- Net flow turned negative: **+$1.7M in Q1** versus **-$5.9M in Q2**. Directionally, this points to more net outflow than inflow across the priced transfer buckets we captured.
- New since the July 6 run: partial Q3 external gross flow increased to about **$343.4M**, already above the full Q2 modeled external flow. This is useful for the July/Q3 momentum watchlist, but it does not change Q2 earnings because it is post-quarter and still has **$0** priced trading proxy.
- The Gemini prediction-market API snapshot also improved from roughly **293 events / 2,186 contracts / $4.1M active-event lifetime volume** to **304 events / 2,481 contracts / $4.9M**. That supports the narrative/KPI watchlist more than the current-quarter P&L model.

## What Happened Last Quarter

- Internal cluster flow increased from **$1.0M in Q1** to **$2.2M in Q2**, but this is mostly operational movement between known or likely Gemini-linked addresses. It should not be treated as revenue-generating trading activity.
- We found **no meaningful priced DEX/router trading proxy** in Q2. There were 11 DEX/router-style interactions, but the priced trading proxy was effectively **$0**, so this does not support a thesis that Gemini had a hidden on-chain trading-volume acceleration.
- The activity is heavily concentrated in one Ethereum contract-like address, `0x5f65...f1e932`, which drove nearly all modeled Q1 and Q2 external gross flow. Because this address appears contract/infrastructure-like, I would treat the flows as custody, token, or operational activity rather than customer exchange volume.
- The publicly labeled Gemini Ethereum EOA, `0xd244...f46853`, has very high lifetime explorer activity, around **4.5M transactions**, but it did not contribute material modeled Q2 external flow in the current quarter window. This is important because the most clearly labeled hot-wallet-style address is not showing a bullish Q2 signal.
- Base activity exists, but it was not material in the Q2 earnings window. The Base `0xd244...f46853` address has moderate lifetime explorer activity, but no meaningful modeled Q2 external flow.
- The four Solana addresses did not show material Q2 external flow in the bounded public RPC sample. Q2 external flow from the Solana addresses was essentially zero, and there was no Solana DEX/program trading proxy.
- A lot of the token movement is noisy and includes unpriced or spam-like token symbols. This makes raw token count look busier than the economically useful signal.

## Earnings Relevance

- The best earnings interpretation is that these addresses are useful for monitoring custody/liquidity conditions, not for estimating Gemini exchange trading revenue directly. Gemini spot and prediction-market activity are primarily venue-internal, so they will not reliably appear on-chain.
- For Q2 earnings, the address data slightly supports the view that exchange/spot activity remained weak. It does **not** support a major upside surprise from on-chain volume.
- Our on-chain earnings bridge estimates Q2 revenue at roughly **$44.5M**, compared with Q1 reported revenue of **$50.3M**. That is consistent with the broader proxy model showing softer Gemini API volume, Coinbase volume, Robinhood crypto notional, and DeFiLlama DEX volume in Q2.
- Expense leverage remains the major issue. After a second-pass analyst review, the repo no longer models opex as a mechanical percentage of revenue. The better base case uses fixed/semi-fixed opex assumptions: **$133.0M** of GAAP opex, **-$60.5M** of adjusted EBITDA, and **-$98.5M** net loss before crypto marks.

## Revenue Reconciliation Check

- The model's **Q1 revenue baseline matches official Gemini earnings**. Gemini reported Q1 2026 total revenue of **$50.3M**, transaction revenue of **$24.1M**, exchange revenue of **$17.2M**, OTC revenue of **$6.3M**, prediction-market revenue of **$0.4M**, services revenue and interest income of **$24.5M**, total operating expenses of **$144.5M**, and net loss of **$109.0M**.
- The official Q1 statement of operations also ties: net revenue was **$48.578M**, other revenue was **$1.694M**, and total revenue was **$50.272M**.
- The on-chain address model is **not capturing the majority of Gemini's business**. Q1 observed external gross flow of **$328.9M** is only about **5.2%** of Gemini's officially reported **$6.3B** Q1 total trading volume, before even considering credit card, staking, custodial, advisory, interest, and other revenue.
- This means the on-chain model is directionally useful, but it cannot be used as a full revenue tape. It likely captures custody, wallet, token-contract, and operational movements while missing most venue-internal spot trades, OTC trades, prediction-market contracts, card economics, and service revenue.
- The Q2 revenue number in this repo, **$44.5M**, is a model estimate, not an official reported number. As of the latest refresh, the upcoming August earnings period has not been reported yet.

## Trade Implication

- Bottom line: the on-chain address work does **not** make GEMI a clean fundamental long into August earnings. The better long setup would need to come from prediction-market KPI acceleration, cost cuts, and management commentary, not from these addresses alone.
- What would change the read: if the dashboard starts showing rising external gross flow, meaningful priced trading-proxy activity, and net inflows in July/August, that could indicate improving platform activity ahead of the next print. Right now, the Q2 signal is not there.
- Separately, Gemini's official Q1 release did flag that Gemini Predictions accelerated into Q2, with April 2026 volume up **78% month-over-month** and more than **100M contracts traded** since launch. That is the cleaner bull vector to monitor for August, not the on-chain address activity by itself.

## Sources

- Gemini Q1 2026 earnings release: https://investors.gemini.com/news-releases/news-release-details/gemini-reports-first-quarter-2026-results-and-announces-100
- Gemini Q1 2026 10-Q revenue table: https://www.sec.gov/Archives/edgar/data/2055592/000205559226000050/R50.htm
- Local model outputs: `data/onchain_dashboard_data.json`, `data/onchain_earnings_model.json`, `ONCHAIN_EARNINGS_REPORT.md`
