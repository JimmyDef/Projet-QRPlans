import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'

export const HandleSessionRedirect = async (path: string) => {
  const session = await auth()
  if (session) {
    if (session?.user.active === false)
      return redirect('/auth/registration/validateEmailCode')
    redirect(path)
  }
}
