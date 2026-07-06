# GEMI Best Trade Vector

As of: 2026-07-05

This is a trade-structure note, not personal financial advice. Size has to be set from max loss, not conviction.

## Instrument Ranking

1. Shares, staged entry
2. Call spread, only if live quotes are tight enough
3. Cash-secured put or put spread, only if the goal is to accumulate lower
4. Naked calls
5. Direct prediction market

## Best Vector

Best current vector: small shares position plus a risk-defined upside kicker.

Why:
- The Q2 model is not fundamentally bullish enough to justify a full pre-earnings position.
- The stock is already broken, around $4.23, with market cap near $500 million and short interest high enough to create squeeze risk.
- The catalyst is narrative/KPI acceleration, not clean Q2 revenue. That means the payoff is asymmetric if management gives strong prediction-market contract/user/run-rate data.
- Options exist, but public option-chain data quality is mixed. Nasdaq shows the chain as unavailable, while third-party chains show options with high IV and call-heavy OI. That makes naked calls easy to overpay for.
- There is no direct GEMI/Gemini earnings prediction-market contract in Gemini's public prediction event API.

## Recommended Structure

Base structure:
- 60%-75% of risk budget in shares.
- 25%-40% of risk budget in an August or October call spread, only if the bid/ask spread is acceptable.

Preferred call spread shape:
- Buy the first liquid strike just above spot, likely $5.
- Sell the next liquid upside strike, likely $7.50 or $10.
- Expiration should include the Q2 earnings date. If Q2 is expected around Aug. 8-19, August monthly or October is cleaner than short weekly options.

Why call spread over naked calls:
- GEMI option IV is around 100%+ in public data.
- Naked calls require a large move and fast timing to beat IV decay.
- A call spread caps upside, but it gives cheaper exposure to the realistic earnings-pop zone.

## Alternative If You Want To Accumulate Lower

Use cash-secured puts or a put spread instead of chasing shares:
- Sell only strikes where you would actually want stock.
- Avoid doing this if borrow/short pressure and crypto beta are breaking lower at the same time.
- This is an accumulation tactic, not a clean earnings upside tactic.

## Avoid

Avoid direct naked calls unless:
- the spread is tight,
- there is real volume/OI in the exact expiration,
- and you are explicitly paying for a squeeze, not for a fundamental Q2 beat.

Avoid full-size common shares before earnings because:
- Q2 proxy model points to revenue down QoQ in base case,
- spot/on-chain proxies are soft,
- prediction-market revenue may still be below $1 million.

Avoid short stock or long puts here unless the goal is a tactical hedge:
- short interest is elevated,
- borrow data is not clean enough,
- and one strong prediction-market KPI can create a violent relief move.

## Decision Tree

Bullish but uncertain:
- Starter shares plus small call spread.

Bullish and willing to own more lower:
- Starter shares plus cash-secured puts below spot.

Need pure defined risk:
- Call spread only.

Need highest convexity:
- Small naked calls only, but treat premium as a near-total-loss budget.

Need best expected value:
- Shares first, call spread second.

## What Would Change The Answer

Upgrade to more aggressive call spread if:
- prediction revenue appears likely above $1.5 million,
- active prediction volume accelerates in the API,
- management schedules earnings and the August options chain gets real liquidity,
- short interest stays above 20% of float,
- stock bases above the $4.00-$4.25 area.

Downgrade to no trade if:
- stock loses the $4.00 area on heavy volume,
- options stay zero-bid/wide-spread,
- crypto exchange volume continues weakening,
- prediction API volume stays flat,
- consensus is already near the model's bull case.

## Live Checks Before Entry

Before placing anything:
- Confirm exact earnings date.
- Check August and October option bid/ask spreads.
- Use limit orders only.
- Prefer strikes with real open interest and same-day volume.
- Do not buy calls where the bid/ask spread is more than roughly 15%-20% of premium.
- Re-run `node gemi_earnings_model/build_q2_proxy_model.mjs`.
- Re-run `node gemi_earnings_model/collect_data.mjs`.

## Current Verdict

The best trade vector is not direct prediction markets and not naked options. It is:

```text
Starter common shares + small August/October call spread
```

The shares preserve exposure if the market re-rates GEMI as a prediction-market venue. The call spread gives upside to a squeeze or KPI surprise without overpaying as much for high implied volatility.
