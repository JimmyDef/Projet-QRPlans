'use client'
import './panel.scss'
import useStore from '@/src/hooks/useStore'
import { sanitizeFoldersInput } from '@/src/services/helpers'
import { useDashboardStore } from '@/src/lib/store'
import {
  Folder,
  List,
  SquarePlus,
  Activity,
  ArrowDownNarrowWide,
  ChartColumnDecreasing,
  ChartNoAxesColumnDecreasing,
  CirclePause,
  Clock,
  FolderPlus,
  Link,
  Pencil,
  Plus,
  Search,
  SquareChevronDown,
  SquareChevronUp,
  Trash2,
  EllipsisVertical,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { set } from 'zod'
import { redirect } from 'next/dist/server/api-utils'

type File = {
  id: string
  name: string
  url: string
  qrCode: string
  status: 'ACTIVE' | 'PAUSED' | 'DELETED'
}

type Folder = {
  id: string
  name: string
  files: File[]
}

interface PanelProps {
  files: File[]
  folders: Folder[]
}

const Panel = ({ folders, files }: PanelProps) => {
  const [newFolder, setNewFolder] = useState('')
  const storedFolders = useDashboardStore((state) => state.folders)
  const storedFiles = useDashboardStore((state) => state.files)
  const setFolders = useDashboardStore((state) => state.setFolders)
  const setFiles = useDashboardStore((state) => state.setFiles)
  const addFolder = useDashboardStore((state) => state.addFolder)
  const deleteAllFolders = useDashboardStore((state) => state.deleteAllFolders)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && newFolder.trim().length > 0) setNewFolder('')
    if (e.key === 'Enter') handleAddNewFolder()
  }
  const handleAddNewFolder = () => {
    if (newFolder.trim().length === 0) return
    addFolder({ id: crypto.randomUUID(), name: newFolder.trim(), files: [] })
    setNewFolder('')
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = sanitizeFoldersInput(e.target.value)
    setNewFolder(sanitizedInput)
  }
  useEffect(() => {
    if (storedFolders.length === 0) {
      setFolders(folders)
    }
  }, [folders, setFolders, storedFolders.length])

  return (
    <section className="panel">
      <div className="panel__search-container">
        <input
          type="text"
          placeholder="Recherche QR Codes.."
          className="panel__search-input"
        />
        <Search className="panel__search-icon" />
      </div>

      <h2 className="panel__section-title">MES QR-CODES</h2>
      <div className="panel__status-buttons">
        <button className="panel__status-button">
          <List /> Tous
        </button>
        <button className="panel__status-button">
          <Activity /> En activité
        </button>
        <button className="panel__status-button">
          <CirclePause /> En pause
        </button>
      </div>

      <div className="panel__divider"></div>

      <h2 className="panel__section-title">
        MES DOSSIERS{' '}
        <span className="panel__folders-count">({storedFolders.length}) </span>
      </h2>
      <div className="panel__folder-input-group">
        <FolderPlus
          className="panel__new-folder-icon"
          onClick={handleAddNewFolder}
        />

        <input
          type="text"
          placeholder="Nouveau Dossier"
          className="panel__folder-input"
          minLength={1}
          maxLength={25}
          value={newFolder}
          // onBlur={() => setNewFolder('')}
          onChange={handleOnChange}
          onKeyDown={handleKeyPress}
        ></input>
      </div>

      <div className="panel__folders">
        {storedFolders.map((folder) => (
          <div key={folder.id} className="panel__folder">
            <Folder className="panel__folder-icon" />
            <button
              className="panel__folder-button"
              // onClick={() => {
              //   redirect(`/dashboard/folder/${folder.id}`)
              // }}
            >
              {folder.name}
            </button>
          </div>
        ))}
      </div>

      <div className="panel__actions">
        <EllipsisVertical onClick={deleteAllFolders} />
        <SquarePlus />
        <Plus />
        <Folder />
        <Trash2 />
        <Link />
        <Clock />
        <ArrowDownNarrowWide />
        <ChartNoAxesColumnDecreasing />
        <ChartColumnDecreasing />
        <SquareChevronDown />
        <SquareChevronUp />
        <Pencil />
      </div>
    </section>
  )
}

export default Panel
