import { AlertTriangle, Info, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

import type { AiStatus } from "@/hooks/useAiTool";

export function Disclaimer() {
  return (
    <p className="hairline mt-6 flex items-start gap-2 pt-4 text-xs text-fog">
      <Info className="mt-0.5 size-3.5 shrink-0" />
      AI-generated content may require human review.
    </p>
  );
}

export function OutputSkeleton({ lines = 8 }: { lines?: number }) {
  return (
    <div className="grid gap-3" aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="shimmer h-3 rounded-full"
          style={{ width: `${[100, 88, 94, 62, 100, 78, 92, 55, 86, 70][i % 10]}%` }}
        />
      ))}
    </div>
  );
}

export function AiOutputPanel({
  status,
  text,
  error,
  title = "AI output",
  emptyHint,
  loadingHint = "Generating a professional draft…",
}: {
  status: AiStatus;
  text: string;
  error: string | null;
  title?: string;
  emptyHint: string;
  loadingHint?: string;
}) {
  return (
    <section className="panel flex min-h-[24rem] flex-col p-5 sm:p-6" aria-live="polite">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="label-mono">{title}</p>
        {status === "loading" && (
          <span className="flex items-center gap-2 text-xs text-glow">
            <Loader2 className="size-3.5 animate-spin" />
            Working
          </span>
        )}
      </div>

      <div className="min-h-0 flex-1">
        {status === "loading" && (
          <div className="grid gap-5">
            <p className="text-sm text-mist">{loadingHint}</p>
            <OutputSkeleton />
          </div>
        )}

        {status === "error" && (
          <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <span>{error}</span>
          </div>
        )}

        {status === "idle" && (
          <div className="grid h-full place-items-center py-10 text-center">
            <div className="max-w-xs">
              <Sparkles className="mx-auto size-5 text-glow-soft" />
              <p className="mt-3 text-sm text-fog">{emptyHint}</p>
            </div>
          </div>
        )}

        {status === "done" && (
          <div className="ai-prose rise">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}
      </div>

      <Disclaimer />
    </section>
  );
}
