import * as React from 'react'
import "../../Main/Main.css"

const CustomerStatusTable_Dist = () => {
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
  { customerGrade: '우수', customerName: '홍길동', birthDate: '1990-01-01', gender: '남성', ageGroup: '30대', regionGroup: '서울', orderCount: 10, orderAmount: 100000, remarks: '특이사항1' },
  { customerGrade: '일반', customerName: '김영희', birthDate: '1985-05-15', gender: '여성', ageGroup: '30대', regionGroup: '부산', orderCount: 5, orderAmount: 5000000, remarks: '특이사항2' },
  // 필요한 만큼 데이터를 추가
];
const formatNumber = (num) => {
    return num.toLocaleString();
};
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
            <th scope="col" className="table-centered">고객등급</th>
            <th scope="col" className="table-centered">고객명</th>
            <th scope="col" className="table-centered">생년월일</th>
            <th scope="col" className="table-centered">성별</th>
            <th scope="col" className="table-centered">연령그룹</th>
            <th scope="col" className="table-centered">지역그룹</th>
            <th scope="col" className="table-centered">거래횟수</th>
            <th scope="col" className="table-centered">거래금액</th>
            <th scope="col" className="table-centered">특이사항</th> 
            {/* 가장최근 특이사항만 가능하게 수정 */}
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
            <td scope="row" className="table-centered">{index + 1}</td>
            <td className="table-centered">{row.customerGrade}</td>
            <td className="table-centered">{row.customerName}</td>
            <td className="table-centered">{row.birthDate}</td>
            <td className="table-centered">{row.gender}</td>
            <td className="table-centered">{row.ageGroup}</td>
            <td className="table-centered">{row.regionGroup}</td>
            <td className="table-righted">{formatNumber(row.orderCount)}</td>
            <td className="table-righted">{formatNumber(row.orderAmount)}</td>
            <td className="table-centered">{row.remarks}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="3" className="table-centered"><strong>Total</strong></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td className="table-righted"><strong>{formatNumber(totalOrderCount)}</strong></td>
          <td className="table-righted"><strong>{formatNumber(totalOrderAmount)}</strong></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CustomerStatusTable_Dist;