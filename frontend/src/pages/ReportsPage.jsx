import { useState } from 'react'
import ChartComponent from '../components/ChartComponent'

function ReportsPage() {
  const [reportType, setReportType] = useState('monthly')
  const [selectedPeriod, setSelectedPeriod] = useState('October 2024')

  const [kpiData] = useState({
    production: {
      current: 2450,
      previous: 2300,
      target: 2500,
      unit: 'bags',
    },
    revenue: {
      current: 1225000,
      previous: 1150000,
      target: 1250000,
      unit: 'KSH',
    },
    efficiency: {
      current: 92,
      previous: 88,
      target: 95,
      unit: '%',
    },
    quality: {
      current: 88,
      previous: 85,
      target: 90,
      unit: '%',
    },
  })

  const handleExportPDF = () => {
    alert('PDF export functionality would be implemented here')
  }

  const handleExportCSV = () => {
    alert('CSV export functionality would be implemented here')
  }

  const getVariance = (current, target) => {
    const variance = ((current - target) / target) * 100
    return variance.toFixed(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Reports & KPI Tracking</h1>
          <p className="text-gray-600">Comprehensive performance metrics and business intelligence</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={handleExportPDF}>
            Export PDF
          </button>
          <button className="btn-secondary" onClick={handleExportCSV}>
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <select 
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
        >
          <option value="daily">Daily Report</option>
          <option value="weekly">Weekly Report</option>
          <option value="monthly">Monthly Report</option>
          <option value="quarterly">Quarterly Report</option>
          <option value="annual">Annual Report</option>
        </select>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
        >
          <option>October 2024</option>
          <option>September 2024</option>
          <option>August 2024</option>
          <option>July 2024</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Production Output</h3>
          <div className="space-y-4">
            <div>
              <span className="text-3xl font-bold text-primary">{kpiData.production.current}</span>
              <span className="text-gray-600 ml-2">{kpiData.production.unit}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Previous</p>
                <p className="text-lg font-semibold text-gray-900">{kpiData.production.previous}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Target</p>
                <p className="text-lg font-semibold text-primary">{kpiData.production.target}</p>
              </div>
            </div>
            <div className={`${kpiData.production.current >= kpiData.production.target ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'} px-3 py-2 rounded text-center text-sm font-semibold`}>
              {getVariance(kpiData.production.current, kpiData.production.target) > 0 ? '+' : ''}{getVariance(kpiData.production.current, kpiData.production.target)}% vs Target
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Total Revenue</h3>
          <div className="space-y-4">
            <div>
              <span className="text-3xl font-bold text-primary">KSH {(kpiData.revenue.current / 1000).toFixed(0)}K</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Previous</p>
                <p className="text-lg font-semibold text-gray-900">KSH {(kpiData.revenue.previous / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Target</p>
                <p className="text-lg font-semibold text-primary">KSH {(kpiData.revenue.target / 1000).toFixed(0)}K</p>
              </div>
            </div>
            <div className={`${kpiData.revenue.current >= kpiData.revenue.target ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'} px-3 py-2 rounded text-center text-sm font-semibold`}>
              {getVariance(kpiData.revenue.current, kpiData.revenue.target) > 0 ? '+' : ''}{getVariance(kpiData.revenue.current, kpiData.revenue.target)}% vs Target
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Operational Efficiency</h3>
          <div className="space-y-4">
            <div>
              <span className="text-3xl font-bold text-primary">{kpiData.efficiency.current}%</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Previous</p>
                <p className="text-lg font-semibold text-gray-900">{kpiData.efficiency.previous}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Target</p>
                <p className="text-lg font-semibold text-primary">{kpiData.efficiency.target}%</p>
              </div>
            </div>
            <div className={`${kpiData.efficiency.current >= kpiData.efficiency.target ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'} px-3 py-2 rounded text-center text-sm font-semibold`}>
              {getVariance(kpiData.efficiency.current, kpiData.efficiency.target) > 0 ? '+' : ''}{getVariance(kpiData.efficiency.current, kpiData.efficiency.target)}% vs Target
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Quality Score</h3>
          <div className="space-y-4">
            <div>
              <span className="text-3xl font-bold text-primary">{kpiData.quality.current}%</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Previous</p>
                <p className="text-lg font-semibold text-gray-900">{kpiData.quality.previous}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Target</p>
                <p className="text-lg font-semibold text-primary">{kpiData.quality.target}%</p>
              </div>
            </div>
            <div className={`${kpiData.quality.current >= kpiData.quality.target ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'} px-3 py-2 rounded text-center text-sm font-semibold`}>
              {getVariance(kpiData.quality.current, kpiData.quality.target) > 0 ? '+' : ''}{getVariance(kpiData.quality.current, kpiData.quality.target)}% vs Target
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Monthly Production Trend</h2>
          <ChartComponent
            title=""
            data={[
              { month: 'July', value: 2100 },
              { month: 'August', value: 2250 },
              { month: 'September', value: 2300 },
              { month: 'October', value: 2450 },
            ]}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Revenue Breakdown</h2>
          <ChartComponent
            title=""
            data={[
              { name: 'Grade A+', value: 450000 },
              { name: 'Grade A', value: 520000 },
              { name: 'Grade B', value: 255000 },
            ]}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Key Insights & Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border-l-4 border-success bg-green-50 p-4 rounded">
            <h4 className="font-semibold text-gray-900 mb-2">Production Growth</h4>
            <p className="text-sm text-gray-600">Production increased by 6.5% compared to previous month, exceeding targets by 1.8%</p>
          </div>
          <div className="border-l-4 border-success bg-green-50 p-4 rounded">
            <h4 className="font-semibold text-gray-900 mb-2">Revenue Performance</h4>
            <p className="text-sm text-gray-600">Monthly revenue reached KSH 1.225M, up 6.5% from previous period</p>
          </div>
          <div className="border-l-4 border-primary bg-blue-50 p-4 rounded">
            <h4 className="font-semibold text-gray-900 mb-2">Quality Improvement</h4>
            <p className="text-sm text-gray-600">Quality score improved to 88%, approaching target of 90%</p>
          </div>
          <div className="border-l-4 border-warning bg-yellow-50 p-4 rounded">
            <h4 className="font-semibold text-gray-900 mb-2">Recommended Action</h4>
            <p className="text-sm text-gray-600">Focus on crop health management to achieve 90% quality target in next period</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
