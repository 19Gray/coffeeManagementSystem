function KPICard({ label, value, change, trend }) {
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-gray-500'
  const bgColor = trend === 'up' ? 'bg-green-50' : trend === 'down' ? 'bg-red-50' : 'bg-gray-50'

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-600">{label}</h3>
        <span className={`${bgColor} ${trendColor} text-xs font-semibold px-2 py-1 rounded`}>
          {change}
        </span>
      </div>
      <div className="text-3xl font-bold text-primary">{value}</div>
    </div>
  )
}

export default KPICard
