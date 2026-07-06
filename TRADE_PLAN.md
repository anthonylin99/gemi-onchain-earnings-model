# GEMI Earnings Trade Model

Snapshot time: 2026-07-05 13:31 ET

This is a research model and trade framework, not a final investment memo or personalized recommendation. A full memo needs the Phase 0 interview: position size, cost basis, risk limit, decision date, horizon, and what loss you are willing to take if the thesis is wrong.

## Core View

The stock is priced like a broken crypto exchange, but the possible upside vector is that Gemini is becoming a regulated markets venue. Prediction markets are the visible proof point. The hard part: current public data says prediction-market revenue is not yet large enough by itself to save EPS. The trade only works if the market rewards acceleration, active traders, contract volume, and DCM/DCO optionality before those dollars fully show up in GAAP revenue.

Current setup:
- GEMI latest observed price: $4.23, market cap about $493 million.
- Q1 2026 revenue: $50.3 million, up 42% YoY.
- Q1 2026 transaction revenue: $24.1 million.
- Q1 2026 exchange revenue: $17.2 million, with total trading volume down to $6.3 billion from $13.5 billion in Q1 2025.
- Q1 2026 prediction markets revenue: $0.4 million.
- Gemini said April 2026 prediction volume was up 78% month-over-month and that the platform had passed 100 million contracts traded since its December 2025 launch.

## What The Model Now Tracks

Files:
- `gemi_earnings_model/collect_data.mjs`
- `gemi_earnings_model/data/gemi_snapshot.json`
- `gemi_earnings_model/data/prediction_top_events.json`
- `gemi_earnings_model/data/spot_top_pairs.json`

Run:

```bash
node gemi_earnings_model/collect_data.mjs
```

Fresh public snapshot:
- Active prediction events: 319
- Active prediction contracts: 2,352
- Active event lifetime volume shown by Gemini API: $4.14 million
- Top-250 prediction-contract recent 24h sample notional: $41k
- Public spot proxy, one preferred dollar quote per asset: $9.44 million 24h volume
- Top prediction categories by active-event lifetime volume:
  - Sports: $2.11 million
  - Politics: $693k
  - Business: $427k
  - Midterms: $303k
  - Economics: $286k

Important caveat: active-event lifetime volume is not the same thing as all-time platform volume. Expired or resolved contracts may be absent from the active event API. The 100 million contracts disclosure is a better anchor for lifetime adoption, while the API is better for current live velocity.

## Revenue Bridge

Gemini's current prediction fee formula:

```text
fee = fee_rate * contracts * price * (1 - price)
maker rate = 0.0175
taker rate = 0.07
```

That means revenue per 100 contracts is highest around a 50c contract:
- Maker: about $0.44 per 100 contracts
- Taker: about $1.75 per 100 contracts

Implication:
- 100 million contracts since launch could imply roughly $0.4 million to $1.75 million of gross trading fees before rebates/mix effects if average price sits near 50c.
- Q1 disclosed prediction revenue was $0.4 million, so the model should anchor to that actual result, not a fantasy take-rate.
- If Q2 volume grew from Q1 with April +78% MoM but then normalized, the direct Q2 revenue case is probably $0.7 million to $1.5 million.
- A true upside print would need either much higher sustained contract activity, a large sports/politics event volume wave, or management giving a KPI that makes investors underwrite Q3/Q4 scaling.

## On-Chain Layer

I seeded known Ethereum labels into the model:
- `0xd24400ae8bfebb18ca49be86258a3c749cf46853`
- `0x6fc82a5fe25a5cdb58bc74600a40a69c065263f8`
- `0x61edcdf5bb737adffe5043706e7c5bb1f1a56eea`
- `0x5f65f7b609678448494de4c87521cdf6cef1e932`
- `0xb302bfe9c246c6e150af70b1caaa5e3df60dac05`
- `0x8d6f396d210d385033b348bcae9e4f9ea4e045bd`
- `0xd69b0089d9ca950640f5dc9931a41a5965f00303`
- Gemini GUSD token: `0x056fd409e1d7a124bd7017459dfea2f387b6d5cd`

