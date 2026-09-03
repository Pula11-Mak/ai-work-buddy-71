import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AiOutputPanel } from "@/components/AiOutput";
import { AppShell } from "@/components/AppShell";
import {
  Field,
  GhostButton,
  PrimaryButton,
  TextArea,
  ToolPanel,
} from "@/components/Controls";
import { useAiTool } from "@/hooks/useAiTool";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workplace AI" },
      {
        name: "description",
        content:
          "Turn messy meeting notes or transcripts into a summary, decisions, and an owner-and-deadline action table.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Workplace AI" },
      {
        property: "og:description",
        content: "Key points, decisions, action items and deadlines from raw meeting notes.",
      },
    ],
  }),
  component: NotesPage,
});

const SAMPLE = `Weekly ops sync — Maya, Tom, Priya
- Maya: onboarding backlog is 40 accounts, mostly stuck on KYC docs
- Tom: new intake form ships Wednesday, cuts manual entry
- Priya asked whether we pause outbound until backlog clears — no decision
- Agreed: Tom owns intake rollout, Maya reports backlog daily until under 15
- Deadline mentioned for the compliance review: end of month`;

function NotesPage() {
  const [notes, setNotes] = useState("");
  const ai = useAiTool();

  return (
    <AppShell breadcrumb="Meeting Notes Summarizer">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ai.generate({ tool: "notes", notes });
          }}
        >
          <ToolPanel title="Meeting Notes Summarizer" tag="Summarize">
            <Field label="Raw notes or transcript" hint="Paste anything, bullets are fine">
              <TextArea
                value={notes}
                onChange={setNotes}
                rows={16}
                placeholder="Paste your meeting notes or transcript here…"
              />
            </Field>
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryButton loading={ai.isPending} disabled={notes.trim().length < 20}>
                Summarize notes
              </PrimaryButton>
              <GhostButton onClick={() => setNotes(SAMPLE)}>Use sample</GhostButton>
              <GhostButton
                onClick={() => {
                  setNotes("");
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
          title="Structured summary"
          emptyHint="Paste notes to get a summary, decisions, action items with owners and deadlines, plus open questions."
          loadingHint="Extracting key points, decisions and action items…"
        />
      </div>
    </AppShell>
  );
}
