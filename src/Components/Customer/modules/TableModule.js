// 작성자: 박승희
// 고객현황 데이터 페이지 고객분포도 표 모듈

import React, { useState, useEffect } from 'react';
import "../../Main/Main.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const TableModule = ({  data = [], columns = [], onSort }) => {
//     const [tableDta, setTableData] = useState(data);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    useEffect(() => {
        // setTableData(data);
        setSelectedRows({});
        setSelectAll(false);
    }, [data]);

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        const newSelectedRows = {};
        if (newSelectAll) {
            data.forEach((row, index) => {
                newSelectedRows[index] = true;
            });
        }
        setSelectedRows(newSelectedRows);
    };
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = null;
        }

        setSortConfig({ key, direction });
        onSort(key, direction);

        // if (direction) {
        //     const sortedData = [...tableData].sort((a, b) => {
        //         if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        //         if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        //         return 0;
        //     });
        //     setTableData(sortedData);
        // } else {
        //     setTableData(data);
        // }
    };

    const handleRowSelect = (index) => {
        const newSelectedRows = { ...selectedRows };
        if (newSelectedRows[index]) {
            delete newSelectedRows[index];
        } else {
            newSelectedRows[index] = true;
        }
        setSelectedRows(newSelectedRows);
    };

    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    const calculateTotal = (key) => {
        return data.reduce((sum, row) => sum + row[key], 0);
    };
    const calculateAverage = (key) => {
        if (data.length === 0) return 0;
        const total = calculateTotal(key);
        return total / data.length;
    };
    const totalRow = columns.reduce((acc, column) => {
        if (column.key  && data.length > 0 && typeof data[0][column.key] === 'number') {
            acc[column.key] = {
                total: calculateTotal(column.key),
                average: calculateAverage(column.key),
            }
        }
        return acc;
    }, {});

    return (
        <div className="customer-status-table">
            <table className="table table-hover" style={{ wordBreak: 'break-all' }}>
                <thead>
                    <tr>
                        <th scope="col" className="table-centered">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                id="flexCheckDefault"
                            />
                        </th>
                        {columns.map((column) => (
                            <th 
                            scope="col" 
                            className="table-centered" 
                            key={column.key} 
                            onClick={() => handleSort(column.key)}
                            >
                                {column.header}
                                {sortConfig.key === column.key && (
                                    sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faCaretDown}/> :
                                    sortConfig.direction === 'descending' ? <FontAwesomeIcon icon={faCaretUp}/> : ''
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data.map((row, index) => (
                        <tr key={index}>
                            <th scope="row" className="table-centered">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={!!selectedRows[index]}
                                    onChange={() => handleRowSelect(index)}
                                />
                            </th>
                            {columns.map((column) => (
                                <td key={column.key} className={column.className || 'table-centered'}>
                                    {column.format ? column.format(row[column.key]) : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={1} className="table-centered" style={{borderTop: "12px solid balck"}}><strong>Total</strong></td>
                        {columns.map((column) => (
                            <td key={column.key} className={column.className || 'table-centered'}>
                                {column.key === 'salesRating' && totalRow[column.key] ? <strong>{formatNumber(totalRow[column.key].average)}</strong> : ''}
                                {column.key !== 'salesRating' && totalRow[column.key]
                                    ? <strong>{formatNumber(totalRow[column.key].total)}</strong>
                                    : ''}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableModule;