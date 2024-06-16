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
  { productName: '상품1', salesQuantity: 10, salesAmount: 1000, salesRating: 4.7, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
  { productName: '상품2', salesQuantity: 5, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
  // 필요한 만큼 데이터를 추가
];
const formatNumber = (num) => {
    return num.toLocaleString();
};
  return (
    <div className="customer-status-table">
      <table className="table table-hover" style={{ wordBreak: 'break-all' }}>
        <thead>
          <tr>
            <th scope="col">
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                id="flexCheckDefault" />
            </th>
            <th scope="col">번호</th>
            <th scope="col">상품명</th>
            <th scope="col">판매수량</th>
            <th scope="col">판매금액</th>
            <th scope="col">평점</th>
            <th scope="col">성별선호도</th>
            <th scope="col">연령별선호도</th>
            <th scope="col">지역별선호도</th>

          </tr>
        </thead>
        <tbody className="table-group-divider">
        {rows.map((row, index) => (
          <tr key={index}>
            <td scope="row">
              <input
                className="form-check-input"
                type="checkbox"
                checked={!!selectedRows[index]}
                onChange={() => handleRowSelect(index)}
               />
            </td>
            <td scope="row">{index + 1}</td>
            <td>{row.productName}</td>
            <td>{formatNumber(row.salesQuantity)}</td>
            <td>{formatNumber(row.salesAmount)}</td>
            <td>{row.salesRating}</td>
            <td>{row.preferredgender}</td>
            <td>{row.preferredageGroup}</td>
            <td>{row.preferredregionGroup}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerStatusTable_TopProd;