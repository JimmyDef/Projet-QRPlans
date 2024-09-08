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

const Panel = async () => {
  return (
    <section className="panel">
      <input type="text" placeholder="Recherche QR Codes.." />

      <Search />
      <h2 className="panel__title">Mes QR CODES</h2>
      <ul>
        <li>
          <List /> Actif
        </li>
        <li>
          <CirclePause /> En pause
        </li>
        <li>
          <Activity />
        </li>
        <li></li>
      </ul>
      <div className="panel__separator"></div>
      <h2 className="panel__title">Mes DOSSIERS</h2>
      <button
        onClick={() => {
          'use client'
        }}
        className="panel__new-folder"
      >
        Nouveau Dossier
      </button>
      <EllipsisVertical />
      <SquarePlus />
      <Plus />
      <Folder />
      <Trash2 />
      <Link />
      <Clock />
      <Clock />
      <ArrowDownNarrowWide />
      <ChartNoAxesColumnDecreasing />
      <ChartColumnDecreasing />
      <SquareChevronDown />
      <SquareChevronUp />
      <Pencil />
      <FolderPlus />
    </section>
  )
}

export default Panel
