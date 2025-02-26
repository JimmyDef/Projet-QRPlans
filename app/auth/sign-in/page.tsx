import SignInForm from '@/src/components/ui/form/signInForm/SignInForm'
import { signOut } from '@/src/lib/auth'

import { HandleSessionRedirect } from '@/src/lib/SessionCheckerServer'
import router from 'next/router'
import { headers } from 'next/headers'
import { useSearchParams } from 'next/navigation'

// export const HandleDatabaseErrorRootLayout = () => {
//   'use client'
//   const searchParams = useSearchParams()
//   const error = searchParams.get('error')
//   if (error === 'database-layout-error') {
//     signOut()
//     router.push('/auth/sign-in')
//   }
//   return null
// }

const SignIn = async () => {
  const headersList = await headers()
  const referer = headersList.get('referer')

  console.log('🚀 ~ fullUrl:', referer)

  // const url = new URL(fullUrl)
  // const pathname = url.pathname
  // const searchParams = url.searchParams
  // const error = searchParams.get('error')
  // if (error === 'databaselayouterror') {
  //   await signOut()
  //   redirect('/auth/sign-in')
  // }

  await HandleSessionRedirect()
  return (
    <>
      {/* <HandleDatabaseErrorRootLayout /> */}
      <SignInForm />
    </>
  )
}
export default SignIn
