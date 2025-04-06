'use client'
// import { useSession } from 'next-auth/react'

import { ButtonTW } from '@/src/components/ui/buttons/buttonTW'
import { useDashboardStore } from '@/src/lib/store'
import { SquarePlus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const DashboardMainContent = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const router = useRouter()
  const [files, setFiles] = useState([])
  const { allFiles } = useDashboardStore((state) => ({
    allFiles: state.files,
  }))
  useEffect(() => {}, [files])

  useEffect(() => {
    const toastParams = searchParams.get('toast')
    if (toastParams) {
      if (toastParams === 'new-password-ok') {
        toast.success('New password set successfully.')
      }
      const newParams = new URLSearchParams(searchParams)
      newParams.delete('toast')
      router.replace('/dashboard', { scroll: false })
    }
  }, [searchParams])
  return (
    <section className="dashboard-content">
      <h1>Dashboard</h1>
      <ButtonTW variant={'secondary'}>Open</ButtonTW>
      <SquarePlus />
      {/* <DropdownFolderOptions> */}
      {/* <Button>Open</Button> */}
      {/* </DropdownFolderOptions> */}
      <p>folders: {JSON.stringify(files)}</p>
      <p></p>
    </section>
  )
}
