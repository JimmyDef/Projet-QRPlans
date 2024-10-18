'use client'
import { useEffect } from 'react'
import { useDashboardStore } from '@/src/lib/store'
import { Folder, File } from '@/src/types/types'

type DashboardDataProviderProps = {
  files: File[]
  folders: Folder[]
  userId?: string
}

const DashboardDataProvider = ({
  folders,
  files,
}: DashboardDataProviderProps) => {
  const { setFolders, setFiles } = useDashboardStore()

  useEffect(() => {
    console.log('dashboard data provider:', folders, files)
    setFolders(folders)
    setFiles(files)
  }, [folders, files, setFolders, setFiles])

  return null
}
export default DashboardDataProvider
