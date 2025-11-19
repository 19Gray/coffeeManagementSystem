import { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { showToast } from '../utils/toastConfig'

function LoginPage() {
  const { login, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      showToast.success('Login successful!')
      navigate('/dashboard')
    } catch (err) {
      const errorMsg = err.message || 'Login failed'
      setError(errorMsg)
      showToast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleGuestLogin = () => {
    const guestUser = {
      id: 'guest_' + Date.now(),
      name: 'Guest User',
      email: 'guest@grrc.com',
      role: 'guest',
    }
    localStorage.setItem('user', JSON.stringify(guestUser))
    setUser(guestUser)
    showToast.success('Guest access granted')
    navigate('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5ede0',
      padding: '16px'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '40px 32px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              fontSize: '32px',
              marginBottom: '16px',
              fontWeight: 'bold',
              color: '#b8a887'
            }}>
              ☕
            </div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '4px',
              color: '#5c3d2e'
            }}>
              Great Rift Coffee
            </h1>
            <p style={{ color: '#8b7355', fontSize: '13px', fontWeight: '500' }}>Management System</p>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '12px 14px',
              borderRadius: '6px',
              marginBottom: '20px',
              fontSize: '13px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '6px',
                color: '#374151',
                gap: '6px'
              }} htmlFor="email">
                <span>✉</span> Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5ddd0',
                  borderRadius: '6px',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fafaf9',
                  color: '#1f2937'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '6px',
                color: '#374151',
                gap: '6px'
              }} htmlFor="password">
                <span>🔒</span> Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5ddd0',
                  borderRadius: '6px',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fafaf9',
                  color: '#1f2937'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: '#b8652a',
                color: '#ffffff',
                padding: '11px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                marginTop: '8px'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '20px 0',
            gap: '12px'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5ddd0' }}></div>
            <span style={{ color: '#a0957d', fontSize: '12px', fontWeight: '500' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5ddd0' }}></div>
          </div>

          <button
            onClick={handleGuestLogin}
            type="button"
            style={{
              width: '100%',
              backgroundColor: '#f3f1ed',
              color: '#374151',
              padding: '11px',
              border: '1px solid #e5ddd0',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Continue as Guest
          </button>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{
                color: '#b8652a',
                fontWeight: '600',
                textDecoration: 'none'
              }}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
