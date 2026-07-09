"use client";

import { EntityHeader } from "@/components/entitycomponents";
import { useSuspenseWorkflows, useCreateWorkflow } from "@/features/workflows/hooks/useworkflows";
import { EntityContainer } from "@/components/entitycomponents";
import { useUpgradeModal } from "@/hooks/useupgrademodal";
import { useRouter } from "next/navigation";

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


export const WorkFlowsContainer = ({
    children
}:{
    children: React.ReactNode;
}) => {
    return (
        <EntityContainer
        header={<WorkflowsHeader />}
        >
            {children}
        </EntityContainer>
    )
}