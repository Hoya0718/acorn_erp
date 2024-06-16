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
  { customerName: '홍길동', birthDate: '1990-01-01', gender: '남성', ageGroup: '30대', regionGroup: '서울', orderCount: 10, orderAmount: 100000, remarks: '특이사항1' },
  { customerName: '김영희', birthDate: '1985-05-15', gender: '여성', ageGroup: '30대', regionGroup: '부산', orderCount: 5, orderAmount: 5000000, remarks: '특이사항2' },
  // 필요한 만큼 데이터를 추가
];
  return (
    <div className=" customer-status-table">
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
            <th scope="col">고객명</th>
            <th scope="col">생년월일</th>
            <th scope="col">성별</th>
            <th scope="col">연령그룹</th>
            <th scope="col">지역그룹</th>
            <th scope="col">거래횟수</th>
            <th scope="col">거래금액</th>
            <th scope="col">특이사항</th> 
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
            <td scope="row">{index + 1}</td>
            <td>{row.customerName}</td>
            <td>{row.birthDate}</td>
            <td>{row.gender}</td>
            <td>{row.ageGroup}</td>
            <td>{row.regionGroup}</td>
            <td>{row.orderCount}</td>
            <td>{row.orderAmount}</td>
            <td>{row.remarks}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerStatusTable_Dist;