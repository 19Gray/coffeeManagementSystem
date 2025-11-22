"use client"

import { useContext } from "react"
import { FiMenu, FiLogOut } from "react-icons/fi"
import AuthContext from "../context/AuthContext"

function Header({ onSidebarToggle }) {
  const { user, setUser } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <header className="bg-white border-b shadow-sm" style={{ borderColor: "#c8e6c9" }}>
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="text-xl transition-colors p-2 hover:bg-green-50 rounded-lg"
            style={{ color: "#2e7d32" }}
          >
            <FiMenu size={24} />
          </button>
          <div className="flex items-center gap-3 hidden sm:flex">
            <img src="/great-rift-logo.png" alt="Great Rift Coffee" className="h-10 w-auto" />
            <h2 className="text-lg font-semibold" style={{ color: "#2e7d32" }}>
              Great Rift Coffee
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="block text-xs font-semibold uppercase" style={{ color: "#2e7d32" }}>
              {user?.role?.replace(/[-_]/g, " ")}
            </span>
            <span className="block text-sm text-gray-600">{user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FiLogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
