export const NodeType = {
  INITIAL: "INITIAL",
  MANUAL_TRIGGER: "MANUAL_TRIGGER",
  HTTP_REQUEST: "HTTP_REQUEST",
  // Future Nodes
  // TRIGGER: "TRIGGER",
  // EMAIL: "EMAIL",
  // DELAY: "DELAY",
  // CONDITION: "CONDITION",
  // WEBHOOK: "WEBHOOK",
} as const;

export type NodeType = (typeof NodeType)[keyof typeof NodeType];