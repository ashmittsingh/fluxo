"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PencilIcon, SaveIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSuspenseWorkflow, useUpdateWorkflowName } from "@/features/workflows/hooks/useWorkflow";

export const EditorBreadcrumbs = ({ id }: { id: string }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList className="text-[13px]">
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className="text-[#6E6E6E] transition-colors hover:text-[#0B0B0C] font-mono text-[11px] font-medium tracking-[0.2em] text-[#0B0B0C] uppercase"
                        render={<Link href="/workflows">Workflows</Link>}
                    />
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#B9B9B6]" />
                <EditorNameInput id={id} />
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export const EditorNameInput = ({ id }: { id: string }) => {
    const { data: workflow } = useSuspenseWorkflow(id);
    const updateWorkflow = useUpdateWorkflowName();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(workflow.name);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (workflow.name) {
            setName(workflow.name);
        }
    }, [workflow.name]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSave = async () => {
        if (name === workflow.name) {
            setIsEditing(false);
            return;
        }
        try {
            await updateWorkflow.mutateAsync({ id, name });
        } catch {
            setName(workflow.name);
        } finally {
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            setName(workflow.name);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <Input
                disabled={updateWorkflow.isPending}
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="h-7 w-auto min-w-[100px] rounded-none border-0 border-b border-[#E2E2E0] bg-transparent px-1 text-[13px] text-[#0B0B0C] shadow-none focus-visible:border-[#0B0B0C] focus-visible:ring-0 font-mono"
            />
        );
    }

    return (
        <BreadcrumbItem
            onClick={() => setIsEditing(true)}
            className="group flex cursor-pointer items-center gap-1.5 text-[#0B0B0C] transition-colors"
        >
            {workflow.name}
            <PencilIcon
                className="size-3 text-[#B9B9B6] opacity-0 transition-opacity group-hover:opacity-100"
                strokeWidth={1.5}
            />
        </BreadcrumbItem>
    );
};

export const EditorSaveButton = ({ id }: { id: string }) => {
    return (
        <div className="ml-auto">
            <Button
                size="sm"
                onClick={() => {}}
                disabled={false}
                className="gap-1.5 rounded-none border border-[#0B0B0C] bg-[#0B0B0C] text-white shadow-none transition-colors duration-200 hover:bg-white hover:text-[#0B0B0C] disabled:cursor-not-allowed disabled:opacity-50"
            >
                <SaveIcon className="size-4" strokeWidth={1.5} />
                Save
            </Button>
        </div>
    );
};

export const EditorHeader = ({ id }: { id: string }) => {
    return (
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#E2E2E0] bg-white px-4">
            <SidebarTrigger className="rounded-none text-[#6E6E6E] transition-colors duration-200 hover:bg-black/[0.03] hover:text-[#0B0B0C]" />
            <span aria-hidden="true" className="h-4 w-px bg-[#E2E2E0]" />
            <EditorBreadcrumbs id={id} />
            <EditorSaveButton id={id} />
        </header>
    );
};