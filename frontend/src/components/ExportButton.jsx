function ExportButton({ data, filename }) {
  const handleExportCSV = () => {
    const csv = convertToCSV(data)
    downloadCSV(csv, `${filename}.csv`)
  }

  const handleExportJSON = () => {
    const json = JSON.stringify(data, null, 2)
    downloadFile(json, `${filename}.json`, 'application/json')
  }

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return ''
    
    const headers = Object.keys(data[0])
    const rows = data.map(item => 
      headers.map(header => {
        const value = item[header]
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      }).join(',')
    )
    
    return [headers.join(','), ...rows].join('\n')
  }

  const downloadCSV = (csv, filename) => {
    downloadFile(csv, filename, 'text/csv')
  }

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="flex gap-2">
      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition" onClick={handleExportCSV}>
        CSV
      </button>
      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition" onClick={handleExportJSON}>
        JSON
      </button>
    </div>
  )
}

export default ExportButton
