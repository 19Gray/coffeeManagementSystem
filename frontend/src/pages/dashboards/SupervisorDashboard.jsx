import { useState } from 'react'
import KPICard from '../../components/KPICard'
import ChartComponent from '../../components/ChartComponent'
import TeamAssignmentsTable from '../../components/TeamAssignmentsTable'
import StatsOverview from '../../components/StatsOverview'
import DashboardChart from '../../components/DashboardChart'
import EnhancedDataTable from '../../components/EnhancedDataTable'

function SupervisorDashboard({ currentPage, setCurrentPage }) {
  const [assignments, setAssignments] = useState([
    { id: 1, workerName: 'David Kipchoge', task: 'Crop Inspection', farm: 'Rift Valley Farm', date: '2024-11-15', time: '08:00 AM', status: 'Completed' },
    { id: 2, workerName: 'Jane Mwangi', task: 'Soil Preparation', farm: 'Mount Kenya Estate', date: '2024-11-16', time: '09:00 AM', status: 'In Progress' },
    { id: 3, workerName: 'Peter Kiplagat', task: 'Pest Control', farm: 'Central Highlands', date: '2024-11-16', time: '07:00 AM', status: 'In Progress' },
    { id: 4, workerName: 'Grace Koech', task: 'Harvesting', farm: 'Nyambene Range', date: '2024-11-17', time: '06:00 AM', status: 'Scheduled' },
    { id: 5, workerName: 'Samuel Mwango', task: 'Equipment Maintenance', farm: 'Rift Valley Farm', date: '2024-11-17', time: '10:00 AM', status: 'Scheduled' },
  ])

  const [teamMembers] = useState([
    { id: 1, name: 'David Kipchoge', role: 'Farm Worker', status: 'Active', tasksCompleted: 24, attendance: '95%' },
    { id: 2, name: 'Jane Mwangi', role: 'Farm Worker', status: 'Active', tasksCompleted: 22, attendance: '92%' },
    { id: 3, name: 'Peter Kiplagat', role: 'Farm Worker', status: 'Active', tasksCompleted: 28, attendance: '98%' },
    { id: 4, name: 'Grace Koech', role: 'Farm Worker', status: 'Active', tasksCompleted: 20, attendance: '88%' },
    { id: 5, name: 'Samuel Mwango', role: 'Equipment Operator', status: 'Active', tasksCompleted: 18, attendance: '91%' },
  ])

  const kpis = [
    { label: 'Team Members', value: '12', change: '+1', trend: 'up' },
    { label: 'Active Assignments', value: '8', change: '+2', trend: 'up' },
    { label: 'Completion Rate', value: '92%', change: '+3%', trend: 'up' },
    { label: 'Avg Attendance', value: '93%', change: '+1%', trend: 'up' },
  ]

  if (currentPage !== 'dashboard') {
    if (currentPage === 'production') {
      const assignmentData = assignments.map(a => ({
        worker: a.workerName,
        task: a.task,
        farm: a.farm,
        date: a.date,
        time: a.time,
        status: a.status,
      }))
      return <EnhancedDataTable title="Team Assignments" headers={['Worker', 'Task', 'Farm', 'Date', 'Time', 'Status']} data={assignmentData} />
    }
    return null
  }

  const taskCompletionData = [
    { week: 'Week 1', value: 42 },
    { week: 'Week 2', value: 48 },
    { week: 'Week 3', value: 45 },
    { week: 'Week 4', value: 51 },
  ]

  const attendanceData = [
    { member: 'Peter', value: 98 },
    { member: 'David', value: 95 },
    { member: 'Jane', value: 92 },
    { member: 'Grace', value: 88 },
  ]

  const assignmentTableData = assignments.slice(0, 5).map(a => ({
    worker: a.workerName,
    task: a.task,
    farm: a.farm,
    date: a.date,
    time: a.time,
    status: a.status,
  }))

  const teamTableData = teamMembers.slice(0, 5).map(m => ({
    name: m.name,
    role: m.role,
    status: m.status,
    tasks: m.tasksCompleted.toString(),
    attendance: m.attendance,
  }))

  return (
    <div className="space-y-6">
      <div className="dashboard-header">
        <h1 className="text-3xl font-bold text-primary mb-2">Supervisor Dashboard</h1>
        <p className="text-gray-600">Team management, daily assignments, and performance tracking</p>
      </div>

      <StatsOverview stats={kpis} />

      <div className="grid-charts grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart title="Tasks Completed This Month" data={taskCompletionData} />
        <DashboardChart title="Team Attendance Rate" data={attendanceData} />
      </div>

      <EnhancedDataTable 
        title="Recent Assignments" 
        headers={['Worker', 'Task', 'Farm', 'Date', 'Time', 'Status']} 
        data={assignmentTableData}
      />

      <EnhancedDataTable 
        title="Team Members" 
        headers={['Name', 'Role', 'Status', 'Tasks Completed', 'Attendance']} 
        data={teamTableData}
      />
    </div>
  )
}

export default SupervisorDashboard
