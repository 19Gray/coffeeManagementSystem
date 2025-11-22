"use client"

import { useState, useContext } from "react"
import AuthContext from "../context/AuthContext"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import CEODashboard from "../pages/dashboards/CEODashboard"
import ICTManagerDashboard from "../pages/dashboards/ICTManagerDashboard"
import OperationsManagerDashboard from "../pages/dashboards/OperationsManagerDashboard"
import AgronomistDashboard from "../pages/dashboards/AgronomistDashboard"
import SupervisorDashboard from "../pages/dashboards/SupervisorDashboard"
import FarmWorkerDashboard from "../pages/dashboards/FarmWorkerDashboard"
import GuestDashboard from "../pages/dashboards/GuestDashboard"
import InventoryPage from "../pages/InventoryPage"
import AnalyticsPage from "../pages/AnalyticsPage"
import ReportsPage from "../pages/ReportsPage"
import DashboardMetricsPage from "../pages/DashboardMetricsPage"
import SettingsPage from "../pages/SettingsPage"
import { getPermittedMenuItems } from "../config/permissions"

function DashboardLayout() {
  const { user, loading, logout } = useContext(AuthContext)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState("dashboard")

  const normalizeRole = (role) => {
    if (!role) return "guest"
    return role.replace(/-/g, "_")
  }

  const normalizedRole = normalizeRole(user?.role)

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-light">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Not Authenticated</h2>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    )
  }

  const userPermissions = getPermittedMenuItems(normalizedRole)
  const hasAccess = userPermissions.includes(currentPage)

  if (!hasAccess) {
    return (
      <div className="flex h-screen items-center justify-center bg-light">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
          <button
            onClick={() => setCurrentPage(userPermissions[0] || "dashboard")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const getDashboard = () => {
    switch (currentPage) {
      case "inventory":
        return <InventoryPage />
      case "analytics":
        return <AnalyticsPage />
      case "reports":
        return <ReportsPage />
      case "users":
        return <DashboardMetricsPage />
      case "settings":
        return <SettingsPage />
      default:
        break
    }

    switch (normalizedRole) {
      case "ceo":
        return <CEODashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case "ict_manager":
        return <ICTManagerDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case "operations_manager":
        return <OperationsManagerDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case "agronomist":
        return <AgronomistDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case "supervisor":
        return <SupervisorDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case "farm_worker":
        return <FarmWorkerDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case "guest":
        return <GuestDashboard />
      default:
        return <div>Dashboard not available for role: {normalizedRole}</div>
    }
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#e8f5e9" }}>
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} onLogout={logout} />
        <main className="flex-1 overflow-auto p-6" style={{ backgroundColor: "#e8f5e9" }}>
          {getDashboard()}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
