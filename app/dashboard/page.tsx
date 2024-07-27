import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const session = await auth()
  if (!session) {
    redirect('/signIn')
  }

  return (
    <>
      <h1>dashboard</h1>
      <p>Session: {session?.user?.id}</p>
    </>
  )
}

export default Dashboard
