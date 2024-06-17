import * as React from 'react'
import "../../Main/Main.css"

const CustomerStatusTable_TopProd = () => {
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState({});

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedRows = {};
    if (newSelectAll) {
      // 모든 행 선택
      rows.forEach((row, index) => {
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
// 예제 데이터를 rows 배열에 추가
const rows = [
  { productName: '상품1', salesCount: 10, salesAmount: 1000, salesRating: 4.7, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
  { productName: '상품2', salesCount: 5, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
  // 필요한 만큼 데이터를 추가
];
const formatNumber = (num) => {
    return num.toLocaleString();
};
  // 합계를 계산하는 함수
const calculateTotal = (key) => {
 return rows.reduce((sum, row) => sum + row[key], 0);
};
const totalSalesCount = calculateTotal('salesCount');
const totalSalesAmount = calculateTotal('salesAmount');
  // 평균 계산하는 함수
const calculateAverage = (key) => {
  if (rows.length === 0) return 0;
  const total = calculateTotal(key);
  return total / rows.length;
};
const averageSalesRating = calculateAverage('salesRating');

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
                id="flexCheckDefault" />
            </th>
            <th scope="col" className="table-centered">번호</th>
            <th scope="col" className="table-centered">상품명</th>
            <th scope="col" className="table-centered">판매수량</th>
            <th scope="col" className="table-centered">판매금액</th>
            <th scope="col" className="table-centered">평점</th>
            <th scope="col" className="table-centered">성별선호도</th>
            <th scope="col" className="table-centered">연령별선호도</th>
            <th scope="col" className="table-centered">지역별선호도</th>

          </tr>
        </thead>
        <tbody className="table-group-divider">
        {rows.map((row, index) => (
          <tr key={index}>
            <th scope="row" className="table-centered">
              <input
                className="form-check-input"
                type="checkbox"
                checked={!!selectedRows[index]}
                onChange={() => handleRowSelect(index)}
               />
            </th>
            <th scope="row" className="table-centered">{index + 1}</th>
            <td className="table-centered">{row.productName}</td>
            <td  className="table-righted">{formatNumber(row.salesCount)}</td>
            <td  className="table-righted">{formatNumber(row.salesAmount)}</td>
            <td className="table-centered">{row.salesRating}</td>
            <td className="table-centered">{row.preferredgender}</td>
            <td className="table-centered">{row.preferredageGroup}</td>
            <td className="table-centered">{row.preferredregionGroup}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="3" className="table-centered"><strong>Total</strong></td>
          <td className="table-righted"><strong>{formatNumber(totalSalesCount)}</strong></td>
          <td className="table-righted"><strong>{formatNumber(totalSalesAmount)}</strong></td>
          <td className="table-centered"><strong>{formatNumber(averageSalesRating)}</strong></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CustomerStatusTable_TopProd;