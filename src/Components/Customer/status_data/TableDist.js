// 작성자: 박승희
// 고객현황 데이터 페이지 고객분포도 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import instance from './../../../api/axios';
import { useCustomerStatus } from '../settingModal/CustomerStatusSettingContext';

const CustomerStatusTable_Dist = ({ activeLabel, onSort, setColumns, setFilename }) => {
    const { selectedRegion } = useCustomerStatus();
    const [data_grade_soso, setData_grade_soso] = React.useState([]); //일반고객인원
    const [data_grade_good, setData_grade_good] = React.useState([]); //우수고객인원
    const [data_grade_bad, setData_grade_bad] = React.useState([]); //주의고객인원
    const [rows, setRows] = React.useState([]); //첫열제목
    const [cols, setCols] = React.useState([]); //첫행제목

    React.useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response_tableData = await instance.post('/customer/getCountAll');

                const data = response_tableData.data;
                const genderAge = data.genderAge;
                if (data && Object.keys(data).length > 0) {
                    //첫행 제목 데이터
                    const allCols = new Set();

                    let regionData;

                    if (selectedRegion === '전국') {
                        regionData = data.region.Province;
                    } else if (selectedRegion === '시도') {
                        regionData = data.region.City;
                    } else if (selectedRegion === '시군구') {
                        regionData = data.region.Town;
                    }


                    Object.values(genderAge).forEach(section => {
                        Object.keys(section).forEach(item => {
                            allCols.add(item);
                        });
                    });
                    if (regionData) {
                        Object.keys(regionData).forEach(section => {
                            allCols.add(section);
                        });
                    }
                    setCols([...allCols]); //첫행제목
                    // console.log("Columns: ", [...allCols]); //여성남성30대20대 등

                    //각행 첫재칸 데이터
                    const allRows = new Set();
                    const lv1 = Object.keys(data);

                    lv1.forEach(key1 => {
                        const level2Keys = Object.keys(data[key1]);
                        level2Keys.forEach(key2 => {
                            const level3Keys = Object.keys(data[key1][key2]);
                            level3Keys.forEach(value => {
                                const level3Keys = Object.keys(data[key1][key2][value]);
                                level3Keys.forEach(grade => {
                                    allRows.add(grade);
                                });
                            });
                        });
                    });
                    setRows([...allRows]); //첫열제목
                    // console.log("Rows: ", [...allRows]); // 우수/일반/주의

                    // 회원등급에 따른 데이터
                    const goodDatas = [];
                    const sosoDatas = [];
                    const badDatas = [];

                    lv1.forEach(key1 => {
                        const level2Keys = Object.keys(data[key1]);
                        level2Keys.forEach(key2 => {
                            const level3Keys = Object.keys(data[key1][key2]);
                            level3Keys.forEach(key3 => {
                                const level4Keys = Object.keys(data[key1][key2][key3]);
                                level4Keys.forEach(key4 => {
                                    if (key4 === '우수') {
                                        const goodValue = data[key1][key2][key3][key4];
                                        goodDatas.push({ column: key3, value: goodValue });
                                    } else if (key4 === '일반') {
                                        const sosoValue = data[key1][key2][key3][key4];
                                        sosoDatas.push({ column: key3, value: sosoValue });
                                    } else if (key4 === '주의') {
                                        const badValue = data[key1][key2][key3][key4];
                                        badDatas.push({ column: key3, value: badValue });
                                    }
                                });
                            });
                        });
                    });
                    setData_grade_good(goodDatas);
                    setData_grade_soso(sosoDatas);
                    setData_grade_bad(badDatas);

                } else {
                    console.error('Received empty or undefined data');
                }
            } catch (error) {
                console.error('Error get TableData_dist:', error);
            }
        }
        fetchTableData();
    }, [activeLabel, selectedRegion]);

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
        let data = [];
        if (row === '우수') {
            data = data_grade_good;
        } else if (row === '일반') {
            data = data_grade_soso;
        } else if (row === '주의') {
            data = data_grade_bad;
        }

        const rowData = {};
        data.forEach(item => {
            rowData[item.column] = item.value;
        });

        return (
            <tr key={index}>
                <td>{row}</td>
                {columns.map((col, colIndex) => (
                    <td key={colIndex} className='table-centered'>
                        {rowData[col.key] || 0}
                    </td>
                ))}
            </tr>
        );
    }


    const renderRows = () => {
        return rows.map((row, index) => renderRow(row, index));
    };

    const calculateTotal = (column) => {
        let total = 0;

        data_grade_good.forEach(item => {
            if (item.column === column) {
                total += item.value;
            }
        });

        data_grade_soso.forEach(item => {
            if (item.column === column) {
                total += item.value;
            }
        });

        data_grade_bad.forEach(item => {
            if (item.column === column) {
                total += item.value;
            }
        });

        return total;
    };
    const totalRow = cols.reduce((acc, column) => {
        acc[column] = calculateTotal(column);
        return acc;
    }, {});

    const formatNumber = (num) => {
        return num.toLocaleString();
    };
    return (
        <div>
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
                        <tr>
                            <td><strong>total</strong></td>
                            {columns.map((column) => (
                                <td key={column.key} className='table-centered'>
                                    <strong>{formatNumber(totalRow[column.key])}</strong>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerStatusTable_Dist;