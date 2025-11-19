import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { showToast } from '../utils/toastConfig'

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
  const [showVerificationMessage, setShowVerificationMessage] = useState(false)

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
        showToast.success('Signup code verified successfully!')
      }
    } catch (err) {
      const errorMsg = err.message || 'Invalid signup code'
      setError(errorMsg)
      showToast.error(errorMsg)
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
      showToast.error('Please verify your signup code first')
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
        showToast.success('Account created! Check your email to verify.')
        setShowVerificationMessage(true)
        setTimeout(() => navigate('/login'), 3000)
      }
    } catch (err) {
      const errorMsg = err.message || 'Signup failed'
      setError(errorMsg)
      showToast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const requiresCode = ['agronomist', 'supervisor'].includes(formData.role)

  if (showVerificationMessage) {
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
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
            <h1 style={{
              fontSize: '22px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#5c3d2e'
            }}>
              Account Created!
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '13px', lineHeight: '1.5' }}>
              We've sent a verification email to <strong>{formData.email}</strong>. Please check your email and click the verification link to activate your account.
            </p>
            <p style={{ color: '#a0957d', fontSize: '12px' }}>Redirecting to login...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5ede0',
      padding: '16px',
      paddingTop: '32px',
      paddingBottom: '32px'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '40px 32px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              fontSize: '32px',
              marginBottom: '12px',
              fontWeight: 'bold',
              color: '#b8a887'
            }}>
              ☕
            </div>
            <h1 style={{
              fontSize: '22px',
              fontWeight: '600',
              marginBottom: '4px',
              color: '#5c3d2e'
            }}>
              Create Account
            </h1>
            <p style={{ color: '#8b7355', fontSize: '13px', fontWeight: '500' }}>
              Join Great Rift Coffee Management
            </p>
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

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '6px',
                color: '#374151'
              }} htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
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
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '6px',
                color: '#374151'
              }} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '6px',
                color: '#374151'
              }} htmlFor="password">
                Password
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
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '6px',
                color: '#374151'
              }} htmlFor="phone">
                Phone (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+254..."
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
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '6px',
                color: '#374151'
              }} htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
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
              >
                <option value="farm-worker">Farm Worker</option>
                <option value="supervisor">Supervisor (requires code)</option>
                <option value="agronomist">Agronomist (requires code)</option>
              </select>
            </div>

            {requiresCode && (
              <div style={{
                backgroundColor: '#f9f7f3',
                padding: '14px',
                borderRadius: '6px',
                border: '1px solid #e5ddd0'
              }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  marginBottom: '8px',
                  color: '#374151'
                }} htmlFor="signupCode">
                  Signup Code (required for {formData.role})
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    id="signupCode"
                    type="text"
                    name="signupCode"
                    value={formData.signupCode}
                    onChange={handleInputChange}
                    placeholder="Enter signup code"
                    required={requiresCode}
                    disabled={codeVerified}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: '1px solid #e5ddd0',
                      borderRadius: '6px',
                      fontSize: '13px',
                      backgroundColor: codeVerified ? '#f3f1ed' : '#fafaf9',
                      color: '#1f2937'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={!formData.signupCode || codeVerified || loading}
                    style={{
                      backgroundColor: codeVerified ? '#10b981' : '#b8652a',
                      color: '#ffffff',
                      padding: '10px 14px',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: !formData.signupCode || codeVerified || loading ? 'not-allowed' : 'pointer',
                      opacity: !formData.signupCode || codeVerified || loading ? 0.6 : 1,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {codeVerified ? '✓ Verified' : 'Verify'}
                  </button>
                </div>
                {codeVerified && (
                  <p style={{ color: '#10b981', fontSize: '12px', marginTop: '8px' }}>
                    Code verified successfully
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (requiresCode && !codeVerified)}
              style={{
                backgroundColor: '#b8652a',
                color: '#ffffff',
                padding: '11px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading || (requiresCode && !codeVerified) ? 'not-allowed' : 'pointer',
                opacity: loading || (requiresCode && !codeVerified) ? 0.6 : 1,
                marginTop: '6px'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{
                color: '#b8652a',
                fontWeight: '600',
                textDecoration: 'none'
              }}>
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
