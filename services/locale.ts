'use server'

import { cookies } from 'next/headers'
import { headers } from 'next/headers'

const locales = ['en', 'fr'] as const

export type Locale = (typeof locales)[number]

const headersList = headers()
const acceptLanguage = headersList.get('accept-language')
const localeCandidate: string | undefined = acceptLanguage
  ?.split(',')[0]
  .split('-')[0]

const localeFromHeaders = locales.includes(localeCandidate as Locale)
  ? localeCandidate
  : 'fr'

const COOKIE_NAME = 'USER_LOCALE_PREFERENCE'

export async function getUserLocale(): Promise<Locale> {
  const userLocale = cookies().get(COOKIE_NAME)?.value as Locale

  return userLocale || localeFromHeaders
}

export async function setUserLocale(locale: Locale): Promise<void> {
  cookies().set(COOKIE_NAME, locale)
}
