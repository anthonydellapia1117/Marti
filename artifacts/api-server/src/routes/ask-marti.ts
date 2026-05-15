import { Router, type IRouter, type Request, type Response } from "express";
import Anthropic from "@anthropic-ai/sdk";

const router: IRouter = Router();

const apiKey = process.env.ANTHROPIC_API_KEY;

const client: Anthropic | null = apiKey ? new Anthropic({ apiKey }) : null;

interface ChatBody {
  system?: string;
  messages?: Array<{ role: "user" | "assistant"; content: string }>;
  model?: string;
}

router.post("/", async (req: Request<unknown, unknown, ChatBody>, res: Response): Promise<void> => {
  if (!client) {
    res.status(500).json({ error: "anthropic_not_configured" });
    return;
  }

  const { system, messages, model } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "missing_messages" });
    return;
  }
  const sanitized = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content }));

  if (sanitized.length === 0) {
    res.status(400).json({ error: "no_valid_messages" });
    return;
  }

  try {
    const resp = await client.messages.create({
      model: model && typeof model === "string" ? model : "claude-sonnet-4-6",
      max_tokens: 8192,
      system: typeof system === "string" ? system : undefined,
      messages: sanitized,
    });

    const text = resp.content
      .filter((b): b is Extract<typeof b, { type: "text" }> => b.type === "text")
      .map((b) => b.text)
      .join("");

    res.json({
      content: text,
      model: resp.model,
      stop_reason: resp.stop_reason,
      usage: resp.usage,
    });
  } catch (err) {
    req.log.error({ err }, "anthropic call failed");
    res.status(502).json({ error: "anthropic_failed", message: (err as Error).message });
  }
});

export default router;
