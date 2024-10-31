'use client'
import { useSession } from 'next-auth/react'
import { DropdownFolderOptions } from '../DropdownFolderOptions'
import { Button } from '@/components/ui/button'
import { SquarePlus } from 'lucide-react'

export const DashboardMainContent = () => {
  const { data: session } = useSession()
  return (
    <section className="dashboard-content">
      <Button variant={'secondary'}>Open</Button>
      <SquarePlus />
      {/* <DropdownFolderOptions> */}
      {/* <Button>Open</Button> */}
      {/* </DropdownFolderOptions> */}
      <p>Session: {session?.user?.id}</p>
      <p>
        Session:{' '}
        {session ? JSON.stringify(session.user) : 'No session available'}
      </p>
    </section>
  )
}
