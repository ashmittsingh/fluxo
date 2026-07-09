import { generateSlug } from "random-word-slugs";
import prisma from "@/db/db";
import {
  createTRPCRouter,
  protectedProcedure,
  premiumProcedure,
} from "@/trpc/init";
import { z } from "zod";
import { checkWorkflowLimit, incrementWorkflowUsage } from "@/lib/usage";

import { TRPCError } from "@trpc/server";
export const workflowsRouter = createTRPCRouter({
  create: premiumProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.auth.user.id;

    const allowed = await checkWorkflowLimit(userId);

    if (!allowed) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Workflow limit reached. Please upgrade your plan.",
      });
    }

    const workflow = await prisma.$transaction(async (tx) => {
      const createdWorkflow = await tx.workflow.create({
        data: {
          name: generateSlug(3),
          userId,
        },
      });

      await incrementWorkflowUsage(userId);

      return createdWorkflow;
    });

    return workflow;
  }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return prisma.workflow.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return prisma.workflow.findUnique({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
  getMany: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
    });
  }),
});
