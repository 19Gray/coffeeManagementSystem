import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { showToast } from '../utils/toastConfig'
import { FiMail } from 'react-icons/fi'

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        showToast.success('Password reset email sent!')
        setSubmitted(true)
        setTimeout(() => navigate('/login'), 3000)
      } else {
        showToast.error(data.message || 'Failed to send reset email')
      }
    } catch (error) {
      showToast.error('Error sending reset email. Please try again.')
      console.error('Forgot password error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="dashboard-card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-coffee-brown/20 rounded-lg mb-4">
              <FiMail className="w-6 h-6 text-coffee-gold" />
            </div>
            <h1 className="text-2xl font-bold text-coffee-gold">Forgot Password</h1>
            <p className="text-slate-400 text-sm mt-2">Enter your email to receive a reset link</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label className="text-slate-300 font-medium mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="text-5xl mb-4">✓</div>
              <p className="text-slate-400 mb-4">
                We've sent a password reset link to <strong>{email}</strong>. Check your email and follow the link to reset your password.
              </p>
              <p className="text-slate-500 text-sm">Redirecting to login...</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Remember your password?{' '}
              <Link to="/login" className="text-coffee-light hover:text-coffee-gold font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
