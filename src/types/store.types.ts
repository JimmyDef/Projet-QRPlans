export interface AuthStore {
  isUserActive: boolean | undefined
  setUserActive: (isUserActive: boolean) => void
}
