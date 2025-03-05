import { auth } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'
import { redirect } from 'next/navigation'
import Panel from './_panel/Panel'
import DashboardDataProvider from './DashboardDataProvider'

import './dashboard.scss'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) return redirect('/auth/sign-in')

  const userDb = await prisma.user.findUnique({
    where: { id: session.user.id },
  })
  if (!userDb) {
    console.log('userDb', userDb)
  }

  const isUserActive = !!userDb?.active

  if (session.user.provider === 'credentials' && !isUserActive) {
    redirect('/auth/registration/validate-email-otp')
  }

  const userId = session?.user?.id
  const folders = await prisma.folder.findMany({
    where: {
      userId: userId,
    },
    include: {
      files: true,
    },
    orderBy: { name: 'asc' },
  })

  const files = await prisma.file.findMany({
    where: {
      userId: userId,
    },
  })
  //  const serializedFolders = folders.map((folder) => ({
  //    ...folder,
  //    createdAt: folder.createdAt.toISOString(),
  //    updatedAt: folder.updatedAt.toISOString(),
  //    files: folder.files.map((file) => ({
  //      ...file,
  //      createdAt: file.createdAt.toISOString(),
  //      updatedAt: file.updatedAt.toISOString(),
  //    })),
  //  }))

  return (
    <div className="dashboard-layout">
      <DashboardDataProvider files={files} folders={folders} />
      <Panel />
      {children}
    </div>
  )
}
