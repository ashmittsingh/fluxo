import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/db/db';

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ctx}) => {
    const users = prisma.user.findMany({
      where: {
        id: ctx.auth.user.id,
      },
    });
    return users;
  }),
});

export type AppRouter = typeof appRouter;
