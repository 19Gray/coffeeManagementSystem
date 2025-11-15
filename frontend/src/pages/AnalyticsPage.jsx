import { useState } from 'react'
import ChartComponent from '../components/ChartComponent'

function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('month')

  const analyticsData = {
    productionTrend: [
      { month: 'July', value: 2100, bags: 2100, revenue: 105000 },
      { month: 'August', value: 2250, bags: 2250, revenue: 112500 },
      { month: 'September', value: 2300, bags: 2300, revenue: 115000 },
      { month: 'October', value: 2450, bags: 2450, revenue: 122500 },
    ],
    farmPerformance: [
      { farm: 'Rift Valley', value: 32500 },
      { farm: 'Mt Kenya', value: 24000 },
      { farm: 'C. Highland', value: 36000 },
      { farm: 'Nyambene', value: 30000 },
    ],
    workerProductivity: [
      { worker: 'Peter', value: 98 },
      { worker: 'David', value: 92 },
      { worker: 'Jane', value: 88 },
      { worker: 'Grace', value: 85 },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Analytics & Insights</h1>
        <select 
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Production Trend</h2>
          <ChartComponent
            title=""
            data={analyticsData.productionTrend.map(d => ({
              month: d.month,
              value: d.bags,
            }))}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Revenue by Farm</h2>
          <ChartComponent
            title=""
            data={analyticsData.farmPerformance}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Worker Productivity</h2>
          <ChartComponent
            title=""
            data={analyticsData.workerProductivity}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-6">
        <h2 className="text-2xl font-bold text-primary">Key Metrics Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Total Production</h4>
            <p className="text-2xl font-bold text-primary mb-1">9,100 bags</p>
            <p className="text-xs text-success font-semibold">+8.5% from last period</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h4>
            <p className="text-2xl font-bold text-primary mb-1">KSH 4,550,000</p>
            <p className="text-xs text-success font-semibold">+6.2% from last period</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Avg Farm Yield</h4>
            <p className="text-2xl font-bold text-primary mb-1">2,275 bags</p>
            <p className="text-xs text-success font-semibold">+4.1% from last period</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Worker Efficiency</h4>
            <p className="text-2xl font-bold text-primary mb-1">90.75%</p>
            <p className="text-xs text-success font-semibold">+2.3% from last period</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