Use this layer as a custody/flow confirmation tool, not the primary earnings estimator. Exchange trades and Gemini prediction contracts are internally matched; they do not reliably appear as on-chain volume. The on-chain layer is useful for:
- platform asset flows,
- GUSD activity,
- wallet inflows/outflows around earnings,
- unusual treasury/custody movement,
- cross-checking assets on platform direction.

Needed upgrade:
- Pull verified entity clusters from Arkham, Nansen, Chainalysis-style labels, Etherscan labels, Solscan labels, and BTC explorer labels.
- Separate operational hot wallets from token contracts, deployers, cold storage, and customer omnibus wallets.
- Track net flows by chain and asset, then compare with reported Assets on Platform and custodial funds.

## Trade Framework

Bull setup:
- Stock stays washed out below the $14 strategic investment reference price.
- Q2 report shows prediction-market revenue accelerating from $0.4 million to at least $1 million.
- Management discloses strong active traders, contract volume, or QTD July volume.
- Spot/OTC does not collapse enough to offset the new-market story.
- DCO/DCM strategy gets framed as near-term monetizable infrastructure, not vague optionality.

Bear setup:
- Prediction revenue is still sub-$1 million.
- Active traders or contract volume slow after April.
- Spot exchange revenue keeps bleeding.
- Credit card losses or operating expenses dominate the call.
- Management avoids giving forward KPIs for predictions/futures/options.

My current read:
- Do not underwrite the trade as "prediction markets will fix the P&L this quarter."
- Underwrite it as "the market may be underpricing a new regulated markets venue inside a busted exchange stock."
- Accumulate only if the stock/tape gives an entry where the downside is defined. The data does not justify chasing purely on the prediction-market revenue number yet.

## Position Plan

Pre-earnings sizing:
- Starter only while the model is inconclusive: 25%-33% of intended position.
- Add only if the next data pulls show sustained prediction-market notional and active-contract expansion.
- Avoid making this a full-size trade before we have the Q2 date, consensus, and updated API samples.

Trigger to add:
- Active event lifetime volume grows materially week-over-week.
- 24h top-contract sample moves from ~$40k into hundreds of thousands.
- New high-interest political/sports/business contracts launch and immediately attract volume.
- Stock stabilizes on higher volume rather than making new lows on weak liquidity.

Trigger to cut:
- API volume stays flat while the stock rallies into earnings.
- Management does not preannounce or hint any KPI acceleration.
- BTC/crypto beta breaks lower and spot proxy deteriorates further.

Post-earnings:
- If prediction revenue is above $1.5 million and management gives bullish QTD KPIs, hold/add on the first orderly pullback.
- If prediction revenue is below $1 million and the call is mostly qualitative, sell the narrative pop.
- If the print is bad but DCO/futures timeline becomes concrete, reassess as an out-quarter call-option trade rather than an earnings trade.

## Next Model Upgrades

1. Add a daily cron snapshot so we have a pre-earnings time series instead of one point.
2. Add expired/resolved prediction contracts if Gemini exposes a historical endpoint or if the website bundle references one.
3. Add browser/API scraping of individual market pages to reconcile public volume fields.
4. Add Arkham/Nansen/BTC/Solana label expansion for the address graph.
5. Build a small spreadsheet with Q1 actuals, Q2 assumptions, prediction revenue sensitivity, and implied transaction revenue.

## Sources

- Gemini Q1 2026 earnings release: https://www.globenewswire.com/news-release/2026/05/14/3295435/0/en/gemini-reports-first-quarter-2026-results-and-announces-100-million-strategic-investment.html
- Gemini prediction fee schedule: https://www.gemini.com/fees/predictions
- Gemini prediction events API: https://api.gemini.com/v1/prediction-markets/events
- Gemini trades API pattern: https://api.gemini.com/v1/trades/btcusd
- Gemini public ticker API pattern: https://api.gemini.com/v1/pubticker/btcusd
- Ethereum label seed source: https://raw.githubusercontent.com/hop-protocol/hop-airdrop/master/src/data/blacklists/blacklist.ts
