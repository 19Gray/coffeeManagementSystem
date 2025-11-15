import { useState } from 'react'

function TaskCard({ task }) {
  const [completed, setCompleted] = useState(task.status === 'Completed')

  const handleMarkComplete = () => {
    setCompleted(!completed)
  }

  const priorityColor = task.priority === 'High' ? 'bg-red-100 text-danger' :
                       task.priority === 'Critical' ? 'bg-red-200 text-danger' :
                       'bg-blue-100 text-primary'
  const borderColor = task.priority === 'High' ? 'border-red-300' :
                     task.priority === 'Critical' ? 'border-red-400' :
                     'border-blue-300'

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 ${borderColor} ${completed ? 'bg-gray-50 opacity-75' : ''} p-5 transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <input 
            type="checkbox" 
            checked={completed}
            onChange={handleMarkComplete}
            className="mt-1 w-5 h-5 accent-primary rounded cursor-pointer"
          />
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
          </div>
        </div>
        <span className={`${priorityColor} px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}>
          {task.priority}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{task.description}</p>
      
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded">
        <div>
          <span className="text-xs text-gray-500 block">Farm</span>
          <span className="text-sm font-medium text-gray-900">{task.farm}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500 block">Date</span>
          <span className="text-sm font-medium text-gray-900">{task.date}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500 block">Time</span>
          <span className="text-sm font-medium text-gray-900">{task.time}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`${
          task.status === 'Completed' ? 'bg-green-100 text-success' :
          task.status === 'In Progress' ? 'bg-blue-100 text-primary' :
          'bg-yellow-100 text-warning'
        } px-3 py-1 rounded-full text-xs font-semibold`}>
          {task.status}
        </span>
        {!completed && (
          <button
            onClick={handleMarkComplete}
            className="px-3 py-1 bg-primary text-white rounded hover:bg-secondary transition-colors text-sm font-medium"
          >
            Mark Complete
          </button>
        )}
      </div>
    </div>
  )
}

export default TaskCard
