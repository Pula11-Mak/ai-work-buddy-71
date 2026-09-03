import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import type { AiToolInput } from "@/lib/ai.functions";
import { runAiTool } from "@/lib/ai.functions";

export type AiStatus = "idle" | "loading" | "done" | "error";

export function useAiTool() {
  const run = useServerFn(runAiTool);
  const [status, setStatus] = useState<AiStatus>("idle");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function generate(data: AiToolInput) {
    setStatus("loading");
    setError(null);
    setText("");
    try {
      const result = await run({ data });
      setText(result.text);
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setText("");
    setError(null);
  }

  return { status, text, error, generate, reset, isPending: status === "loading" };
}
