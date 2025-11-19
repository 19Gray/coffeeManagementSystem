function DashboardKPICard({ label, value, change, trend, icon: Icon }) {
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-slate-400'
  const trendBg = trend === 'up' ? 'bg-success/20' : trend === 'down' ? 'bg-danger/20' : 'bg-slate-700/50'

  return (
    <div className="kpi-card group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="kpi-card-label">{label}</p>
          <div className="kpi-card-value mt-2">{value}</div>
        </div>
        {Icon && (
          <div className="p-3 bg-coffee-brown/20 rounded-lg group-hover:bg-coffee-brown/30 transition-colors">
            <Icon className="w-6 h-6 text-coffee-gold" />
          </div>
        )}
      </div>
      {change && (
        <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor}`}>
          <span className={`px-2 py-1 rounded ${trendBg}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {change}
          </span>
        </div>
      )}
    </div>
  )
}

export default DashboardKPICard
