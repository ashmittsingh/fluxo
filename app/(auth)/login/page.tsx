import React from 'react'
import { LoginForm } from '@/components/loginform'
import { requireUnauth } from '@/lib/auth-utils'

const LoginPage = async() => {
  await requireUnauth();
  return (
    <div><LoginForm /></div>
  )
}

export default LoginPage