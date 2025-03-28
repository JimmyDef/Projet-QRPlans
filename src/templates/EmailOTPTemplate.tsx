import { Html } from '@react-email/components'
import { borderRadius, colors } from '@/variables'

interface EmailVerificationOTPProps {
  fullName: string
  verificationItem: string
}

export const EmailOTPTemplate = ({
  fullName,
  verificationItem,
}: EmailVerificationOTPProps) => {
  return (
    <Html lang="en">
      <div
        style={{
          backgroundColor: colors.lightGrey,
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.6',
          textAlign: 'center',
          margin: '0 auto',
          maxWidth: '600px',
          padding: '20px 80px 60px',
          borderRadius: borderRadius.medium,
        }}
      >
        <h1 style={{ color: colors.primary }}>Hello, {fullName}!</h1>
        <p>
          Thank you for signing up for our service. <br /> To verify your email
          address, please use the following code:
        </p>
        <p
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            fontSize: '32px',
            color: '#fff',
            backgroundColor: colors.secondary,
            borderRadius: '5px',
            margin: '25px 0',
            fontWeight: 'bold',
            letterSpacing: '4px',
          }}
        >
          {verificationItem}
        </p>
        <p>This code expire in 5 minutes</p>
        <p>
          Copy this code into the verification field in our app to complete your
          registration.
          <br />
          If you did not sign up for our service, please ignore this email.
        </p>
        <p>Thank you, The Team.</p>

        <a href={process.env.SUPPORT_LINK}></a>
      </div>
    </Html>
  )
}
