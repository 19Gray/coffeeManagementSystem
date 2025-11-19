import { useState } from 'react'
import StatsOverview from '../../components/StatsOverview'
import DashboardChart from '../../components/DashboardChart'
import EnhancedDataTable from '../../components/EnhancedDataTable'

function AgronomistDashboard({ currentPage, setCurrentPage }) {
  const [cropHealth, setCropHealth] = useState([
    { id: 1, farm: 'Rift Valley Farm', variety: 'Bourbon', healthScore: 92, leafSpot: 'Low', pests: 'None', lastAssessment: '2024-11-15' },
    { id: 2, farm: 'Mount Kenya Estate', variety: 'Kent', healthScore: 88, leafSpot: 'Moderate', pests: 'Minor', lastAssessment: '2024-11-14' },
    { id: 3, farm: 'Central Highlands', variety: 'SL28', healthScore: 95, leafSpot: 'None', pests: 'None', lastAssessment: '2024-11-15' },
    { id: 4, farm: 'Nyambene Range', variety: 'Typica', healthScore: 85, leafSpot: 'Moderate', pests: 'Minor', lastAssessment: '2024-11-13' },
  ])

  const kpis = [
    { label: 'Avg Health Score', value: '90%', change: '+2%', trend: 'up' },
    { label: 'Monitored Crops', value: '18 farms', change: '0', trend: 'up' },
    { label: 'Critical Alerts', value: '2', change: '-1', trend: 'down' },
    { label: 'Assessment Rate', value: '100%', change: '0', trend: 'up' },
  ]

  if (currentPage !== 'dashboard') {
    if (currentPage === 'farms') {
      const cropData = cropHealth.map(c => ({
        farm: c.farm,
        variety: c.variety,
        score: `${c.healthScore}%`,
        leafSpot: c.leafSpot,
        pests: c.pests,
      }))
      return <EnhancedDataTable title="Crop Health" headers={['Farm', 'Variety', 'Health Score', 'Leaf Spot', 'Pests']} data={cropData} />
    }
    return null
  }

  const healthScoreData = [
    { farm: 'Rift Valley', value: 92 },
    { farm: 'Mt Kenya', value: 88 },
    { farm: 'C. Highland', value: 95 },
    { farm: 'Nyambene', value: 85 },
  ]

  const pestDistributionData = [
    { pest: 'None', value: 10 },
    { pest: 'Minor', value: 6 },
    { pest: 'Moderate', value: 2 },
  ]

  const cropTableData = cropHealth.map(crop => ({
    farm: crop.farm,
    variety: crop.variety,
    score: `${crop.healthScore}%`,
    leafSpot: crop.leafSpot,
    pests: crop.pests,
    date: crop.lastAssessment,
  }))

  return (
    <div className="space-y-6">
      <div className="dashboard-header">
        <h1>Agronomist Dashboard</h1>
        <p>Crop health monitoring and agricultural analytics</p>
      </div>

      <StatsOverview stats={kpis} />

      <div className="grid-charts">
        <DashboardChart title="Average Health Score by Farm" data={healthScoreData} />
        <DashboardChart title="Pest Distribution" data={pestDistributionData} />
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Active Alerts</h3>
        <div className="space-y-3">
          <div className="border-l-4 border-danger bg-danger/10 p-4 rounded-lg">
            <div className="flex items-start gap-4">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-100">High Pest Activity - Mount Kenya Estate</h4>
                <p className="text-sm text-slate-400 mt-1">Moderate pest infestation detected. Recommend immediate intervention.</p>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">Today</span>
            </div>
          </div>
          <div className="border-l-4 border-warning bg-warning/10 p-4 rounded-lg">
            <div className="flex items-start gap-4">
              <span className="text-2xl">!</span>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-100">Leaf Spot Disease - Nyambene Range</h4>
                <p className="text-sm text-slate-400 mt-1">Moderate leaf spot detected. Monitor and consider fungicide treatment.</p>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">Yesterday</span>
            </div>
          </div>
        </div>
      </div>

      <EnhancedDataTable 
        title="Crop Health Status" 
        headers={['Farm', 'Variety', 'Health Score', 'Leaf Spot', 'Pests', 'Last Assessment']} 
        data={cropTableData}
      />
    </div>
  )
}

export default AgronomistDashboard
