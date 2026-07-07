import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/db/db";
import { inngest } from "@/inngest/client";

export const appRouter = createTRPCRouter({
  testAi: baseProcedure.mutation(async () => {
    await inngest.send({
      name: "execute",
    }); 
    return { success: true, message: "Job Queued" };
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
