'use client'
import { useDashboardStore } from '@/src/lib/store'
import { sanitizeFoldersInput } from '@/src/services/helpers'
import {
  Activity,
  ArrowDownNarrowWide,
  ChartColumnDecreasing,
  ChartNoAxesColumnDecreasing,
  CirclePause,
  Clock,
  EllipsisVertical,
  Folder,
  FolderPlus,
  Link,
  List,
  Pencil,
  Plus,
  Search,
  SquareChevronDown,
  SquareChevronUp,
  SquarePlus,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import './panel.scss'
import { createNewFolder } from '@/app/actions/folders.action'
const Panel = () => {
  const { files, folders } = useDashboardStore()

  const [newFolder, setNewFolder] = useState('')
  const { addFile, setFiles, addFolder, updateFolder, setFolders } =
    useDashboardStore()

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && newFolder.trim().length > 0) setNewFolder('')
    if (e.key === 'Enter') handleAddNewFolder()
  }
  const handleAddNewFolder = async () => {
    const trimmedFolder = newFolder.trim()
    if (trimmedFolder.length === 0) return
    addFolder({ id: crypto.randomUUID(), name: newFolder.trim(), files: [] })
    setNewFolder('')

    try {
      const res = await createNewFolder(trimmedFolder)
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = sanitizeFoldersInput(e.target.value)
    setNewFolder(sanitizedInput)
  }
  // useEffect(() => {

  // }, [folders, setFolders, storedFolders.length])

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
        <span className="panel__folders-count">({folders.length}) </span>
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
        {folders.map((folder) => (
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
        <EllipsisVertical />
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
