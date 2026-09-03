import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { CHAT_SYSTEM } from "@/lib/prompts";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { getAiModel, getLovableAiGatewayRunId } = await import(
          "@/lib/ai-gateway.server"
        );
        const { messages } = (await request.json()) as { messages: UIMessage[] };

        const result = streamText({
          model: getAiModel(getLovableAiGatewayRunId(request)),
          system: CHAT_SYSTEM,
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse();
      },
    },
  },
});
