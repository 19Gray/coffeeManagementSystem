import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { showToast } from '../utils/toastConfig'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      showToast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      showToast.error('Password must be at least 6 characters')
      return
    }

    const token = searchParams.get('token')
    if (!token) {
      showToast.error('Invalid reset link')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            password: formData.password,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        showToast.success('Password reset successful!')
        localStorage.setItem('token', data.token)
        setTimeout(() => navigate('/dashboard'), 1500)
      } else {
        showToast.error(data.message || 'Password reset failed')
      }
    } catch (error) {
      showToast.error('Error resetting password. Please try again.')
      console.error('Reset error:', error)
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
              <FiLock className="w-6 h-6 text-coffee-gold" />
            </div>
            <h1 className="text-2xl font-bold text-coffee-gold">Reset Password</h1>
            <p className="text-slate-400 text-sm mt-2">Enter your new password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="text-slate-300 font-medium mb-2 block">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="text-slate-300 font-medium mb-2 block">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                >
                  {showConfirm ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Remember your password?{' '}
              <a href="/login" className="text-coffee-light hover:text-coffee-gold font-semibold">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
