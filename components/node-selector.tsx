"use client";
import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NodeType } from "@/lib/shared/node-types";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export type NodeTypeOption = {
    type: NodeType;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }> | string;
}

const triggerNodes: NodeTypeOption[] = [
    {
        type: NodeType.MANUAL_TRIGGER,
        label: "Manual Trigger",
        description: "Trigger The Workflow Manually.",
        icon: MousePointerIcon,
    },
];

const executableNodes: NodeTypeOption[] = [
    {
        type: NodeType.HTTP_REQUEST,
        label: "HTTP Request",
        description: "Make An HTTP Request To A REST API Endpoint.",
        icon: GlobeIcon,
    },
];


interface NodeSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}


export function NodeSelector({ open, onOpenChange, children }: NodeSelectorProps) {
    const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();
    const handleNodeSelect = useCallback((selection: NodeTypeOption) => {
        if (selection.type === NodeType.MANUAL_TRIGGER) {
            const nodes = getNodes();
            const hasManualTrigger = nodes.some((node) => node.type === NodeType.MANUAL_TRIGGER,);
            if (hasManualTrigger) {
                toast.error("Only One Manual Trigger Is Allowed Per Workflow");
                return;
            }
        };

        setNodes((nodes) => {
            const hasInitialTrigger = nodes.some(
                (node) => node.type === NodeType.INITIAL,
            );

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const flowPosition = screenToFlowPosition({
                x: centerX + (Math.random() - 0.5) * 200,
                y: centerY + (Math.random() - 0.5) * 200,
            });

            const newNode = {
                id: createId(),
                data: {},
                type: selection.type,
                position: flowPosition,
            };

            if (hasInitialTrigger) {
                return [newNode];
            }

            return [...nodes, newNode];
        })
        onOpenChange(false);
    }, [setNodes, getNodes, onOpenChange, screenToFlowPosition]);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger>
                {children}
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>What Triggers This Workflows?</SheetTitle>
                    <SheetDescription>
                        A Trigger Is A Step That Starts The Workflow. You Can Add Multiple Triggers To A Workflow.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    {triggerNodes.map((nodeType) => {
                        const Icon = nodeType.icon;
                        return (
                            <div key={nodeType.type} className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary" onClick={() => handleNodeSelect(nodeType)}>
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof Icon === "string" ? (
                                        <Image src={Icon} alt={nodeType.label} className="size-5 object-contain rounded-sm" />
                                    ) : (
                                        <Icon className="size-5" />
                                    )}
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-medium text-sm">{nodeType.label}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {nodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <Separator />
                    {executableNodes.map((nodeType) => {
                        const Icon = nodeType.icon;
                        return (
                            <div key={nodeType.type} className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary" onClick={() => { handleNodeSelect(nodeType) }}>
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof nodeType.icon === "string" ? (
                                        <Image src={nodeType.icon} alt={nodeType.label} className="size-5 object-contain rounded-sm" />
                                    ) : (
                                        <Icon className="size-5" />
                                    )}
                                    <div className="flex flex-col items-start text-left">
                                        <p className="font-medium text-sm">{nodeType.label}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {nodeType.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })};
                </div>
            </SheetContent>
        </Sheet>
    );
};

