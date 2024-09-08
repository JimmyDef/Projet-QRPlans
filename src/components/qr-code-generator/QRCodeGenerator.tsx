import React, { useState } from 'react'
import QRCode from 'qrcode'
import './qr-code-generator.scss'
const QRCodeGenerator = ({ url }: { url: string }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)

  // Générer le QR code au chargement du composant
  React.useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrCodeData = await QRCode.toDataURL(url)
        setQrCodeUrl(qrCodeData)
      } catch (err) {
        console.error('Failed to generate QR code', err)
      }
    }

    generateQRCode()
  }, [url])

  return (
    <div>
      {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="Generated QR Code" />
      ) : (
        <p>Generating QR Code...</p>
      )}
    </div>
  )
}

export default QRCodeGenerator
