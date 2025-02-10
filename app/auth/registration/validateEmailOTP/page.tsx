import { Otp } from '@/src/components/auth/otp/Otp'
import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
const validateEmailOTP = async () => {
  const session = await auth()

  console.log('🚀 ~ session:', session)
  if (!session) return redirect('/auth/sign-in')
  if (session.user.provider !== 'credentials') return redirect('/dashboard')
  if (session?.user.provider === 'credentials' && session?.user.active === true)
    return redirect('/dashboard')

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Vérification de votre adresse e-mail</h1>
      <p>
        Pour finaliser votre inscription, veuillez entrer le code que vous avez
        reçu par e-mail.
      </p>

      <Otp />

      <p style={{ marginTop: '1rem' }}>
        Vous n&apos;avez pas reçu le code ?{' '}
        {/* <button onClick={() => {}}>Renvoyer l&apos;e-mail</button> */}
      </p>
    </div>
  )
}

export default validateEmailOTP
