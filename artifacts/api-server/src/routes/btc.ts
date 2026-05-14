import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

// Coinbase Exchange candles. Granularity in seconds. Max 300 candles per request.
// Returns array of [time, low, high, open, close, volume] in descending time order.
const COINBASE_URL = "https://api.exchange.coinbase.com/products/BTC-USD/candles";

interface Candle {
  t: number; // unix seconds
  o: number;
  c: number;
}

async function fetchChunk(startSec: number, endSec: number, granularity: number): Promise<Candle[]> {
  const url = `${COINBASE_URL}?granularity=${granularity}&start=${new Date(startSec * 1000).toISOString()}&end=${new Date(endSec * 1000).toISOString()}`;
  const r = await fetch(url, { headers: { "User-Agent": "marti/1.0" } });
  if (!r.ok) {
    throw new Error(`Coinbase ${r.status}: ${await r.text().catch(() => "")}`);
  }
  const rows = (await r.json()) as Array<[number, number, number, number, number, number]>;
  return rows.map((row) => ({ t: row[0], o: row[3], c: row[4] }));
}

router.get("/candles", async (req: Request, res: Response): Promise<void> => {
  try {
    const granularity = Number(req.query.granularity ?? 900); // 15m default
    const endSec = req.query.end ? Math.floor(new Date(String(req.query.end)).getTime() / 1000) : Math.floor(Date.now() / 1000);
    const startSec = req.query.start
      ? Math.floor(new Date(String(req.query.start)).getTime() / 1000)
      : endSec - 180 * 24 * 3600;

    if (!Number.isFinite(startSec) || !Number.isFinite(endSec) || startSec >= endSec) {
      res.status(400).json({ error: "invalid_range" });
      return;
    }

    const span = granularity * 300; // seconds per chunk
    const chunks: Candle[] = [];
    let cursor = startSec;
    let safety = 200; // hard cap to prevent runaway
    while (cursor < endSec && safety-- > 0) {
      const chunkEnd = Math.min(cursor + span, endSec);
      const rows = await fetchChunk(cursor, chunkEnd, granularity);
      chunks.push(...rows);
      cursor = chunkEnd;
      // tiny pause to be polite — Coinbase public rate limit is generous but not infinite
      await new Promise((r) => setTimeout(r, 60));
    }

    // De-dupe by timestamp and sort ascending
    const seen = new Set<number>();
    const out: Candle[] = [];
    for (const c of chunks.sort((a, b) => a.t - b.t)) {
      if (seen.has(c.t)) continue;
      seen.add(c.t);
      out.push(c);
    }

    res.json({
      market: "btc",
      granularity,
      start: new Date(startSec * 1000).toISOString(),
      end: new Date(endSec * 1000).toISOString(),
      count: out.length,
      candles: out,
    });
  } catch (err) {
    req.log.error({ err }, "btc fetch failed");
    res.status(502).json({ error: "upstream_failed", message: (err as Error).message });
  }
});

export default router;
