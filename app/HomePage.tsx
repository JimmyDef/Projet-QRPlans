// import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export const HomePage = () => {
  const t = useTranslations('homepage')
  return (
    <section className="hero">
      <div className="hero__container">
        <h1 className="hero__title">
          Partagez vos plans <br /> avec un simple scan
        </h1>
        <p className="hero__subtitle">
          Hébergez vos plans PDF et rendez-les accessibles instantanément via QR
          code.
        </p>
        <ul className="hero__features">
          <li>Stockez et gérez vos plans en toute sécurité</li>
          <li>Génération de QR codes pour un accès facile</li>
          <li>Partagez vos plans avec un simple scan</li>
          <li>Accessible depuis n&apos;importe quel appareil</li>
        </ul>
        <Link href="/auth/sign-in" className="hero__button">
          Démarrez gratuitement
        </Link>
      </div>
    </section>
  )
}
