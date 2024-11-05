'use client'
import { useSession } from 'next-auth/react'
import { DropdownFolderOptions } from '../Folder-button/DropdownFolderOptions'
import { Button } from '@/src/components/ui-shadcn/button'
import { SquarePlus } from 'lucide-react'
import { useDashboardStore } from '@/src/lib/store'
import { useEffect } from 'react'

export const DashboardMainContent = () => {
  const { data: session } = useSession()
  const { folders } = useDashboardStore()
  useEffect(() => {}, [folders])
  return (
    <section className="dashboard-content">
      <Button variant={'secondary'}>Open</Button>
      <SquarePlus />
      {/* <DropdownFolderOptions> */}
      {/* <Button>Open</Button> */}
      {/* </DropdownFolderOptions> */}
      <p>folders: {JSON.stringify(folders)}</p>
      <p>
        Session:{' '}
        {session ? JSON.stringify(session.user) : 'No session available'}
      </p>
    </section>
  )
}
