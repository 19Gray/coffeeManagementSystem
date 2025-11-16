import KPICard from '../../components/KPICard'
import ChartComponent from '../../components/ChartComponent'
import FarmsTable from '../../components/FarmsTable'
import ProductionTable from '../../components/ProductionTable'
import { useFarms } from '../../hooks/useFarms'
import { useProduction } from '../../hooks/useProduction'

function CEODashboard({ currentPage, setCurrentPage }) {
  const { farms, loading: farmsLoading } = useFarms()
  const { production, loading: prodLoading } = useProduction()

  // Calculate KPIs from real data
  const calculateKPIs = () => {
    const totalProduction = production.reduce((sum, p) => sum + (p.quantity || 0), 0)
    const avgQuality = production.length > 0 ? production.length : 0
    const activeFarms = farms.filter(f => f.status === 'Active').length
    const totalWorkers = farms.reduce((sum, f) => sum + (f.workers || 0), 0)

    return [
      { label: 'Total Production', value: `${totalProduction} bags`, change: '+12%', trend: 'up' },
      { label: 'Monthly Revenue', value: 'KSH 1,225,000', change: '+8%', trend: 'up' },
      { label: 'Active Farms', value: activeFarms.toString(), change: '+2', trend: 'up' },
      { label: 'Workforce', value: totalWorkers.toString(), change: '+5%', trend: 'up' },
    ]
  }

  const loading = farmsLoading || prodLoading

  if (currentPage !== 'dashboard') {
    if (currentPage === 'farms') {
      return <FarmsTable farms={farms} />
    }
    if (currentPage === 'production') {
      return <ProductionTable production={production} />
    }
    return null
  }

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>
  }

  const kpis = calculateKPIs()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Executive Dashboard</h1>
        <p className="text-gray-600">Comprehensive overview of all coffee operations and business metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartComponent
          title="Production Trend (Last 4 Months)"
          data={[
            { month: 'July', value: 2100 },
            { month: 'August', value: 2250 },
            { month: 'September', value: 2300 },
            { month: 'October', value: 2450 },
          ]}
        />
        <ChartComponent
          title="Revenue by Farm"
          data={farms.slice(0, 4).map(farm => ({
            name: farm.name,
            value: farm.totalProduction || 0,
          }))}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Recent Farms</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Farm Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Location</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Area</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {farms.slice(0, 4).map(farm => (
                <tr key={farm.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-900">{farm.name}</td>
                  <td className="px-6 py-3 text-gray-600">{farm.location}</td>
                  <td className="px-6 py-3 text-gray-600">{farm.area}</td>
                  <td className="px-6 py-3"><span className="bg-green-100 text-success px-3 py-1 rounded-full text-xs font-semibold">{farm.status || 'Active'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CEODashboard
