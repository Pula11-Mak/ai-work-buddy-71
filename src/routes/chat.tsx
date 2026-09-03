import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, RotateCcw, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Disclaimer, OutputSkeleton } from "@/components/AiOutput";
import { AppShell } from "@/components/AppShell";
import { GhostButton } from "@/components/Controls";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Assistant Chat — Workplace AI" },
      {
        name: "description",
        content:
          "Chat with a workplace AI assistant to draft, plan, summarize and think through work problems in real time.",
      },
      { property: "og:title", content: "AI Assistant Chat — Workplace AI" },
      {
        property: "og:description",
        content: "A streaming AI chat assistant built for daily professional work.",
      },
    ],
  }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Rewrite this update so it sounds calmer and more confident.",
  "Help me say no to a meeting without damaging the relationship.",
  "Turn my three priorities into a realistic Monday schedule.",
  "What questions should I ask in a vendor renewal call?",
];

function messageText(message: { parts?: Array<{ type: string; text?: string }> }) {
  return (message.parts ?? [])
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("");
}

function ChatPage() {
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  function submit() {
    const value = input.trim();
    if (!value || busy) return;
    setInput("");
    sendMessage({ text: value });
  }

  const last = messages[messages.length - 1];
  const awaitingFirstToken =
    busy && (!last || last.role === "user" || messageText(last).length === 0);

  return (
    <AppShell
      breadcrumb="AI Assistant Chat"
      actions={
        <GhostButton
          onClick={() => {
            setMessages([]);
            setInput("");
          }}
        >
          <RotateCcw className="size-3.5" />
          New chat
        </GhostButton>
      }
    >
      <div className="panel mx-auto flex h-[calc(100vh-10rem)] max-w-3xl flex-col p-4 sm:p-6">
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {messages.length === 0 && (
            <div className="grid h-full place-items-center py-8 text-center">
              <div className="max-w-md">
                <Sparkles className="mx-auto size-5 text-glow" />
                <h1 className="mt-4 font-display text-xl font-semibold">
                  How can I help with your work today?
                </h1>
                <p className="mt-2 text-sm text-fog">
                  Ask for drafts, summaries, plans or a second opinion.
                </p>
                <div className="mt-6 grid gap-2 text-left">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => sendMessage({ text: suggestion })}
                      className="rounded-xl border border-line bg-panel-strong/50 px-4 py-3 text-sm text-mist transition-colors hover:text-foreground"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-5">
            {messages.map((message) => {
              const text = messageText(message);
              if (!text) return null;
              return message.role === "user" ? (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md border border-glow/40 bg-glow/12 px-4 py-3 text-sm whitespace-pre-wrap">
                    {text}
                  </div>
                </div>
              ) : (
                <div key={message.id} className="max-w-[92%]">
                  <p className="label-mono mb-2">Assistant</p>
                  <div className="ai-prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                  </div>
                </div>
              );
            })}

            {awaitingFirstToken && (
              <div className="max-w-[92%]">
                <p className="label-mono mb-2 flex items-center gap-2">
                  Assistant
                  <Loader2 className="size-3 animate-spin text-glow" />
                </p>
                <OutputSkeleton lines={4} />
              </div>
            )}
          </div>
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="hairline mt-4 flex items-end gap-2 pt-4"
        >
          <textarea
            value={input}
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Ask anything about your work…  (Enter to send, Shift+Enter for a new line)"
            className="max-h-40 min-h-11 flex-1 resize-none rounded-xl border border-line bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-fog focus:border-glow/60 focus:ring-2 focus:ring-glow/20 focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send message"
            className="grid size-11 shrink-0 place-items-center rounded-xl bg-glow text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </button>
        </form>
        <Disclaimer />
      </div>
    </AppShell>
  );
}
