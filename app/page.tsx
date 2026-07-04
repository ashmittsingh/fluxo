import React from 'react'
import prisma from '@/db/db'

const Page = async () => {
  const users = await prisma.user.findMany();
  return (
    <>
     {JSON.stringify(users)}
    </>
  )
}

export default Page;