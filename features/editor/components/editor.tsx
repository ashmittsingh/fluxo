"use client";

import { ErrorView, LoadingView } from "@/components/EntityComponents";
import {useSuspenseWorkflow} from "@/features/workflows/hooks/useWorkflow";

export const EditorLoading = () => {
    return (
        <LoadingView message="Loading Editor"  />
    );
}

export const EditorError = () => {
    return (
        <ErrorView  message="Failed to load editor"/>
    );
}

export const Editor = ({id}:{id:string}) => {
    const {data: workflow} = useSuspenseWorkflow(id);

    return (
        <p>
            {JSON.stringify(workflow, null, 2)}
        </p>
    );
};