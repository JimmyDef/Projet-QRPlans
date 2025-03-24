'use client'
import { useEffect } from 'react'
import { useAuthStore, useDashboardStore } from '@/src/lib/store'
import { DashboardDataProviderProps } from '@/src/types/types'
import { set } from 'zod'

const DashboardDataProvider = ({
  folders,
  files,
}: DashboardDataProviderProps) => {
  const { setFolders, setFiles } = useDashboardStore()

  useEffect(() => {
    setFolders(folders)
    setFiles(files)
  }, [folders, files, setFolders, setFiles])

  return null
}
export default DashboardDataProvider
