import { requireAuth } from '@/lib/auth-utils';

const WorkFlows = async() => {
    await requireAuth();
  return (
    <div>WorkFlows</div>
  )
}

export default WorkFlows;