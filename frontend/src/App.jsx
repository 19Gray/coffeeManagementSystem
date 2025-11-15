import { useState, useEffect } from 'react'
import AuthContext from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './layouts/DashboardLayout'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (e) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="loading-spinner">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user ? <DashboardLayout /> : <LoginPage />}
    </AuthContext.Provider>
  )
}

export default App
