import { useState } from 'react'
import SystemHealthCard from '../../components/SystemHealthCard'
import UsersTable from '../../components/UsersTable'

function ICTManagerDashboard({ currentPage, setCurrentPage }) {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Kipchoge', email: 'john@grrc.com', role: 'CEO', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Sarah Mwangi', email: 'sarah@grrc.com', role: 'Operations Manager', status: 'Active', lastLogin: '1 hour ago' },
    { id: 3, name: 'Peter Koech', email: 'peter@grrc.com', role: 'Agronomist', status: 'Active', lastLogin: '30 mins ago' },
    { id: 4, name: 'Grace Kiplagat', email: 'grace@grrc.com', role: 'Supervisor', status: 'Inactive', lastLogin: '2 days ago' },
    { id: 5, name: 'David Mwango', email: 'david@grrc.com', role: 'Farm Worker', status: 'Active', lastLogin: '1 hour ago' },
  ])

  const [systemMetrics] = useState({
    uptime: '99.8%',
    activeUsers: 28,
    lastBackup: '2 hours ago',
    diskUsage: '65%',
    cpuLoad: '32%',
    networkStatus: 'Healthy',
    apiResponseTime: '120ms',
    databaseStatus: 'Operational',
  })

  const healthCards = [
    { label: 'System Uptime', value: systemMetrics.uptime, icon: '✓', status: 'healthy' },
    { label: 'Active Users', value: systemMetrics.activeUsers, icon: '👥', status: 'healthy' },
    { label: 'Last Backup', value: systemMetrics.lastBackup, icon: '💾', status: 'healthy' },
    { label: 'Disk Usage', value: systemMetrics.diskUsage, icon: '💿', status: 'warning' },
    { label: 'CPU Load', value: systemMetrics.cpuLoad, icon: '⚙️', status: 'healthy' },
    { label: 'API Response', value: systemMetrics.apiResponseTime, icon: '⚡', status: 'healthy' },
  ]

  if (currentPage !== 'dashboard') {
    if (currentPage === 'users') {
      return <UsersTable users={users} setUsers={setUsers} />
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">ICT Manager Dashboard</h1>
        <p className="text-gray-600">System monitoring, performance metrics, and infrastructure management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {healthCards.map((card, idx) => (
          <SystemHealthCard key={idx} {...card} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">System Status</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="font-medium text-gray-700">Network Status:</span>
            <span className="bg-green-100 text-success px-3 py-1 rounded-full text-sm font-semibold">{systemMetrics.networkStatus}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="font-medium text-gray-700">Database Status:</span>
            <span className="bg-green-100 text-success px-3 py-1 rounded-full text-sm font-semibold">{systemMetrics.databaseStatus}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Last System Check:</span>
            <span className="text-gray-600">5 minutes ago</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Active Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Role</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-900">{user.name}</td>
                  <td className="px-6 py-3 text-gray-600">{user.email}</td>
                  <td className="px-6 py-3 text-gray-600">{user.role}</td>
                  <td className="px-6 py-3">
                    <span className={`${user.status === 'Active' ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'} px-3 py-1 rounded-full text-xs font-semibold`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ICTManagerDashboard
