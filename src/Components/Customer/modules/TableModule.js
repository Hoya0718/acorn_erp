// 작성자: 박승희
// 고객현황 데이터 페이지 고객분포도 표 모듈

import React, { useState, useEffect } from 'react';
import "../../Main/Main.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import instance from './../../../api/axios';
import ViewDetailsModal from '../mgmtTable/Modal/viewDetailsModal';

const TableModule = ({ data = [], columns = [], onSort = () => { }, rowsPerPage, currentPage, totalData = [] }) => {
    //     const [tableDta, setTableData] = useState(data);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

    const [showModal, setShowModal] = React.useState(false);
    const [modalData, setModalData] = React.useState({});

    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        setSelectedRows({});
        setSelectAll(false);
    }, [data]);

    useEffect(() => {
        fetchTableData( );
    }, []);

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

    const fetchTableData = async () => {
        try {
            await fetchCustomerDetails();
        } catch (error) {
            console.error('Error get TableData_dist:', error);
        }
    }
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
        if (column.key && totalData.length > 0 && typeof totalData[0][column.key] === 'number') {
            acc[column.key] = {
                total: calculateTotal(column.key, totalData),
                average: calculateAverage(column.key, totalData),
            }
        }
        return acc;
    }, {});

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const fetchCustomerDetails = async () => {
        try {
            //테이블 데이터 호출
            const response_tableData = await instance.get('/customer/getAllList');
            const data = response_tableData.data.map(item => ({
                ...item,
                registerDate: formatDate(item.registerDate),
                customerBirthDate: formatDate(item.customerBirthDate)
            }));

            //고객등급 데이터 호출
            const response_gradeData = await instance.get('/customer/getGrade');
            const data_grade = response_gradeData.data
            //특이사항 데이터 호출
            const response_notes = await instance.get('/customer/getNotes');
            const data_notes = response_notes.data

            //테이블데이터+고객등급데이터+특이사항데이터 병합
            const mergedData = data.map(customer => {
                const gradeInfo = data_grade.find(grade => grade.customerId === customer.customerId);
                // const notesInfo = data_notes.find(CustomerNotes => CustomerNotes.customerId === customer.customerId);
                const notes = data_notes.filter(note => note.customerId === customer.customerId);
                return {
                    ...customer,
                    customerGrade: gradeInfo ? gradeInfo.customerGrade : '-',
                    // customerNotes: notesInfo ? notesInfo.notes : '-',
                    // customerNotes: notes,
                    customerNotes: notes.length ? notes : [{ notes: '-' }],
                }
            });
            setRows(mergedData);
            console.log("rows", rows)
        } catch (error) {
            console.error('Error fetching customer details:', error);
            return null;
        }
    };

    const handleNameClick = async (customer) => {
        console.log("handleNameClick 실행")
        console.log("customer ", customer)
        const customerDetails = rows.find(row => row.customerId === customer.customerId);
        console.log("customerDetails ", customerDetails)
        if (customerDetails) {
            setModalData(customerDetails);
            setShowModal(true);
        }
    };

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
                                    sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faCaretDown} /> :
                                        sortConfig.direction === 'descending' ? <FontAwesomeIcon icon={faCaretUp} /> : ''
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
                                <td key={column.key} className={column.className || 'table-centered'}
                                    onClick={column.isName ? () => handleNameClick(rows) : undefined}
                                    style={column.isName ? { cursor: 'pointer', textDecoration: 'underline' } : undefined}>
                                    {column.format ? column.format(row[column.key]) : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={1} className="table-centered" style={{ borderTop: "12px solid balck" }}><strong>Total</strong></td>
                        {columns.map((column) => (
                            <td
                                key={column.key}
                                className={column.className || 'table-centered'}
                            >
                                {column.key === 'salesRating' && totalRow[column.key] ? <strong>{formatNumber(totalRow[column.key].average)}</strong> : ''}
                                {column.key !== 'salesRating' && totalRow[column.key]
                                    ? <strong>{formatNumber(totalRow[column.key].total)}</strong>
                                    : ''}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            {showModal && (
                <ViewDetailsModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    data={modalData}
                />)}
        </div>
    );
};

export default TableModule;