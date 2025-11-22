"use client"

import { useState, useEffect, useContext } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import api from "../services/api"
import { showToast } from "../utils/toastConfig"
import AuthContext from "../context/AuthContext"

function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("input")
  const [otp, setOtp] = useState(["", "", "", "", "", "", ""])
  const [resendLoading, setResendLoading] = useState(false)
  const email = searchParams.get("email")

  useEffect(() => {
    if (!email) {
      showToast.error("Email address is required")
      navigate("/signup")
    }
  }, [email, navigate])

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return // Only allow digits

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only take last character
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 6) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 7)
    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    // Focus last filled input
    const lastFilledIndex = Math.min(pastedData.length, 6)
    const lastInput = document.getElementById(`otp-${lastFilledIndex}`)
    if (lastInput) lastInput.focus()
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    const otpString = otp.join("")

    if (otpString.length !== 7) {
      showToast.error("Please enter all 7 digits")
      return
    }

    setLoading(true)
    setStatus("verifying")

    try {
      const response = await api.post("/auth/verify-email", {
        email,
        otp: otpString,
      })

      if (response.data && response.data.success) {
        setStatus("success")
        showToast.success("Email verified successfully!")

        const userData = response.data.user
        const token = response.data.token

        localStorage.setItem("authToken", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)

        setTimeout(() => {
          navigate("/dashboard")
        }, 1500)
      } else {
        throw new Error(response.data?.message || "Verification failed")
      }
    } catch (error) {
      setStatus("input")
      const errorMsg = error.message || "Invalid or expired OTP"
      showToast.error(errorMsg)
      setOtp(["", "", "", "", "", "", ""])
      document.getElementById("otp-0")?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setResendLoading(true)

    try {
      const response = await api.post("/auth/resend-otp", { email })

      if (response.data && response.data.success) {
        showToast.success("Verification code sent!")
        setOtp(["", "", "", "", "", "", ""])
        document.getElementById("otp-0")?.focus()
      } else {
        throw new Error(response.data?.message || "Failed to resend code")
      }
    } catch (error) {
      const errorMsg = error.message || "Failed to resend code"
      showToast.error(errorMsg)
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e8f5e9",
        padding: "16px",
      }}
    >
      <div style={{ maxWidth: "440px", width: "100%" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "40px 32px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
            textAlign: "center",
          }}
        >
          {status === "verifying" && (
            <>
              <div
                style={{
                  display: "inline-block",
                  width: "48px",
                  height: "48px",
                  border: "4px solid #c8e6c9",
                  borderTop: "4px solid #2e7d32",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginBottom: "24px",
                }}
              ></div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#2e7d32",
                }}
              >
                Verifying Code
              </h2>
              <p style={{ color: "#6b7280", fontSize: "13px" }}>Please wait...</p>
            </>
          )}

          {status === "input" && (
            <>
              <div style={{ marginBottom: "24px" }}>
                <img
                  src="/great-rift-logo.png"
                  alt="Great Rift Coffee"
                  style={{ height: "48px", width: "auto", marginBottom: "12px", objectFit: "contain" }}
                />
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#2e7d32",
                  }}
                >
                  Verify Your Email
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  We've sent a 7-digit code to
                  <br />
                  <strong>{email}</strong>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    marginBottom: "24px",
                  }}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      style={{
                        width: "48px",
                        height: "56px",
                        fontSize: "24px",
                        fontWeight: "600",
                        textAlign: "center",
                        border: "2px solid #c8e6c9",
                        borderRadius: "8px",
                        backgroundColor: "#f1f8f4",
                        color: "#1f2937",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#2e7d32")}
                      onBlur={(e) => (e.target.style.borderColor = "#c8e6c9")}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join("").length !== 7}
                  style={{
                    backgroundColor: "#2e7d32",
                    color: "#ffffff",
                    padding: "12px",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: loading || otp.join("").length !== 7 ? "not-allowed" : "pointer",
                    opacity: loading || otp.join("").length !== 7 ? 0.6 : 1,
                    width: "100%",
                    marginBottom: "16px",
                  }}
                >
                  {loading ? "Verifying..." : "Verify Email"}
                </button>
              </form>

              <div style={{ marginTop: "20px" }}>
                <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "12px" }}>Didn't receive the code?</p>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendLoading}
                  style={{
                    backgroundColor: "transparent",
                    color: "#2e7d32",
                    padding: "8px 16px",
                    border: "1px solid #2e7d32",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: resendLoading ? "not-allowed" : "pointer",
                    opacity: resendLoading ? 0.6 : 1,
                  }}
                >
                  {resendLoading ? "Sending..." : "Resend Code"}
                </button>
              </div>

              <div style={{ marginTop: "20px" }}>
                <p style={{ color: "#999", fontSize: "12px", fontStyle: "italic" }}>Code expires in 15 minutes</p>
              </div>
            </>
          )}

          {status === "success" && (
            <>
              <div
                style={{
                  fontSize: "56px",
                  marginBottom: "16px",
                  color: "#10b981",
                }}
              >
                ✓
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#2e7d32",
                }}
              >
                Email Verified!
              </h2>
              <p
                style={{
                  color: "#6b7280",
                  marginBottom: "24px",
                  fontSize: "13px",
                }}
              >
                Your email has been verified successfully. Redirecting to your dashboard...
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  backgroundColor: "#2e7d32",
                  color: "#ffffff",
                  padding: "11px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Go to Dashboard
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
