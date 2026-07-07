import React from 'react'
import { requireAuth } from '@/lib/auth-utils';

interface CredentialIdProps {
    params: Promise<{
        id:string;
    }>
}

const CredentialId = async({ params }: CredentialIdProps) => {
  await requireAuth();
    const { id } = await params;
  return (
    <div>CredentialId: {id}</div>
  )
}

export default CredentialId;