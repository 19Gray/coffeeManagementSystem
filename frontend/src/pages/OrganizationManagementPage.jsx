"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { organizationAPI, inviteAPI } from "../services/api"
import { showToast } from "../utils/toastConfig"

function OrganizationManagementPage() {
  const navigate = useNavigate()
  const { user, currentOrganization } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(false)
  const [members, setMembers] = useState([])
  const [invites, setInvites] = useState([])
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "farm_worker",
  })

  useEffect(() => {
    if (currentOrganization) {
      loadMembers()
      loadInvites()
    }
  }, [currentOrganization])

  const loadMembers = async () => {
    try {
      const response = await organizationAPI.getMembers(currentOrganization._id)
      if (response.data) {
        setMembers(response.data)
      }
    } catch (err) {
      console.error("Failed to load members:", err)
    }
  }

  const loadInvites = async () => {
    try {
      const response = await inviteAPI.getByOrganization(currentOrganization._id)
      if (response.data) {
        setInvites(response.data)
      }
    } catch (err) {
      console.error("Failed to load invites:", err)
    }
  }

  const handleInvite = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await inviteAPI.create({
        organizationId: currentOrganization._id,
        ...inviteData,
      })
      if (response.data && response.data.success) {
        showToast.success("Invite sent successfully!")
        setShowInviteForm(false)
        setInviteData({ email: "", role: "farm_worker" })
        loadInvites()
      }
    } catch (err) {
      showToast.error(err.message || "Failed to send invite")
    } finally {
      setLoading(false)
    }
  }

  const handleResendInvite = async (inviteId) => {
    try {
      await inviteAPI.resend(inviteId)
      showToast.success("Invite resent successfully!")
    } catch (err) {
      showToast.error(err.message || "Failed to resend invite")
    }
  }

  const handleRevokeInvite = async (inviteId) => {
    if (!confirm("Are you sure you want to revoke this invite?")) return

    try {
      await inviteAPI.revoke(inviteId)
      showToast.success("Invite revoked successfully!")
      loadInvites()
    } catch (err) {
      showToast.error(err.message || "Failed to revoke invite")
    }
  }

  if (!currentOrganization) {
    return (
      <div style={{ padding: "24px" }}>
        <p>No organization selected</p>
      </div>
    )
  }

  return (
    <div style={{ padding: "24px", backgroundColor: "#e8f5e9", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#2e7d32", marginBottom: "8px" }}>
            Organization Management
          </h1>
          <p style={{ color: "#558b5a", fontSize: "14px" }}>{currentOrganization.name}</p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", borderBottom: "2px solid #c8e6c9" }}>
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              padding: "12px 20px",
              backgroundColor: "transparent",
              border: "none",
              borderBottom: activeTab === "overview" ? "2px solid #2e7d32" : "2px solid transparent",
              color: activeTab === "overview" ? "#2e7d32" : "#6b7280",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "-2px",
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("members")}
            style={{
              padding: "12px 20px",
              backgroundColor: "transparent",
              border: "none",
              borderBottom: activeTab === "members" ? "2px solid #2e7d32" : "2px solid transparent",
              color: activeTab === "members" ? "#2e7d32" : "#6b7280",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "-2px",
            }}
          >
            Members
          </button>
          <button
            onClick={() => setActiveTab("invites")}
            style={{
              padding: "12px 20px",
              backgroundColor: "transparent",
              border: "none",
              borderBottom: activeTab === "invites" ? "2px solid #2e7d32" : "2px solid transparent",
              color: activeTab === "invites" ? "#2e7d32" : "#6b7280",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "-2px",
            }}
          >
            Invites
          </button>
        </div>

        {activeTab === "overview" && (
          <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#2e7d32", marginBottom: "16px" }}>
              Organization Details
            </h2>
            <div style={{ display: "grid", gap: "12px" }}>
              <div>
                <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>Name:</span>
                <p style={{ fontSize: "14px", color: "#1f2937", marginTop: "4px" }}>{currentOrganization.name}</p>
              </div>
              <div>
                <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>Status:</span>
                <p style={{ fontSize: "14px", color: "#1f2937", marginTop: "4px" }}>{currentOrganization.status}</p>
              </div>
              <div>
                <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>Contact Email:</span>
                <p style={{ fontSize: "14px", color: "#1f2937", marginTop: "4px" }}>
                  {currentOrganization.contactEmail}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "members" && (
          <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#2e7d32" }}>Members</h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: "#6b7280" }}>Name</th>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: "#6b7280" }}>Email</th>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: "#6b7280" }}>Role</th>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: "#6b7280" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "12px 8px" }}>{member.name}</td>
                      <td style={{ padding: "12px 8px" }}>{member.email}</td>
                      <td style={{ padding: "12px 8px" }}>{member.role}</td>
                      <td style={{ padding: "12px 8px" }}>{member.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "invites" && (
          <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#2e7d32" }}>Pending Invites</h2>
              <button
                onClick={() => setShowInviteForm(!showInviteForm)}
                style={{
                  backgroundColor: "#2e7d32",
                  color: "#ffffff",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {showInviteForm ? "Cancel" : "+ Send Invite"}
              </button>
            </div>

            {showInviteForm && (
              <form
                onSubmit={handleInvite}
                style={{ marginBottom: "24px", padding: "16px", backgroundColor: "#f1f8f4", borderRadius: "8px" }}
              >
                <div style={{ display: "grid", gap: "12px" }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "500",
                        marginBottom: "6px",
                        color: "#374151",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={inviteData.email}
                      onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                      required
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #c8e6c9",
                        borderRadius: "6px",
                        fontSize: "13px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "500",
                        marginBottom: "6px",
                        color: "#374151",
                      }}
                    >
                      Role
                    </label>
                    <select
                      value={inviteData.role}
                      onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #c8e6c9",
                        borderRadius: "6px",
                        fontSize: "13px",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="farm_worker">Farm Worker</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="agronomist">Agronomist</option>
                      <option value="operations_manager">Operations Manager</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "#2e7d32",
                      color: "#ffffff",
                      padding: "10px",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.6 : 1,
                    }}
                  >
                    {loading ? "Sending..." : "Send Invite"}
                  </button>
                </div>
              </form>
            )}

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: "#6b7280" }}>Email</th>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: "#6b7280" }}>Role</th>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: "#6b7280" }}>Status</th>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: "#6b7280" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invites.map((invite) => (
                    <tr key={invite._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "12px 8px" }}>{invite.email}</td>
                      <td style={{ padding: "12px 8px" }}>{invite.role}</td>
                      <td style={{ padding: "12px 8px" }}>{invite.status}</td>
                      <td style={{ padding: "12px 8px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          {invite.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleResendInvite(invite._id)}
                                style={{
                                  padding: "4px 8px",
                                  backgroundColor: "#f1f8f4",
                                  border: "1px solid #c8e6c9",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  cursor: "pointer",
                                }}
                              >
                                Resend
                              </button>
                              <button
                                onClick={() => handleRevokeInvite(invite._id)}
                                style={{
                                  padding: "4px 8px",
                                  backgroundColor: "#fee2e2",
                                  border: "1px solid #fecaca",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  cursor: "pointer",
                                  color: "#991b1b",
                                }}
                              >
                                Revoke
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrganizationManagementPage
