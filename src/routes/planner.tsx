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

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workplace AI" },
      {
        name: "description",
        content:
          "Turn a messy task dump into a prioritised order, a realistic schedule, deliberate deferrals and risk flags.",
      },
      { property: "og:title", content: "AI Task Planner — Workplace AI" },
      {
        property: "og:description",
        content: "AI prioritisation and scheduling that respects your real focus capacity.",
      },
    ],
  }),
  component: PlannerPage,
});

const HORIZONS = ["Today", "This week", "Next two weeks"] as const;
const CAPACITY = ["2 focus hours", "4 focus hours", "6 focus hours"] as const;

function PlannerPage() {
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState<string>(HORIZONS[1]);
  const [capacity, setCapacity] = useState<string>(CAPACITY[1]);
  const ai = useAiTool();

  return (
    <AppShell breadcrumb="AI Task Planner">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ai.generate({ tool: "planner", tasks, horizon, capacity });
          }}
        >
          <ToolPanel title="AI Task Planner" tag="Prioritise">
            <Field label="Planning horizon">
              <ChoiceGroup
                name="Horizon"
                options={HORIZONS}
                value={horizon}
                onChange={setHorizon}
              />
            </Field>
            <Field label="Daily focus capacity">
              <ChoiceGroup
                name="Capacity"
                options={CAPACITY}
                value={capacity}
                onChange={setCapacity}
              />
            </Field>
            <Field label="Tasks & context" hint="One per line, add deadlines if known">
              <TextArea
                value={tasks}
                onChange={setTasks}
                rows={11}
                placeholder={
                  "Finish Q3 board deck (due Friday)\nInterview two candidates\nFix billing bug reported by 3 customers\nWrite onboarding docs\nPlan team offsite"
                }
              />
            </Field>
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryButton loading={ai.isPending} disabled={tasks.trim().length < 10}>
                Build my plan
              </PrimaryButton>
              <GhostButton
                onClick={() => {
                  setTasks("");
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
          title="Prioritised plan"
          emptyHint="List your tasks to get a priority order, a schedule that fits your capacity, and risk flags."
          loadingHint="Weighing impact, effort and deadlines…"
        />
      </div>
    </AppShell>
  );
}
