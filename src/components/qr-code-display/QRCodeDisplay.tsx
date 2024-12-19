// import React, { useEffect, useState } from 'react'
// import './qr-code-display.scss'
// const QRCodeDisplay = ({ url }: { url: string }) => {
//   const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchQRCode = async () => {
//       const response = await fetch(
//         `/api/generate-qrcode?url=${encodeURIComponent(url)}`
//       )
//       const data = await response.json()
//       setQrCodeUrl(data.qrCode)
//     }

//     fetchQRCode()
//   }, [url])

//   return (
//     <div>
//       {qrCodeUrl ? (
//         <image src={qrCodeUrl} alt="QR Code" />
//       ) : (
//         <p>Loading QR Code...</p>
//       )}
//     </div>
//   )
// }

// export default QRCodeDisplay
