import './Table.css'

const Table = ({ 
  columns, 
  data, 
  actions,
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick
}) => {
  if (isLoading) {
    return (
      <div className="table-loading">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="table-empty">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key} 
                className={column.className || ''}
                style={column.width ? { width: column.width } : {}}
              >
                {column.title}
              </th>
            ))}
            {actions && <th className="table-actions">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={row.id || rowIndex} 
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={onRowClick ? 'clickable-row' : ''}
            >
              {columns.map((column) => (
                <td 
                  key={`${row.id || rowIndex}-${column.key}`}
                  className={column.className || ''}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              {actions && (
                <td className="table-actions">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table