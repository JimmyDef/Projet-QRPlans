import bcrypt from 'bcrypt'

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const saltAndHashPassword = (password: string) => {
  const hash = bcrypt.hashSync(password, 10)
  return hash
}

export const removeChevronCharacters = (input: string) => {
  return input.replace(/[<>]/g, '')
}

export const removeNonAlphabeticCharacters = (input: string) => {
  return input.replace(/[^a-zA-Z]/g, '')
}
