// src/lib/errors/CustomErrors.ts

export class MissingCredentialsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MissingCredentialsError'
  }
}

export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserNotFoundError'
  }
}

export class AccountProviderError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AccountProviderError'
  }
}

export class EmailNotVerifiedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmailNotVerifiedError'
  }
}

export class InvalidPasswordError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidPasswordError'
  }
}
export class DatabaseUnavailableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DatabaseUnavailableError'
  }
}
