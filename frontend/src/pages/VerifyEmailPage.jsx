import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { showToast } from '../utils/toastConfig'

function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('verifying')

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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="dashboard-card text-center">
          {loading && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-coffee-gold mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-coffee-gold mb-2">Verifying Email</h2>
              <p className="text-slate-400">Please wait while we verify your email address...</p>
            </>
          )}

          {!loading && status === 'success' && (
            <>
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-success mb-2">Email Verified!</h2>
              <p className="text-slate-400 mb-6">Your email has been verified successfully. Redirecting to login...</p>
              <button className="btn-primary w-full" onClick={() => navigate('/login')}>
                Go to Login
              </button>
            </>
          )}

          {!loading && status === 'error' && (
            <>
              <div className="text-6xl mb-4">✗</div>
              <h2 className="text-2xl font-bold text-danger mb-2">Verification Failed</h2>
              <p className="text-slate-400 mb-6">The verification link may be invalid or expired.</p>
              <button className="btn-primary w-full" onClick={() => navigate('/login')}>
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailPage
