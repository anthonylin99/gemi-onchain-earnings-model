import fs from "node:fs/promises";

const OUT_DIR = new URL("./data/", import.meta.url);
const LIMIT = 100;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ETH_GEMINI_ADDRESS_SEEDS = [
  { chain: "ethereum", address: "0xd24400ae8bfebb18ca49be86258a3c749cf46853", label: "Gemini", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0x6fc82a5fe25a5cdb58bc74600a40a69c065263f8", label: "Gemini 2", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0x61edcdf5bb737adffe5043706e7c5bb1f1a56eea", label: "Gemini 3", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0x5f65f7b609678448494de4c87521cdf6cef1e932", label: "Gemini 4", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0xb302bfe9c246c6e150af70b1caaa5e3df60dac05", label: "Gemini 5", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0x8d6f396d210d385033b348bcae9e4f9ea4e045bd", label: "Gemini 6", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0xd69b0089d9ca950640f5dc9931a41a5965f00303", label: "Gemini 7", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0x07ee55aa48bb72dcc6e9d78256648910de513eca", label: "Gemini contract 1", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0xdd51f01d9fc0fd084c1a4737bbfa5becb6ced9bc", label: "Gemini deployer 1", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0x4c2f150fc90fed3d8281114c2349f1906cde5346", label: "Gemini deployer 2", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0x4b7ee45f30767f36f06f79b32bf1fca6f726deda", label: "Gemini eFIL token", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd", label: "Gemini dollar token", source: "hop_airdrop_blacklist_etherscan_label_seed" },
  { chain: "ethereum", address: "0xdec042a90de005b22754e94a8a979c4b8c67fde5", label: "Gemini old contract 1", source: "hop_airdrop_blacklist_etherscan_label_seed" },
];

async function fetchJson(url, label, { retries = 3, delayMs = 800 } = {}) {
  let lastText = "";
  for (let i = 0; i <= retries; i += 1) {
    const response = await fetch(url, {
      headers: {
        accept: "application/json,text/plain,*/*",
        "user-agent": "gemi-earnings-model/0.1",
      },
    });
    lastText = await response.text();
    if (response.ok) {
      try {
        return JSON.parse(lastText);
      } catch (error) {
        throw new Error(`${label}: JSON parse failed: ${error.message}`);
      }
    }
    if (![429, 500, 502, 503, 504].includes(response.status) || i === retries) {
      throw new Error(`${label}: HTTP ${response.status}: ${lastText.slice(0, 300)}`);
    }
    await sleep(delayMs * (i + 1));
  }
  throw new Error(`${label}: failed after retries`);
}

function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function nowMinusDays(days) {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

function contractSymbols(events) {
  return events.flatMap((event) =>
    (event.contracts ?? []).map((contract) => ({
      eventId: event.id,
      eventTitle: event.title,
      category: event.category,
      eventVolume: number(event.volume),
      symbol: contract.instrumentSymbol,
      label: contract.label,
      lastTradePrice: number(contract.prices?.lastTradePrice),
      bestBid: number(contract.prices?.bestBid),
      bestAsk: number(contract.prices?.bestAsk),
    })),
  );
}

function summarizeTrades(trades, sinceMs) {
  return trades.reduce((summary, trade) => {
    const timestampMs = Number(trade.timestampms) || Number(trade.timestamp) * 1000;
    const contracts = number(trade.amount);
    const price = number(trade.price);
    const notional = contracts * price;
    summary.trades += 1;
    summary.contracts += contracts;
    summary.notional += notional;
    summary.maxTid = Math.max(summary.maxTid, Number(trade.tid) || 0);
    if (timestampMs >= sinceMs) {
      summary.tradesSinceWindow += 1;
      summary.contractsSinceWindow += contracts;
      summary.notionalSinceWindow += notional;
    }
    return summary;
  }, {
    trades: 0,
    contracts: 0,
    notional: 0,
    tradesSinceWindow: 0,
    contractsSinceWindow: 0,
    notionalSinceWindow: 0,
    maxTid: 0,
  });
}

function byCategory(events) {
  const rows = new Map();
  for (const event of events) {
    const key = event.category || "Uncategorized";
    const row = rows.get(key) ?? { category: key, events: 0, contracts: 0, volume: 0 };
    row.events += 1;
    row.contracts += event.contracts?.length ?? 0;
    row.volume += number(event.volume);
    rows.set(key, row);
  }
  return [...rows.values()].sort((a, b) => b.volume - a.volume);
}

function preferredSpotRows(rows) {
  const quoteRank = new Map([
    ["USD", 0],
    ["USDC", 1],
    ["USDT", 2],
    ["GUSD", 3],
    ["RLUSD", 4],
  ]);
  const byBase = new Map();
  for (const row of rows.filter((item) => item.base && Number.isFinite(item.approxUsdVolume))) {
    const rank = quoteRank.get(row.quote) ?? 99;
    const current = byBase.get(row.base);
    if (!current || rank < current.rank) byBase.set(row.base, { rank, row });
  }
  return [...byBase.values()].map((item) => item.row).sort((a, b) => b.approxUsdVolume - a.approxUsdVolume);
}

function topEvents(events, count = 20) {
  return [...events]
    .sort((a, b) => number(b.volume) - number(a.volume))
    .slice(0, count)
    .map((event) => ({
      id: event.id,
      title: event.title,
      category: event.category,
      status: event.status,
      createdAt: event.createdAt,
      volume: number(event.volume),
      contracts: event.contracts?.length ?? 0,
    }));
}

async function collectPredictionEvents() {
  const events = [];
  for (let offset = 0; ; offset += LIMIT) {
    const url = `https://api.gemini.com/v1/prediction-markets/events?limit=${LIMIT}&offset=${offset}`;
    const page = await fetchJson(url, `prediction events offset ${offset}`);
    const data = page.data ?? [];
    events.push(...data);
    if (data.length < LIMIT) break;
    await sleep(150);
  }
  return events;
}

async function collectPredictionTradeSample(events) {
  const symbols = contractSymbols(events)
    .sort((a, b) => b.eventVolume - a.eventVolume)
    .slice(0, 250);
  const sinceMs = nowMinusDays(1);
  const samples = [];
  for (const item of symbols) {
    try {
      const trades = await fetchJson(
        `https://api.gemini.com/v1/trades/${encodeURIComponent(item.symbol)}?limit_trades=500`,
        `trades ${item.symbol}`,
      );
      samples.push({ ...item, ...summarizeTrades(trades, sinceMs) });
      await sleep(80);
    } catch (error) {
      samples.push({ ...item, error: error.message });
    }
  }
  return samples;
}

async function collectSpotTickerSnapshot() {
  const symbols = await fetchJson("https://api.gemini.com/v1/symbols", "symbols");
  const fiatLikeQuotes = new Set(["usd", "usdc", "usdt", "gusd", "rlusd"]);
  const selected = symbols
    .filter((symbol) => [...fiatLikeQuotes].some((quote) => symbol.endsWith(quote)))
    .filter((symbol) => !symbol.includes("-"))
    .slice(0, 350);

  const rows = [];
  for (const symbol of selected) {
    try {
      const [details, ticker] = await Promise.all([
        fetchJson(`https://api.gemini.com/v1/symbols/details/${symbol}`, `details ${symbol}`),
        fetchJson(`https://api.gemini.com/v1/pubticker/${symbol}`, `ticker ${symbol}`),
      ]);
      const quote = String(details.quote_currency || "").toUpperCase();
      const quoteVolume = number(ticker.volume?.[quote]);
      rows.push({
        symbol,
        base: details.base_currency,
        quote,
        last: number(ticker.last),
        quoteVolume,
        approxUsdVolume: quote === "USD" || quote === "USDC" || quote === "USDT" || quote === "GUSD" || quote === "RLUSD" ? quoteVolume : 0,
      });
      await sleep(40);
    } catch (error) {
      rows.push({ symbol, error: error.message });
    }
  }
  return rows.sort((a, b) => (b.approxUsdVolume ?? 0) - (a.approxUsdVolume ?? 0));
}

async function collectStockChart() {
  const period2 = Math.floor(Date.now() / 1000);
  const period1 = period2 - 90 * 24 * 60 * 60;
  return fetchJson(
    `https://query1.finance.yahoo.com/v8/finance/chart/GEMI?period1=${period1}&period2=${period2}&interval=1d`,
    "GEMI yahoo chart",
  );
}

function buildSummary({ events, tradeSamples, spotRows, stockChart }) {
  const predictionVolume = events.reduce((sum, event) => sum + number(event.volume), 0);
  const recentSample = tradeSamples.reduce((sum, row) => sum + number(row.notionalSinceWindow), 0);
  const sampledLifetime = tradeSamples.reduce((sum, row) => sum + number(row.notional), 0);
  const preferredRows = preferredSpotRows(spotRows);
  const spot24hVolume = preferredRows.reduce((sum, row) => sum + number(row.approxUsdVolume), 0);
  const quote = stockChart.chart?.result?.[0]?.indicators?.quote?.[0] ?? {};
  const timestamps = stockChart.chart?.result?.[0]?.timestamp ?? [];
  const lastIndex = timestamps.length - 1;

  return {
    asOf: new Date().toISOString(),
    predictionMarkets: {
      activeEvents: events.length,
      activeContracts: contractSymbols(events).length,
      activeEventLifetimeVolumeUsd: predictionVolume,
      sampledTopContracts: tradeSamples.length,
      sampledRecent24hNotionalUsd: recentSample,
      sampledReturnedTradeNotionalUsd: sampledLifetime,
      categories: byCategory(events),
      topEvents: topEvents(events),
      feeFramework: {
        makerRate: 0.0175,
        takerRate: 0.07,
        expectedEffectiveRateOnNotionalRange: [0.006, 0.02],
        note: "Fee = rate * contracts * price * (1-price). Effective fee/notional depends on price and maker/taker mix.",
      },
    },
    spotExchange: {
      symbolsSampled: spotRows.length,
      preferredBaseAssets: preferredRows.length,
      approx24hUsdVolume: spot24hVolume,
      topPairs: preferredRows.slice(0, 25),
      caveat: "Spot proxy uses one preferred dollar quote per base asset to avoid duplicated volume across Gemini's multiple dollar/stablecoin quote variants.",
    },
    stock: {
      latestClose: quote.close?.[lastIndex] ?? null,
      latestVolume: quote.volume?.[lastIndex] ?? null,
      latestDate: timestamps[lastIndex] ? new Date(timestamps[lastIndex] * 1000).toISOString().slice(0, 10) : null,
    },
    onchainAddressSeeds: {
      ethereum: ETH_GEMINI_ADDRESS_SEEDS,
      caveat: "These are labeled Ethereum seeds, useful for custody/flow tracking. They do not measure internal matched trading volume or prediction-market contract revenue directly.",
    },
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const events = await collectPredictionEvents();
  const [tradeSamples, spotRows, stockChart] = await Promise.all([
    collectPredictionTradeSample(events),
    collectSpotTickerSnapshot(),
    collectStockChart(),
  ]);
  const summary = buildSummary({ events, tradeSamples, spotRows, stockChart });
  const payload = {
    summary,
    raw: {
      predictionEvents: events,
      predictionTradeSamples: tradeSamples,
      spotTickerSnapshot: spotRows,
      stockChart,
    },
    sources: {
      geminiPredictionEvents: "https://api.gemini.com/v1/prediction-markets/events",
      geminiTrades: "https://api.gemini.com/v1/trades/{symbol}",
      geminiSpotSymbols: "https://api.gemini.com/v1/symbols",
      geminiSpotTicker: "https://api.gemini.com/v1/pubticker/{symbol}",
      geminiPredictionFees: "https://www.gemini.com/fees/predictions",
      geminiQ1Release: "https://www.globenewswire.com/news-release/2026/05/14/3295435/0/en/gemini-reports-first-quarter-2026-results-and-announces-100-million-strategic-investment.html",
      ethAddressSeedSource: "https://raw.githubusercontent.com/hop-protocol/hop-airdrop/master/src/data/blacklists/blacklist.ts",
    },
  };
  await fs.writeFile(new URL("./gemi_snapshot.json", OUT_DIR), JSON.stringify(payload, null, 2));
  await fs.writeFile(new URL("./prediction_top_events.json", OUT_DIR), JSON.stringify(summary.predictionMarkets.topEvents, null, 2));
  await fs.writeFile(new URL("./spot_top_pairs.json", OUT_DIR), JSON.stringify(summary.spotExchange.topPairs, null, 2));
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
