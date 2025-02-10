'use server'

const testaction = async (otp: string) => {
  if (otp === '123456') {
    return { message: 'OOOKKKKK' }
  } else {
    return { message: 'Code expiré ou invalide.' }
  }
}
export default testaction
