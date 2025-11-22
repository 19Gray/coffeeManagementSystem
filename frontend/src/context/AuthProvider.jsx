"use client"

import { useState, useEffect } from "react"
import AuthContext from "./AuthContext"
import { authAPI, organizationAPI } from "../services/api"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentOrganization, setCurrentOrganization] = useState(null)
  const [organizations, setOrganizations] = useState([])

  // Initialize user from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const userData = localStorage.getItem("user")
        const orgData = localStorage.getItem("currentOrganization")

        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData)
            setUser(parsedUser)

            if (orgData) {
              setCurrentOrganization(JSON.parse(orgData))
            }

            // Optional: Verify token is still valid by fetching profile
            try {
              const profileData = await authAPI.getProfile()
              if (profileData.data) {
                setUser(profileData.data)
                localStorage.setItem("user", JSON.stringify(profileData.data))
              }

              if (parsedUser.role !== "farm_worker") {
                const orgsData = await organizationAPI.getAll()
                if (orgsData.data) {
                  setOrganizations(orgsData.data)
                }
              }
            } catch (profileError) {
              console.warn("Profile fetch failed, using cached user data", profileError)
            }
          } catch (parseError) {
            console.error("Failed to parse user data", parseError)
            localStorage.removeItem("authToken")
            localStorage.removeItem("user")
            localStorage.removeItem("currentOrganization")
          }
        }
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      setLoading(true)

      const response = await authAPI.login(email, password)

      if (!response.success || !response.user || !response.token) {
        throw new Error("Invalid response format from server")
      }

      const userData = response.user

      localStorage.setItem("authToken", response.token)
      localStorage.setItem("user", JSON.stringify(userData))

      setUser(userData)

      // Load organizations if not a farm worker
      if (userData.role !== "farm_worker" && userData.organizations?.length > 0) {
        const orgsData = await organizationAPI.getAll()
        if (orgsData.data) {
          setOrganizations(orgsData.data)
          // Set first organization as current
          const firstOrg = orgsData.data[0]
          setCurrentOrganization(firstOrg)
          localStorage.setItem("currentOrganization", JSON.stringify(firstOrg))
        }
      }

      setLoading(false)
      return userData
    } catch (err) {
      setLoading(false)
      const errorMessage = err.message || "Login failed"
      setError(errorMessage)
      console.error("Login error in AuthProvider:", errorMessage, err)
      throw err
    }
  }

  // Signup function
  const signup = async (name, email, password, role) => {
    try {
      setError(null)
      const response = await authAPI.signup(name, email, password, role)
      const userData = response.user

      localStorage.setItem("authToken", response.token)
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      return userData
    } catch (err) {
      const errorMessage = err.message || "Signup failed"
      setError(errorMessage)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    localStorage.removeItem("currentOrganization")
    setUser(null)
    setCurrentOrganization(null)
    setOrganizations([])
    setError(null)
    setLoading(false)
  }

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      setError(null)
      const response = await authAPI.updateProfile(profileData)
      const updatedUser = response.data

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      return updatedUser
    } catch (err) {
      const errorMessage = err.message || "Update failed"
      setError(errorMessage)
      throw err
    }
  }

  const switchOrganization = (organization) => {
    setCurrentOrganization(organization)
    localStorage.setItem("currentOrganization", JSON.stringify(organization))
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
    isAuthenticated: !!user && !!localStorage.getItem("authToken"),
    currentOrganization,
    organizations,
    switchOrganization,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
