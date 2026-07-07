import { requireAuth } from "@/lib/auth-utils";
interface ExecutionIdProps {
    params: Promise<{
        id:string;
    }>
}

const ExecutionId = async({ params }: ExecutionIdProps) => {
    const { id } = await params;
    await requireAuth();
  return (
    <div>ExecutionId: {id}</div>
  )
}

export default ExecutionId;