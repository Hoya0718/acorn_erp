import React from 'react';

const TableComponent = ({ columns, data, toggleAllCheckboxes, toggleSingleCheckbox, handleSort, sortConfig }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={toggleAllCheckboxes}
              checked={data.every(row => row.checked)}
            />
          </th>
          {columns.map(column => (
            <th key={column.key} onClick={() => handleSort(column.key)}>
              {column.header}
              {sortConfig.key === column.key ? (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼') : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"
                checked={row.checked || false}
                onChange={() => toggleSingleCheckbox(index)}
              />
            </td>
            {columns.map(column => (
              <td key={`${column.key}-${index}`}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
