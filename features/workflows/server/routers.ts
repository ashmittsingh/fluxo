import { generateSlug } from "random-word-slugs";
import prisma from "@/db/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const workflowsRouter = createTRPCRouter({
  create: protectedProcedure.mutation(({ ctx }) => {
    return prisma.workflow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
      },
    });
  }),
});