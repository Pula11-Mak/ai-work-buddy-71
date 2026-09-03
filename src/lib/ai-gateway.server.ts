import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export const AI_MODEL = "google/gemini-3.7-flash";

export function getLovableAiGatewayRunId(request: Request) {
  return request.headers.get("X-Lovable-AIG-Run-ID") ?? undefined;
}

export function getAiModel(initialRunId?: string) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

  const provider = createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
    },
  });

  return provider(AI_MODEL);
}

export function gatewayErrorMessage(error: unknown) {
  const raw = error instanceof Error ? error.message : String(error);
  if (raw.includes("402"))
    return "The workspace is out of AI credits. Add credits in Lovable to keep generating.";
  if (raw.includes("403"))
    return "AI access is blocked by workspace policy. Ask an admin to re-enable Lovable AI.";
  if (raw.includes("429"))
    return "Too many requests right now. Wait a few seconds and try again.";
  if (raw.includes("401")) return "AI is not configured correctly for this app.";
  return "The AI request failed. Please try again.";
}
