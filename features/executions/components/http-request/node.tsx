"use client";

import { memo } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";

import { BaseExecutionNode } from "@/features/executions/components/base-execution-node";

type HttpRequestNodeData = {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo(function HttpRequestNode(
  props: NodeProps<HttpRequestNodeType>
) {
  const nodeData = props.data;

  const description = nodeData.endpoint
    ? `${nodeData.method}: ${nodeData.endpoint}`
    : "HTTP Request Node";

  return (
    <BaseExecutionNode
      {...props}
      icon={GlobeIcon}
      name="HTTP Request"
      description={description}
      onSettings={() => {}}
      onDoubleClick={() => {}}
    />
  );
});

HttpRequestNode.displayName = "HttpRequestNode";