"use client"

import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"

function OrganizationSwitcher() {
  const { currentOrganization, organizations, switchOrganization } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)

  if (!organizations || organizations.length <= 1) {
    return null
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px",
          backgroundColor: "#f1f8f4",
          border: "1px solid #c8e6c9",
          borderRadius: "6px",
          fontSize: "13px",
          color: "#1f2937",
          cursor: "pointer",
        }}
      >
        <span style={{ fontWeight: "500" }}>{currentOrganization?.name || "Select Organization"}</span>
        <span style={{ fontSize: "10px" }}>▼</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            backgroundColor: "#ffffff",
            border: "1px solid #c8e6c9",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 50,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {organizations.map((org) => (
            <button
              key={org._id}
              onClick={() => {
                switchOrganization(org)
                setIsOpen(false)
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                textAlign: "left",
                border: "none",
                backgroundColor: currentOrganization?._id === org._id ? "#e8f5e9" : "transparent",
                color: "#1f2937",
                fontSize: "13px",
                cursor: "pointer",
                borderBottom: "1px solid #f1f8f4",
              }}
            >
              <div style={{ fontWeight: "500" }}>{org.name}</div>
              <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>{org.status}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrganizationSwitcher
