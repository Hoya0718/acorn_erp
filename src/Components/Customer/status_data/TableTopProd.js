import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "./TableModule"


const CustomerStatusTable_TopProd = () => {
  const [label, setLabel] = React.useState('최고금액고객');

const  [rows, setRows] = React.useState([
  { productName: '상품1', salesCount: 10, salesAmount: 1000, salesRating: 4.7, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
  { productName: '상품2', salesCount: 5, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
  // 필요한 만큼 데이터를 추가
]);
const columns = [
  { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
  { header: '상품명', key: 'productName', className: 'table-centered' },
  { header: '거래횟수', key: 'salesCount', format: (value) => value.toLocaleString(), className: 'table-righted' },
  { header: '매출금액', key: 'salesAmount', format: (value) => value.toLocaleString(), className: 'table-righted' },
  { header: '별점', key: 'salesRating', format: (value) => value.toLocaleString(), className: 'table-righted' },
  { header: '성별선호도', key: 'preferredgender', className: 'table-centered' },
  { header: '연령별선호도', key: 'preferredageGroup:', className: 'table-centered' },
  { header: '지역별선호도', key: 'preferredregionGroup', className: 'table-centered' },
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

export default CustomerStatusTable_TopProd;