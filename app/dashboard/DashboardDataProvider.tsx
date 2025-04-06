'use client'
import { useDashboardStore } from '@/src/lib/store'
import { DashboardDataProviderProps } from '@/src/types/types'
import { useEffect } from 'react'

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
