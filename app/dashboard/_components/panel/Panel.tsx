'use client'
import { useDashboardStore } from '@/src/lib/store'
import { sanitizeFoldersInput } from '@/src/services/helpers'
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
import './panel.scss'
// import {
//   createNewFolderAction,
//   removeFolderAction,
// } from '@/app/actions/folders.action'
import useScrollArrows from '@/src/hooks/useScrollArrows'

import { FolderButton } from '../Folder-button/FolderButton'
import { shallow } from 'zustand/shallow'
// import { toast } from 'react-toastify'

import { useAddFolder } from '@/src/hooks/useAddFolder'
const Panel = () => {
  const { handleAddNewFolder, newFolder, setNewFolder } = useAddFolder()

  const {
    files,
    folders,
    addFile,
    addFolder,
    updateFolderId,
    removeFolder,
    activeFolderId,
    setActiveFolderId,
  } = useDashboardStore(
    (state) => ({
      files: state.files,
      folders: state.folders,
      addFile: state.addFile,
      addFolder: state.addFolder,
      updateFolderId: state.updateFolderId,
      removeFolder: state.removeFolder,
      activeFolderId: state.activeFolderId,
      setActiveFolderId: state.setActiveFolderId,
    }),
    shallow
  )
  const {
    scrollContainerRef,
    showBottomArrow,
    showTopArrow,
    handleScrollUp,
    handleScrollDown,
  } = useScrollArrows(folders.length)

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && newFolder.trim().length > 0) setNewFolder('')
    if (e.key === 'Enter') handleAddNewFolder()
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
          onChange={handleOnChange}
          onKeyDown={handleKeyPress}
        ></input>
      </div>

      <div className="panel__folders">
        {showTopArrow && (
          <div
            className=" panel__scroll-arrow-container panel__scroll-arrow-container--top"
            onClick={handleScrollUp}
          >
            <ChevronUp className="panel__scroll-arrow" />
          </div>
        )}
        <div className="panel__folders-wrapper" ref={scrollContainerRef}>
          <Tooltip id="tooltip-folder-menu-options" offset={13} opacity={1} />
          {folders.map((folder) => (
            <FolderButton
              key={folder.id}
              folder={folder}
              isActive={activeFolderId === folder.id}
              onRename={() => console.log('rename')}
              onClick={() => {
                if (activeFolderId !== folder.id) {
                  setActiveFolderId(folder.id)
                }
              }}
            />
          ))}
        </div>

        {showBottomArrow && (
          <div
            className="panel__scroll-arrow-container panel__scroll-arrow-container--bottom"
            onClick={handleScrollDown}
          >
            <ChevronDown className="panel__scroll-arrow" />
          </div>
        )}
      </div>

      <div className="panel__actions">
        <Pencil />
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
