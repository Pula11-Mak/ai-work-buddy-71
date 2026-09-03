import { Link } from "@tanstack/react-router";
import {
  Mail,
  NotebookPen,
  ListChecks,
  Telescope,
  MessagesSquare,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useState, type ReactNode } from "react";

export const NAV_TOOLS = [
  {
    to: "/email",
    label: "Email Generator",
    blurb: "Tone & audience aware drafts",
    icon: Mail,
  },
  {
    to: "/notes",
    label: "Meeting Notes",
    blurb: "Summary, actions, deadlines",
    icon: NotebookPen,
  },
  {
    to: "/planner",
    label: "Task Planner",
    blurb: "Prioritise and schedule",
    icon: ListChecks,
  },
  {
    to: "/research",
    label: "Research Assistant",
    blurb: "Insights and next steps",
    icon: Telescope,
  },
  {
    to: "/chat",
    label: "Assistant Chat",
    blurb: "Ask anything, hands free",
    icon: MessagesSquare,
  },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="grid gap-1">
      <Link
        to="/"
        onClick={onNavigate}
        activeOptions={{ exact: true }}
        activeProps={{ className: "bg-panel-strong text-foreground" }}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-mist transition-colors hover:bg-panel-strong hover:text-foreground"
      >
        <LayoutDashboard className="size-4 shrink-0 text-glow" />
        Dashboard
      </Link>
      <p className="label-mono mt-4 mb-1 px-3">Tools</p>
      {NAV_TOOLS.map((tool) => (
        <Link
          key={tool.to}
          to={tool.to}
          onClick={onNavigate}
          activeProps={{ className: "bg-panel-strong text-foreground" }}
          className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm text-mist transition-colors hover:bg-panel-strong hover:text-foreground"
        >
          <tool.icon className="mt-0.5 size-4 shrink-0 text-glow" />
          <span className="min-w-0">
            <span className="block truncate">{tool.label}</span>
            <span className="block truncate text-xs text-fog">{tool.blurb}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-xl border border-line bg-panel-strong">
        <Sparkles className="size-4 text-glow" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-semibold">Workplace AI</span>
        <span className="label-mono">Productivity suite</span>
      </span>
    </Link>
  );
}

export function AppShell({
  breadcrumb,
  actions,
  children,
}: {
  breadcrumb: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden w-72 shrink-0 flex-col gap-8 border-r border-line/70 bg-panel/40 p-6 backdrop-blur-xl lg:sticky lg:top-0 lg:flex lg:h-screen">
        <Brand />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <NavList />
        </div>
        <p className="text-xs leading-relaxed text-fog">
          AI-generated content may require human review.
        </p>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <div className="panel absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col gap-6 rounded-none rounded-r-2xl p-6">
            <div className="flex items-center justify-between gap-3">
              <Brand />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="rounded-lg p-2 text-mist hover:bg-panel-strong"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <NavList onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line/70 bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="rounded-lg border border-line p-2 text-mist hover:bg-panel-strong lg:hidden"
          >
            <Menu className="size-4" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="label-mono">Workspace</p>
            <p className="truncate font-display text-sm font-medium">{breadcrumb}</p>
          </div>
          {actions}
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
