export type User = {
  id: null
  name?: string | null
  email?: string | null
  image?: string | null
}

export type File = {
  id: string
  name: string
  url: string
  qrCode: string
  status: 'ACTIVE' | 'PAUSED' | 'DELETED'
}

export type Folder = {
  id: string
  name: string
  files: File[]
}
