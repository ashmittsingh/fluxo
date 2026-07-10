import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {toast} from "sonner";
import { useWorkflowsParams } from "@/features/workflows/hooks/useWorkflowsParams";

export function useSuspenseWorkflows() {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
}

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) =>{
        toast.success(`WorkFlows "${data.name} Created`);
        queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({})
        )
      },
      onError: (error)=>{
        toast.error(`Failed To Create Workflows: ${error.message}`);
      }
    })
  )
};  