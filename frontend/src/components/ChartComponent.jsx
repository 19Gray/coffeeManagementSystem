function ChartComponent({ title, data }) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-primary mb-6">{title}</h3>
      <div className="flex items-end justify-around h-64 gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1">
            <div className="w-full flex flex-col items-center">
              <div className="h-48 bg-gradient-to-t from-secondary to-primary rounded-t-md flex items-end justify-center mb-2 transition-all hover:from-primary hover:to-secondary" style={{ height: `${(item.value / maxValue) * 200}px` }}>
                <span className="text-white text-xs font-bold mb-2">{item.value}</span>
              </div>
              <span className="text-xs text-gray-600 text-center font-medium">{item.name || item.month || item.week || item.resource}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChartComponent
