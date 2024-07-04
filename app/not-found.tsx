'use client'
import './../sass/not-found.scss'
import Link from 'next/link'
import Image from 'next/image'
import logo404 from './../public/404-animate.svg'
const NotFound = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="not-found-wrapper">
      <Image src={logo404} alt="page non trouvée" />

      <Link href="/">Page d&apos;accueil</Link>
    </div>
  )
}
export default NotFound
