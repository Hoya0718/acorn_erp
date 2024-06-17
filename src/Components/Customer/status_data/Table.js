// 작성자: 박승희
// 고객현황 데이터 페이지 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"

const CustomerStatusTable = () => {
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
  { orderNumber: '1001', transactionDate: '2023-01-01', productName: '상품1', salesQuantity: 10, salesAmount: 1000, customerName: '홍길동', customerId: 'hong', birthDate: '1990-01-01', gender: '남성', ageGroup: '30대', regionGroup: '서울', remarks: '특이사항1' },
  { orderNumber: '1002', transactionDate: '2023-01-02', productName: '상품2', salesQuantity: 5, salesAmount: 500, customerName: '김영희', customerId: 'kim', birthDate: '1985-05-15', gender: '여성', ageGroup: '30대', regionGroup: '부산', remarks: '특이사항2' },
  // 필요한 만큼 데이터를 추가
];
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
            <th scope="col">주문번호</th>
            <th scope="col">거래일자</th>
            <th scope="col">상품명</th>
            <th scope="col">판매수량</th>
            <th scope="col">판매금액</th>
            <th scope="col">고객명</th>
            <th scope="col">고객아이디</th>
            <th scope="col">생년월일</th>
            <th scope="col">성별</th>
            <th scope="col">연령그룹</th>
            <th scope="col">지역그룹</th>
            <th scope="col">특이사항</th>
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
            <td>{row.orderNumber}</td>
            <td>{row.transactionDate}</td>
            <td>{row.productName}</td>
            <td>{row.salesQuantity}</td>
            <td>{row.salesAmount}</td>
            <td>{row.customerName}</td>
            <td>{row.customerId}</td>
            <td>{row.birthDate}</td>
            <td>{row.gender}</td>
            <td>{row.ageGroup}</td>
            <td>{row.regionGroup}</td>
            <td>{row.remarks}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerStatusTable;