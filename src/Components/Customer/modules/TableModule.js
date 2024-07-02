// 작성자: 박승희
// 고객현황 데이터 페이지 고객분포도 표 모듈

import React, { useState, useEffect } from 'react';
import "../../Main/Main.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const TableModule = ({  data = [], columns = [], onSort = () => {}, rowsPerPage, currentPage, totalData = []  }) => {
//     const [tableDta, setTableData] = useState(data);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

    useEffect(() => {
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
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'ascending') {
                direction = 'descending';
            } else if (sortConfig.direction === 'descending') {
                direction = 'none';
            }
        }
        
        setSortConfig({ key, direction });
        onSort(key, direction);
    };

    // const handleRowSelect = (index) => {
    //     const newSelectedRows = { ...selectedRows };
    //     if (newSelectedRows[index]) {
    //         delete newSelectedRows[index];
    //     } else {
    //         newSelectedRows[index] = true;
    //     }
    //     setSelectedRows(newSelectedRows);
    // };

    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    const calculateTotal = (key, dataSet = []) => {
        return dataSet.reduce((sum, row) => sum + row[key], 0);
    };

    const calculateAverage = (key, dataSet = []) => {
        if (dataSet.length === 0) return 0;
        const total = calculateTotal(key, dataSet);
        return total / dataSet.length;
    };

    const totalRow = columns.reduce((acc, column) => {
        if (column.key  && totalData.length > 0 && typeof totalData[0][column.key] === 'number') {
            acc[column.key] = {
                total: calculateTotal(column.key, totalData),
                average: calculateAverage(column.key, totalData),
            }
        }
        return acc;
    }, {});

    return (
        <div className="customer-status-table">
            <table className="table table-hover" style={{ wordBreak: 'break-all' }}>
                <thead>
                    <tr>
                        <th scope="col" className="table-centered">no.</th>
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
                            <td className="table-centered">{(currentPage - 1) * rowsPerPage + index + 1}</td>
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