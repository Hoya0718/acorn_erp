// 작성자: 박승희
// 고객현황 데이터 페이지 고객랭킨 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "../modules/TableModule"
import CustomerStatusPagination from '../modules/PaginationModule';

const CustomerStatusTable_Rank = ({ activeLabel }) => {
  // 예제 데이터
const [rows, setRows] = React.useState([
  { customerName: '홍길동', orderCount: 10, orderCount_prod: '고구마식빵', salesRating: 4.5, salesRating_prod: '소금빵', orderAmount: 1000, orderAmount_prod: '고구마식빵', remarks: '특이사항1' },
  { customerName: '김영희', orderCount: 5, orderCount_prod: '소금빵', salesRating: 4.9, salesRating_prod: '소금빵', orderAmount: 500, orderrCount_prod: '고구마식빵', remarks: '특이사항2' },
]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10; // 페이지당 항목 수
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = rows.slice(startIndex, endIndex);
  //const [filteredRows, setFilteredRows] = React.useState(rows);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // const handleSearch = ({ selectedOption_dropdown, keyword, startDate, endDate }) => {
  //   const filteredData = rows.filter((row) => {
  //     const dateInRange = new Date(row.date) >= new Date(startDate) && new Date(row.date) <= new Date(endDate);
  //     if (!dateInRange) return false;

  //     switch (selectedOption_dropdown) {
  //       case '고객명':
  //         return row.customerName.includes(keyword);
  //       case '상품명':
  //         return row.orderCount_prod.includes(keyword) || row.salesRating_prod.includes(keyword);
  //       case '특이사항':
  //         return row.remarks.includes(keyword);
  //       default:
  //         return false;
  //     }
  //   });
  //   setFilteredRows(filteredData);
  //   setCurrentPage(1); // 검색 시 첫 페이지로 이동
  // };
 
  const getColumns = (label) => {
    switch (label) {
      case '최고금액고객':
        return [
          { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
          { header: '고객명', key: 'customerName', className: 'table-centered' },
          { header: '거래금액', key: 'orderAmount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최고매출 상품명', key: 'orderAmount_prod', className: 'table-centered' },
          { header: '거래횟수', key: 'orderCount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최다거래 상품명', key: 'orderCount_prod', className: 'table-centered' },
          { header: '특이사항', key: 'remarks', className: 'table-centered' },
        ];
      case '최다거래고객':
        return [
          { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
          { header: '고객명', key: 'customerName', className: 'table-centered' },
          { header: '거래횟수', key: 'orderCount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최다거래 상품명', key: 'orderCount_prod', className: 'table-centered' },
          { header: '거래금액', key: 'orderAmount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최고매출 상품명', key: 'orderAmount_prod', className: 'table-centered' },
          { header: '특이사항', key: 'remarks', className: 'table-centered' },
        ];
      default:
        return [
          { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
          { header: '고객명', key: 'customerName', className: 'table-centered' },
          { header: '거래횟수', key: 'orderCount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최다거래 상품명', key: 'orderCount_prod', className: 'table-centered' },
          { header: '거래금액', key: 'orderAmount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최고매출 상품명', key: 'orderAmount_prod', className: 'table-centered' },
           { header: '특이사항', key: 'remarks', className: 'table-centered' },
        ];
    }
  };

  React.useEffect(() => {
    handleTable(activeLabel);
  }, [activeLabel]);

  const handleTable = (label) => {
    let sortedRows = [...rows];
    if (label === '최다거래' || label === '상품별') {
      sortedRows.sort((a, b) => b.orderAmount - a.orderAmount);
    }
    if (label === '최고금액') {
      sortedRows.sort((a, b) => b.orderCount - a.orderCount);
    }
    if (label === '반응좋은') {
      sortedRows.sort((a, b) => b.orderCount - a.orderCount);
    }
    setRows(sortedRows);
  }

  return (
    <div>
      <TableModule data={currentData} columns={getColumns(activeLabel)} />
      <CustomerStatusPagination
          totalItems={rows.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
           /> 
    </div>
  );
}

export default CustomerStatusTable_Rank;