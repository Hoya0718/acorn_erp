// 작성자: 박승희
// 고객현황 데이터 페이지 고객분포도 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "../modules/TableModule"

const CustomerStatusTable_Dist = ({ activeLabel, data, onSort }) => {
    // 예제 데이터를 rows 배열에 추가
    const [rows, setRows] = React.useState([
        { region_seoul: '200', region_jeju: '1', region_kyungsang: '10', region_junla: '10', region_chungcheong: '15', region_gyunggi: '30', region_kangwon: '1', female: '1000', male: '50', age_10: '10', age_20: '20', age_30: '30', age_40: '40', age_50: '45', age_60: '60', age_70: '80' },

        // 필요한 만큼 데이터를 추가
    ]);
    const getColumns = (label) => {
        switch (label) {
            case '고객분포':
                return [
                    { header: '여성', key: 'female', className: 'table-centered' },
                    { header: '남성', key: 'male', className: 'table-centered' },
                    { header: '10대이하', key: 'age_10', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '20대', key: 'age_20', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '30대', key: 'age_30', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '40대', key: 'age_40', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '50대', key: 'age_50', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '60대', key: 'age_60', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '70대이상', key: 'age_70', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '서울', key: 'region_seoul', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '경기', key: 'region_gyunggi', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '강원', key: 'region_kangwon', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '충청', key: 'region_chungcheong', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '전라', key: 'region_junla', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '경상', key: 'region_kyungsang', format: (value) => value.toLocaleString(), className: 'table-centered' },
                    { header: '제주', key: 'region_jeju', format: (value) => value.toLocaleString(), className: 'table-centered' },
                ];
            default:
                return [];
        };
    }

    // React.useEffect(() => {
    //   handleTable(activeLabel);
    // }, [activeLabel]);

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

    const columns = getColumns(activeLabel);
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
                        {rows.map((row, rowIndex) => (
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
                            <tr key={rowIndex}>
                                <td>total</td>
                                {columns.map((column) => (
                                    <td key={column.key} className={column.className || 'table-centered'}>
                                    {totalRow[column.key] ? <strong>{formatNumber(totalRow[column.key].total)}</strong> : ''}
                                </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerStatusTable_Dist;