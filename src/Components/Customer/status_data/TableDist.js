// 작성자: 박승희
// 고객현황 데이터 페이지 고객분포도 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import instance from './../../../api/axios';

const CustomerStatusTable_Dist = ({ activeLabel, onSort }) => {
    const [data_grade_soso, setData_grade_soso] = React.useState([]); //일반고객인원
    const [data_grade_good, setData_grade_good] = React.useState([]); //우수고객인원
    const [data_grade_bad, setData_grade_bad] = React.useState([]); //주의고객인원
    const [rows, setRows] = React.useState([]); //첫열제목
    const [cols, setCols] = React.useState([]); //첫행제목

    React.useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response_tableData = await instance.post('/customer/getCountAll');

                const data = response_tableData.data; //모든 데이터를 일단 받아옴
                console.log("data: ", data);

                if (data && Object.keys(data).length > 0) {
                    //첫행 제목 데이터
                    const allCols = new Set();

                    Object.values(data).forEach(section => {
                        Object.keys(section).forEach(title => {
                            allCols.add(title);
                        });
                    });
                    setCols([...allCols]); //첫행제목
                    console.log("Columns: ", [...allCols]); //여성남성30대20대 등

                    //각행 첫재칸 데이터
                    const allRows = new Set();
                    const lv1 = Object.keys(data);

                    lv1.forEach(key1 => {
                        const level2Keys = Object.keys(data[key1]);
                        level2Keys.forEach(key2 => {
                            const level3Keys = Object.keys(data[key1][key2]);
                            level3Keys.forEach(grade => {
                                allRows.add(grade);
                            });
                        });
                    });
                    setRows([...allRows]); //첫열제목
                    console.log("Rows: ", [...allRows]); // 우수/일반/주의

                    //회원등급에 따른 데이터
                    //일반고객등급 데이터
                    const sosoDatas = [];

                    lv1.forEach(key1 => {
                        const level2Keys = Object.keys(data[key1]);
                        level2Keys.forEach(key2 => {
                            const level3Keys = Object.keys(data[key1][key2]);
                            if (level3Keys.length > 0) {
                                const firstKey = level3Keys[0]; // 첫 번째 키를 선택
                                const sosoValue = data[key1][key2][firstKey];
                                sosoDatas.push(sosoValue);
                            }
                        });
                        // });
                    });
                    setData_grade_soso(sosoDatas);
                    console.log("data_grade_soso: ", data_grade_soso);

                    // 디버깅
                    const va1 = Object.keys(data);//'gender', 'region', 'age']
                    const va2 = Object.keys(data[va1[0]]); //'여성', '남성'
                    const va3 = Object.keys(data[va1[0]][va2[0]]); //일반 우수
                } else {
                    console.error('Received empty or undefined data');
                }
            } catch (error) {
                console.error('Error get TableData_dist:', error);
            }
        }
        fetchTableData();
    }, [activeLabel]);
    // 상태가 변경될 때마다 콘솔 로그 출력
    React.useEffect(() => {
        console.log("data_grade_soso: ", data_grade_soso);
    }, [data_grade_soso]);

    const getColumns = () => {
        return cols.map(col => ({
            header: col,
            key: col,
            className: 'table-centered'
        }));
    }
    // 정렬
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
                <td>{row}</td>
                {data_grade_soso.map((value, colIndex) => (
                    <td key={colIndex} className='table-centered'>
                        {value}
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
                                <td>{row}</td>
                                {data_grade_soso.map((column) => (
                                    <td key={column.key} className={column.className || 'table-centered'}>
                                        {column.format ? column.format(row[column.key]) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))} */}
                        {/* {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}> */}
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