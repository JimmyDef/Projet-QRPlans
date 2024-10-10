// import { getSession } from 'next-auth/react'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // If the user is signed in, continue to the dashboard
  //   const session = await getSession()
  //   if (!session) {
  //     console.log('Redirecting to sign-in')
  //     return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  //   }
  console.log('  sign-in OK')

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}
