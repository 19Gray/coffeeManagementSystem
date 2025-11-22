"use client"

import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import {
  FiBarChart2,
  FiGitBranch,
  FiBox,
  FiClipboard,
  FiTrendingUp,
  FiFileText,
  FiUsers,
  FiSettings,
} from "react-icons/fi"
import { getPermittedMenuItems } from "../config/permissions"

function Sidebar({ isOpen, onToggle, currentPage, onPageChange }) {
  const { user } = useContext(AuthContext)

  const allMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: FiBarChart2 },
    { id: "farms", label: "Farms", icon: FiGitBranch },
    { id: "production", label: "Production", icon: FiBox },
    { id: "inventory", label: "Inventory", icon: FiClipboard },
    { id: "analytics", label: "Analytics", icon: FiTrendingUp },
    { id: "reports", label: "Reports", icon: FiFileText },
    { id: "users", label: "Users", icon: FiUsers },
    { id: "settings", label: "Settings", icon: FiSettings },
  ]

  const permittedItems = allMenuItems.filter((item) => {
    const permitted = getPermittedMenuItems(user?.role || "guest")
    return permitted.includes(item.id)
  })

  return (
    <aside
      className={`${isOpen ? "w-64" : "w-20"} transition-all duration-300 shadow-lg overflow-y-auto`}
      style={{ backgroundColor: "#2e7d32", color: "#ffffff" }}
    >
      <nav className="space-y-2 p-4">
        {permittedItems.map((item) => {
          const IconComponent = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id ? "text-white" : "text-white hover:bg-white/10"
              }`}
              style={currentPage === item.id ? { backgroundColor: "#1b5e20" } : {}}
            >
              <IconComponent className="text-xl flex-shrink-0" />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
