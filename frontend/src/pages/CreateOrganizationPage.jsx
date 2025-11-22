"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { organizationAPI } from "../services/api"
import { showToast } from "../utils/toastConfig"

function CreateOrganizationPage() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await organizationAPI.create(formData)
      if (response.data && response.data.success) {
        showToast.success("Organization created successfully!")
        navigate("/dashboard")
      }
    } catch (err) {
      showToast.error(err.message || "Failed to create organization")
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
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "40px 32px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div style={{ marginBottom: "28px" }}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#2e7d32",
              }}
            >
              Create Organization
            </h1>
            <p style={{ color: "#558b5a", fontSize: "14px" }}>Set up your coffee farm organization</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#374151",
                }}
                htmlFor="name"
              >
                Organization Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Great Rift Coffee Farm"
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
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#374151",
                }}
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell us about your organization"
                rows="3"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #c8e6c9",
                  borderRadius: "6px",
                  fontSize: "13px",
                  boxSizing: "border-box",
                  backgroundColor: "#f1f8f4",
                  color: "#1f2937",
                  resize: "vertical",
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
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Farm location"
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
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#374151",
                }}
                htmlFor="contactEmail"
              >
                Contact Email *
              </label>
              <input
                id="contactEmail"
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="contact@farm.com"
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
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#374151",
                }}
                htmlFor="contactPhone"
              >
                Contact Phone
              </label>
              <input
                id="contactPhone"
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="+254..."
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

            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                style={{
                  flex: 1,
                  backgroundColor: "#f1f8f4",
                  color: "#2e7d32",
                  padding: "11px",
                  border: "1px solid #c8e6c9",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  backgroundColor: "#2e7d32",
                  color: "#ffffff",
                  padding: "11px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Creating..." : "Create Organization"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateOrganizationPage
