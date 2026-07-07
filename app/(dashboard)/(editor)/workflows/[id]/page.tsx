import { requireAuth } from '@/lib/auth-utils';

interface WorkflowIdProps {
    params: Promise<{
        id:string;
    }>
}

const WorkflowId = async({ params }: WorkflowIdProps) => {
    const { id } = await params;
    await requireAuth();
  return (
    <div>WorkflowId: {id}</div>
  )
}

export default WorkflowId;