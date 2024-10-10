import Panel from '@/app/dashboard/_components/Panel'
import { getSession } from '@/src/lib/getSession'
import prisma from '@/src/lib/prisma'
import { redirect } from 'next/navigation'
import SessionChecker from './SessionChecker'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) {
    redirect('/auth/sign-in')
  }
  const userId = session?.user?.id
  const folders = await prisma.folder.findMany({
    where: {
      userId: userId,
    },
    include: {
      files: true, // Inclut les fichiers dans chaque dossier
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
    <div className="dashboard">
      <SessionChecker />
      <Panel folders={folders} files={files} />

      {children}
    </div>
  )
}
