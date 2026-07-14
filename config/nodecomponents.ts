import { NodeType } from "@/lib/shared/node-types";

import type { NodeTypes} from "@xyflow/react";
import { InitialNode} from "@/components/initialnode";

export const nodeComponents = {
    [NodeType.INITIAL]: InitialNode,
} as const satisfies NodeTypes;


export type RegisteredNodeType = keyof typeof nodeComponents;