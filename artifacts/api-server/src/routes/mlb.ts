import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

// MLB StatsAPI is free, keyless. Schedule with linescore hydrate gives per-inning runs.
const MLB_URL = "https://statsapi.mlb.com/api/v1/schedule";

interface Event {
  t: number; // game start unix seconds (we approximate per-half-inning by adding offsets)
  gamePk: number;
  inning: number;
  half: "top" | "bottom";
  runs: number; // runs scored in this half-inning
  team: string;
}

interface ScheduleGame {
  gamePk: number;
  gameDate?: string;
  status?: { abstractGameState?: string; detailedState?: string };
  teams?: {
    home?: { team?: { name?: string } };
    away?: { team?: { name?: string } };
  };
  linescore?: {
    innings?: Array<{
      num?: number;
      home?: { runs?: number };
      away?: { runs?: number };
    }>;
  };
}

interface ScheduleDate {
  games?: ScheduleGame[];
}

router.get("/events", async (req: Request, res: Response) => {
  try {
    const end = req.query.end ? new Date(String(req.query.end)) : new Date();
    const start = req.query.start ? new Date(String(req.query.start)) : new Date(end.getTime() - 180 * 24 * 3600 * 1000);

    const params = new URLSearchParams({
      sportId: "1",
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      hydrate: "linescore",
    });

    const r = await fetch(`${MLB_URL}?${params.toString()}`);
    if (!r.ok) {
      throw new Error(`MLB ${r.status}: ${await r.text().catch(() => "")}`);
    }
    const data = (await r.json()) as { dates?: ScheduleDate[] };

    const events: Event[] = [];
    for (const d of data.dates ?? []) {
      for (const g of d.games ?? []) {
        const state = g.status?.abstractGameState;
        if (state !== "Final") continue;
        const baseT = g.gameDate ? Math.floor(new Date(g.gameDate).getTime() / 1000) : 0;
        const home = g.teams?.home?.team?.name ?? "home";
        const away = g.teams?.away?.team?.name ?? "away";
        const innings = g.linescore?.innings ?? [];
        for (const inn of innings) {
          const num = inn.num ?? 0;
          if (typeof inn.away?.runs === "number") {
            events.push({
              t: baseT + (num - 1) * 1200, // ~20 min per half-inning offset for ordering
              gamePk: g.gamePk,
              inning: num,
              half: "top",
              runs: inn.away.runs,
              team: away,
            });
          }
          if (typeof inn.home?.runs === "number") {
            events.push({
              t: baseT + (num - 1) * 1200 + 600,
              gamePk: g.gamePk,
              inning: num,
              half: "bottom",
              runs: inn.home.runs,
              team: home,
            });
          }
        }
      }
    }

    events.sort((a, b) => a.t - b.t);

    res.json({
      market: "mlb",
      start: start.toISOString(),
      end: end.toISOString(),
      count: events.length,
      events,
    });
  } catch (err) {
    req.log.error({ err }, "mlb fetch failed");
    res.status(502).json({ error: "upstream_failed", message: (err as Error).message });
  }
});

export default router;
