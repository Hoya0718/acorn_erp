import * as React from 'react'
import "../../Main/Main.css"

const CustomerStatusTable_Rank = () => {
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState({});

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedRows = {};
    if (newSelectAll) {
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
  const formatNumber = (num) => {
      return num.toLocaleString();
  };
  // 예제 데이터
  const rows = [
    { customerName: '홍길동', birthDate: '1990-01-01', gender: '남성', ageGroup: '30대', regionGroup: '서울', orderCount: 10, orderCount_prod: '고구마식빵', orderAmount: 1000, orderAmount_prod: '고구마식빵',remarks: '특이사항1' },
    { customerName: '김영희', birthDate: '1985-05-15', gender: '여성', ageGroup: '30대', regionGroup: '부산', orderCount: 5, orderCount_prod: '소금빵',  orderAmount: 500, orderrCount_prod: '고구마식빵',remarks: '특이사항2' },
  ];
  // 합계를 계산하는 함수
  const calculateTotal = (key) => {
   return rows.reduce((sum, row) => sum + row[key], 0);
 };
 const totalOrderCount = calculateTotal('orderCount');
 const totalOrderAmount = calculateTotal('orderAmount');

  return (
    <div className=" customer-status-table">
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
            <th scope="col" className="table-centered">고객명</th>
            <th scope="col" className="table-centered">거래횟수</th>
            <th scope="col" className="table-centered">최다거래 상품명</th>
            <th scope="col" className="table-centered">거래금액</th>
            <th scope="col" className="table-centered">최고매출 상품명</th>
            <th scope="col" className="table-centered">특이사항</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
        {rows.map((row, index) => (
          <tr key={index}>
            <td scope="row" className="table-centered">
              <input
                className="form-check-input"
                type="checkbox"
                checked={!!selectedRows[index]}
                onChange={() => handleRowSelect(index)}
               />
            </td>
            <td scope="row" className="table-centered">{index + 1}</td>
            <td className="table-centered">{row.customerName}</td>
            <td className="table-righted">{formatNumber(row.orderCount)}</td>
            <td className="table-centered">{row.orderCount_prod}</td>
            <td className="table-righted">{formatNumber(row.orderAmount)}</td>
            <td className="table-centered">{row.orderAmount_prod}</td>
            <td className="table-centered">{row.remarks}</td>
          </tr>
        ))}
          <tr>
            <td colSpan="3" className="table-centered"><strong>Total</strong></td>
            <td className="table-righted"><strong>{formatNumber(totalOrderCount)}</strong></td>
            <td></td>
            <td className="table-righted"><strong>{formatNumber(totalOrderAmount)}</strong></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CustomerStatusTable_Rank;