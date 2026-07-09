import prisma from "@/db/db";
import { SubscriptionStatus } from "@/lib/generated/prisma/client";

/**
 * Get active subscription of current user
 */
export async function getCurrentSubscription(userId: string) {
  return prisma.subscription.findFirst({
    where: {
      userId,
      status: SubscriptionStatus.ACTIVE,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Get current plan
 */
export async function getCurrentPlan(userId: string) {
  const subscription = await getCurrentSubscription(userId);

  if (!subscription) {
    return "FREE";
  }

  return subscription.plan;
}

/**
 * Check premium access
 */
export async function isPremium(userId: string) {
  const subscription = await getCurrentSubscription(userId);

  if (!subscription) {
    return false;
  }

  if (subscription.status !== SubscriptionStatus.ACTIVE) {
    return false;
  }

  if (
    subscription.expiresAt &&
    subscription.expiresAt.getTime() < Date.now()
  ) {
    return false;
  }

  return true;
}