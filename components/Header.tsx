import Link from 'next/link'

const Header = () => {
  // throw new Error('Not implemented')
  return (
    <header>
      <div>Header - QRPlan</div>
      <nav>
        <ul>
          <li>
            <Link href="/signIn">Connexion</Link>
          </li>
          <li>
            <Link href="/signIn">Inscription</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
