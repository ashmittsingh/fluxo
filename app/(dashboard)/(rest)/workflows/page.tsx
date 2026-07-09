import { requireAuth } from '@/lib/auth-utils';
import { prefetchWorkflows } from '@/features/workflows/server/prefetch';
import { HydrateClient } from '@/trpc/server';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { WorkFlowsContainer, WorkflowsList } from '@/features/workflows/components/workflows';

const WorkFlows = async () => {
  await requireAuth();
  prefetchWorkflows();
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