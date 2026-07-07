export const PRICING = {
  STARTER: {
    amount: 19900,
    name: "Starter",
  },
  PRO: {
    amount: 49900,
    name: "Pro",
  },
  BUSINESS: {
    amount: 99900,
    name: "Business",
  },
} as const;

export type Plan = keyof typeof PRICING;