import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AiOutputPanel } from "@/components/AiOutput";
import { AppShell } from "@/components/AppShell";
import {
  ChoiceGroup,
  Field,
  GhostButton,
  PrimaryButton,
  TextArea,
  ToolPanel,
} from "@/components/Controls";
import { useAiTool } from "@/hooks/useAiTool";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workplace AI" },
      {
        name: "description",
        content:
          "Get an executive summary, key insights, trade-offs and next steps on any work question, with confidence and gaps stated.",
      },
      { property: "og:title", content: "AI Research Assistant — Workplace AI" },
      {
        property: "og:description",
        content: "Structured insights and summaries for professional decision making.",
      },
    ],
  }),
  component: ResearchPage,
});

const DEPTHS = ["Quick scan", "Balanced", "Deep dive"] as const;
const FORMATS = ["Decision support", "Market overview", "Technical primer"] as const;

function ResearchPage() {
  const [question, setQuestion] = useState("");
  const [depth, setDepth] = useState<string>(DEPTHS[1]);
  const [format, setFormat] = useState<string>(FORMATS[0]);
  const ai = useAiTool();

  return (
    <AppShell breadcrumb="AI Research Assistant">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ai.generate({ tool: "research", question, depth, format });
          }}
        >
          <ToolPanel title="AI Research Assistant" tag="Investigate">
            <Field label="Depth">
              <ChoiceGroup
                name="Depth"
                options={DEPTHS}
                value={depth}
                onChange={setDepth}
              />
            </Field>
            <Field label="Emphasis">
              <ChoiceGroup
                name="Emphasis"
                options={FORMATS}
                value={format}
                onChange={setFormat}
              />
            </Field>
            <Field label="Research question" hint="Be specific about scope">
              <TextArea
                value={question}
                onChange={setQuestion}
                rows={8}
                placeholder="Should a 20-person B2B SaaS team move from quarterly to continuous performance reviews? What are the trade-offs?"
              />
            </Field>
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryButton
                loading={ai.isPending}
                disabled={question.trim().length < 6}
              >
                Research this
              </PrimaryButton>
              <GhostButton
                onClick={() => {
                  setQuestion("");
                  ai.reset();
                }}
              >
                Clear
              </GhostButton>
            </div>
          </ToolPanel>
        </form>

        <AiOutputPanel
          status={ai.status}
          text={ai.text}
          error={ai.error}
          title="Research brief"
          emptyHint="Ask a work question to get an executive summary, insights, considerations and next steps."
          loadingHint="Synthesising insights and trade-offs…"
        />
      </div>
    </AppShell>
  );
}
