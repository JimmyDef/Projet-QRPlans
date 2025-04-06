// Panel.jsx
'use client'
import { useDashboardStore } from '@/src/lib/store'
// import { sanitizeFoldersInput } from '@/src/services/helpers'
import FolderList from '@/app/dashboard/_panel/components/folder-list/FolderList'
import NewFolderInput from '@/app/dashboard/_panel/components/new-folder-input/NewFolderInput'
import ScrollArrows from '@/app/dashboard/_panel/components/scroll-arrows/ScrollArrows'
import SearchBar from '@/app/dashboard/_panel/components/search-bar/SearchBar'
import StatusButtons from '@/app/dashboard/_panel/components/status-buttons/StatusButtons'
import useScrollArrows from '@/src/hooks/useScrollArrows'
import './panel.scss'

const Panel = () => {
  const { folders } = useDashboardStore((state) => ({
    folders: state.folders,
  }))

  const {
    scrollContainerRef,
    showBottomArrow,
    showTopArrow,
    handleScrollUp,
    handleScrollDown,
  } = useScrollArrows(folders.length)

  return (
    <section className="panel">
      <SearchBar />
      <h2 className="panel__section-title">MES QR-CODES</h2>
      <StatusButtons />

      <div className="panel__divider"></div>

      <h2 className="panel__section-title">
        MES DOSSIERS{' '}
        <span className="panel__folders-count">({folders.length})</span>
      </h2>

      <NewFolderInput
      // newFolder={newFolder}
      // handleAddNewFolder={handleAddNewFolder}
      // handleOnChange={handleOnChange}
      // handleKeyPress={handleKeyPress}
      />

      <div className="panel__folders">
        <ScrollArrows
          showTopArrow={showTopArrow}
          showBottomArrow={showBottomArrow}
          handleScrollUp={handleScrollUp}
          handleScrollDown={handleScrollDown}
        />
        <FolderList folders={folders} scrollContainerRef={scrollContainerRef} />
      </div>

      {/* <ActionIcons /> */}
    </section>
  )
}

export default Panel
