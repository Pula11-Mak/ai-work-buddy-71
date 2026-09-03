export const BASE_SYSTEM = `You are an AI workplace productivity assistant for busy professionals.
Rules:
- Write in clear, concise, professional business English.
- Use Markdown with exactly the headings requested. No preamble, no sign-off commentary.
- Never invent names, owners, dates, numbers or facts that are not present in the input. If something is unknown, write "unspecified".
- Prefer short sentences, scannable bullets and tables.`;

export const CHAT_SYSTEM = `${BASE_SYSTEM}
You are in conversational mode. Answer work questions, draft content, plan tasks and summarize.
Ask at most one clarifying question when the request is genuinely ambiguous, otherwise answer directly.`;

export type EmailInput = {
  topic: string;
  tone: string;
  audience: string;
  length: string;
};

export function emailPrompt(i: EmailInput) {
  return `Write a work email.

Tone: ${i.tone}
Audience: ${i.audience}
Length: ${i.length}
Purpose and context:
"""
${i.topic}
"""

Respond in exactly this structure:

## Subject
One single-line subject.

## Email
The email body, using paragraphs and bullets where useful. Use [Name] style placeholders for anything unknown.

---

## Review notes
2-4 bullets on what a human should verify or personalise before sending.`;
}

export function notesPrompt(notes: string) {
  return `Summarize the following raw meeting notes or transcript.

"""
${notes}
"""

Respond in exactly this structure:

## Summary
2-4 sentences.

## Key points
Bullets of the substantive discussion points.

## Decisions
Bullets. If no decision was made, write "No explicit decisions recorded."

## Action items
A Markdown table with columns: Action | Owner | Deadline. Use "unspecified" when not stated.

## Open questions
Bullets of unresolved items.`;
}

export type PlannerInput = { tasks: string; horizon: string; capacity: string };

export function plannerPrompt(i: PlannerInput) {
  return `Prioritise and schedule the following work.

Planning horizon: ${i.horizon}
Available focus capacity: ${i.capacity}
Tasks and context:
"""
${i.tasks}
"""

Respond in exactly this structure:

## Priority order
A Markdown table with columns: # | Task | Why now | Effort | Impact.

## Suggested schedule
Grouped bullets by time block or day, respecting the stated capacity.

## Deferred
Bullets of what to intentionally postpone, with a reason.

## Risks
Bullets of dependencies, blockers or overload risks.`;
}

export type ResearchInput = { question: string; depth: string; format: string };

export function researchPrompt(i: ResearchInput) {
  return `Act as a research assistant for a professional audience.

Depth: ${i.depth}
Preferred output emphasis: ${i.format}
Research question:
"""
${i.question}
"""

Respond in exactly this structure:

## Executive summary
3-5 sentences.

## Key insights
Bullets, each with a short bolded lead-in.

## Considerations
Bullets on trade-offs, counterpoints or constraints.

## Next steps
Bullets of concrete follow-up actions.

## Confidence and gaps
Bullets stating what is well established versus uncertain, and what data would be needed. Do not fabricate citations or statistics.`;
}
