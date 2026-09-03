import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, ShieldCheck, Zap } from "lucide-react";

import { Disclaimer } from "@/components/AiOutput";
import { AppShell, NAV_TOOLS } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Workplace AI — AI Productivity Assistant for Professionals" },
      {
        name: "description",
        content:
          "Automate daily work with AI: draft emails, summarize meetings, prioritise tasks, research decisions and chat with an assistant.",
      },
      {
        property: "og:title",
        content: "Workplace AI — AI Productivity Assistant for Professionals",
      },
      {
        property: "og:description",
        content:
          "Five AI tools for daily work: email drafting, meeting summaries, task planning, research and chat.",
      },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "Tools ready", value: "5", icon: Zap },
  { label: "Setup needed", value: "None", icon: ShieldCheck },
  { label: "Typical draft", value: "~10s", icon: Clock },
];

function Dashboard() {
  return (
    <AppShell breadcrumb="Dashboard">
      <div className="grid gap-6">
        <section className="panel relative overflow-hidden p-6 sm:p-10">
          <p className="label-mono">AI workplace productivity assistant</p>
          <h1 className="mt-4 max-w-2xl font-display text-3xl leading-tight font-semibold sm:text-4xl">
            Do the thinking. Let AI do the drafting, summarising and sequencing.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
            Five focused tools for the work that eats your day — each one built on
            structured prompts so the output arrives clear, professional and ready to
            review.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/email"
              className="inline-flex items-center gap-2 rounded-full bg-glow px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Draft an email
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-mist transition-colors hover:bg-panel-strong hover:text-foreground"
            >
              Open assistant chat
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="panel-strong flex items-center gap-3 px-4 py-3"
              >
                <stat.icon className="size-4 shrink-0 text-glow" />
                <span>
                  <span className="block font-display text-lg leading-none font-semibold">
                    {stat.value}
                  </span>
                  <span className="label-mono">{stat.label}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="label-mono mb-3">Start a task</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {NAV_TOOLS.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="panel group flex flex-col gap-3 p-5 transition-colors hover:border-glow/40"
              >
                <span className="grid size-10 place-items-center rounded-xl border border-line bg-panel-strong">
                  <tool.icon className="size-4 text-glow" />
                </span>
                <span className="font-display text-base font-semibold">{tool.label}</span>
                <span className="text-sm text-fog">{tool.blurb}</span>
                <span className="mt-auto flex items-center gap-1 pt-3 text-sm text-mist transition-colors group-hover:text-glow">
                  Open
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="panel p-5 sm:p-6">
          <p className="label-mono">How output stays trustworthy</p>
          <ul className="mt-4 grid gap-3 text-sm text-mist sm:grid-cols-3">
            <li className="panel-strong p-4">
              Each tool uses a fixed prompt structure, so results come back in the same
              professional format every time.
            </li>
            <li className="panel-strong p-4">
              The assistant never invents owners, dates or figures — anything unknown is
              marked as unspecified.
            </li>
            <li className="panel-strong p-4">
              Every result is a draft: read it, adjust the details, then send or commit.
            </li>
          </ul>
          <Disclaimer />
        </section>
      </div>
    </AppShell>
  );
}
