"use client";

import { formatDistanceToNow } from "date-fns";
import { WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Workflow } from "@/lib/generated/prisma/client";
import {
    EntityContainer,
    EntityHeader,
    EntityItem,
    EntityList,
    EntityPagination,
    EntitySearch,
    ErrorView,
    LoadingView,
    EmptyView,
} from "@/components/EntityComponents";
import { useUpgradeModal } from "@/hooks/useUpgradeModal";
import { useEntitySearch } from "@/hooks/useEntitySearch";
import {
    useSuspenseWorkflows,
    useCreateWorkflow,
    useRemoveWorkflow,
} from "@/features/workflows/hooks/useWorkflow";
import { useWorkflowsParams } from "@/features/workflows/hooks/useWorkflowsParams";

export const WorkflowsSearch = () => {
    const [params, setParams] = useWorkflowsParams();
    const { searchValue, onSearchChange } = useEntitySearch({ params, setParams });

    return <EntitySearch placeholder="Search workflows" value={searchValue} onChange={onSearchChange} />;
};

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();
    return (
        <EntityList
            items={workflows.data.items}
            getKey={(workflow) => workflow.id}
            renderItem={(workflow) => <WorkflowItem data={workflow} />}
            emptyView={<WorkflowsEmpty />}
        />
    );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
    const router = useRouter();
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => router.push(`/workflows/${data.id}`),
            onError: (error) => handleError(error),
        });
    };

    return (
        // Fragment instead of a wrapping <div> — EntityContainer already lays this
        // slot out inside a `flex-col gap-y-8`, and an extra block-level div here
        // was only ever needed to hold the modal, not to affect layout.
        <>
            {modal}
            <EntityHeader
                title="Workflows"
                description="Create and manage your workflows."
                onNew={handleCreate}
                newButtonLabel="New workflow"
                disabled={disabled}
                isCreating={createWorkflow.isPending}
            />
        </>
    );
};

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows();
    const [params, setParams] = useWorkflowsParams();
    return (
        <EntityPagination
            disabled={workflows.isFetching}
            totalPages={workflows.data.totalPages}
            page={workflows.data.page}
            onPageChange={(page) => setParams({ ...params, page })}
        />
    );
};

export const WorkFlowsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <EntityContainer
            header={<WorkflowsHeader />}
            search={<WorkflowsSearch />}
            pagination={<WorkflowsPagination />}
        >
            {children}
        </EntityContainer>
    );
};

export const WorkflowsLoading = () => {
    return <LoadingView message="Loading workflows…" />;
};

export const WorkflowsError = () => {
    return <ErrorView message="Something went wrong loading your workflows." />;
};

export const WorkflowsEmpty = () => {
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();
    const router = useRouter();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => handleError(error),
            onSuccess: (data) => router.push(`/workflows/${data.id}`),
        });
    };

    return (
        <>
            {modal}
            <EmptyView onNew={handleCreate} message="No workflows yet. Create one to get started." />
        </>
    );
};

export const WorkflowItem = ({ data }: { data: Workflow }) => {
    const removeWorkflow = useRemoveWorkflow();
    const handleRemove = () => {
        removeWorkflow.mutate({ id: data.id });
    };

    return (
        <EntityItem
            href={`/workflows/${data.id}`}
            title={data.name}
            subtitle={`Updated ${formatDistanceToNow(data.updatedAt, { addSuffix: true })} • Created ${formatDistanceToNow(
                data.createdAt,
                { addSuffix: true }
            )}`}
            image={
                <div className="flex size-8 items-center justify-center border border-[#E2E2E0] bg-white">
                    <WorkflowIcon className="size-4 text-[#6E6E6E]" strokeWidth={1.5} />
                </div>
            }
            onRemove={handleRemove}
            isRemoving={removeWorkflow.isPending}
        />
    );
};