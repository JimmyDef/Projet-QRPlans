export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const removeChevronCharacters = (input: string) => {
  return input.replace(/[<>]/g, '')
}

export const removeNonAlphabeticCharacters = (input: string) => {
  return input.replace(/[^a-zA-Z]/g, '')
}
export const sanitizeInput = (input: string) => {
  return input.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ-' ]/g, '')
}

export const hasLowercase = (password: string) => /[a-z]/.test(password)
export const hasUppercase = (password: string) => /[A-Z]/.test(password)
export const hasNumber = (password: string) => /\d/.test(password)
export const hasSpecialCharacter = (password: string) =>
  /[!@#$%^&*]/.test(password)
export const isValidLength = (password: string) =>
  password.length >= 8 && password.length <= 20

export const isPasswordStrong = (password: string) => {
  const isStrong =
    hasLowercase(password) &&
    hasUppercase(password) &&
    hasNumber(password) &&
    hasSpecialCharacter(password) &&
    isValidLength(password)
  return isStrong
}

export const comparePasswords = (
  password: string,
  passwordConfirmation: string
) => {
  return password !== passwordConfirmation
}
