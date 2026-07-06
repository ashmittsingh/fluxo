import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/db/db";
import { inngest } from "@/inngest/client";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({
  testAi: baseProcedure.mutation(async () => {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
    });
    return text;
  }),
  getWorkFlows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "app/task.created",
      data: { id: "task_001" },
    });
    return { success: true, message: "Job Queued" };
  }),
});

export type AppRouter = typeof appRouter;
