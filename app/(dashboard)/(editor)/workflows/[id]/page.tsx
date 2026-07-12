import { requireAuth } from '@/lib/auth-utils';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prefetchWorkflow } from '@/features/workflows/server/prefetch';
import { HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Editor, EditorError, EditorLoading } from '@/features/editor/components/editor';
import { EditorHeader } from '@/features/editor/components/editorheader';


interface WorkflowIdProps {
    params: Promise<{
        id:string;
    }>
}

const WorkflowId = async({ params }: WorkflowIdProps) => {
    const { id } = await params;
    await requireAuth();
    prefetchWorkflow(id);
    const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("SESSION:", session);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
      <Suspense fallback={<EditorLoading />}>
      <EditorHeader id={id} />
      <main className="flex-1">
        <Editor id={id} /> 
      </main>
      </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default WorkflowId;