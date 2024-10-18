'use client'
import { useSession } from 'next-auth/react'

export const DashboardMainContent = () => {
  const { data: session } = useSession()
  return (
    <section className="dashboard-content">
      <p>Session: {session?.user?.id}</p>
      <p>
        Session:{' '}
        {session ? JSON.stringify(session.user) : 'No session available'}
      </p>
    </section>
  )
}
