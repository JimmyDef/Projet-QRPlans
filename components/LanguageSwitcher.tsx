'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const LanguageSwitcher = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const locales = ['en', 'fr']

  return (
    <div>
      {locales.map((locale) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()))
        params.set('locale', locale)

        return (
          <Link key={locale} href={`${pathname}?${params.toString()}`}>
            {locale.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
