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

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workplace AI" },
      {
        name: "description",
        content:
          "Draft professional work emails in seconds with tone and audience controls, plus review notes before you send.",
      },
      { property: "og:title", content: "Smart Email Generator — Workplace AI" },
      {
        property: "og:description",
        content: "Tone and audience aware AI email drafting for busy professionals.",
      },
    ],
  }),
  component: EmailPage,
});

const TONES = ["Professional", "Friendly", "Direct", "Persuasive", "Apologetic"] as const;
const AUDIENCES = ["Client", "Manager", "Team", "Executive", "Vendor"] as const;
const LENGTHS = ["Short", "Standard", "Detailed"] as const;

function EmailPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<string>(TONES[0]);
  const [audience, setAudience] = useState<string>(AUDIENCES[0]);
  const [length, setLength] = useState<string>(LENGTHS[1]);
  const ai = useAiTool();

  return (
    <AppShell breadcrumb="Smart Email Generator">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ai.generate({ tool: "email", topic, tone, audience, length });
          }}
        >
          <ToolPanel title="Smart Email Generator" tag="Draft">
            <Field label="Tone">
              <ChoiceGroup name="Tone" options={TONES} value={tone} onChange={setTone} />
            </Field>
            <Field label="Audience">
              <ChoiceGroup
                name="Audience"
                options={AUDIENCES}
                value={audience}
                onChange={setAudience}
              />
            </Field>
            <Field label="Length">
              <ChoiceGroup
                name="Length"
                options={LENGTHS}
                value={length}
                onChange={setLength}
              />
            </Field>
            <Field label="Purpose & context" hint="What should the email accomplish?">
              <TextArea
                value={topic}
                onChange={setTopic}
                rows={7}
                placeholder="Follow up with the client on the delayed Q3 report, apologise for the slip, and propose a Thursday review call."
              />
            </Field>
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryButton loading={ai.isPending} disabled={topic.trim().length < 4}>
                Generate email
              </PrimaryButton>
              <GhostButton
                onClick={() => {
                  setTopic("");
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
          title="Draft email"
          emptyHint="Describe the situation and pick a tone — your draft, subject line and review notes appear here."
          loadingHint="Drafting a subject line, body and review notes…"
        />
      </div>
    </AppShell>
  );
}
