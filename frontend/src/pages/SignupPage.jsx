import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi'
import api from '../services/api'

function SignupPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'farm-worker',
    signupCode: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [codeVerified, setCodeVerified] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (name === 'role') {
      setCodeVerified(false)
    }
  }

  const handleVerifyCode = async () => {
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/codes/verify', {
        code: formData.signupCode,
        role: formData.role,
      })

      if (response.data.success) {
        setCodeVerified(true)
        setError('')
      }
    } catch (err) {
      setError(err.message || 'Invalid signup code')
      setCodeVerified(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (['agronomist', 'supervisor'].includes(formData.role) && !codeVerified) {
      setError('Please verify your signup code first')
      setLoading(false)
      return
    }

    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
        signupCode: formData.signupCode,
      })

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const requiresCode = ['agronomist', 'supervisor'].includes(formData.role)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-amber-100">
          <div className="text-center mb-8">
            <img src="/great-rift-logo.png" alt="Great Rift" className="h-12 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join Great Rift Coffee Management</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  Full Name
                </div>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <FiMail className="w-4 h-4" />
                  Email
                </div>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <FiLock className="w-4 h-4" />
                  Password
                </div>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                minLength="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <FiPhone className="w-4 h-4" />
                  Phone (Optional)
                </div>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+254..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              >
                <option value="farm-worker">Farm Worker</option>
                <option value="supervisor">Supervisor (requires code)</option>
                <option value="agronomist">Agronomist (requires code)</option>
              </select>
            </div>

            {requiresCode && (
              <div className="form-group bg-blue-50 p-4 rounded-lg border border-blue-200">
                <label htmlFor="signupCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Signup Code (required for {formData.role})
                </label>
                <div className="flex gap-2">
                  <input
                    id="signupCode"
                    type="text"
                    name="signupCode"
                    value={formData.signupCode}
                    onChange={handleInputChange}
                    placeholder="Enter signup code"
                    required={requiresCode}
                    disabled={codeVerified}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={!formData.signupCode || codeVerified || loading}
                    className="bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-800 transition disabled:opacity-50"
                  >
                    {codeVerified ? 'Verified' : 'Verify'}
                  </button>
                </div>
                {codeVerified && (
                  <p className="text-green-600 text-sm mt-2">Code verified successfully</p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-700 text-white py-2 rounded-lg font-semibold hover:bg-amber-800 transition disabled:opacity-50"
              disabled={loading || (requiresCode && !codeVerified)}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-amber-700 font-semibold hover:text-amber-800 transition">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
