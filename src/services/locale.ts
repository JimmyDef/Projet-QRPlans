'use server'
import { headers } from 'next/headers'
import { cookies } from 'next/headers'

export type Locale = 'en' | 'fr'

const locales: Locale[] = ['en', 'fr']
const COOKIE_NAME = 'USER_LOCALE_PREFERENCE'

export async function getUserLocale(): Promise<Locale> {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language')
  const localeCandidate: string | undefined = acceptLanguage
    ?.split(',')[0]
    .split('-')[0]

  const localeFromHeaders = locales.includes(localeCandidate as Locale)
    ? localeCandidate
    : 'fr'

  const userLocale = cookies().get(COOKIE_NAME)?.value as Locale

  return userLocale || localeFromHeaders
}

export async function setUserLocale(locale: Locale): Promise<void> {
  cookies().set(COOKIE_NAME, locale)
}
