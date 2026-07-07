import React from 'react'
import { requireAuth } from '@/lib/auth-utils';

const ExecutionPage = async() => {
  await requireAuth();
  return (
    <div>ExecutionPage</div>
  )
}

export default ExecutionPage