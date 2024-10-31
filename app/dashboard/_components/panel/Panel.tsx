'use client'
import { useDashboardStore } from '@/src/lib/store'
import {
  generateUniqueFolderName,
  sanitizeFoldersInput,
} from '@/src/services/helpers'
import { Tooltip } from 'react-tooltip'
import {
  Activity,
  ArrowDownNarrowWide,
  ChartColumnDecreasing,
  ChartNoAxesColumnDecreasing,
  ChevronDown,
  ChevronUp,
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
import { useCallback, useRef, useState } from 'react'
import './panel.scss'
import { createNewFolder } from '@/app/actions/folders.action'
import useScrollArrows from '@/src/hooks/useScrollArrows'
import { DropdownFolderOptions } from '../DropdownFolderOptions'
import { FolderButton } from '../Folder-button/FolderButton'
const Panel = () => {
  const { files, folders } = useDashboardStore()
  const { scrollContainerRef, showBottomArrow, showTopArrow } =
    useScrollArrows()

  const [newFolder, setNewFolder] = useState('')
  const {
    addFile,
    setFiles,
    addFolder,
    updateFolderId,
    setFolders,
    removeFolder,
    activeFolderId,
    setActiveFolderId,
  } = useDashboardStore()
  // const targetRef = useRef<HTMLDivElement>(null)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && newFolder.trim().length > 0) setNewFolder('')
    if (e.key === 'Enter') handleAddNewFolder()
  }
  // const handleScroll = () => {
  //   if (targetRef.current)
  //     targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // }
  const handleAddNewFolder = async () => {
    const trimmedFolder = newFolder.trim()
    if (trimmedFolder.length === 0) return
    const tempId = crypto.randomUUID()
    const uniqueFolderName = generateUniqueFolderName(trimmedFolder, folders)
    addFolder({
      id: tempId,
      name: uniqueFolderName,
      files: [],
      isTemporary: true,
    })
    setNewFolder('')

    try {
      const res = await createNewFolder(trimmedFolder, tempId)
      updateFolderId(tempId, res.folder.id)
    } catch (error) {
      removeFolder(tempId)
      console.error('Error creating folder:', error)
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = sanitizeFoldersInput(e.target.value)
    setNewFolder(sanitizedInput)
  }

  const handleFolderClick = useCallback(
    (id: string) => {
      setActiveFolderId(id)
    },
    [setActiveFolderId]
  )
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
          onChange={handleOnChange}
          onKeyDown={handleKeyPress}
        ></input>
      </div>

      <div className="panel__folders">
        {showTopArrow && (
          <div className=" panel__scroll-arrow-container panel__scroll-arrow-container--top">
            <ChevronUp className="panel__scroll-arrow" />
          </div>
        )}
        <div className="panel__folders-wrapper" ref={scrollContainerRef}>
          <Tooltip id="tooltip-folder-menu-options" offset={13} opacity={1} />
          {folders.map((folder) =>
            FolderButton({
              folder,
              isActive: activeFolderId === folder.id,
              onClick: () => {
                if (activeFolderId !== folder.id)
                  return handleFolderClick(folder.id)
              },
            })
          )}
        </div>

        {showBottomArrow && (
          <div className="panel__scroll-arrow-container panel__scroll-arrow-container--bottom">
            <ChevronDown className="panel__scroll-arrow" />
          </div>
        )}
      </div>

      <div className="panel__actions">
        <ChevronDown />
        <ChevronUp />
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
