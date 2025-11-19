function DashboardChart({ title, data, height = 'h-64' }) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className={`flex items-end justify-around ${height} gap-4`}>
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1 group">
            <div className="w-full flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-coffee-light to-coffee-gold rounded-t-lg flex items-end justify-center mb-2 transition-all group-hover:shadow-lg group-hover:scale-105 origin-bottom"
                style={{ height: `${(item.value / maxValue) * 200}px` }}
              >
                <span className="text-slate-900 text-xs font-bold mb-2">{item.value}</span>
              </div>
              <span className="text-xs text-slate-400 text-center font-medium mt-1">
                {item.name || item.month || item.week || item.resource}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardChart
