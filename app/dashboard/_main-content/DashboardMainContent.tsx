'use client'
// import { useSession } from 'next-auth/react'

import { Button } from '@/src/components/ui/buttons/button'
import { SquarePlus } from 'lucide-react'
import { useDashboardStore } from '@/src/lib/store'
import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { useSearchParams } from 'next/navigation'

export const DashboardMainContent = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const [files, setFiles] = useState([])
  const { allFiles } = useDashboardStore(
    (state) => ({
      allFiles: state.files,
    }),
    shallow
  )
  useEffect(() => {}, [files])
  return (
    <section className="dashboard-content">
      <Button variant={'secondary'}>Open</Button>
      <SquarePlus />
      {/* <DropdownFolderOptions> */}
      {/* <Button>Open</Button> */}
      {/* </DropdownFolderOptions> */}
      <p>folders: {JSON.stringify(files)}</p>
      <p></p>
    </section>
  )
}
