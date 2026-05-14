import { Router, type IRouter } from "express";
import healthRouter from "./health";
import btcRouter from "./btc";
import spxRouter from "./spx";
import mlbRouter from "./mlb";
import askMartiRouter from "./ask-marti";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/btc", btcRouter);
router.use("/spx", spxRouter);
router.use("/mlb", mlbRouter);
router.use("/ask-marti", askMartiRouter);

export default router;
