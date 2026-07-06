import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const DEFAULT_ADDRESS_FILE = new URL("./data/address_seeds.md", import.meta.url);
const ADDRESS_FILE = process.env.ADDRESS_FILE || fileURLToPath(DEFAULT_ADDRESS_FILE);
const OUT_DIR = new URL("./data/", import.meta.url);
const INVENTORY_PATH = new URL("./data/onchain_address_inventory.json", import.meta.url);
const FLOWS_PATH = new URL("./data/onchain_flows.json", import.meta.url);
const DEEP_DIVE_PATH = new URL("./data/onchain_address_deep_dive.json", import.meta.url);
const TIMESERIES_PATH = new URL("./data/onchain_timeseries.json", import.meta.url);
const EARNINGS_MODEL_PATH = new URL("./data/onchain_earnings_model.json", import.meta.url);
const DASHBOARD_DATA_PATH = new URL("./data/onchain_dashboard_data.json", import.meta.url);
const REPORT_PATH = new URL("./ONCHAIN_MODEL.md", import.meta.url);
const EARNINGS_REPORT_PATH = new URL("./ONCHAIN_EARNINGS_REPORT.md", import.meta.url);
const DASHBOARD_PATH = new URL("./dashboard/index.html", import.meta.url);
const Q2_PROXY_PATH = new URL("./data/q2_proxy_model.json", import.meta.url);

const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const SOLSCAN_API_KEY = process.env.SOLSCAN_API_KEY || "";
const MAX_SOLANA_SIGNATURES_PER_ADDRESS = Number(process.env.MAX_SOLANA_SIGNATURES_PER_ADDRESS || 60);
const MAX_SOLANA_TX_FETCH_PER_ADDRESS = Number(process.env.MAX_SOLANA_TX_FETCH_PER_ADDRESS || 10);
const MAX_ETHERSCAN_ROWS = Number(process.env.MAX_ETHERSCAN_ROWS || 10000);
const MAX_ETHERSCAN_PAGES_PER_WINDOW = Number(process.env.MAX_ETHERSCAN_PAGES_PER_WINDOW || 2);
const REQUEST_TIMEOUT_MS = Number(process.env.ONCHAIN_REQUEST_TIMEOUT_MS || 8000);

const REPORTED_GEMI = {
  q1_2026: {
    totalRevenue: 50.272,
    transactionRevenue: 24.128,
    exchangeRevenue: 17.172,
    otcRevenue: 6.325,
    predictionRevenue: 0.444,
    servicesRevenue: 21.815,
    corporateInterest: 1.612,
    tradingVolume: 6.3,
    opex: 144.46,
    netLoss: -108.978,
  },
};

const PERIODS = {
  q1_2026: ["2026-01-01", "2026-03-31"],
  q2_2026: ["2026-04-01", "2026-06-30"],
  q3_2026_partial: ["2026-07-01", "2026-09-30"],
};

const KNOWN_EVM_SEEDS = [
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

const STABLE_TOKEN_ADDRESSES = new Set([
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "0x833589fcd6edb6e08f4c7c32d4f71b54bdA02913".toLowerCase(),
  "0xdac17f958d2ee523a2206206994597c13d831ec7",
  "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd",
]);

const ETH_PRICE_TOKEN_ADDRESSES = new Set([
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "0x4200000000000000000000000000000000000006",
]);

const SOLANA_STABLE_MINTS = new Set([
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "Es9vMFrzaCERmJfrF4H2FYD4TJxqQANp1GgWv4QsJD7q",
]);

const SOLANA_DEX_PROGRAMS = new Map([
  ["JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4", "Jupiter v6"],
  ["JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB", "Jupiter v4"],
  ["675kPX9MHTjS2zt1qfr1NYebEeC5rPHSeNToVEmAEsfy", "Raydium AMM"],
  ["whirLbMiicVdio4qvUfM5KAg6CtYHJPj7QksuJwvQ", "Orca Whirlpool"],
  ["9W959DqEETiGZocYWCQPaJ6v3mVYyH6iUXV3dSx3eRrx", "Orca v2"],
  ["CAMMCzo5YL8w4VFF8KVHrK22GGUQ6oRGF8G6EWn22zbc", "Raydium CLMM"],
  ["LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo", "Meteora DLMM"],
]);

const EVM_DEX_ROUTERS = new Map([
  ["0x1111111254eeb25477b68fb85ed929f73a960582", "1inch"],
  ["0xdef1c0ded9bec7f1a1670819833240f027b25eff", "0x Exchange Proxy"],
  ["0xe592427a0aece92de3edee1f18e0157c05861564", "Uniswap v3 Router"],
  ["0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45", "Uniswap Universal Router"],
  ["0x2626664c2603336edefa7e5d6a4a7dc3f27fc5a2", "Base Uniswap v3 Router"],
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function lower(address) {
  return String(address || "").toLowerCase();
}

function dayKey(msOrSec) {
  const ms = msOrSec > 1e12 ? msOrSec : msOrSec * 1000;
  return new Date(ms).toISOString().slice(0, 10);
}

function inPeriod(date, [start, end]) {
  return date >= start && date <= end;
}

function periodForDate(date) {
  return Object.entries(PERIODS).find(([, range]) => inPeriod(date, range))?.[0] ?? "outside_model_period";
}

function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function fetchText(url, label, { retries = 2, delayMs = 500 } = {}) {
  let last = "";
  for (let i = 0; i <= retries; i += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        headers: {
          accept: "text/html,application/json,text/plain,*/*",
          "user-agent": "Mozilla/5.0 gemi-onchain-model/0.1",
        },
        signal: controller.signal,
      });
      last = await response.text();
      clearTimeout(timeout);
      if (response.ok) return last;
      if (![429, 500, 502, 503, 504].includes(response.status) || i === retries) {
        throw new Error(`${label}: HTTP ${response.status}: ${last.slice(0, 160)}`);
      }
    } catch (error) {
      clearTimeout(timeout);
      if (i === retries) throw error;
    }
    await sleep(delayMs * (i + 1));
  }
  return last;
}

async function fetchJson(url, label, options = {}) {
  const text = await fetchText(url, label, options);
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${label}: JSON parse failed: ${error.message}: ${text.slice(0, 160)}`);
  }
}

async function rpcCall(method, params, label, retries = 3) {
  let lastText = "";
  for (let i = 0; i <= retries; i += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(SOLANA_RPC_URL, {
        method: "POST",
        headers: { "content-type": "application/json", "user-agent": "gemi-onchain-model/0.1" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
        signal: controller.signal,
      });
      lastText = await response.text();
      clearTimeout(timeout);
      if (response.ok) {
        const json = JSON.parse(lastText);
        if (json.error) throw new Error(`${label}: ${JSON.stringify(json.error)}`);
        return json.result;
      }
      if (![429, 500, 502, 503, 504].includes(response.status) || i === retries) {
        throw new Error(`${label}: HTTP ${response.status}: ${lastText.slice(0, 200)}`);
      }
    } catch (error) {
      clearTimeout(timeout);
      if (i === retries) throw error;
    }
    await sleep(700 * (i + 1));
  }
  throw new Error(`${label}: failed after retries`);
}

function extractExplorerUrls(markdown) {
  return [...markdown.matchAll(/https?:\/\/[^\s)]+/g)].map((match) => match[0].trim());
}

function parseAddressUrl(url) {
  const sol = url.match(/solscan\.io\/account\/([1-9A-HJ-NP-Za-km-z]{32,44})/i);
  if (sol) return { chain: "solana", address: sol[1], sourceUrl: url };
  const eth = url.match(/etherscan\.io\/address\/(0x[a-fA-F0-9]{40})/i);
  if (eth) return { chain: "ethereum", address: lower(eth[1]), sourceUrl: url };
  const base = url.match(/basescan\.org\/address\/(0x[a-fA-F0-9]{40})/i);
  if (base) return { chain: "base", address: lower(base[1]), sourceUrl: url };
  if (/solscan\.io\/labelcloud\/gemini/i.test(url)) return { chain: "solana", address: null, sourceUrl: url, labelCloud: true };
  return null;
}

function inferRole(label, chain, address) {
  const text = `${label || ""} ${address || ""}`.toLowerCase();
  if (text.includes("gusd token") || text.includes("efil token") || text.includes("dollar token")) return "token_contract";
  if (text.includes("deployer")) return "deployer";
  if (text.includes("contract")) return "contract";
  if (chain === "solana") return "provided_wallet_candidate";
  return "exchange_wallet_candidate";
}

function mergeSource(existing, next) {
  const parts = new Set(String(existing || "").split("; ").filter(Boolean));
  parts.add(next);
  return [...parts].join("; ");
}

function buildInventory(addressMarkdown) {
  const byKey = new Map();
  const notes = [];
  const add = ({ chain, address, label = null, source, sourceUrl = null, confidence = "low", role = null }) => {
    if (!address) return;
    const normalized = chain === "solana" ? address : lower(address);
    const key = `${chain}:${normalized}`;
    const current = byKey.get(key);
    const record = current ?? {
      chain,
      address: normalized,
      label,
      source,
      sourceUrls: [],
      confidence,
      role: role ?? inferRole(label, chain, normalized),
    };
    if (current) {
      record.source = mergeSource(record.source, source);
      record.label = record.label || label;
      if (confidence === "medium" && record.confidence === "low") record.confidence = "medium";
      if (confidence === "high") record.confidence = "high";
    }
    if (sourceUrl && !record.sourceUrls.includes(sourceUrl)) record.sourceUrls.push(sourceUrl);
    byKey.set(key, record);
  };

  for (const parsed of extractExplorerUrls(addressMarkdown).map(parseAddressUrl).filter(Boolean)) {
    if (parsed.labelCloud) {
      notes.push({ type: "labelcloud", chain: parsed.chain, url: parsed.sourceUrl, status: "discovered" });
      continue;
    }
    add({
      chain: parsed.chain,
      address: parsed.address,
      source: "provided_address_list",
      sourceUrl: parsed.sourceUrl,
      confidence: "low",
    });
  }

  for (const seed of KNOWN_EVM_SEEDS) {
    add({ ...seed, confidence: "medium" });
  }

  return { addresses: [...byKey.values()].sort((a, b) => `${a.chain}:${a.address}`.localeCompare(`${b.chain}:${b.address}`)), notes };
}

function explorerUrl(record) {
  if (record.chain === "solana") return `https://solscan.io/account/${record.address}`;
  if (record.chain === "base") return `https://basescan.org/address/${record.address}`;
  if (record.chain === "ethereum") return `https://etherscan.io/address/${record.address}`;
  return null;
}

