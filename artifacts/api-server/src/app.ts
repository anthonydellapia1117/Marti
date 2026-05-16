import express, { type Express } from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Serve marti's built static assets so the same origin hosts API + frontend.
// Bundled output lives at artifacts/api-server/dist/index.mjs; marti builds to artifacts/marti/dist/public.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const martiDistPath = path.resolve(__dirname, "..", "..", "marti", "dist", "public");

app.use(
  express.static(martiDistPath, {
    index: false,
    maxAge: "1h",
  }),
);

// SPA fallback: any non-/api GET serves index.html so client-side routing works.
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(martiDistPath, "index.html"));
});

export default app;
