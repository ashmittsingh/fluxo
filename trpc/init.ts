import { auth } from '@/lib/auth';
import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import { headers } from 'next/headers';
import { TRPCError } from '@trpc/server';

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    session,
  };
});

type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({

});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async({ ctx, next }) => {
  if(!ctx.session){
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message:"Unauthorized",
    });
  }
  return next({
    ctx: {
      ...ctx,
      auth: ctx.session,
      user: ctx.session.user,
    },
});
});