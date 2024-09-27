import { NextResponse } from 'next/server'
import { auth } from '@/src/lib/auth'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const { id, ...secureUser } = session.user || {}
  return NextResponse.json(secureUser)
}
