import './panel.scss'
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

      <h2 className="panel__section-title">MES DOSSIERS</h2>
      <div className="panel__folder-input-group">
        <FolderPlus className="panel__new-folder-icon" />
        <input
          type="text"
          placeholder="Nouveau Dossier"
          className="panel__folder-input"
          minLength={1}
          maxLength={25}
        ></input>
      </div>

      <div className="panel__folders">
        {folders.map((folder) => (
          <div key={folder.id} className="panel__folder">
            <Folder className="panel__folder-icon" />
            <button className="panel__folder-button">{folder.name}</button>
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
