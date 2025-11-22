"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { inviteAPI } from "../services/api"
import { showToast } from "../utils/toastConfig"

function InviteAcceptPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const [loading, setLoading] = useState(false)
  const [inviteData, setInviteData] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      setError("Invalid invite link")
    }
  }, [token])

  const handleAccept = async () => {
    if (!token) return

    setLoading(true)
    try {
      const response = await inviteAPI.accept(token)
      if (response.data && response.data.success) {
        showToast.success("Invite accepted! Please log in to continue.")
        setTimeout(() => navigate("/login"), 2000)
      }
    } catch (err) {
      setError(err.message || "Failed to accept invite")
      showToast.error(err.message || "Failed to accept invite")
    } finally {
      setLoading(false)
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
        padding: "32px 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "40px 32px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📧</div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "12px",
              color: "#2e7d32",
            }}
          >
            Organization Invite
          </h1>

          {error ? (
            <div>
              <p style={{ color: "#dc2626", marginBottom: "20px", fontSize: "14px" }}>{error}</p>
              <button
                onClick={() => navigate("/login")}
                style={{
                  backgroundColor: "#2e7d32",
                  color: "#ffffff",
                  padding: "11px 24px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Go to Login
              </button>
            </div>
          ) : (
            <div>
              <p style={{ color: "#6b7280", marginBottom: "24px", fontSize: "14px" }}>
                You've been invited to join an organization. Click below to accept the invitation.
              </p>
              <button
                onClick={handleAccept}
                disabled={loading}
                style={{
                  backgroundColor: "#2e7d32",
                  color: "#ffffff",
                  padding: "11px 32px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Accepting..." : "Accept Invite"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InviteAcceptPage
