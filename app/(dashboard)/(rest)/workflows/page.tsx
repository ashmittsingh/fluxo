import { requireAuth } from '@/lib/auth-utils';
import { prefetchWorkflows } from '@/features/workflows/server/prefetch';
import { HydrateClient } from '@/trpc/server';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import { WorkFlowsContainer, WorkflowsList } from '@/features/workflows/components/Workflows';
import { workflowsParamsLoader } from '@/features/workflows/server/paramsLoader';


type Props = {
  searchParams: Promise<SearchParams>;
};
const WorkFlows = async ({ searchParams }:Props) => {
  await requireAuth();
  const params = await workflowsParamsLoader(searchParams);
  prefetchWorkflows(params);
  return (
    <WorkFlowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error!</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkFlowsContainer>
  )
}

export default WorkFlows;