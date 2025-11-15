import { useState } from 'react'
import KPICard from '../../components/KPICard'
import ChartComponent from '../../components/ChartComponent'
import TeamAssignmentsTable from '../../components/TeamAssignmentsTable'

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
      return <TeamAssignmentsTable assignments={assignments} setAssignments={setAssignments} />
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Supervisor Dashboard</h1>
        <p className="text-gray-600">Team management, daily assignments, and performance tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartComponent
          title="Tasks Completed This Month"
          data={[
            { week: 'Week 1', value: 42 },
            { week: 'Week 2', value: 48 },
            { week: 'Week 3', value: 45 },
            { week: 'Week 4', value: 51 },
          ]}
        />
        <ChartComponent
          title="Team Attendance Rate"
          data={[
            { member: 'Peter', value: 98 },
            { member: 'David', value: 95 },
            { member: 'Jane', value: 92 },
            { member: 'Grace', value: 88 },
          ]}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Recent Assignments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Worker</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Task</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Farm</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Time</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assignments.slice(0, 5).map(assignment => (
                <tr key={assignment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-900">{assignment.workerName}</td>
                  <td className="px-6 py-3 text-gray-600">{assignment.task}</td>
                  <td className="px-6 py-3 text-gray-600">{assignment.farm}</td>
                  <td className="px-6 py-3 text-gray-600">{assignment.date}</td>
                  <td className="px-6 py-3 text-gray-600">{assignment.time}</td>
                  <td className="px-6 py-3">
                    <span className={`${
                      assignment.status === 'Completed' ? 'bg-green-100 text-success' :
                      assignment.status === 'In Progress' ? 'bg-blue-100 text-primary' :
                      'bg-yellow-100 text-warning'
                    } px-3 py-1 rounded-full text-xs font-semibold`}>
                      {assignment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Team Members</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Role</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Tasks Completed</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teamMembers.slice(0, 5).map(member => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-900">{member.name}</td>
                  <td className="px-6 py-3 text-gray-600">{member.role}</td>
                  <td className="px-6 py-3">
                    <span className="bg-green-100 text-success px-3 py-1 rounded-full text-xs font-semibold">
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{member.tasksCompleted}</td>
                  <td className="px-6 py-3 text-gray-900 font-medium">{member.attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SupervisorDashboard
