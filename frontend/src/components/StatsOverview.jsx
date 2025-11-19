import { FiTrendingUp, FiActivity, FiBarChart2, FiUsers } from 'react-icons/fi'

function StatsOverview({ stats }) {
  const icons = [FiTrendingUp, FiActivity, FiBarChart2, FiUsers]

  return (
    <div className="grid-kpis mb-8">
      {stats.map((stat, idx) => {
        const Icon = icons[idx % icons.length]
        return (
          <div key={idx} className="kpi-card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="kpi-card-label">{stat.label}</p>
                <div className="kpi-card-value mt-3">{stat.value}</div>
                {stat.change && (
                  <p className={`text-sm mt-2 font-semibold ${stat.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                    {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                  </p>
                )}
              </div>
              <div className="p-3 bg-coffee-brown/20 rounded-lg">
                <Icon className="w-6 h-6 text-coffee-gold" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsOverview
