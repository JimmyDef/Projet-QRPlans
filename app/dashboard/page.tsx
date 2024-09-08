import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import Panel from '@/src/components/panel/page'
const Dashboard = async () => {
  const session = await auth()
  if (!session) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      <Panel />
      <p>Session: {session?.user?.id}</p>
    </>
  )
}

export default Dashboard