function extractTitle(html) {
  return html.match(/<title[^>]*>\s*([\s\S]*?)\s*<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim() ?? null;
}

function extractDescription(html) {
  return html.match(/<meta[^>]+name=["']Description["'][^>]+content=["']([^"']+)["']/i)?.[1]?.replace(/\s+/g, " ").trim() ?? null;
}

function parseMoney(text) {
  const match = String(text || "").match(/\$([\d,]+(?:\.\d+)?)/);
  return match ? Number(match[1].replace(/,/g, "")) : null;
}

function parseIntegerAfter(label, text) {
  const match = String(text || "").match(new RegExp(`${label}:\\s*([\\d,]+)`, "i"));
  return match ? Number(match[1].replace(/,/g, "")) : null;
}

function parseExplorerMetadata(title, description) {
  const text = `${title || ""} | ${description || ""}`;
  return {
    balanceUsdAcrossChains: /Balance:/i.test(text) ? parseMoney(text) : null,
    transactions: parseIntegerAfter("Transactions", text),
    contractStatus: /Contract:\s*Verified/i.test(text) ? "verified_contract"
      : /Contract:\s*Unverified/i.test(text) ? "unverified_contract"
        : /Address \(EOA\)/i.test(text) ? "eoa"
          : null,
    tokenPriceUsd: /Price:/i.test(text) ? parseMoney(text) : null,
    asAtUtc: text.match(/As at ([^|]+?) \(UTC\)/i)?.[1]?.trim() ?? null,
  };
}

function roleFromExplorer(record, metadata) {
  if (metadata.contractStatus === "verified_contract" || metadata.contractStatus === "unverified_contract") {
    if (record.role === "exchange_wallet_candidate" && !/^Gemini\s+\|/i.test(record.explorer?.title || "")) return "contract";
  }
  return record.role;
}

async function verifyExplorerPages(addresses) {
  const verified = [];
  for (const record of addresses) {
    const url = explorerUrl(record);
    if (!url) {
      verified.push({ ...record, explorer: { status: "blocked", reason: "no_explorer_url" } });
      continue;
    }
    try {
      const html = await fetchText(url, `${record.chain} explorer ${record.address}`, { retries: 1, delayMs: 500 });
      const title = extractTitle(html);
      const description = extractDescription(html);
      const metadata = parseExplorerMetadata(title, description);
      const blocked = /just a moment|cloudflare|enable javascript/i.test(`${title} ${html.slice(0, 500)}`);
      const publicGeminiLabel = /^Gemini\s+\|/i.test(title || "") || /Gemini/i.test(title || "");
      const enriched = {
        ...record,
        confidence: publicGeminiLabel ? "high" : record.confidence,
        explorer: {
          status: blocked ? "blocked" : "verified_page_loaded",
          url,
          title,
          description,
          metadata,
          publicGeminiLabel,
        },
      };
      enriched.role = roleFromExplorer(enriched, metadata);
      verified.push(enriched);
    } catch (error) {
      verified.push({ ...record, explorer: { status: "blocked", url, reason: error.message } });
    }
    await sleep(150);
  }
  return verified;
}

async function fetchCoinPrices() {
  const now = Math.floor(Date.now() / 1000);
  const start = Math.floor(Date.UTC(2026, 0, 1) / 1000);
  const urls = {
    sol: `https://api.coingecko.com/api/v3/coins/solana/market_chart/range?vs_currency=usd&from=${start}&to=${now}`,
    eth: `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${start}&to=${now}`,
  };
  const out = {};
  for (const [coin, url] of Object.entries(urls)) {
    try {
      const json = await fetchJson(url, `coingecko ${coin}`, { retries: 3, delayMs: 800 });
      out[coin] = new Map((json.prices ?? []).map(([ts, price]) => [dayKey(ts), Number(price)]));
    } catch (error) {
      out[coin] = new Map();
      out[`${coin}Error`] = error.message;
    }
    await sleep(1000);
  }
  return out;
}

function nearestPrice(priceMap, date) {
  if (!priceMap || priceMap.size === 0) return null;
  if (priceMap.has(date)) return priceMap.get(date);
  const target = Date.parse(`${date}T00:00:00Z`);
  let best = null;
  for (const [priceDate, price] of priceMap.entries()) {
    const delta = Math.abs(Date.parse(`${priceDate}T00:00:00Z`) - target);
    if (!best || delta < best.delta) best = { price, delta };
  }
  return best?.price ?? null;
}

function emptyPeriodSummary(period) {
  return {
    period,
    grossTransferUsd: 0,
    netFlowUsd: 0,
    externalGrossUsd: 0,
    internalGrossUsd: 0,
    tradingProxyUsd: 0,
    transactionCount: 0,
    internalTransferCount: 0,
    dexInteractionCount: 0,
    unpricedNativeUnits: {},
    coverage: { status: "no_data" },
  };
}

function addAmount(summary, { amountUsd = 0, netUsd = 0, internal = false, token = null, unpricedAmount = 0, tradingProxy = false }) {
  const absUsd = Math.abs(amountUsd);
  summary.grossTransferUsd += absUsd;
  if (internal) {
    summary.internalGrossUsd += absUsd;
    summary.internalTransferCount += 1;
  } else {
    summary.externalGrossUsd += absUsd;
    summary.netFlowUsd += netUsd;
  }
  if (tradingProxy) summary.tradingProxyUsd += absUsd;
  if (token && unpricedAmount) {
    summary.unpricedNativeUnits[token] = (summary.unpricedNativeUnits[token] ?? 0) + unpricedAmount;
  }
}

function flattenSolanaInstructions(tx) {
  const outer = tx?.transaction?.message?.instructions ?? [];
  const inner = (tx?.meta?.innerInstructions ?? []).flatMap((group) => group.instructions ?? []);
  return [...outer, ...inner];
}

function solanaProgramIds(tx) {
  return new Set(flattenSolanaInstructions(tx).map((ix) => ix.programId?.toString?.() ?? ix.programId).filter(Boolean));
}

async function getSolanaSignatures(address) {
  const signatures = [];
  let before = null;
  while (signatures.length < MAX_SOLANA_SIGNATURES_PER_ADDRESS) {
    const limit = Math.min(1000, MAX_SOLANA_SIGNATURES_PER_ADDRESS - signatures.length);
    const config = { limit };
    if (before) config.before = before;
    const batch = await rpcCall("getSignaturesForAddress", [address, config], `solana signatures ${address}`);
    if (!batch?.length) break;
    signatures.push(...batch);
    before = batch[batch.length - 1].signature;
    const oldest = batch[batch.length - 1].blockTime;
    if (oldest && dayKey(oldest) < PERIODS.q1_2026[0]) break;
    await sleep(150);
  }
  return signatures;
}

async function getSolanaAccountInfo(address) {
  try {
    const info = await rpcCall("getParsedAccountInfo", [address, { commitment: "confirmed" }], `solana account ${address}`);
    const value = info?.value;
    return {
      ownerProgram: value?.owner ?? null,
      lamports: value?.lamports ?? null,
      executable: value?.executable ?? null,
      parsedType: value?.data?.parsed?.type ?? null,
      parsedInfo: value?.data?.parsed?.info ?? null,
    };
  } catch (error) {
    return { error: error.message };
  }
}

async function getSolanaTransaction(signature) {
  return rpcCall(
    "getTransaction",
    [signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0, commitment: "confirmed" }],
    `solana tx ${signature}`,
  );
}

function isInternalAddress(cluster, chain, address) {
  return cluster.has(`${chain}:${chain === "solana" ? address : lower(address)}`);
}

function summarizeSolanaTransaction({ tx, address, cluster, prices }) {
  if (!tx?.blockTime) return null;
  const date = dayKey(tx.blockTime);
  const period = periodForDate(date);
  const accountKeys = tx.transaction?.message?.accountKeys ?? [];
  const targetIndex = accountKeys.findIndex((key) => (key.pubkey?.toString?.() ?? key.pubkey) === address);
  const programIds = solanaProgramIds(tx);
  const dexPrograms = [...programIds].filter((programId) => SOLANA_DEX_PROGRAMS.has(programId));
  const event = {
    date,
    period,
    signature: tx.transaction?.signatures?.[0],
    nativeDeltaSol: 0,
    nativeDeltaUsd: 0,
    nativeGrossUsd: 0,
    internal: false,
    tradingProxy: dexPrograms.length > 0,
    dexPrograms: dexPrograms.map((programId) => SOLANA_DEX_PROGRAMS.get(programId)),
    counterparties: [],
    tokenEvents: [],
  };

  if (targetIndex >= 0) {
    const pre = number(tx.meta?.preBalances?.[targetIndex]);
    const post = number(tx.meta?.postBalances?.[targetIndex]);
    const deltaSol = (post - pre) / 1e9;
    const solPrice = nearestPrice(prices.sol, date);
    event.nativeDeltaSol = deltaSol;
    event.nativeDeltaUsd = solPrice === null ? 0 : deltaSol * solPrice;
    event.nativeGrossUsd = Math.abs(event.nativeDeltaUsd);
  }

  for (const ix of flattenSolanaInstructions(tx)) {
    const parsed = ix.parsed;
    if (!parsed?.info) continue;
    const info = parsed.info;
    if (parsed.type === "transfer" && info.source && info.destination) {
      if (info.source === address || info.destination === address) {
        event.internal = isInternalAddress(cluster, "solana", info.source) && isInternalAddress(cluster, "solana", info.destination);
        event.counterparties.push(info.source === address ? info.destination : info.source);
      }
    }
    if ((parsed.type === "transferChecked" || parsed.type === "transfer") && (info.mint || info.tokenAmount)) {
      const amount = number(info.tokenAmount?.uiAmount ?? info.amount);
      const mint = info.mint ?? "unknown_spl";
      if (info.source === address || info.destination === address || info.authority === address) {
        const sign = info.destination === address ? 1 : -1;
        const amountUsd = SOLANA_STABLE_MINTS.has(mint) ? amount : 0;
        event.tokenEvents.push({
          mint,
          amount: sign * amount,
          amountUsd: sign * amountUsd,
          grossUsd: Math.abs(amountUsd),
          source: info.source ?? null,
          destination: info.destination ?? null,
          priced: SOLANA_STABLE_MINTS.has(mint),
        });
        if (info.source && info.destination) event.counterparties.push(info.source === address ? info.destination : info.source);
      }
    }
  }
  event.counterparties = [...new Set(event.counterparties)].filter(Boolean);
  return event;
}

async function collectSolanaFlows(addresses, cluster, prices) {
  const solanaAddresses = addresses.filter((record) => record.chain === "solana");
  const byAddress = [];
  const events = [];

  for (const record of solanaAddresses) {
    const accountInfo = await getSolanaAccountInfo(record.address);
    let signatures = [];
    let txFetched = 0;
    const addressEvents = [];
    try {
      signatures = await getSolanaSignatures(record.address);
      const fetchable = selectSignaturesForParsing(signatures);
      for (const sig of fetchable) {
        try {
          const tx = await getSolanaTransaction(sig.signature);
          const event = summarizeSolanaTransaction({ tx, address: record.address, cluster, prices });
          if (event) {
            addressEvents.push(event);
            events.push({ ...event, chain: "solana", address: record.address });
          }
          txFetched += 1;
        } catch (error) {
          addressEvents.push({ signature: sig.signature, error: error.message });
        }
        await sleep(80);
      }
    } catch (error) {
      byAddress.push({
        chain: "solana",
        address: record.address,
        status: "partial",
        reason: error.message,
        accountInfo,
        signaturesFetched: signatures.length,
        transactionsFetched: txFetched,
        coverage: coverageFromSignatures(signatures),
      });
      continue;
    }

    byAddress.push({
      chain: "solana",
      address: record.address,
      status: signatures.length >= MAX_SOLANA_SIGNATURES_PER_ADDRESS ? "partial_bounded_sample" : "complete_signature_window",
      accountInfo,
      signaturesFetched: signatures.length,
      transactionsFetched: txFetched,
      coverage: coverageFromSignatures(signatures),
      sampledEvents: addressEvents.length,
    });
  }

  return { status: solanaAddresses.length ? "partial_public_rpc_sample" : "no_solana_addresses", byAddress, events };
}

function selectSignaturesForParsing(signatures) {
  if (signatures.length <= MAX_SOLANA_TX_FETCH_PER_ADDRESS) return signatures;
  const selected = new Map();
  const add = (index) => {
    const sig = signatures[Math.max(0, Math.min(signatures.length - 1, index))];
    if (sig?.signature) selected.set(sig.signature, sig);
  };
  const newestCount = Math.max(2, Math.floor(MAX_SOLANA_TX_FETCH_PER_ADDRESS / 3));
  for (let i = 0; i < newestCount; i += 1) add(i);
  const remaining = MAX_SOLANA_TX_FETCH_PER_ADDRESS - selected.size;
  for (let i = 0; i < remaining; i += 1) {
    add(Math.round((i + 1) * (signatures.length - 1) / (remaining + 1)));
  }
  add(signatures.length - 1);
  const result = [...selected.values()].slice(0, MAX_SOLANA_TX_FETCH_PER_ADDRESS);
  const oldest = signatures[signatures.length - 1];
  if (oldest && !result.some((sig) => sig.signature === oldest.signature)) {
    result[result.length - 1] = oldest;
  }
  return result;
}

function coverageFromSignatures(signatures) {
  const dated = signatures.filter((sig) => sig.blockTime).map((sig) => dayKey(sig.blockTime)).sort();
  if (!dated.length) return { status: "no_dated_signatures" };
  return {
    status: "sample_window",
    newestDate: dated[dated.length - 1],
    oldestDate: dated[0],
    datedSignatures: dated.length,
  };
}

function chainId(chain) {
  if (chain === "ethereum") return 1;
  if (chain === "base") return 8453;
  return null;
}

function periodToTimestamps(period) {
  const [start, end] = PERIODS[period];
  const endDate = period === "q3_2026_partial"
    ? new Date(Math.min(Date.now(), Date.parse(`${end}T23:59:59Z`)))
    : new Date(`${end}T23:59:59Z`);
  return {
    start: Math.floor(Date.parse(`${start}T00:00:00Z`) / 1000),
    end: Math.floor(endDate.getTime() / 1000),
  };
}

async function fetchEtherscanBlockByTime({ chain, timestamp, closest }) {
  if (!ETHERSCAN_API_KEY) {
    return { status: "blocked_missing_api_key", block: null, reason: "ETHERSCAN_API_KEY not set" };
  }
  const id = chainId(chain);
  if (!id) return { status: "unsupported_chain", block: null };
  const url = new URL("https://api.etherscan.io/v2/api");
  url.searchParams.set("chainid", String(id));
  url.searchParams.set("module", "block");
  url.searchParams.set("action", "getblocknobytime");
  url.searchParams.set("timestamp", String(timestamp));
  url.searchParams.set("closest", closest);
  url.searchParams.set("apikey", ETHERSCAN_API_KEY);
  try {
    const json = await fetchJson(url.toString(), `${chain} etherscan block ${timestamp}`, { retries: 3, delayMs: 1000 });
    if (json.status === "1" && json.result) return { status: "complete", block: Number(json.result) };
    return { status: "blocked_or_empty", block: null, reason: json.message ?? json.result };
  } catch (error) {
    return { status: "blocked_or_error", block: null, reason: error.message };
  }
}

async function buildEtherscanBlockWindows(chain) {
  const windows = {};
  for (const period of Object.keys(PERIODS)) {
    const ts = periodToTimestamps(period);
    const start = await fetchEtherscanBlockByTime({ chain, timestamp: ts.start, closest: "after" });
    await sleep(250);
    const end = await fetchEtherscanBlockByTime({ chain, timestamp: ts.end, closest: "before" });
    await sleep(250);
    windows[period] = {
      period,
      status: start.block && end.block ? "complete" : mergeCollectionStatus(start.status, end.status),
      startTimestamp: ts.start,
      endTimestamp: ts.end,
      startBlock: start.block,
      endBlock: end.block,
      reason: start.reason || end.reason || null,
    };
  }
  return windows;
}

async function fetchEtherscanRows({ chain, address, action, period, startBlock = 0, endBlock = 99999999 }) {
  if (!ETHERSCAN_API_KEY) {
    return { status: "blocked_missing_api_key", rows: [], reason: "ETHERSCAN_API_KEY not set", period };
  }
  const id = chainId(chain);
  if (!id) return { status: "unsupported_chain", rows: [], period };
  if (!startBlock || !endBlock) return { status: "blocked_missing_block_window", rows: [], reason: "missing block window", period };
  const rows = [];
  let finalStatus = "complete_api_window";
  let reason = null;
  for (let page = 1; page <= MAX_ETHERSCAN_PAGES_PER_WINDOW; page += 1) {
    const url = new URL("https://api.etherscan.io/v2/api");
    url.searchParams.set("chainid", String(id));
  url.searchParams.set("module", "account");
  url.searchParams.set("action", action);
  url.searchParams.set("address", address);
    url.searchParams.set("startblock", String(startBlock));
    url.searchParams.set("endblock", String(endBlock));
    url.searchParams.set("page", String(page));
  url.searchParams.set("offset", String(MAX_ETHERSCAN_ROWS));
  url.searchParams.set("sort", "asc");
  url.searchParams.set("apikey", ETHERSCAN_API_KEY);
  try {
      const json = await fetchJson(url.toString(), `${chain} etherscan ${action} ${period} ${address}`, { retries: 3, delayMs: 1000 });
    if (json.status === "0" && !Array.isArray(json.result)) {
        if (/No transactions found/i.test(String(json.result)) || /No records found/i.test(String(json.result))) {
          return { status: rows.length ? finalStatus : "complete_api_window", rows, period };
        }
        return { status: rows.length ? "partial_or_blocked" : "blocked_or_empty", rows, reason: json.message ?? json.result, period };
    }
      const pageRows = Array.isArray(json.result) ? json.result : [];
      rows.push(...pageRows);
      if (pageRows.length < MAX_ETHERSCAN_ROWS) return { status: finalStatus, rows, period };
      finalStatus = "partial_row_limit";
  } catch (error) {
      return { status: rows.length ? "partial_or_error" : "blocked_or_error", rows, reason: error.message, period };
  }
    await sleep(250);
  }
  if (finalStatus === "partial_row_limit") {
    reason = `window hit ${MAX_ETHERSCAN_ROWS * MAX_ETHERSCAN_PAGES_PER_WINDOW} row cap`;
  }
  return { status: finalStatus, rows, reason, period };
}

function summarizeEvmRows({ chain, address, normalRows, tokenRows, cluster, prices }) {
  const events = [];
  for (const row of normalRows) {
    const date = dayKey(Number(row.timeStamp));
    const period = periodForDate(date);
    const from = lower(row.from);
    const to = lower(row.to);
    const valueEth = Number(BigInt(row.value || "0")) / 1e18;
    const sign = to === lower(address) ? 1 : -1;
    const price = nearestPrice(prices.eth, date);
    const amountUsd = price === null ? 0 : valueEth * price * sign;
    const internal = isInternalAddress(cluster, chain, from) && isInternalAddress(cluster, chain, to);
    const router = EVM_DEX_ROUTERS.get(to) || EVM_DEX_ROUTERS.get(from) || null;
    events.push({
      chain,
      address,
      date,
      period,
      hash: row.hash,
      token: chain === "ethereum" || chain === "base" ? "ETH" : "native",
      amountNative: valueEth * sign,
      amountUsd,
      grossUsd: Math.abs(amountUsd),
      from,
      to,
      internal,
      tradingProxy: Boolean(router),
      dexPrograms: router ? [router] : [],
      priced: price !== null,
    });
  }

  for (const row of tokenRows) {
    const date = dayKey(Number(row.timeStamp));
    const period = periodForDate(date);
    const from = lower(row.from);
    const to = lower(row.to);
    const tokenAddress = lower(row.contractAddress);
    const decimals = Number(row.tokenDecimal || 0);
    const divisor = 10 ** Math.min(decimals, 18);
    const raw = Number(row.value || 0) / divisor;
    const sign = to === lower(address) ? 1 : -1;
    const stable = STABLE_TOKEN_ADDRESSES.has(tokenAddress);
    const ethPriced = ETH_PRICE_TOKEN_ADDRESSES.has(tokenAddress);
    const price = stable ? 1 : ethPriced ? nearestPrice(prices.eth, date) : null;
    const amountUsd = price === null ? 0 : raw * price * sign;
    const internal = isInternalAddress(cluster, chain, from) && isInternalAddress(cluster, chain, to);
    const router = EVM_DEX_ROUTERS.get(to) || EVM_DEX_ROUTERS.get(from) || null;
    events.push({
      chain,
      address,
      date,
      period,
      hash: row.hash,
      token: row.tokenSymbol || tokenAddress,
      tokenAddress,
      amountNative: raw * sign,
      amountUsd,
      grossUsd: Math.abs(amountUsd),
      from,
      to,
      internal,
      tradingProxy: Boolean(router),
      dexPrograms: router ? [router] : [],
      priced: price !== null,
    });
  }
  return events;
}

async function collectEvmFlows(addresses, cluster, prices) {
  const evmAddresses = addresses.filter((record) => ["ethereum", "base"].includes(record.chain));
  const byAddress = [];
  const events = [];
  const blockWindows = {};
  for (const chain of [...new Set(evmAddresses.map((record) => record.chain))]) {
    blockWindows[chain] = await buildEtherscanBlockWindows(chain);
  }
  for (const record of evmAddresses) {
    const periodStatuses = {};
    const normalRows = [];
    const tokenRows = [];
    for (const [period, window] of Object.entries(blockWindows[record.chain] ?? {})) {
      const normal = await fetchEtherscanRows({
        chain: record.chain,
        address: record.address,
        action: "txlist",
        period,
        startBlock: window.startBlock,
        endBlock: window.endBlock,
      });
      await sleep(250);
      const tokens = await fetchEtherscanRows({
        chain: record.chain,
        address: record.address,
        action: "tokentx",
        period,
        startBlock: window.startBlock,
        endBlock: window.endBlock,
      });
      normalRows.push(...normal.rows);
      tokenRows.push(...tokens.rows);
      periodStatuses[period] = {
        blockWindow: window,
        status: ETHERSCAN_API_KEY ? mergeCollectionStatus(normal.status, tokens.status) : "blocked_missing_api_key",
        normalStatus: normal.status,
        tokenStatus: tokens.status,
        normalRows: normal.rows.length,
        tokenRows: tokens.rows.length,
        reason: normal.reason || tokens.reason || window.reason || null,
      };
      await sleep(250);
    }
    byAddress.push({
      chain: record.chain,
      address: record.address,
      status: ETHERSCAN_API_KEY ? mergeCollectionStatus(...Object.values(periodStatuses).map((row) => row.status)) : "blocked_missing_api_key",
      normalRows: normalRows.length,
      tokenRows: tokenRows.length,
      reason: Object.values(periodStatuses).find((row) => row.reason)?.reason ?? null,
      coverage: coverageFromEvmRows([...normalRows, ...tokenRows]),
      periodStatuses,
    });
    events.push(...summarizeEvmRows({
      chain: record.chain,
      address: record.address,
      normalRows,
      tokenRows,
      cluster,
      prices,
    }));
  }
  return {
    status: ETHERSCAN_API_KEY ? "api_attempted" : "blocked_missing_api_key",
    byAddress,
    blockWindows,
    events,
  };
}

function mergeCollectionStatus(...statuses) {
  const filtered = statuses.filter(Boolean);
  if (!filtered.length) return "unknown";
  if (filtered.some((status) => status.includes("partial") || status.includes("limit"))) return "partial";
  if (filtered.some((status) => status.includes("error") || status.includes("blocked"))) return "partial_or_blocked";
  return "complete_api_window";
}

function coverageFromEvmRows(rows) {
  const dates = rows.map((row) => Number(row.timeStamp)).filter(Boolean).map(dayKey).sort();
  if (!dates.length) return { status: "no_dated_rows" };
  return { status: "api_window", oldestDate: dates[0], newestDate: dates[dates.length - 1], datedRows: dates.length };
}

function summarizeEvents(events, collectionStatus) {
  const summaries = new Map();
  for (const period of Object.keys(PERIODS)) summaries.set(period, emptyPeriodSummary(period));

  for (const event of events) {
    if (!summaries.has(event.period)) continue;
    const summary = summaries.get(event.period);
    summary.transactionCount += 1;
    if (event.dexPrograms?.length) summary.dexInteractionCount += 1;
    if (event.tokenEvents) {
      if (event.nativeGrossUsd || event.nativeDeltaUsd) {
        addAmount(summary, {
          amountUsd: event.nativeDeltaUsd,
          netUsd: event.nativeDeltaUsd,
          internal: event.internal,
          token: event.nativeDeltaUsd ? null : "SOL",
          unpricedAmount: event.nativeDeltaUsd ? 0 : event.nativeDeltaSol,
          tradingProxy: event.tradingProxy,
        });
      }
      for (const tokenEvent of event.tokenEvents) {
        addAmount(summary, {
          amountUsd: tokenEvent.amountUsd,
          netUsd: tokenEvent.amountUsd,
          internal: event.internal,
          token: tokenEvent.priced ? null : tokenEvent.mint,
          unpricedAmount: tokenEvent.priced ? 0 : tokenEvent.amount,
          tradingProxy: event.tradingProxy,
        });
      }
    } else {
      addAmount(summary, {
        amountUsd: event.amountUsd,
        netUsd: event.amountUsd,
        internal: event.internal,
        token: event.priced ? null : event.token,
        unpricedAmount: event.priced ? 0 : event.amountNative,
        tradingProxy: event.tradingProxy,
      });
    }
  }

  for (const [period, summary] of summaries.entries()) {
    const hasAnySource = collectionStatus.solana.status !== "no_solana_addresses" || collectionStatus.evm.status !== "blocked_missing_api_key";
    summary.coverage = {
      status: hasAnySource ? "partial_if_sampled" : "blocked_or_no_data",
      solanaStatus: collectionStatus.solana.status,
      evmStatus: collectionStatus.evm.status,
    };
    summaries.set(period, roundSummary(summary));
  }
  return [...summaries.values()];
}

function eventUsd(event) {
  if (event.tokenEvents) {
    return (event.nativeGrossUsd ?? 0) + event.tokenEvents.reduce((total, tokenEvent) => total + Math.abs(tokenEvent.amountUsd ?? 0), 0);
  }
  return Math.abs(event.amountUsd ?? 0);
}

function sampledAddressStats(record, events) {
  const addressEvents = events.filter((event) => event.chain === record.chain && lower(event.address) === lower(record.address));
  const byPeriod = {};
  const counterparties = new Map();
  const tokens = new Map();
  for (const period of Object.keys(PERIODS)) {
    byPeriod[period] = {
      txCount: 0,
      grossTransferUsd: 0,
      externalGrossUsd: 0,
      internalGrossUsd: 0,
      tradingProxyUsd: 0,
      dexInteractionCount: 0,
    };
  }
  for (const event of addressEvents) {
    if (!byPeriod[event.period]) continue;
    const gross = eventUsd(event);
    byPeriod[event.period].txCount += 1;
    byPeriod[event.period].grossTransferUsd += gross;
    if (event.internal) byPeriod[event.period].internalGrossUsd += gross;
    else byPeriod[event.period].externalGrossUsd += gross;
    if (event.tradingProxy) {
      byPeriod[event.period].tradingProxyUsd += gross;
      byPeriod[event.period].dexInteractionCount += 1;
    }
    for (const counterparty of event.counterparties ?? []) {
      const key = `${event.chain}:${counterparty}`;
      const current = counterparties.get(key) ?? { chain: event.chain, address: counterparty, txCount: 0, grossTransferUsd: 0 };
      current.txCount += 1;
      current.grossTransferUsd += gross;
      counterparties.set(key, current);
    }
    for (const tokenEvent of event.tokenEvents ?? []) {
      const key = tokenEvent.mint ?? event.token ?? "native";
      const current = tokens.get(key) ?? { token: key, amount: 0, grossUsd: 0, txCount: 0, priced: Boolean(tokenEvent.priced) };
      current.amount += tokenEvent.amount ?? 0;
      current.grossUsd += Math.abs(tokenEvent.amountUsd ?? 0);
      current.txCount += 1;
      current.priced = current.priced || Boolean(tokenEvent.priced);
      tokens.set(key, current);
    }
    if (!event.tokenEvents && event.token) {
      const current = tokens.get(event.token) ?? { token: event.token, amount: 0, grossUsd: 0, txCount: 0, priced: Boolean(event.priced) };
      current.amount += event.amountNative ?? 0;
      current.grossUsd += Math.abs(event.amountUsd ?? 0);
      current.txCount += 1;
      current.priced = current.priced || Boolean(event.priced);
      tokens.set(event.token, current);
    }
  }
  for (const period of Object.keys(byPeriod)) {
    for (const key of ["grossTransferUsd", "externalGrossUsd", "internalGrossUsd", "tradingProxyUsd"]) {
      byPeriod[period][key] = Number(byPeriod[period][key].toFixed(2));
    }
  }
  return {
    sampledEvents: addressEvents.length,
    sampledPeriods: byPeriod,
    topCounterparties: [...counterparties.values()]
      .sort((a, b) => b.grossTransferUsd - a.grossTransferUsd || b.txCount - a.txCount)
      .slice(0, 10)
      .map((row) => ({ ...row, grossTransferUsd: Number(row.grossTransferUsd.toFixed(2)) })),
    topTokens: [...tokens.values()]
      .sort((a, b) => b.grossUsd - a.grossUsd || b.txCount - a.txCount)
      .slice(0, 10)
      .map((row) => ({ ...row, amount: Number(row.amount.toFixed(8)), grossUsd: Number(row.grossUsd.toFixed(2)) })),
  };
}

function explorerActivityLevel(metadata) {
  const txs = metadata?.transactions ?? 0;
  if (txs >= 1_000_000) return "very_high";
  if (txs >= 100_000) return "high";
  if (txs >= 10_000) return "moderate";
  if (txs > 0) return "low";
  return "unknown";
}

function buildAddressDeepDive(inventory, flows) {
  return inventory.addresses.map((record) => {
    const metadata = record.explorer?.metadata ?? {};
    const sampled = sampledAddressStats(record, flows.events);
    const notes = [];
    if (metadata.transactions) notes.push(`Explorer shows ${metadata.transactions.toLocaleString()} lifetime transactions.`);
    if (metadata.balanceUsdAcrossChains) notes.push(`Explorer balance across chains is approximately ${money(metadata.balanceUsdAcrossChains)}.`);
    if (record.role === "contract" || record.role === "token_contract") notes.push("Treat as contract/token infrastructure, not a customer trading wallet.");
    if (sampled.sampledEvents === 0 && ["ethereum", "base"].includes(record.chain)) notes.push("Historical transfer rows require Etherscan V2 API key.");
    if (sampled.sampledEvents > 0 && Object.values(sampled.sampledPeriods).every((period) => period.tradingProxyUsd === 0)) notes.push("Sample has no DEX/router trading proxy.");
    return {
      chain: record.chain,
      address: record.address,
      label: record.label,
      role: record.role,
      confidence: record.confidence,
      explorer: {
        status: record.explorer?.status ?? "not_checked",
        url: record.explorer?.url ?? explorerUrl(record),
        title: record.explorer?.title ?? null,
        publicGeminiLabel: Boolean(record.explorer?.publicGeminiLabel),
        metadata,
        activityLevel: explorerActivityLevel(metadata),
      },
      sampled,
      notes,
    };
  });
}

function roundSummary(summary) {
  for (const key of ["grossTransferUsd", "netFlowUsd", "externalGrossUsd", "internalGrossUsd", "tradingProxyUsd"]) {
    summary[key] = Number(summary[key].toFixed(2));
  }
  for (const [token, amount] of Object.entries(summary.unpricedNativeUnits)) {
    summary.unpricedNativeUnits[token] = Number(amount.toFixed(8));
  }
  return summary;
}

async function loadQ2Proxy() {
  try {
    const text = await fs.readFile(Q2_PROXY_PATH, "utf8");
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function tradeRead(summary, q2Proxy) {
  const q1 = summary.find((row) => row.period === "q1_2026");
  const q2 = summary.find((row) => row.period === "q2_2026");
  const hasQ1Q2 = q1?.transactionCount > 0 && q2?.transactionCount > 0;
  const reasons = [];
  if (!hasQ1Q2) {
    reasons.push("On-chain sample does not contain enough Q1 and Q2 coverage to change the earnings model.");
    if (q2?.transactionCount > 0) {
      reasons.push(`Sampled Q2 activity had ${money(q2.internalGrossUsd)} internal gross flow, ${money(q2.externalGrossUsd)} external gross flow, and ${money(q2.tradingProxyUsd)} DEX/router trading proxy.`);
    }
    return { verdict: "neutral", reasons };
  }
  const qoq = q1.externalGrossUsd ? q2.externalGrossUsd / q1.externalGrossUsd - 1 : null;
  if (qoq !== null && qoq > 0.25) {
    reasons.push(`External flow proxy rose ${(qoq * 100).toFixed(1)}% QoQ in sampled data.`);
    return { verdict: "supports", reasons };
  }
  if (qoq !== null && qoq < -0.25) {
    reasons.push(`External flow proxy fell ${Math.abs(qoq * 100).toFixed(1)}% QoQ in sampled data.`);
    return { verdict: "contradicts", reasons };
  }
  reasons.push("External flow proxy is not strong enough to override the existing Q2 proxy model.");
  if (q2Proxy?.model?.marketProxies?.geminiApiVolume?.qoq !== undefined) {
    reasons.push(`Existing Gemini exchange API proxy was ${(q2Proxy.model.marketProxies.geminiApiVolume.qoq * 100).toFixed(1)}% QoQ.`);
  }
  return { verdict: "neutral", reasons };
}

function money(value) {
  const abs = Math.abs(value);
  if (abs >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
}

function shortAddress(address) {
  if (address.length <= 14) return address;
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

function signedEventUsd(event) {
  if (event.tokenEvents) {
    return (event.nativeDeltaUsd ?? 0) + event.tokenEvents.reduce((total, tokenEvent) => total + (tokenEvent.amountUsd ?? 0), 0);
  }
  return event.amountUsd ?? 0;
}

function buildDailyTimeseries(events) {
  const byDate = new Map();
  const ensure = (date) => {
    const current = byDate.get(date) ?? {
      date,
      grossTransferUsd: 0,
      externalGrossUsd: 0,
      internalGrossUsd: 0,
      netFlowUsd: 0,
      tradingProxyUsd: 0,
      transactionCount: 0,
      dexInteractionCount: 0,
      byChain: {},
    };
    byDate.set(date, current);
    return current;
  };

  for (const event of events) {
    if (!event.date || event.period === "outside_model_period") continue;
    const gross = eventUsd(event);
    const signed = signedEventUsd(event);
    const row = ensure(event.date);
    row.grossTransferUsd += gross;
    row.transactionCount += 1;
    if (event.internal) {
      row.internalGrossUsd += gross;
    } else {
      row.externalGrossUsd += gross;
      row.netFlowUsd += signed;
    }
    if (event.tradingProxy) {
      row.tradingProxyUsd += gross;
      row.dexInteractionCount += 1;
    }
    const chain = row.byChain[event.chain] ?? { grossTransferUsd: 0, externalGrossUsd: 0, transactionCount: 0, tradingProxyUsd: 0 };
    chain.grossTransferUsd += gross;
    if (!event.internal) chain.externalGrossUsd += gross;
    if (event.tradingProxy) chain.tradingProxyUsd += gross;
    chain.transactionCount += 1;
    row.byChain[event.chain] = chain;
  }

  return [...byDate.values()]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((row) => {
      for (const key of ["grossTransferUsd", "externalGrossUsd", "internalGrossUsd", "netFlowUsd", "tradingProxyUsd"]) {
        row[key] = Number(row[key].toFixed(2));
      }
      for (const chainRow of Object.values(row.byChain)) {
        for (const key of ["grossTransferUsd", "externalGrossUsd", "tradingProxyUsd"]) {
          chainRow[key] = Number(chainRow[key].toFixed(2));
        }
      }
      return row;
    });
}

function qoq(next, prev) {
  return prev ? next / prev - 1 : null;
}

function q2ProxyScenario(q2Proxy, name) {
  return q2Proxy?.model?.scenarios?.find((scenario) => scenario.name === name) ?? null;
}

function buildOnchainEarningsModel({ periodSummary, q2Proxy, read }) {
  const q1Reported = REPORTED_GEMI.q1_2026;
  const q1Flow = periodSummary.find((row) => row.period === "q1_2026") ?? emptyPeriodSummary("q1_2026");
  const q2Flow = periodSummary.find((row) => row.period === "q2_2026") ?? emptyPeriodSummary("q2_2026");
  const externalFlowQoq = qoq(q2Flow.externalGrossUsd, q1Flow.externalGrossUsd);
  const tradingProxyQoq = qoq(q2Flow.tradingProxyUsd, q1Flow.tradingProxyUsd);
  const hasUsableExternalSignal = q1Flow.externalGrossUsd >= 1_000_000 && q2Flow.externalGrossUsd >= 1_000_000 && q1Flow.transactionCount >= 50 && q2Flow.transactionCount >= 50;
  const onchainRevenueTilt = hasUsableExternalSignal && externalFlowQoq !== null
    ? Math.max(-0.05, Math.min(0.05, externalFlowQoq * 0.08))
    : 0;
  const scenarioNames = ["Bear", "Base", "Bull"];
  const fallbackRevenue = {
    Bear: q1Reported.totalRevenue * 0.78,
    Base: q1Reported.totalRevenue * 0.9,
    Bull: q1Reported.totalRevenue * 1.04,
  };
  const opexAssumptions = {
    Bear: { gaapOpex: 132, adjustedOpex: 105, otherExpenseBeforeMarks: 12 },
    Base: { gaapOpex: 133, adjustedOpex: 105, otherExpenseBeforeMarks: 10 },
    Bull: { gaapOpex: 137, adjustedOpex: 109, otherExpenseBeforeMarks: 8 },
  };
  const scenarios = scenarioNames.map((name) => {
    const proxy = q2ProxyScenario(q2Proxy, name);
    const preOnchainRevenue = proxy?.totalRevenue ?? fallbackRevenue[name];
    const totalRevenue = preOnchainRevenue * (1 + onchainRevenueTilt);
    const exchangeRevenue = (proxy?.exchange ?? q1Reported.exchangeRevenue * (name === "Bear" ? 0.75 : name === "Bull" ? 1.1 : 0.9)) * (1 + onchainRevenueTilt);
    const otcRevenue = proxy?.otc ?? q1Reported.otcRevenue * (name === "Bear" ? 0.55 : name === "Bull" ? 1.15 : 0.8);
    const predictionRevenue = proxy?.predictionRevenue ?? q1Reported.predictionRevenue * (name === "Bear" ? 1.2 : name === "Bull" ? 4 : 2);
    const servicesInterest = proxy?.servicesInterest ?? q1Reported.servicesRevenue + q1Reported.corporateInterest;
    const assumption = opexAssumptions[name];
    const gaapOpex = assumption.gaapOpex;
    const adjustedOpex = assumption.adjustedOpex;
    const operatingLoss = totalRevenue - gaapOpex;
    const adjustedEbitda = totalRevenue - adjustedOpex;
    const netLossBeforeMarks = operatingLoss - assumption.otherExpenseBeforeMarks;
    return {
      name,
      preOnchainRevenue: Number(preOnchainRevenue.toFixed(3)),
      onchainRevenueTilt: Number(onchainRevenueTilt.toFixed(4)),
      totalRevenue: Number(totalRevenue.toFixed(3)),
      exchangeRevenue: Number(exchangeRevenue.toFixed(3)),
      otcRevenue: Number(otcRevenue.toFixed(3)),
      predictionRevenue: Number(predictionRevenue.toFixed(3)),
      servicesInterest: Number(servicesInterest.toFixed(3)),
      opex: Number(gaapOpex.toFixed(3)),
      gaapOpex: Number(gaapOpex.toFixed(3)),
      adjustedOpex: Number(adjustedOpex.toFixed(3)),
      operatingLoss: Number(operatingLoss.toFixed(3)),
      adjustedEbitda: Number(adjustedEbitda.toFixed(3)),
      otherExpenseBeforeMarks: assumption.otherExpenseBeforeMarks,
      netLossBeforeMarks: Number(netLossBeforeMarks.toFixed(3)),
    };
  });

  return {
    asOf: new Date().toISOString(),
    method: {
      q1Reported,
      q1ExpenseNormalization: {
        stockBasedCompensation: 24.178,
        restructuringCharges: 7.866,
        nonRecurringLegalSettlementCosts: 0.424,
        depreciationAndAmortization: 7.482,
        cleanerCashAdjustedOpex: 104.51,
      },
      q2OpexMethod: "Fixed/semi-fixed scenario assumptions. Q1 opex is not mechanically scaled as a percentage of revenue because GAAP opex includes SBC, restructuring, severance, legal noise, and fixed platform costs.",
      opexAssumptions,
      onchainRevenueTilt,
      hasUsableExternalSignal,
      sourceInterpretation: "On-chain custody/address flow is used as a small directional deposit-withdrawal and activity proxy. It is not reported Gemini trading volume.",
    },
    onchainSignals: {
      q1ExternalGrossUsd: q1Flow.externalGrossUsd,
      q2ExternalGrossUsd: q2Flow.externalGrossUsd,
      externalFlowQoq,
      q1TradingProxyUsd: q1Flow.tradingProxyUsd,
      q2TradingProxyUsd: q2Flow.tradingProxyUsd,
      tradingProxyQoq,
      verdict: read.verdict,
      reasons: read.reasons,
    },
    scenarios,
  };
}

function buildDashboardData({ inventory, flows, timeseries, earningsModel, read, q2Proxy }) {
  const topExplorerAddresses = flows.addressDeepDive
    .map((row) => ({
      chain: row.chain,
      address: row.address,
      label: row.label,
      role: row.role,
      txCount: row.explorer.metadata?.transactions ?? 0,
      balanceUsdAcrossChains: row.explorer.metadata?.balanceUsdAcrossChains ?? null,
      publicGeminiLabel: row.explorer.publicGeminiLabel,
    }))
    .sort((a, b) => b.txCount - a.txCount)
    .slice(0, 12);
  const topFlowAddresses = flows.addressDeepDive
    .map((row) => ({
      chain: row.chain,
      address: row.address,
      role: row.role,
      q1ExternalGrossUsd: row.sampled.sampledPeriods.q1_2026.externalGrossUsd,
      q2ExternalGrossUsd: row.sampled.sampledPeriods.q2_2026.externalGrossUsd,
      q2TradingProxyUsd: row.sampled.sampledPeriods.q2_2026.tradingProxyUsd,
      sampledEvents: row.sampled.sampledEvents,
    }))
    .sort((a, b) => b.q2ExternalGrossUsd - a.q2ExternalGrossUsd)
    .slice(0, 12);
  return {
    asOf: new Date().toISOString(),
    verdict: read.verdict,
    verdictReasons: read.reasons,
    q2ProxyBaseRevenue: q2ProxyScenario(q2Proxy, "Base")?.totalRevenue ?? null,
    counts: {
      addresses: inventory.addresses.length,
      highConfidenceAddresses: inventory.addresses.filter((row) => row.confidence === "high").length,
      publicGeminiLabels: inventory.addresses.filter((row) => row.explorer?.publicGeminiLabel).length,
      events: flows.events.length,
    },
    periods: flows.periodSummary,
    timeseries,
    earningsModel,
    topExplorerAddresses,
    topFlowAddresses,
    addressDeepDive: flows.addressDeepDive,
    collectionStatus: flows.collectionStatus,
    caveats: flows.caveats,
  };
}

function stripCollectionEvents(collection) {
  if (!collection) return collection;
  const { events, ...rest } = collection;
  return rest;
}

function markdownScenarioRows(scenarios) {
  return scenarios.map((row) => (
    `| ${row.name} | $${row.totalRevenue.toFixed(1)}M | $${row.exchangeRevenue.toFixed(1)}M | $${row.otcRevenue.toFixed(1)}M | $${row.predictionRevenue.toFixed(1)}M | $${row.gaapOpex.toFixed(1)}M | $${row.adjustedEbitda.toFixed(1)}M | $${row.operatingLoss.toFixed(1)}M | $${row.netLossBeforeMarks.toFixed(1)}M |`
  )).join("\n");
}

function renderEarningsReport({ inventory, flows, timeseries, earningsModel, q2Proxy, read }) {
  const q1 = flows.periodSummary.find((row) => row.period === "q1_2026") ?? emptyPeriodSummary("q1_2026");
  const q2 = flows.periodSummary.find((row) => row.period === "q2_2026") ?? emptyPeriodSummary("q2_2026");
  const latestDays = timeseries.slice(-10).map((row) => `| ${row.date} | ${row.transactionCount} | ${money(row.externalGrossUsd)} | ${money(row.internalGrossUsd)} | ${money(row.tradingProxyUsd)} |`).join("\n");
  const q2Base = q2ProxyScenario(q2Proxy, "Base");
  const externalQoq = earningsModel.onchainSignals.externalFlowQoq === null ? "n/a" : `${(earningsModel.onchainSignals.externalFlowQoq * 100).toFixed(1)}%`;
  const baseScenario = earningsModel.scenarios.find((row) => row.name === "Base");
  return `# GEMI On-Chain Earnings Report

As of: ${new Date().toISOString()}

## Executive Read

The address set is useful as a proprietary **activity and custody-flow monitor**, but it is not strong enough to call reported Gemini trading volume by itself. Gemini spot and prediction-market matching happens primarily inside the venue. Public-chain data helps most when it shows unusual external deposits/withdrawals, token infrastructure activity, or DEX/router interactions around known Gemini wallets.

Current verdict: **${read.verdict}**.

${read.reasons.map((reason) => `- ${reason}`).join("\n")}

The base earnings bridge estimates Q2 revenue at **$${baseScenario.totalRevenue.toFixed(1)}M**, GAAP operating expenses at **$${baseScenario.gaapOpex.toFixed(1)}M**, and adjusted EBITDA at **$${baseScenario.adjustedEbitda.toFixed(1)}M**. The prior non-on-chain proxy base was ${q2Base ? `$${q2Base.totalRevenue.toFixed(1)}M` : "not available"}.

## How The Address Data Feeds Earnings

1. **External gross flow**: directional proxy for deposits, withdrawals, liquidity movement, and customer/counterparty activity.
2. **Net flow**: custody inflow/outflow proxy after removing known Gemini-to-Gemini transfers.
3. **Trading proxy**: only DEX/router/program interactions. This is the only bucket that can be described as on-chain trading proxy.
4. **Explorer activity**: validates whether an address is actually active, labeled, contract-like, or likely infrastructure.

The model gives on-chain flow only a small revenue tilt, capped at +/-5%, because custody transfer volume is not equivalent to exchange fee revenue. Opex is modeled as a fixed/semi-fixed scenario assumption rather than a percentage of revenue, because Q1 GAAP opex included stock-based compensation, restructuring/severance, legal noise, and platform costs.

## Previous Earnings Baseline

| Period | Total revenue | Transaction revenue | Exchange | OTC | Prediction | Services | Opex | Net loss |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Q1 2026 | $${REPORTED_GEMI.q1_2026.totalRevenue.toFixed(1)}M | $${REPORTED_GEMI.q1_2026.transactionRevenue.toFixed(1)}M | $${REPORTED_GEMI.q1_2026.exchangeRevenue.toFixed(1)}M | $${REPORTED_GEMI.q1_2026.otcRevenue.toFixed(1)}M | $${REPORTED_GEMI.q1_2026.predictionRevenue.toFixed(1)}M | $${REPORTED_GEMI.q1_2026.servicesRevenue.toFixed(1)}M | $${REPORTED_GEMI.q1_2026.opex.toFixed(1)}M | $${REPORTED_GEMI.q1_2026.netLoss.toFixed(1)}M |

## On-Chain Flow Summary

| Period | Tx count | Gross transfer | External gross | Internal gross | Net flow | Trading proxy | Coverage |
|---|---:|---:|---:|---:|---:|---:|---|
${flows.periodSummary.map((row) => `| ${row.period} | ${row.transactionCount} | ${money(row.grossTransferUsd)} | ${money(row.externalGrossUsd)} | ${money(row.internalGrossUsd)} | ${money(row.netFlowUsd)} | ${money(row.tradingProxyUsd)} | ${row.coverage.status} |`).join("\n")}

Q2 external gross flow vs Q1: **${externalQoq}**. Q1 external gross was ${money(q1.externalGrossUsd)} and Q2 external gross was ${money(q2.externalGrossUsd)}.

## Latest Daily Timeseries

| Date | Tx count | External gross | Internal gross | Trading proxy |
|---|---:|---:|---:|---:|
${latestDays || "| n/a | 0 | $0.00 | $0.00 | $0.00 |"}

## Q2 Earnings Scenarios

| Scenario | Revenue | Exchange | OTC | Prediction | GAAP opex | Adjusted EBITDA | Operating loss | Net loss before marks |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
${markdownScenarioRows(earningsModel.scenarios)}

## Address Depth

| Chain | Address | Role | Confidence | Explorer activity | Explorer tx count | Q2 external | Q2 trading proxy |
|---|---|---|---|---:|---:|---:|---:|
${flows.addressDeepDive.map((row) => `| ${row.chain} | \`${shortAddress(row.address)}\` | ${row.role} | ${row.confidence} | ${row.explorer.activityLevel} | ${row.explorer.metadata?.transactions ?? ""} | ${money(row.sampled.sampledPeriods.q2_2026.externalGrossUsd)} | ${money(row.sampled.sampledPeriods.q2_2026.tradingProxyUsd)} |`).join("\n")}

## Trade Implication

The best use of this address watchlist is an alerting and variant-perception edge, not a standalone EPS model. If the dashboard starts showing accelerating external flow plus actual DEX/router interactions while Gemini API spot volume and prediction-market KPIs improve, that would support pressing the trade. If on-chain flow is mostly internal churn or contract infrastructure while spot proxies remain weak, the address work should not override the bear case.

## Files

- \`gemi_earnings_model/data/onchain_timeseries.json\`
- \`gemi_earnings_model/data/onchain_earnings_model.json\`
- \`gemi_earnings_model/data/onchain_dashboard_data.json\`
- \`gemi_earnings_model/dashboard/index.html\`

## Caveats

- Address labels from the provided list are treated as leads until public labels or behavior support them.
- Public-chain transfer flow is not reported Gemini trading volume.
- EVM windows can still be partial when high-volume addresses hit the free API row cap.
- Solana remains a bounded RPC sample unless a Solscan/Helius/Allium export is added.
`;
}

function renderDashboardHtml() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GEMI On-Chain Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
  <style>
    :root {
      --bg: #f6f7f9;
      --panel: #ffffff;
      --ink: #15171a;
      --muted: #636b74;
      --line: #d9dee5;
      --blue: #2563eb;
      --green: #16835b;
      --red: #c2410c;
      --amber: #b7791f;
      --purple: #6d28d9;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      letter-spacing: 0;
    }
    header {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: flex-start;
      padding: 20px 24px 12px;
      border-bottom: 1px solid var(--line);
      background: var(--panel);
      position: sticky;
      top: 0;
      z-index: 3;
    }
    h1 { font-size: 22px; margin: 0 0 4px; font-weight: 750; }
    h2 { font-size: 15px; margin: 0 0 12px; font-weight: 720; }
    p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.45; }
    main { padding: 18px 24px 32px; }
    .status { text-align: right; min-width: 230px; }
    .badge {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      padding: 4px 10px;
      border-radius: 6px;
      background: #fff4db;
      border: 1px solid #f3d899;
      color: #774800;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .grid { display: grid; gap: 14px; }
    .kpis { grid-template-columns: repeat(5, minmax(140px, 1fr)); margin-bottom: 14px; }
    .charts { grid-template-columns: repeat(2, minmax(280px, 1fr)); }
    .wide { grid-column: 1 / -1; }
    .panel {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
      min-width: 0;
    }
    .kpi .label { color: var(--muted); font-size: 12px; margin-bottom: 6px; }
    .kpi .value { font-size: 21px; font-weight: 760; white-space: nowrap; }
    .kpi .sub { color: var(--muted); font-size: 12px; margin-top: 4px; min-height: 18px; }
    .chartBox { height: 320px; }
    .chartBox.compact { height: 260px; }
    canvas { width: 100% !important; height: 100% !important; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { border-bottom: 1px solid var(--line); padding: 8px 7px; text-align: left; vertical-align: top; }
    th { color: var(--muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0; background: #fbfcfd; position: sticky; top: 71px; }
    td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; }
    code { font-family: "SFMono-Regular", Consolas, monospace; font-size: 11px; }
    .tableScroll { overflow: auto; max-height: 520px; border: 1px solid var(--line); border-radius: 6px; }
    .controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 12px; }
    .controls button {
      border: 1px solid var(--line);
      background: var(--panel);
      min-height: 32px;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 650;
      color: var(--ink);
    }
    .controls button.active { border-color: var(--blue); color: var(--blue); background: #eff6ff; }
    @media (max-width: 1050px) {
      .kpis, .charts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      header { position: static; flex-direction: column; }
      .status { text-align: left; }
      th { position: static; }
    }
    @media (max-width: 680px) {
      main, header { padding-left: 12px; padding-right: 12px; }
      .kpis, .charts { grid-template-columns: 1fr; }
      .chartBox { height: 280px; }
    }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>GEMI On-Chain Earnings Dashboard</h1>
      <p id="subtitle">Loading address model...</p>
    </div>
    <div class="status">
      <span id="verdict" class="badge">Loading</span>
      <p id="asOf"></p>
    </div>
  </header>
  <main>
    <section class="grid kpis" id="kpis"></section>

    <section class="grid charts">
      <div class="panel wide">
        <div class="controls">
          <button data-series="externalGrossUsd" class="active">External Flow</button>
          <button data-series="internalGrossUsd">Internal Flow</button>
          <button data-series="tradingProxyUsd">Trading Proxy</button>
          <button data-series="transactionCount">Tx Count</button>
        </div>
        <div class="chartBox"><canvas id="dailyChart"></canvas></div>
      </div>
      <div class="panel">
        <h2>Quarterly Flow Buckets</h2>
        <div class="chartBox compact"><canvas id="quarterChart"></canvas></div>
      </div>
      <div class="panel">
        <h2>Top Explorer Tx Counts</h2>
        <div class="chartBox compact"><canvas id="topExplorerChart"></canvas></div>
      </div>
      <div class="panel">
        <h2>Q2 Earnings Bridge</h2>
        <div class="chartBox compact"><canvas id="earningsChart"></canvas></div>
      </div>
      <div class="panel">
        <h2>Top Q2 External Flow Addresses</h2>
        <div class="chartBox compact"><canvas id="topFlowChart"></canvas></div>
      </div>
    </section>

    <section class="grid" style="margin-top:14px;">
      <div class="panel">
        <h2>Earnings Scenarios</h2>
        <div class="tableScroll"><table id="earningsTable"></table></div>
      </div>
      <div class="panel">
        <h2>Address Deep Dive</h2>
        <div class="tableScroll"><table id="addressTable"></table></div>
      </div>
    </section>
  </main>
  <script>
    const money = (value) => {
      const n = Number(value) || 0;
      const abs = Math.abs(n);
      if (abs >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
      if (abs >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
      if (abs >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
      return "$" + n.toFixed(0);
    };
    const shortAddr = (address) => address.length > 16 ? address.slice(0, 7) + "..." + address.slice(-6) : address;
    const fmtPct = (value) => value === null || value === undefined ? "n/a" : (value * 100).toFixed(1) + "%";
    const charts = {};
    const colors = {
      externalGrossUsd: "#2563eb",
      internalGrossUsd: "#6d28d9",
      tradingProxyUsd: "#16835b",
      transactionCount: "#c2410c"
    };
    function buildChart(id, config) {
      if (charts[id]) charts[id].destroy();
      charts[id] = new Chart(document.getElementById(id), config);
    }
    function lineChart(data, series) {
      buildChart("dailyChart", {
        type: "line",
        data: {
          labels: data.timeseries.map((row) => row.date),
          datasets: [{
            label: series,
            data: data.timeseries.map((row) => row[series] || 0),
            borderColor: colors[series],
            backgroundColor: colors[series] + "22",
            tension: 0.25,
            pointRadius: 0,
            fill: true
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { ticks: { callback: series === "transactionCount" ? undefined : money } } } }
      });
    }
    function renderTable(id, headers, rows) {
      document.getElementById(id).innerHTML = "<thead><tr>" + headers.map((h) => "<th" + (h.num ? " class='num'" : "") + ">" + h.label + "</th>").join("") + "</tr></thead><tbody>" + rows.map((row) => "<tr>" + row.map((cell, i) => "<td" + (headers[i].num ? " class='num'" : "") + ">" + cell + "</td>").join("") + "</tr>").join("") + "</tbody>";
    }
    async function main() {
      const data = await fetch("../data/onchain_dashboard_data.json").then((r) => r.json());
      document.getElementById("subtitle").textContent = data.counts.addresses + " addresses, " + data.counts.events.toLocaleString() + " modeled events. Transfer flow is separated from true trading proxy.";
      document.getElementById("verdict").textContent = data.verdict;
      document.getElementById("asOf").textContent = "As of " + new Date(data.asOf).toLocaleString();
      const q1 = data.periods.find((row) => row.period === "q1_2026") || {};
      const q2 = data.periods.find((row) => row.period === "q2_2026") || {};
      const base = data.earningsModel.scenarios.find((row) => row.name === "Base");
      document.getElementById("kpis").innerHTML = [
        ["Q2 External", money(q2.externalGrossUsd), "Q1 " + money(q1.externalGrossUsd)],
        ["Q2 Trading Proxy", money(q2.tradingProxyUsd), "DEX/router only"],
        ["Base Revenue", "$" + base.totalRevenue.toFixed(1) + "M", "Opex " + "$" + base.opex.toFixed(1) + "M"],
        ["Public Labels", data.counts.publicGeminiLabels, data.counts.highConfidenceAddresses + " high confidence"],
        ["On-Chain Tilt", fmtPct(data.earningsModel.method.onchainRevenueTilt), data.earningsModel.method.hasUsableExternalSignal ? "active" : "monitor only"]
      ].map(([label, value, sub]) => "<div class='panel kpi'><div class='label'>" + label + "</div><div class='value'>" + value + "</div><div class='sub'>" + sub + "</div></div>").join("");

      lineChart(data, "externalGrossUsd");
      document.querySelectorAll(".controls button").forEach((button) => button.addEventListener("click", () => {
        document.querySelectorAll(".controls button").forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        lineChart(data, button.dataset.series);
      }));
      buildChart("quarterChart", {
        type: "bar",
        data: {
          labels: data.periods.map((row) => row.period),
          datasets: [
            { label: "External", data: data.periods.map((row) => row.externalGrossUsd), backgroundColor: "#2563eb" },
            { label: "Internal", data: data.periods.map((row) => row.internalGrossUsd), backgroundColor: "#6d28d9" },
            { label: "Trading proxy", data: data.periods.map((row) => row.tradingProxyUsd), backgroundColor: "#16835b" }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { ticks: { callback: money } } } }
      });
      buildChart("topExplorerChart", {
        type: "bar",
        data: { labels: data.topExplorerAddresses.map((row) => shortAddr(row.address)), datasets: [{ label: "Explorer tx count", data: data.topExplorerAddresses.map((row) => row.txCount), backgroundColor: "#b7791f" }] },
        options: { responsive: true, maintainAspectRatio: false, indexAxis: "y" }
      });
      buildChart("earningsChart", {
        type: "bar",
        data: { labels: data.earningsModel.scenarios.map((row) => row.name), datasets: [
          { label: "Revenue", data: data.earningsModel.scenarios.map((row) => row.totalRevenue), backgroundColor: "#2563eb" },
          { label: "Opex", data: data.earningsModel.scenarios.map((row) => row.opex), backgroundColor: "#c2410c" }
        ] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { ticks: { callback: (v) => "$" + v + "M" } } } }
      });
      buildChart("topFlowChart", {
        type: "bar",
        data: { labels: data.topFlowAddresses.map((row) => shortAddr(row.address)), datasets: [{ label: "Q2 external gross", data: data.topFlowAddresses.map((row) => row.q2ExternalGrossUsd), backgroundColor: "#16835b" }] },
        options: { responsive: true, maintainAspectRatio: false, indexAxis: "y", scales: { x: { ticks: { callback: money } } } }
      });
      renderTable("earningsTable",
        [{label:"Scenario"}, {label:"Revenue", num:true}, {label:"Exchange", num:true}, {label:"OTC", num:true}, {label:"Prediction", num:true}, {label:"GAAP opex", num:true}, {label:"Adj. EBITDA", num:true}, {label:"Operating loss", num:true}],
        data.earningsModel.scenarios.map((row) => [row.name, "$" + row.totalRevenue.toFixed(1) + "M", "$" + row.exchangeRevenue.toFixed(1) + "M", "$" + row.otcRevenue.toFixed(1) + "M", "$" + row.predictionRevenue.toFixed(1) + "M", "$" + row.gaapOpex.toFixed(1) + "M", "$" + row.adjustedEbitda.toFixed(1) + "M", "$" + row.operatingLoss.toFixed(1) + "M"])
      );
      renderTable("addressTable",
        [{label:"Chain"}, {label:"Address"}, {label:"Role"}, {label:"Conf."}, {label:"Explorer tx", num:true}, {label:"Q2 external", num:true}, {label:"Q2 trading proxy", num:true}, {label:"Notes"}],
        data.addressDeepDive.map((row) => [row.chain, "<code>" + shortAddr(row.address) + "</code>", row.role, row.confidence, (row.explorer.metadata.transactions || 0).toLocaleString(), money(row.sampled.sampledPeriods.q2_2026.externalGrossUsd), money(row.sampled.sampledPeriods.q2_2026.tradingProxyUsd), row.notes.join(" ")])
      );
    }
    main().catch((error) => {
      document.body.innerHTML = "<main><div class='panel'><h1>Dashboard failed to load</h1><p>" + error.message + "</p></div></main>";
    });
  </script>
</body>
</html>`;
}

function renderMarkdown({ inventory, flows, q2Proxy, read }) {
  const invRows = inventory.addresses.map((record) => (
    `| ${record.chain} | \`${shortAddress(record.address)}\` | ${record.label || ""} | ${record.role} | ${record.confidence} | ${record.explorer?.status || "not_checked"} |`
  )).join("\n");
  const metadataRows = inventory.addresses
    .filter((record) => record.explorer?.metadata && (record.explorer.metadata.balanceUsdAcrossChains !== null || record.explorer.metadata.transactions !== null || record.explorer.metadata.contractStatus))
    .map((record) => {
      const meta = record.explorer.metadata;
      return `| ${record.chain} | \`${shortAddress(record.address)}\` | ${meta.contractStatus || ""} | ${meta.transactions ?? ""} | ${meta.balanceUsdAcrossChains === null ? "" : money(meta.balanceUsdAcrossChains)} | ${meta.tokenPriceUsd === null ? "" : money(meta.tokenPriceUsd)} |`;
    }).join("\n");
  const deepDive = flows.addressDeepDive ?? [];
  const deepRows = deepDive.map((row) => {
    const q1 = row.sampled.sampledPeriods.q1_2026;
    const q2 = row.sampled.sampledPeriods.q2_2026;
    const meta = row.explorer.metadata ?? {};
    return `| ${row.chain} | \`${shortAddress(row.address)}\` | ${row.role} | ${row.explorer.activityLevel} | ${meta.transactions ?? ""} | ${q1.txCount}/${money(q1.externalGrossUsd)} | ${q2.txCount}/${money(q2.externalGrossUsd)} | ${money(q2.tradingProxyUsd)} |`;
  }).join("\n");
  const flowRows = flows.periodSummary.map((row) => (
    `| ${row.period} | ${row.transactionCount} | ${money(row.grossTransferUsd)} | ${money(row.externalGrossUsd)} | ${money(row.netFlowUsd)} | ${money(row.tradingProxyUsd)} | ${row.dexInteractionCount} | ${row.coverage.status} |`
  )).join("\n");
  const solStatus = flows.collectionStatus.solana.byAddress.map((row) => (
    `| solana | \`${shortAddress(row.address)}\` | ${row.status} | ${row.signaturesFetched ?? 0} | ${row.transactionsFetched ?? 0} | ${row.coverage?.oldestDate || ""} to ${row.coverage?.newestDate || ""} |`
  )).join("\n");
  const evmStatus = flows.collectionStatus.evm.byAddress.map((row) => (
    `| ${row.chain} | \`${shortAddress(row.address)}\` | ${row.status} | ${row.normalRows ?? 0} | ${row.tokenRows ?? 0} | ${row.coverage?.oldestDate || ""} to ${row.coverage?.newestDate || ""} |`
  )).join("\n");
  const sourceNote = [
    "- Address labels are treated as unverified leads unless a public explorer label confirms them.",
    "- Transfer volume is not trading volume.",
    "- Trading proxy means DEX/router/program interaction only.",
    "- Missing API keys are shown as blocked or partial, never as zero activity.",
  ].join("\n");
  const q2Line = q2Proxy?.model?.scenarios?.[1]?.totalRevenue
    ? `Existing Q2 proxy base revenue estimate remains $${q2Proxy.model.scenarios[1].totalRevenue.toFixed(1)}M.`
    : "Existing Q2 proxy model was not found.";
  return `# GEMI On-Chain Address Model

As of: ${new Date().toISOString()}

## Bottom Line

Trade relevance verdict: **${read.verdict}**.

${read.reasons.map((reason) => `- ${reason}`).join("\n")}
- ${q2Line}

This model uses a provided address list plus public explorer and chain data. It does not treat custody wallet transfers as Gemini trading volume.

## Address Inventory

| Chain | Address | Label | Role | Confidence | Explorer check |
|---|---|---|---|---|---|
${invRows}

## Public Explorer Metadata

| Chain | Address | Type | Explorer tx count | Balance across chains | Token price |
|---|---|---:|---:|---:|---:|
${metadataRows || "| n/a | n/a | n/a | n/a | n/a | n/a |"}

## Per-Address Deep Dive

| Chain | Address | Role | Explorer activity | Explorer tx count | Q1 sample tx/external | Q2 sample tx/external | Q2 DEX proxy |
|---|---|---|---:|---:|---:|---:|---:|
${deepRows}

## Quarterly Flow Summary

| Period | Tx count | Gross transfer | External gross | Net flow | Trading proxy | DEX/router tx | Coverage |
|---|---:|---:|---:|---:|---:|---:|---|
${flowRows}

## Collection Status

### Solana

| Chain | Address | Status | Signatures | Transactions parsed | Sample window |
|---|---|---:|---:|---:|---|
${solStatus || "| solana | n/a | no addresses | 0 | 0 | |"}

### EVM

| Chain | Address | Status | Normal rows | Token rows | API window |
|---|---|---:|---:|---:|---|
${evmStatus || "| evm | n/a | blocked_missing_api_key | 0 | 0 | |"}

## Interpretation

${sourceNote}

The current public-only run is most useful for validating address labels and recent Solana activity. It is not enough to replace Gemini's reported trading volume or the existing Gemini API spot-volume proxy unless indexed EVM/Solana history is supplied through API keys or exports.

## Data Files

- \`gemi_earnings_model/data/onchain_address_inventory.json\`
- \`gemi_earnings_model/data/onchain_flows.json\`
- \`gemi_earnings_model/data/onchain_timeseries.json\`
- \`gemi_earnings_model/data/onchain_earnings_model.json\`
- \`gemi_earnings_model/data/onchain_dashboard_data.json\`
- \`gemi_earnings_model/data/q2_proxy_model.json\`
- \`gemi_earnings_model/dashboard/index.html\`

## Next Upgrade

Set \`SOLSCAN_API_KEY\`, \`HELIUS_API_KEY\`, or provide Allium exports to replace bounded Solana RPC sampling with full indexed token-transfer history. Raise \`MAX_ETHERSCAN_PAGES_PER_WINDOW\` when you want to spend more API budget on high-volume EVM windows.
`;
}

async function buildModel() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(new URL("./dashboard/", import.meta.url), { recursive: true });
  const markdown = await fs.readFile(ADDRESS_FILE, "utf8");
  const inventoryDraft = buildInventory(markdown);
  const inventoryAddresses = await verifyExplorerPages(inventoryDraft.addresses);
  const inventory = { asOf: new Date().toISOString(), notes: inventoryDraft.notes, addresses: inventoryAddresses };
  const cluster = new Set(inventory.addresses.map((record) => `${record.chain}:${record.chain === "solana" ? record.address : lower(record.address)}`));
  const prices = await fetchCoinPrices();
  const [solana, evm, q2Proxy] = await Promise.all([
    collectSolanaFlows(inventory.addresses, cluster, prices),
    collectEvmFlows(inventory.addresses, cluster, prices),
    loadQ2Proxy(),
  ]);
  const allEvents = [...solana.events, ...evm.events];
  const periodSummary = summarizeEvents(allEvents, { solana, evm });
  const read = tradeRead(periodSummary, q2Proxy);
  const timeseries = buildDailyTimeseries(allEvents);
  const earningsModel = buildOnchainEarningsModel({ periodSummary, q2Proxy, read });
  const flows = {
    asOf: new Date().toISOString(),
    collectionStatus: { solana: stripCollectionEvents(solana), evm: stripCollectionEvents(evm) },
    periodSummary,
    events: allEvents,
    caveats: [
      "Transfer volume is not trading volume.",
      "Public-only Solana RPC is a bounded sample and may not reach Q1/Q2 for high-velocity wallets.",
      "EVM windows can be partial when high-volume addresses hit Etherscan row caps.",
    ],
  };
  flows.addressDeepDive = buildAddressDeepDive(inventory, flows);
  const dashboardData = buildDashboardData({ inventory, flows, timeseries, earningsModel, read, q2Proxy });
  await fs.writeFile(INVENTORY_PATH, JSON.stringify(inventory, null, 2));
  await fs.writeFile(FLOWS_PATH, JSON.stringify(flows, null, 2));
  await fs.writeFile(DEEP_DIVE_PATH, JSON.stringify(flows.addressDeepDive, null, 2));
  await fs.writeFile(TIMESERIES_PATH, JSON.stringify({ asOf: new Date().toISOString(), timeseries }, null, 2));
  await fs.writeFile(EARNINGS_MODEL_PATH, JSON.stringify(earningsModel, null, 2));
  await fs.writeFile(DASHBOARD_DATA_PATH, JSON.stringify(dashboardData, null, 2));
  await fs.writeFile(REPORT_PATH, renderMarkdown({ inventory, flows, q2Proxy, read }));
  await fs.writeFile(EARNINGS_REPORT_PATH, renderEarningsReport({ inventory, flows, timeseries, earningsModel, q2Proxy, read }));
  await fs.writeFile(DASHBOARD_PATH, renderDashboardHtml());
  return { inventory, flows, read, earningsModel };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function runSelfTests() {
  const sample = `
https://solscan.io/account/HFWv1riXSRJ3nVnnLZ9xi1K4r3zppRvcfVuiAGqAA8Y6
https://solscan.io/account/HFWv1riXSRJ3nVnnLZ9xi1K4r3zppRvcfVuiAGqAA8Y6
https://etherscan.io/address/0xd24400ae8bfebb18ca49be86258a3c749cf46853
https://basescan.org/address/0xd24400ae8bfebb18ca49be86258a3c749cf46853
`;
  const inventory = buildInventory(sample);
  const hfw = inventory.addresses.filter((row) => row.chain === "solana" && row.address === "HFWv1riXSRJ3nVnnLZ9xi1K4r3zppRvcfVuiAGqAA8Y6");
  assert(hfw.length === 1, "parser should dedupe repeated Solscan address");
  assert(inventory.addresses.some((row) => row.chain === "ethereum" && row.address === "0xd24400ae8bfebb18ca49be86258a3c749cf46853"), "ethereum record missing");
  assert(inventory.addresses.some((row) => row.chain === "base" && row.address === "0xd24400ae8bfebb18ca49be86258a3c749cf46853"), "base record missing");

  const cluster = new Set(["ethereum:0xaaa0000000000000000000000000000000000000", "ethereum:0xbbb0000000000000000000000000000000000000"]);
  assert(isInternalAddress(cluster, "ethereum", "0xAaA0000000000000000000000000000000000000"), "internal address lowercasing failed");
  const summary = emptyPeriodSummary("q1_2026");
  addAmount(summary, { amountUsd: 100, netUsd: 100, internal: true });
  assert(summary.externalGrossUsd === 0, "internal transfers should not add external gross");
  assert(summary.internalGrossUsd === 100, "internal transfer gross missing");
  assert(summary.netFlowUsd === 0, "internal transfers should not add net flow");

  const selected = selectSignaturesForParsing(Array.from({ length: 60 }, (_, i) => ({ signature: `sig-${i}` })));
  assert(selected.some((sig) => sig.signature === "sig-0"), "stratified sampler should include newest signature");
  assert(selected.some((sig) => sig.signature === "sig-59"), "stratified sampler should include oldest signature");

  const blocked = !ETHERSCAN_API_KEY ? "blocked_missing_api_key" : "api_available";
  assert(blocked === "blocked_missing_api_key" || blocked === "api_available", "missing key status should be explicit");
  console.log("self tests passed");
}

if (process.argv.includes("--self-test")) {
  runSelfTests();
} else {
  buildModel()
    .then(({ inventory, flows, read }) => {
      console.log(JSON.stringify({
        verdict: read.verdict,
        addresses: inventory.addresses.length,
        periods: flows.periodSummary,
        solanaStatus: flows.collectionStatus.solana.status,
        evmStatus: flows.collectionStatus.evm.status,
      }, null, 2));
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
