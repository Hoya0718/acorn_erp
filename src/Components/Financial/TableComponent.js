import React from 'react';

const TableComponent = ({ columns, data, toggleAllCheckboxes, toggleSingleCheckbox, handleSort, sortConfig }) => (
  <table className="table table-hover" style={{ wordBreak: 'break-all' }}>
    <thead>
      <tr>
        <th scope="col">
          <input
            type="checkbox"
            onChange={toggleAllCheckboxes}
            checked={data.every(row => row.checked)}
          />
        </th>
        {columns.map((col, index) => (
          <th key={index} scope="col" onClick={() => handleSort(col)}>
            {col}
            {sortConfig.key === col ? (
              sortConfig.direction === 'ascending' ? (
                <span className="sort-arrow"> 🔼</span>
              ) : (
                <span className="sort-arrow"> 🔽</span>
              )
            ) : (
              <span className="sort-arrow"> 🔽</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="table-group-divider">
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          <td>
            <input
              type="checkbox"
              onChange={() => toggleSingleCheckbox(rowIndex)}
              checked={row.checked}
            />
          </td>
          {columns.map((col, colIndex) => (
            <td key={colIndex}>{row[col]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableComponent;
