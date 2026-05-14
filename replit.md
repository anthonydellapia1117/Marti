# Marti

A strategy simulation tool for binary-outcome markets using a modified martingale approach with cap-at-N risk control. Tests the strategy against real historical market data across three markets:

- **BTC 15m direction** (Coinbase Exchange, keyless)
- **SPX 1H direction** via SPY ETF as 1:1 directional proxy (TwelveData, free tier)
- **MLB inning scoring** (MLB StatsAPI, keyless)

Three operational modes preview deployment stages, all loading identical real data with different framing copy:

- `SIMULATION`: backtest preview
- `PAPER`: paper trading preview
- `LIVE`: live trading preview

Includes an integrated AI assistant ("Marti") powered by Anthropic Claude via Replit's AI integration proxy. Provides natural-language analysis of simulation results, edge classification, and risk math.

## Stack

- React 19.1 + Vite 7 + Tailwind CSS 4
- Express 5 backend at `artifacts/api-server` exposing four real-data endpoints
- pnpm workspace monorepo
- 6-hour localStorage cache for fetched market data
- TypeScript + JSX hybrid

## Endpoints

| Endpoint | Source | Auth |
|----------|--------|------|
| GET /api/btc/candles | Coinbase Exchange | None |
| GET /api/spx/candles | TwelveData (SPY proxy) | TWELVEDATA_API_KEY |
| GET /api/mlb/events | MLB StatsAPI | None |
| POST /api/ask-marti | Anthropic Claude via Replit proxy | Built-in |

## Development

Built collaboratively by Anthony DellaPia with Replit Agent. Designed for use as a strategy validation tool ahead of live deployment via separate execution layer (IBKR ForecastTrader / Kalshi).
