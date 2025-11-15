import { useState } from 'react'

function TasksTable({ tasks, setTasks }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', farm: '', priority: 'Medium', dueDate: '' })

  const handleAddTask = () => {
    if (formData.title && formData.farm && formData.dueDate) {
      const newTask = {
        id: Math.max(...tasks.map(t => t.id), 0) + 1,
        ...formData,
        status: 'Pending',
      }
      setTasks([...tasks, newTask])
      setFormData({ title: '', farm: '', priority: 'Medium', dueDate: '' })
      setShowForm(false)
    }
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const handleUpdateStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Task Management</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Create Task'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Create New Task</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddTask() }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Task Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <select
              value={formData.farm}
              onChange={(e) => setFormData({ ...formData, farm: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="">Select Farm</option>
              <option value="Rift Valley Farm">Rift Valley Farm</option>
              <option value="Mount Kenya Estate">Mount Kenya Estate</option>
              <option value="Central Highlands">Central Highlands</option>
              <option value="Nyambene Range">Nyambene Range</option>
            </select>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button type="submit" className="btn-primary md:col-span-2">Create Task</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Task Title</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Farm</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Priority</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Due Date</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-900">{task.title}</td>
                  <td className="px-6 py-3 text-gray-600">{task.farm}</td>
                  <td className="px-6 py-3">
                    <span className={`${
                      task.priority === 'Critical' ? 'bg-red-100 text-danger' :
                      task.priority === 'High' ? 'bg-orange-100 text-warning' :
                      task.priority === 'Medium' ? 'bg-blue-100 text-primary' :
                      'bg-green-100 text-success'
                    } px-3 py-1 rounded-full text-xs font-semibold`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <select 
                      value={task.status}
                      onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{task.dueDate}</td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-danger text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs font-medium"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TasksTable
