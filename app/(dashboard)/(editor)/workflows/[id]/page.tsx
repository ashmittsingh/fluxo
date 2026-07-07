import { requireAuth } from '@/lib/auth-utils';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


interface WorkflowIdProps {
    params: Promise<{
        id:string;
    }>
}

const WorkflowId = async({ params }: WorkflowIdProps) => {
    const { id } = await params;
    await requireAuth();
    const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("SESSION:", session);
  return (
    <div>WorkflowId: {id}</div>
  )
}

export default WorkflowId;