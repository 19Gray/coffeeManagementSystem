function SystemHealthCard({ label, value, icon, status }) {
  const statusColor = status === 'healthy' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
  const statusTextColor = status === 'healthy' ? 'text-success' : 'text-warning'
  const statusBadge = status === 'healthy' ? 'bg-green-100 text-success' : 'bg-yellow-100 text-warning'

  return (
    <div className={`bg-white rounded-lg shadow-md border ${statusColor} p-6 hover:shadow-lg transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className={`${statusBadge} text-xs font-semibold px-2 py-1 rounded-full`}>
          {status === 'healthy' ? 'Operational' : 'Warning'}
        </span>
      </div>
      <h4 className="text-sm font-medium text-gray-600 mb-2">{label}</h4>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  )
}

export default SystemHealthCard
