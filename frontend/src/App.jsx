import { useState, useEffect } from 'react'
import AuthProvider from './context/AuthProvider'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './layouts/DashboardLayout'
import { useContext } from 'react'
import AuthContext from './context/AuthContext'

function AppContent() {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="loading-spinner">Loading...</div>
  }

  return user ? <DashboardLayout /> : <LoginPage />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
