import { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import CEODashboard from '../pages/dashboards/CEODashboard'
import ICTManagerDashboard from '../pages/dashboards/ICTManagerDashboard'
import OperationsManagerDashboard from '../pages/dashboards/OperationsManagerDashboard'
import AgronomistDashboard from '../pages/dashboards/AgronomistDashboard'
import SupervisorDashboard from '../pages/dashboards/SupervisorDashboard'
import FarmWorkerDashboard from '../pages/dashboards/FarmWorkerDashboard'
import GuestDashboard from '../pages/dashboards/GuestDashboard'
import InventoryPage from '../pages/InventoryPage'
import AnalyticsPage from '../pages/AnalyticsPage'
import ReportsPage from '../pages/ReportsPage'
import DashboardMetricsPage from '../pages/DashboardMetricsPage'
import SettingsPage from '../pages/SettingsPage'

function DashboardLayout() {
  const { user } = useContext(AuthContext)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const getDashboard = () => {
    switch (currentPage) {
      case 'inventory':
        return <InventoryPage />
      case 'analytics':
        return <AnalyticsPage />
      case 'reports':
        return <ReportsPage />
      case 'users':
        return <DashboardMetricsPage />
      case 'settings':
        return <SettingsPage />
      default:
        break
    }

    switch (user?.role) {
      case 'ceo':
        return <CEODashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'ict_manager':
        return <ICTManagerDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'operations_manager':
        return <OperationsManagerDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'agronomist':
        return <AgronomistDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'supervisor':
        return <SupervisorDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'farm_worker':
        return <FarmWorkerDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'guest':
        return <GuestDashboard />
      default:
        return <div>Dashboard not available</div>
    }
  }

  return (
    <div className="flex h-screen bg-light">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto p-6 bg-light">{getDashboard()}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
