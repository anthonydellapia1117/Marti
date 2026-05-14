import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

// TwelveData time_series — keyed. SPX index itself requires a paid plan, so we use
// SPY (the SPDR S&P 500 ETF) which is 1:1 directional with SPX and available on the free tier.
const TD_URL = "https://api.twelvedata.com/time_series";
const SYMBOL = "SPY";

router.get("/candles", async (req: Request, res: Response): Promise<void> => {
  const apiKey = process.env.TWELVEDATA_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "missing_twelvedata_key" });
    return;
  }

  try {
    const interval = String(req.query.interval ?? "1h");
    const end = req.query.end ? new Date(String(req.query.end)) : new Date();
    const start = req.query.start
      ? new Date(String(req.query.start))
      : new Date(end.getTime() - 180 * 24 * 3600 * 1000);

    if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || start >= end) {
      res.status(400).json({ error: "invalid_range" });
      return;
    }

    const params = new URLSearchParams({
      symbol: SYMBOL,
      interval,
      apikey: apiKey,
      start_date: start.toISOString().slice(0, 19),
      end_date: end.toISOString().slice(0, 19),
      timezone: "UTC",
      format: "JSON",
      outputsize: "5000",
    });

    const r = await fetch(`${TD_URL}?${params.toString()}`);
    if (!r.ok) {
      throw new Error(`TwelveData ${r.status}: ${await r.text().catch(() => "")}`);
    }
    const data = (await r.json()) as {
      status?: string;
      code?: number;
      message?: string;
      values?: Array<{ datetime: string; open: string; close: string }>;
    };

    if (data.status === "error" || !data.values) {
      throw new Error(`TwelveData error: ${data.message ?? "no values"}`);
    }

    const candles = data.values
      .map((v) => ({
        t: Math.floor(new Date(v.datetime + "Z").getTime() / 1000),
        o: Number(v.open),
        c: Number(v.close),
      }))
      .filter((c) => Number.isFinite(c.t) && Number.isFinite(c.o) && Number.isFinite(c.c))
      .sort((a, b) => a.t - b.t);

    res.json({
      market: "spx",
      symbol: SYMBOL,
      note: "SPY (SPDR S&P 500 ETF) used as 1:1 directional proxy for SPX on free data tier",
      interval,
      source: "twelvedata",
      start: start.toISOString(),
      end: end.toISOString(),
      count: candles.length,
      candles,
    });
  } catch (err) {
    req.log.error({ err }, "spx fetch failed");
    res.status(502).json({ error: "upstream_failed", message: (err as Error).message });
  }
});

export default router;
