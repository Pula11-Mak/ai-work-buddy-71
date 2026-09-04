# AI Workplace Productivity Assistant

A modern, responsive AI productivity suite for busy professionals. Five focused tools — each built on structured prompt engineering — that draft, summarize, plan, and research so you can spend your time reviewing instead of writing from scratch.

> **Disclaimer:** AI-generated content may require human review. Every result is a draft — read it, adjust the details, then send or commit.

---

## ✨ Features

| Tool | What it does |
| --- | --- |
| **Smart Email Generator** | Drafts tone- and audience-aware emails with a subject line, body, and human-review notes. |
| **Meeting Notes Summarizer** | Turns raw notes or transcripts into a summary, key points, decisions, an action-items table (Action · Owner · Deadline), and open questions. |
| **AI Task Planner** | Prioritises and schedules your workload into a priority table, suggested schedule, deferred items, and risk callouts. |
| **AI Research Assistant** | Produces an executive summary, key insights, considerations, next steps, and a confidence-and-gaps section for any research question. |
| **Assistant Chat** | A streaming conversational interface for ad-hoc work questions, drafting, planning, and summarising. |

All non-chat tools stream structured Markdown output rendered with tables, lists, and headings. Loading states show skeletons while you wait, and a disclaimer follows every result.

---

## 🧱 Tech Stack

- **[TanStack Start](https://tanstack.com/start)** v1 — full-stack React 19 framework with SSR, file-based routing, and server functions
- **[Tailwind CSS](https://tailwindcss.com)** v4 — native CSS `@import` and `@theme` tokens (no `tailwind.config.js`)
- **[Vite](https://vite.dev)** 8 — build tool
- **[AI SDK](https://sdk.vercel.ai)** (`ai`, `@ai-sdk/openai-compatible`, `@ai-sdk/react`) — streaming chat and tool calls
- **[react-markdown](https://github.com/remarkjs/react-markdown)** + `remark-gfm` — GFM table rendering
- **[lucide-react](https://lucide.dev)** — icons
- **[Zod](https://zod.dev)** — input validation on server functions

AI calls go through the **Lovable AI Gateway** (`https://ai.gateway.lovable.dev/v1`) using the `google/gemini-3.7-flash` model.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) recommended)
- [Bun](https://bun.sh) (this project uses `bunfig.toml`)

### Install & run locally

```sh
git clone <this-repository-url>
cd <repository-name>
bun install
bun run dev
```

The dev server starts at `http://localhost:8080`.

### Scripts

| Script | Description |
| --- | --- |
| `bun run dev` | Start the Vite dev server |
| `bun run build` | Production build |
| `bun run build:dev` | Development-mode build |
| `bun run preview` | Preview the production build |
| `bun run lint` | Run ESLint |
| `bun run format` | Format with Prettier |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── AppShell.tsx        # Sidebar nav + header shell, shared across pages
│   ├── AiOutput.tsx        # Output panel, skeleton, disclaimer
│   └── Controls.tsx        # Field, ChoiceGroup, TextArea, buttons, ToolPanel
├── hooks/
│   ├── useAiTool.ts        # State machine for non-chat AI tools
│   └── use-mobile.tsx
├── lib/
│   ├── ai-gateway.server.ts # Lovable AI Gateway client + error mapping
│   ├── ai.functions.ts      # runAiTool server function (email/notes/planner/research)
│   ├── prompts.ts          # BASE_SYSTEM + per-tool structured prompts
│   └── utils.ts
├── routes/
│   ├── __root.tsx          # Root layout, fonts, global head
│   ├── index.tsx           # Dashboard
│   ├── email.tsx           # Email Generator
│   ├── notes.tsx           # Meeting Notes Summarizer
│   ├── planner.tsx         # Task Planner
│   ├── research.tsx        # Research Assistant
│   ├── chat.tsx            # Assistant Chat (streaming)
│   └── api/
│       └── chat.ts         # Streaming chat server route
├── styles.css             # Tailwind v4 theme tokens (oklch "liquid obsidian" palette)
└── start.ts               # Server entry + middleware
```

---

## 🎨 Design

The UI uses a custom **"liquid obsidian"** theme defined in `src/styles.css` with oklch color tokens (`--background`, `--panel`, `--glow`, `--mist`, `--fog`, `--line`). Components reference semantic tokens — never hardcoded colors — so the theme stays consistent and dark-mode friendly.

Key utilities: `panel`, `panel-strong`, `hairline`, `label-mono`, `ai-prose` (markdown rendering), `shimmer`, `rise`.

Layout is a sidebar navigation (`AppShell`) with a card-based, responsive workspace. Below the `lg` breakpoint the sidebar collapses into a mobile drawer.

---

## 🤖 How the AI stays trustworthy

- **Fixed prompt structure** — each tool enforces exact Markdown headings, so output arrives in the same professional format every time.
- **No fabrication** — the system prompt forbids inventing owners, dates, or figures; unknowns are marked `unspecified`.
- **Always a draft** — every result ends with review notes or a disclaimer prompting human verification.

---

## 📝 Environment

The app reads `LOVABLE_API_KEY` from the server environment to call the Lovable AI Gateway. No other keys are required for AI features.

---

## 📄 License

This project is built with [Lovable](https://lovable.dev). The code is yours — see your repository's license file for terms.
