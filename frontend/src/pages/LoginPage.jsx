"use client"

import { useState, useContext } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { showToast } from "../utils/toastConfig"

function LoginPage() {
  const { login, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      console.log("[v0] Starting login process with email:", email)
      const userData = await login(email, password)
      console.log("[v0] Login successful, user data received:", userData)

      if (!userData || !userData.role) {
        throw new Error("Invalid user data received from server")
      }

      console.log("[v0] User role:", userData.role)

      showToast.success(`Welcome back, ${userData.name || "User"}!`)

      // Wait a bit for state to fully update before navigating
      setTimeout(() => {
        console.log("[v0] Navigating to dashboard for role:", userData.role)
        navigate("/dashboard", { replace: true })
      }, 100)
    } catch (err) {
      console.error("[v0] Login error:", err)
      const errorMsg = err.message || "Login failed"
      setError(errorMsg)
      showToast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleGuestLogin = () => {
    const guestUser = {
      id: "guest_" + Date.now(),
      name: "Guest User",
      email: "guest@grrc.com",
      role: "guest",
    }
    localStorage.setItem("user", JSON.stringify(guestUser))
    setUser(guestUser)
    showToast.success("Guest access granted")
    navigate("/dashboard")
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
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "40px 32px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <img
              src="/great-rift-logo.png"
              alt="Great Rift Coffee"
              style={{ height: "48px", width: "auto", marginBottom: "16px", objectFit: "contain" }}
            />
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "4px",
                color: "#2e7d32",
              }}
            >
              Great Rift Coffee
            </h1>
            <p style={{ color: "#558b5a", fontSize: "13px", fontWeight: "500" }}>Management System</p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: "#fee2e2",
                color: "#991b1b",
                padding: "12px 14px",
                borderRadius: "6px",
                marginBottom: "20px",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#374151",
                  gap: "6px",
                }}
                htmlFor="email"
              >
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
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #c8e6c9",
                  borderRadius: "6px",
                  fontSize: "13px",
                  boxSizing: "border-box",
                  backgroundColor: "#f1f8f4",
                  color: "#1f2937",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#374151",
                  gap: "6px",
                }}
                htmlFor="password"
              >
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
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #c8e6c9",
                  borderRadius: "6px",
                  fontSize: "13px",
                  boxSizing: "border-box",
                  backgroundColor: "#f1f8f4",
                  color: "#1f2937",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#2e7d32",
                color: "#ffffff",
                padding: "11px",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                marginTop: "8px",
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px 0",
              gap: "12px",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: "#c8e6c9" }}></div>
            <span style={{ color: "#81c784", fontSize: "12px", fontWeight: "500" }}>or</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#c8e6c9" }}></div>
          </div>

          <button
            onClick={handleGuestLogin}
            type="button"
            style={{
              width: "100%",
              backgroundColor: "#f1f8f4",
              color: "#374151",
              padding: "11px",
              border: "1px solid #c8e6c9",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Continue as Guest
          </button>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <p style={{ color: "#6b7280", fontSize: "13px" }}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#2e7d32",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
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
