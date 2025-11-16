import { useState, useEffect } from 'react'
import AuthContext from './AuthContext'
import { authAPI } from '../services/api'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize user from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const userData = localStorage.getItem('user')

        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData)
            setUser(parsedUser)
            
            // Optional: Verify token is still valid by fetching profile
            try {
              const profileData = await authAPI.getProfile()
              if (profileData.data) {
                setUser(profileData.data)
                localStorage.setItem('user', JSON.stringify(profileData.data))
              }
            } catch (profileError) {
              console.warn('Profile fetch failed, using cached user data', profileError)
            }
          } catch (parseError) {
            console.error('Failed to parse user data', parseError)
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
          }
        }
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      setError(null)
      const response = await authAPI.login(email, password)
      const userData = response.user
      
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      
      return userData
    } catch (err) {
      const errorMessage = err.message || 'Login failed'
      setError(errorMessage)
      throw err
    }
  }

  // Signup function
  const signup = async (name, email, password, role) => {
    try {
      setError(null)
      const response = await authAPI.signup(name, email, password, role)
      const userData = response.user
      
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      
      return userData
    } catch (err) {
      const errorMessage = err.message || 'Signup failed'
      setError(errorMessage)
      throw err
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
    setError(null)
  }

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      setError(null)
      const response = await authAPI.updateProfile(profileData)
      const updatedUser = response.data
      
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      
      return updatedUser
    } catch (err) {
      const errorMessage = err.message || 'Update failed'
      setError(errorMessage)
      throw err
    }
  }

  const value = {
    user,
    setUser,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user && !!localStorage.getItem('authToken'),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
