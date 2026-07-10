"use client";

import { EntityHeader } from "@/components/EntityComponents";
import { useSuspenseWorkflows, useCreateWorkflow } from "@/features/workflows/hooks/useWorkflow";
import { EntityContainer, EntitySearch, EntityPagination } from "@/components/EntityComponents";
import { useUpgradeModal } from "@/hooks/useUpgradeModal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "@/features/workflows/hooks/useWorkflowsParams";
import { useEntitySearch } from "@/hooks/useEntitySearch";


export const WorkflowsSearch = ()=>{
    const [params, setParams] = useWorkflowsParams();
    const { searchValue, onSearchChange } = useEntitySearch({
        params,
        setParams,
    });

    return (
        <EntitySearch placeholder="Search Workflow" value={searchValue} onChange={onSearchChange} />
    )
}
export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();

    return (
        <div className=" flex-1 flex justify-center items-center">
        <p>
            {JSON.stringify(workflows.data, null, 2)}
        </p>
        </div>
    );
}


export const WorkflowsHeader = ({disabled}: {disabled?: boolean}) => {
    const router = useRouter();
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal} = useUpgradeModal();
    const handleCreate = ()=>{
        createWorkflow.mutate(undefined, {
            onSuccess: (data) =>{
                router.push(`/workflows/${data.id}`);
            },
            onError: (error)=>{
                handleError(error);
            },
        });
    }
    return (
        <div>
            {modal}
            <EntityHeader title= "Workflows" description="Create And Manage Your Workflows" onNew={handleCreate} newButtonLabel="New Workflow" disabled={disabled} isCreating={createWorkflow.isPending} />
        </div>
    )
}; 

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows();
    const [params, setParams] = useWorkflowsParams();
    return (
        <EntityPagination disabled={workflows.isFetching} totalPages={workflows.data.totalPages} page={workflows.data.page} onPageChange={(page) => setParams({...params, page})} />
        
    )
};    
export const WorkFlowsContainer = ({
    children
}:{
    children: React.ReactNode;
}) => {
    return (
        <EntityContainer
        header={<WorkflowsHeader />}
        search={<WorkflowsSearch />}
        pagination={<WorkflowsPagination />}
        >
            {children}
        </EntityContainer>
    )
}