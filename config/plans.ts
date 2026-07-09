import type { PlanType } from "@/lib/generated/prisma/client";

export interface PlanConfig {
  id: PlanType | "FREE";

  name: string;

  price: number;

  workflows: number;

  workflowExecutions: number;

  integrations: number;

  aiWorkflowBuilder: boolean;

  webhooks: boolean;

  scheduleTriggers: boolean;

  emailNotifications: boolean;

  customVariables: boolean;

  multiStepWorkflows: boolean;

  apiAccess: boolean;

  workflowTemplates: boolean;

  workflowAnalytics: boolean;

  teamWorkspace: boolean;

  teamMembers: number;

  advancedAnalytics: boolean;

  secretsManagement: boolean;

  environmentVariables: boolean;

  workflowVersionHistory: boolean;

  auditLogs: boolean;

  prioritySupport: boolean;

  dedicatedInfrastructure: boolean;

  sso: boolean;

  whiteLabel: boolean;

  dedicatedSuccessManager: boolean;

  customIntegrations: boolean;
}

export const PLANS: Record<string, PlanConfig> = {
  FREE: {
    id: "FREE",
    name: "Free",
    price: 0,

    workflows: 3,
    workflowExecutions: 500,
    integrations: 10,

    aiWorkflowBuilder: false,
    webhooks: false,
    scheduleTriggers: false,
    emailNotifications: false,

    customVariables: false,
    multiStepWorkflows: false,
    apiAccess: false,
    workflowTemplates: false,
    workflowAnalytics: false,

    teamWorkspace: false,
    teamMembers: 1,

    advancedAnalytics: false,
    secretsManagement: false,
    environmentVariables: false,
    workflowVersionHistory: false,
    auditLogs: false,

    prioritySupport: false,

    dedicatedInfrastructure: false,
    sso: false,
    whiteLabel: false,
    dedicatedSuccessManager: false,
    customIntegrations: false,
  },

  STARTER: {
    id: "STARTER",
    name: "Starter",
    price: 199,

    workflows: 10,
    workflowExecutions: 5000,
    integrations: 50,

    aiWorkflowBuilder: true,
    webhooks: true,
    scheduleTriggers: true,
    emailNotifications: true,

    customVariables: false,
    multiStepWorkflows: false,
    apiAccess: false,
    workflowTemplates: false,
    workflowAnalytics: false,

    teamWorkspace: false,
    teamMembers: 1,

    advancedAnalytics: false,
    secretsManagement: false,
    environmentVariables: false,
    workflowVersionHistory: false,
    auditLogs: false,

    prioritySupport: false,

    dedicatedInfrastructure: false,
    sso: false,
    whiteLabel: false,
    dedicatedSuccessManager: false,
    customIntegrations: false,
  },

  PRO: {
    id: "PRO",
    name: "Pro",
    price: 499,

    workflows: -1,
    workflowExecutions: 25000,
    integrations: 100,

    aiWorkflowBuilder: true,
    webhooks: true,
    scheduleTriggers: true,
    emailNotifications: true,

    customVariables: true,
    multiStepWorkflows: true,
    apiAccess: true,
    workflowTemplates: true,
    workflowAnalytics: true,

    teamWorkspace: false,
    teamMembers: 1,

    advancedAnalytics: false,
    secretsManagement: false,
    environmentVariables: false,
    workflowVersionHistory: false,
    auditLogs: false,

    prioritySupport: true,

    dedicatedInfrastructure: false,
    sso: false,
    whiteLabel: false,
    dedicatedSuccessManager: false,
    customIntegrations: false,
  },

  BUSINESS: {
    id: "BUSINESS",
    name: "Business",
    price: 999,

    workflows: -1,
    workflowExecutions: 100000,
    integrations: -1,

    aiWorkflowBuilder: true,
    webhooks: true,
    scheduleTriggers: true,
    emailNotifications: true,

    customVariables: true,
    multiStepWorkflows: true,
    apiAccess: true,
    workflowTemplates: true,
    workflowAnalytics: true,

    teamWorkspace: true,
    teamMembers: -1,

    advancedAnalytics: true,
    secretsManagement: true,
    environmentVariables: true,
    workflowVersionHistory: true,
    auditLogs: true,

    prioritySupport: true,

    dedicatedInfrastructure: false,
    sso: false,
    whiteLabel: false,
    dedicatedSuccessManager: false,
    customIntegrations: false,
  },

  ENTERPRISE: {
    id: "BUSINESS",
    name: "Enterprise",
    price: 0,

    workflows: -1,
    workflowExecutions: -1,
    integrations: -1,

    aiWorkflowBuilder: true,
    webhooks: true,
    scheduleTriggers: true,
    emailNotifications: true,

    customVariables: true,
    multiStepWorkflows: true,
    apiAccess: true,
    workflowTemplates: true,
    workflowAnalytics: true,

    teamWorkspace: true,
    teamMembers: -1,

    advancedAnalytics: true,
    secretsManagement: true,
    environmentVariables: true,
    workflowVersionHistory: true,
    auditLogs: true,

    prioritySupport: true,

    dedicatedInfrastructure: true,
    sso: true,
    whiteLabel: true,
    dedicatedSuccessManager: true,
    customIntegrations: true,
  },
};

export const UNLIMITED = -1;