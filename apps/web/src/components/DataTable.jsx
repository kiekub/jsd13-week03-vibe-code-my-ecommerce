export default function DataTable({ columns, data, onDelete, emptyMessage = 'ไม่มีข้อมูล' }) {
  if (!data || data.length === 0) {
    return <div className="empty-state"><p>{emptyMessage}</p></div>;
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.header}</th>
            ))}
            {onDelete && <th></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row._id || rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
              {onDelete && (
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(row)}>ลบ</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
