import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "./TableModule"

const CustomerStatusTable_Rank = () => {
  const [label, setLabel] = React.useState('최고금액고객');
  // 예제 데이터
  const [rows, setRows] = React.useState([
    { customerName: '홍길동', orderCount: 10, orderCount_prod: '고구마식빵', orderAmount: 1000, orderAmount_prod: '고구마식빵', remarks: '특이사항1' },
    { customerName: '김영희', orderCount: 5, orderCount_prod: '소금빵', orderAmount: 500, orderrCount_prod: '고구마식빵', remarks: '특이사항2' },
  ]);
  const columns = [
    { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
    { header: '고객명', key: 'customerName', className: 'table-centered' },
    { header: '거래횟수', key: 'orderCount', format: (value) => value.toLocaleString(), className: 'table-righted' },
    { header: '최다거래 상품명', key: 'orderCount_prod', className: 'table-centered' },
    { header: '거래금액', key: 'orderAmount', format: (value) => value.toLocaleString(), className: 'table-righted' },
    { header: '최고매출 상품명', key: 'orderAmount_prod', className: 'table-centered' },
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

export default CustomerStatusTable_Rank;