// 작성자: 박승희
// 고객현황 데이터 페이지 상품별고객선호도 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "../modules/TableModule"
import CustomerStatusPagination from '../modules/PaginationModule';


const CustomerStatusTable_TopProd = ({ activeLabel, data, onSort}) => {
 // 예제 데이터
  const [rows, setRows] = React.useState([
    { productName: '상품1', salesCount: 10, salesAmount: 1000, salesRating: 4.7, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품2', salesCount: 9, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품3', salesCount: 58, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품4', salesCount: 51, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품5', salesCount: 51, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품6', salesCount: 51, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품7', salesCount: 52, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품8', salesCount: 54, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품9', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품10', salesCount: 51, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품11', salesCount: 45, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품12', salesCount: 65, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품13', salesCount: 25, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품14', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품15', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품16', salesCount: 25, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품17', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품18', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품19', salesCount: 25, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품20', salesCount: 25, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품21', salesCount: 35, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품22', salesCount: 95, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품23', salesCount: 55, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품24', salesCount: 55, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품25', salesCount: 2, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품26', salesCount: 3, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품27', salesCount: 5555, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품28', salesCount: 52, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품29', salesCount: 45, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품30', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품26', salesCount: 3, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품27', salesCount: 5555, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품28', salesCount: 52, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
    { productName: '상품29', salesCount: 45, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },

    // 필요한 만큼 데이터를 추가
  ]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10; // 페이지당 항목 수
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = rows.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getColumns = (activeLabel) => {
    switch (activeLabel) {
      case '최고매출':
        return [
          { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
          { header: '상품명', key: 'productName', className: 'table-centered' },
          { header: '거래금액', key: 'salesAmount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '거래횟수', key: 'salesCount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '평점', key: 'salesRating', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '성별선호도', key: 'preferredgender', className: 'table-centered' },
          { header: '연령별선호도', key: 'preferredageGroup', className: 'table-centered' },
          { header: '지역별선호도', key: 'preferredregionGroup', className: 'table-centered' },
        ];
      case '최다거래':
        return [
          { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
          { header: '상품명', key: 'productName', className: 'table-centered' },
          { header: '거래횟수', key: 'salesCount', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '평점', key: 'salesRating', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '거래금액', key: 'salesAmount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '성별선호도', key: 'preferredgender', className: 'table-centered' },
          { header: '연령별선호도', key: 'preferredageGroup', className: 'table-centered' },
          { header: '지역별선호도', key: 'preferredregionGroup', className: 'table-centered' },
        ];
      case '반응좋은':
        return [
          { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
          { header: '상품명', key: 'productName', className: 'table-centered' },
          { header: '평점', key: 'salesRating', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '거래금액', key: 'salesAmount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '거래횟수', key: 'salesCount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '성별선호도', key: 'preferredgender', className: 'table-centered' },
          { header: '연령별선호도', key: 'preferredageGroup', className: 'table-centered' },
          { header: '지역별선호도', key: 'preferredregionGroup', className: 'table-centered' },
        ];
      default:
        return [
          { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
          { header: '상품명', key: 'productName', className: 'table-centered' },
          { header: '평점', key: 'salesRating', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '거래금액', key: 'salesAmount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '거래횟수', key: 'salesCount', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '성별선호도', key: 'preferredgender', className: 'table-centered' },
          { header: '연령별선호도', key: 'preferredageGroup', className: 'table-centered' },
          { header: '지역별선호도', key: 'preferredregionGroup', className: 'table-centered' },
        ];
    }
  }

  React.useEffect(() => {
    handleTable(activeLabel);
  }, [activeLabel]);

  const handleTable = (label) => {
    let sortedRows = [...rows];
    if (label === '최고금액') {
      sortedRows.sort((a, b) => b.orderAmount - a.orderAmount);
    }
    if (label === '최다거래') {
      sortedRows.sort((a, b) => b.orderCount - a.orderCount);
    }
    setRows(sortedRows);
  }

  return (
    <div>
      <TableModule data={currentData} columns={getColumns(activeLabel)} onSort={onSort} />
      <CustomerStatusPagination
          totalItems={rows.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
           /> 
    </div>
  );
}

export default CustomerStatusTable_TopProd;