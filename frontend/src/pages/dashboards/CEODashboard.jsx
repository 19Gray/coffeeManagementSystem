import KPICard from '../../components/KPICard'
import ChartComponent from '../../components/ChartComponent'
import FarmsTable from '../../components/FarmsTable'
import ProductionTable from '../../components/ProductionTable'
import { useFarms } from '../../hooks/useFarms'
import { useProduction } from '../../hooks/useProduction'
import StatsOverview from '../../components/StatsOverview'
import DashboardChart from '../../components/DashboardChart'
import EnhancedDataTable from '../../components/EnhancedDataTable'
import { FiFilter, FiDownload } from 'react-icons/fi'

function CEODashboard({ currentPage, setCurrentPage }) {
  const { farms, loading: farmsLoading } = useFarms()
  const { production, loading: prodLoading } = useProduction()

  const calculateKPIs = () => {
    const totalProduction = production.reduce((sum, p) => sum + (p.quantity || 0), 0)
    const activeFarms = farms.filter(f => f.status === 'active').length
    const totalRevenue = farms.reduce((sum, f) => sum + (f.totalProduction * 850 || 0), 0)
    const avgQuality = (Math.random() * 2 + 8).toFixed(1)

    return [
      { label: 'Total Production', value: `${totalProduction} bags`, change: '+12%', trend: 'up' },
      { label: 'Monthly Revenue', value: `KSH ${(totalRevenue / 1000).toFixed(1)}K`, change: '+8%', trend: 'up' },
      { label: 'Active Farms', value: activeFarms.toString(), change: '+2', trend: 'up' },
      { label: 'Quality Index', value: `${avgQuality}/10`, change: '+0.5', trend: 'up' },
    ]
  }

  const loading = farmsLoading || prodLoading

  if (currentPage !== 'dashboard') {
    if (currentPage === 'farms') {
      return <EnhancedDataTable title="Farm Management" headers={['Farm', 'Location', 'Area (ha)', 'Status']} data={farms.map(f => ({ farm: f.name, location: f.location, area: f.area, status: f.status }))} />
    }
    if (currentPage === 'production') {
      return <EnhancedDataTable title="Production Records" headers={['Date', 'Farm', 'Quantity', 'Quality']} data={production.map(p => ({ date: new Date(p.date).toLocaleDateString(), farm: p.farm, quantity: p.quantity, quality: p.quality }))} />
    }
    return null
  }

  if (loading) {
    return <div className="loading-spinner">Loading dashboard...</div>
  }

  const kpis = calculateKPIs()
  const productionData = [
    { month: 'July', value: 2100 },
    { month: 'August', value: 2250 },
    { month: 'September', value: 2300 },
    { month: 'October', value: 2450 },
  ]
  const farmData = farms.slice(0, 5).map(f => ({ farm: f.name, location: f.location, area: `${f.area} ha`, status: f.status }))

  return (
    <div className="space-y-6">
      <div className="dashboard-header">
        <h1 className="text-3xl font-bold text-primary mb-2">Executive Dashboard</h1>
        <p className="text-gray-600">Comprehensive overview of all coffee operations and business metrics</p>
      </div>

      <StatsOverview stats={kpis} />

      <div className="grid-charts">
        <DashboardChart title="Production Trend (Last 4 Months)" data={productionData} />
        <DashboardChart title="Revenue by Farm" data={farms.slice(0, 4).map(f => ({ name: f.name, value: f.totalProduction || Math.random() * 5000 }))} />
      </div>

      <EnhancedDataTable 
        title="Top Performing Farms" 
        headers={['Farm Name', 'Location', 'Area (ha)', 'Status']} 
        data={farmData}
        actions={
          <div className="flex gap-2">
            <button className="btn-secondary flex items-center gap-2"><FiFilter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary flex items-center gap-2"><FiDownload className="w-4 h-4" /> Export</button>
          </div>
        }
      />
    </div>
  )
}

export default CEODashboard
