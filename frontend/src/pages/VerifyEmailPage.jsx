import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { showToast } from '../utils/toastConfig'

function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('verifying')
  const email = searchParams.get('email')

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token')

      if (!token) {
        setStatus('error')
        setLoading(false)
        showToast.error('No verification token provided')
        return
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/verify-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus('success')
          showToast.success('Email verified successfully!')
          setTimeout(() => navigate('/login'), 2000)
        } else {
          setStatus('error')
          showToast.error(data.message || 'Verification failed')
        }
      } catch (error) {
        setStatus('error')
        showToast.error('Verification error. Please try again.')
        console.error('Verification error:', error)
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [searchParams, navigate])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5ede0',
      padding: '16px'
    }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '40px 32px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          textAlign: 'center'
        }}>
          {loading && (
            <>
              <div style={{
                display: 'inline-block',
                width: '48px',
                height: '48px',
                border: '4px solid #e5ddd0',
                borderTop: '4px solid #b8652a',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '24px'
              }}></div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#5c3d2e'
              }}>
                Verifying Email
              </h2>
              <p style={{ color: '#6b7280', fontSize: '13px' }}>
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {!loading && status === 'success' && (
            <>
              <div style={{
                fontSize: '56px',
                marginBottom: '16px',
                color: '#10b981'
              }}>
                ✓
              </div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#5c3d2e'
              }}>
                Email Verified!
              </h2>
              <p style={{
                color: '#6b7280',
                marginBottom: '24px',
                fontSize: '13px'
              }}>
                Your email has been verified successfully. Redirecting to login...
              </p>
              <button
                onClick={() => navigate('/login')}
                style={{
                  backgroundColor: '#b8652a',
                  color: '#ffffff',
                  padding: '11px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Go to Login
              </button>
            </>
          )}

          {!loading && status === 'error' && (
            <>
              <div style={{
                fontSize: '56px',
                marginBottom: '16px',
                color: '#ef4444'
              }}>
                ✕
              </div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#5c3d2e'
              }}>
                Verification Failed
              </h2>
              <p style={{
                color: '#6b7280',
                marginBottom: '24px',
                fontSize: '13px'
              }}>
                The verification link may be invalid or expired.
              </p>
              <button
                onClick={() => navigate('/signup')}
                style={{
                  backgroundColor: '#b8652a',
                  color: '#ffffff',
                  padding: '11px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Back to Signup
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default VerifyEmailPage
