import { useState } from 'react'
import KPICard from '../../components/KPICard'
import ChartComponent from '../../components/ChartComponent'
import FarmsTable from '../../components/FarmsTable'
import ProductionTable from '../../components/ProductionTable'

function CEODashboard({ currentPage, setCurrentPage }) {
  const [farms, setFarms] = useState([
    { id: 1, name: 'Rift Valley Farm', location: 'Nakuru', acres: 250, status: 'Active', workers: 45 },
    { id: 2, name: 'Mount Kenya Estate', location: 'Murang\'a', acres: 180, status: 'Active', workers: 32 },
    { id: 3, name: 'Central Highlands', location: 'Kiambu', acres: 320, status: 'Active', workers: 58 },
    { id: 4, name: 'Nyambene Range', location: 'Meru', acres: 210, status: 'Active', workers: 38 },
  ])

  const [production, setProduction] = useState([
    { id: 1, farmName: 'Rift Valley Farm', month: 'October', bags: 650, quality: 'Grade A', revenue: 'KSH 325,000' },
    { id: 2, farmName: 'Mount Kenya Estate', month: 'October', bags: 480, quality: 'Grade A', revenue: 'KSH 240,000' },
    { id: 3, farmName: 'Central Highlands', month: 'October', bags: 720, quality: 'Grade A+', revenue: 'KSH 360,000' },
    { id: 4, farmName: 'Nyambene Range', month: 'October', bags: 600, quality: 'Grade A', revenue: 'KSH 300,000' },
  ])

  const kpis = [
    { label: 'Total Production', value: '2,450 bags', change: '+12%', trend: 'up' },
    { label: 'Monthly Revenue', value: 'KSH 1,225,000', change: '+8%', trend: 'up' },
    { label: 'Active Farms', value: '18', change: '+2', trend: 'up' },
    { label: 'Workforce', value: '245', change: '+5%', trend: 'up' },
  ]

  if (currentPage !== 'dashboard') {
    if (currentPage === 'farms') {
      return <FarmsTable farms={farms} setFarms={setFarms} />
    }
    if (currentPage === 'production') {
      return <ProductionTable production={production} setProduction={setProduction} />
    }
    return null
  }

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
          data={[
            { name: 'Rift Valley', value: 32500 },
            { name: 'Mt Kenya', value: 24000 },
            { name: 'C. Highlands', value: 36000 },
            { name: 'Nyambene', value: 30000 },
          ]}
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
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Acres</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Workers</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {farms.slice(0, 4).map(farm => (
                <tr key={farm.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-900">{farm.name}</td>
                  <td className="px-6 py-3 text-gray-600">{farm.location}</td>
                  <td className="px-6 py-3 text-gray-600">{farm.acres}</td>
                  <td className="px-6 py-3 text-gray-600">{farm.workers}</td>
                  <td className="px-6 py-3"><span className="bg-green-100 text-success px-3 py-1 rounded-full text-xs font-semibold">{farm.status}</span></td>
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
