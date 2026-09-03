import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

import {
  BASE_SYSTEM,
  emailPrompt,
  notesPrompt,
  plannerPrompt,
  researchPrompt,
} from "./prompts";

const Input = z.discriminatedUnion("tool", [
  z.object({
    tool: z.literal("email"),
    topic: z.string().min(4),
    tone: z.string(),
    audience: z.string(),
    length: z.string(),
  }),
  z.object({ tool: z.literal("notes"), notes: z.string().min(20) }),
  z.object({
    tool: z.literal("planner"),
    tasks: z.string().min(10),
    horizon: z.string(),
    capacity: z.string(),
  }),
  z.object({
    tool: z.literal("research"),
    question: z.string().min(6),
    depth: z.string(),
    format: z.string(),
  }),
]);

export type AiToolInput = z.infer<typeof Input>;

function buildPrompt(data: AiToolInput) {
  switch (data.tool) {
    case "email":
      return emailPrompt(data);
    case "notes":
      return notesPrompt(data.notes);
    case "planner":
      return plannerPrompt(data);
    case "research":
      return researchPrompt(data);
  }
}

export const runAiTool = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const { getAiModel, gatewayErrorMessage } = await import("./ai-gateway.server");
    try {
      const result = streamText({
        model: getAiModel(),
        system: BASE_SYSTEM,
        prompt: buildPrompt(data),
      });
      return { text: await result.text };
    } catch (error) {
      console.error("runAiTool failed", error);
      throw new Error(gatewayErrorMessage(error));
    }
  });
