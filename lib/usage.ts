import prisma from "@/db/db";

import { getCurrentPlan } from "@/lib/subscription";
import { PLANS, UNLIMITED } from "@/config/plans";

/**
 * Get current month's usage
 */
export async function getCurrentUsage(userId: string) {
  const currentMonth = new Date();

  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);

  let usage = await prisma.usage.findFirst({
    where: {
      userId,
      currentMonth,
    },
  });

  if (!usage) {
    usage = await prisma.usage.create({
      data: {
        userId,
        currentMonth,
      },
    });
  }

  return usage;
}

/**
 * Check Workflow Limit
 */
export async function checkWorkflowLimit(userId: string) {
  const plan = await getCurrentPlan(userId);

  const usage = await getCurrentUsage(userId);

  const config = PLANS[plan];

  if (config.workflows === UNLIMITED) {
    return true;
  }

  return usage.workflowsCreated < config.workflows;
}

/**
 * Check Workflow Execution Limit
 */
export async function checkExecutionLimit(userId: string) {
  const plan = await getCurrentPlan(userId);

  const usage = await getCurrentUsage(userId);

  const config = PLANS[plan];

  if (config.workflowExecutions === UNLIMITED) {
    return true;
  }

  return usage.workflowExecutions < config.workflowExecutions;
}

/**
 * Check Integration Limit
 */
export async function checkIntegrationLimit(userId: string) {
  const plan = await getCurrentPlan(userId);

  const usage = await getCurrentUsage(userId);

  const config = PLANS[plan];

  if (config.integrations === UNLIMITED) {
    return true;
  }

  return usage.integrationsConnected < config.integrations;
}

/**
 * Increase Workflow Count
 */
export async function incrementWorkflowUsage(userId: string) {
  const usage = await getCurrentUsage(userId);

  return prisma.usage.update({
    where: {
      id: usage.id,
    },
    data: {
      workflowsCreated: {
        increment: 1,
      },
    },
  });
}

/**
 * Increase Workflow Executions
 */
export async function incrementExecutionUsage(userId: string) {
  const usage = await getCurrentUsage(userId);

  return prisma.usage.update({
    where: {
      id: usage.id,
    },
    data: {
      workflowExecutions: {
        increment: 1,
      },
    },
  });
}

/**
 * Increase Connected Integrations
 */
export async function incrementIntegrationUsage(userId: string) {
  const usage = await getCurrentUsage(userId);

  return prisma.usage.update({
    where: {
      id: usage.id,
    },
    data: {
      integrationsConnected: {
        increment: 1,
      },
    },
  });
}