import React from 'react'
import { SignupForm } from '@/components/signupform'
import { requireUnauth } from '@/lib/auth-utils'

const SignUpPage = async () => {
   await requireUnauth();
  return (
    <div><SignupForm /></div>
  )
}

export default SignUpPage;