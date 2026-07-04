import { baseProcedure, createTRPCRouter } from '../init';
import prisma from '@/db/db';

export const appRouter = createTRPCRouter({
  getUsers: baseProcedure.query(() => {
    const users = prisma.user.findMany();
    return users;
  }),
});

export type AppRouter = typeof appRouter;
