function EnhancedDataTable({ title, headers, data, actions }) {
  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <h3 className="chart-title">{title}</h3>
        {actions && (
          <div className="flex gap-2">
            {actions}
          </div>
        )}
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((cell, cellIdx) => (
                    <td key={cellIdx}>{cell}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center text-slate-500 py-8">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EnhancedDataTable
