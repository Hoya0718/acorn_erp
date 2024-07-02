// 작성자: 박승희
// 고객현황 데이터 페이지 고객랭킨 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "../modules/TableModule"
import CustomerStatusPagination from '../modules/PaginationModule';
import instance from './../../../api/axios';

const CustomerStatusTable_Rank = ({ activeLabel, onSort, onPageChange, rowsPerPage}) => {
  // 예제 데이터
const [rows, setRows] = React.useState([]);
const [currentPage, setCurrentPage] = React.useState( 1);
const [totalItems, setTotalItems] = React.useState(0);
const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    const fetchTableData = async () => {
        try {
            const response_tableData = await instance.get('/customer/getListRankTable');
            const data = response_tableData.data; 
            setRows(data);

            const response_pageData = await instance.post(`/customer/getListRankTable?page=${currentPage - 1}&size=${rowsPerPage}`);
            const page = response_pageData.data;
            setFilteredData(page.content);
            setTotalItems(page.totalElements);
        }catch (error) {
          console.error('Error get TableData_rank:', error);
      }
      }
      fetchTableData();
    }, [activeLabel, currentPage, rowsPerPage]);
    
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = rows.slice(startIndex, endIndex);

  const getColumns = (label) => {
    switch (label) {
      case '최고금액고객':
        return [
          { header: '고객명', key: 'customerName', className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최고매출 상품명', key: 'topSellingProduct', className: 'table-centered' },
          { header: '거래횟수', key: 'totalCountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최다거래 상품명', key: 'mostPurchasedProduct', className: 'table-centered' },
          { header: '특이사항', key: 'remarks', className: 'table-centered' },
        ];
      case '최다거래고객':
        return [
          { header: '고객명', key: 'customerName', className: 'table-centered' },
          { header: '거래횟수', key: 'totalCountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최다거래 상품명', key: 'mostPurchasedProduct', className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최고매출 상품명', key: 'topSellingProduct', className: 'table-centered' },
          { header: '특이사항', key: 'remarks', className: 'table-centered' },
        ];
      default:
        return [
          { header: '고객명', key: 'customerName', className: 'table-centered' },
          { header: '거래횟수', key: 'totalCountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최다거래 상품명', key: 'mostPurchasedProduct', className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최고매출 상품명', key: 'topSellingProduct', className: 'table-centered' },
           { header: '특이사항', key: 'remarks', className: 'table-centered' },
        ];
    }
  };

  React.useEffect(() => {
    // handleTable(activeLabel);
  }, [activeLabel]);

  // const handleTable = (label) => {
  //   let sortedRows = [...rows];
  //   if (label === '최다거래' || label === '상품별') {
  //     sortedRows.sort((a, b) => b.orderAmount - a.orderAmount);
  //   }
  //   if (label === '최고금액') {
  //     sortedRows.sort((a, b) => b.orderCount - a.orderCount);
  //   }
  //   if (label === '반응좋은') {
  //     sortedRows.sort((a, b) => b.orderCount - a.orderCount);
  //   }
  //   setRows(sortedRows);
  // }
  const handleSort = (key, direction) => {
    let sortedData = [...rows];
    if (direction === 'ascending') {
      sortedData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    } else if (direction === 'descending') {
      sortedData.sort((a, b) => (a[key] < b[key] ? 1 : -1));
    } else {
      sortedData = rows; // Reset to original order
    }
    setRows(sortedData);
    setFilteredData(sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
  };
  return (
    <div>
      <TableModule 
        data={filteredData} 
        sortedData={filteredData} 
        columns={getColumns(activeLabel)} 
        onSort={handleSort}  
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalData={rows}
      />
      <CustomerStatusPagination
        totalItems={totalItems}
        itemsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      /> 
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default CustomerStatusTable_Rank;