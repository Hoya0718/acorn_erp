import React, { useState, useEffect } from 'react';
import "../../Main/Main.css";

const TableModule = ({ data, columns }) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState({});

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
        if (column.key && typeof data[0][column.key] === 'number') {
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
                            <th scope="col" className="table-centered" key={column.key}>
                                {column.header}
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
                                    checked={!!selectedRows[index]} s
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
                        <td colSpan={1} className="table-centered"><strong>Total</strong></td>
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