import { NodeType } from "@/lib/shared/node-types";

import type { NodeTypes} from "@xyflow/react";
import { InitialNode} from "@/components/initialnode";

export const nodeComponents = {
    [NodeType.INITIAL]: InitialNode,
    [NodeType.HTTP_REQUEST]: HttpRequestNode,
    [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes;


export type RegisteredNodeType = keyof typeof nodeComponents;