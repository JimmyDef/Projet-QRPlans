import Link from 'next/link'
import '@/src/styles/app/shared/token-result.scss'
type TokenResultProps = {
  title: string
  url: string
  txt: string
  buttonText?: string
}

const TokenResult = ({
  title,
  url,
  txt,
  buttonText = 'Send me a new link',
}: TokenResultProps) => {
  return (
    <div className="token-result">
      <h1 className="token-result__title">{title}</h1>
      <p className="token-result__text">{txt} </p>

      <Link href={url} className="token-result__link">
        {buttonText}
      </Link>
    </div>
  )
}
export default TokenResult
