export const NodeType = {
  INITIAL: "INITIAL",
  // Future Nodes
  // TRIGGER: "TRIGGER",
  // EMAIL: "EMAIL",
  // DELAY: "DELAY",
  // CONDITION: "CONDITION",
  // WEBHOOK: "WEBHOOK",
} as const;

export type NodeType = (typeof NodeType)[keyof typeof NodeType];