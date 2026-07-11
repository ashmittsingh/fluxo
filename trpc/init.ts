import { auth } from '@/lib/auth';
import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import { headers } from 'next/headers';
import { TRPCError } from "@trpc/server";
import { getCurrentPlan, isPremium } from "@/lib/subscription";
import superjson from "superjson";

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
  transformer: superjson,
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

export const premiumProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const premium = await isPremium(ctx.user.id);

    if (!premium) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Premium subscription required",
      });
    }

    return next({
      ctx,
    });
  }
);

const createPlanProcedure = (
  allowedPlans: ("STARTER" | "PRO" | "BUSINESS" | "ENTERPRISE")[]
) =>
  protectedProcedure.use(async ({ ctx, next }) => {
    const premium = await isPremium(ctx.user.id);

    if (!premium) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Active subscription required",
      });
    }

    const plan = await getCurrentPlan(ctx.user.id);

    if (!allowedPlans.includes(plan as any)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Your current plan does not have access to this feature.",
      });
    }

    return next({
      ctx: {
        ...ctx,
        currentPlan: plan,
      },
    });
  });

export const starterProcedure = createPlanProcedure([
  "STARTER",
  "PRO",
  "BUSINESS",
]);

export const proProcedure = createPlanProcedure([
  "PRO",
  "BUSINESS",
]);

export const businessProcedure = createPlanProcedure([
  "BUSINESS",
]);

export const enterpriseProcedure = createPlanProcedure([
  "ENTERPRISE",
]);