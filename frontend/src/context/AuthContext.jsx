import { createContext } from 'react'

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: false,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfile: async () => {},
  isAuthenticated: false,
})

export default AuthContext
