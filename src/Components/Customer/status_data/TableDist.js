// 작성자: 박승희
// 고객현황 데이터 페이지 고객분포도 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import instance from './../../../api/axios';

const CustomerStatusTable_Dist = ({ activeLabel, onSort }) => {
    const [data, setData] = React.useState({});
    const [rows, setRows] = React.useState([]);
    const [cols, setCols] = React.useState([]);

    React.useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response_tableData = await instance.post('/customer/getCountAll');
                const data = response_tableData.data;

                if (data && Object.keys(data).length > 0) {
                    setData(data);

                     const allCols = new Set();
                     const rowsData = [];
 
                     Object.values(data).forEach(section => {
                         Object.keys(section).forEach(title => {
                            allCols.add(title);
                         });
                     });

                     Object.keys(data).forEach(category => {
                        ['일반', '우수'].forEach(grade => {
                            const rowData = { 구분: grade };
                            Object.keys(data[category]).forEach(subCategory => {
                                Object.keys(data[category][subCategory][grade]).forEach(key => {
                                    rowData[key] = data[category][subCategory][grade][key];
                                });
                            });
                            rowsData.push(rowData);
                        });
                    });
                     setCols([...allCols]);
                     setRows(rowsData);
                     
                     // 디버깅
                     const va1 = Object.keys(data);//'gender', 'region', 'age']
                     const va2 = Object.keys(data[va1[0]]); //'여성', '남성'
                     const va3 = Object.keys(data[va1[0]][va2[0]]); //일반 우수
                     console.log("Columns: ", [...allCols]);
                } else {
                    console.error('Received empty or undefined data');
                }
            }catch (error) {
                console.error('Error get TableData_dist:', error);
            }
    // 예제 데이터를 rows 배열에 추가
    // const [rows, setRows] = React.useState([
    //     { region_seoul: '200', region_jeju: '1', region_kyungsang: '10', region_junla: '10', region_chungcheong: '15', region_gyunggi: '30', region_kangwon: '1', female: '1000', male: '50', age_10: '10', age_20: '20', age_30: '30', age_40: '40', age_50: '45', age_60: '60', age_70: '80' },
    // ]);

        }
        fetchTableData();
    }, [activeLabel]);


    const getColumns = () => {
        return cols.map(col => ({
            header: col,
            key: col,
            className: 'table-centered'
        }));
    }
    // const handleTable = (label) => {
    //   let sortedRows = [...rows];
    //   if (label === '최고금액고객') {
    //     sortedRows.sort((a, b) => b.orderAmount - a.orderAmount);
    //   }
    //   if (label === '최다거래고객') {
    //     sortedRows.sort((a, b) => b.orderCount - a.orderCount);
    //   }
    //   setRows(sortedRows);
    // }

    const columns = getColumns();

    const renderRow = (row, index) => {
        return (
            <tr key={index}>
                <td>{row.구분}</td>
                {columns.map((column) => (
                    <td key={column.key} className={column.className || 'table-centered'}>
                        {data[column.key] !== undefined ? data[column.key] : '-'}
                    </td>
                ))}
            </tr>
        );
    }

    const renderRows = () => {
        return rows.map((row, index) => renderRow(row, index));
    };

    const calculateTotal = (key) => {
        return rows.reduce((sum, row) => sum + parseInt(row[key] || 0, 10), 0);
    };
    const totalRow = columns.reduce((acc, column) => {
        if (column.key && rows.length > 0 && !isNaN(rows[0][column.key])) {
            acc[column.key] = {
                total: calculateTotal(column.key),
            };
        }
        return acc;
    }, {});
    
    const formatNumber = (num) => {
        return num.toLocaleString();
    };
    return (
        <div>
            {/* <TableModule data={rows}/> */}
            <div className="customer-status-table">
                <table className="table table-hover" style={{ wordBreak: 'break-all' }}>
                    <thead>
                        <tr>
                            <th>구분</th>
                            {columns.map((column) => (
                                <th
                                    scope="col"
                                    className="table-centered"
                                    key={column.key}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {renderRows()}
                        {/* {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>우수</td>
                                {columns.map((column) => (
                                    <td key={column.key} className={column.className || 'table-centered'}>
                                        {column.format ? column.format(row[column.key]) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>일반</td>
                                {columns.map((column) => (
                                    <td key={column.key} className={column.className || 'table-centered'}>
                                        {column.format ? column.format(row[column.key]) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))} 
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>*/}
                            <tr>
                                <td>total</td>
                                {columns.map((column) => (
                                    <td key={column.key} className={column.className || 'table-centered'}>
                                    {totalRow[column.key] ? <strong>{formatNumber(totalRow[column.key].total)}</strong> : ''}
                                </td>
                                ))}
                            </tr>
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerStatusTable_Dist;