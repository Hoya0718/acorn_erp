import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "./TableModule"

const CustomerStatusTable_Dist = () => {
  const [label, setLabel] = React.useState('최고금액고객');
  // 예제 데이터를 rows 배열에 추가
  const [rows, setRows] = React.useState([
    { customerGrade: '우수', customerName: '홍길동', birthDate: '1990-01-01', gender: '남성', ageGroup: '30대', regionGroup: '서울', orderCount: 10, orderAmount: 100000, remarks: '특이사항1' },
    { customerGrade: '일반', customerName: '김영희', birthDate: '1985-05-15', gender: '여성', ageGroup: '30대', regionGroup: '부산', orderCount: 5, orderAmount: 5000000, remarks: '특이사항2' },
    // 필요한 만큼 데이터를 추가
  ]);
  const columns = [
    { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
    { header: '고객등급', key: 'customerGrade', className: 'table-centered' },
    { header: '고객명', key: 'customerName', className: 'table-centered' },
    { header: '생년월일', key: 'birthDate', className: 'table-centered' },
    { header: '성별', key: 'gender', className: 'table-centered' },
    { header: '연령그룹', key: 'ageGroup', className: 'table-centered' },
    { header: '지역그룹', key: 'regionGroup', className: 'table-centered'  },
    { header: '거래횟수', key: 'orderCount', format: (value) => value.toLocaleString(), className: 'table-righted' },
    { header: '매출금액', key: 'orderAmount', format: (value) => value.toLocaleString(), className: 'table-righted' },
    { header: '특이사항', key: 'remarks', className: 'table-centered' },
  ];
  React.useEffect(() => {
    handleTable(label);
  }, [label]);

  const handleTable = (label) => {
    let sortedRows = [...rows];
    if (label === '최고금액고객') {
      sortedRows.sort((a, b) => b.orderAmount - a.orderAmount);
    }
    if (label === '최다거래고객') {
      sortedRows.sort((a, b) => b.orderCount - a.orderCount);
    }
    setRows(sortedRows);
  }

  return (
    <div>
      <TableModule data={rows} columns={columns} />
    </div>
  );
}

export default CustomerStatusTable_Dist;