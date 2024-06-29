// 작성자: 박승희
// 고객현황 데이터 페이지 고객랭킨 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "../modules/TableModule"
import CustomerStatusPagination from '../modules/PaginationModule';
import instance from './../../../api/axios';

const CustomerStatusTable_Rank = ({ activeLabel, onSort, totalItems, itemsPerPage, currentPage, onPageChange}) => {
  // 예제 데이터
const [rows, setRows] = React.useState([]);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentData = rows.slice(startIndex, endIndex);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
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

  React.useEffect(() => {
    const fetchTableData = async () => {
        try {
            const response_tableData = await instance.get('/customer/getListRankTable');
            const data = response_tableData.data; 
            //console.log("data_getListProdTable: ", data);
            setRows(data);
        }catch (error) {
          console.error('Error get TableData_rank:', error);
      }
      }
      fetchTableData();
    }, [activeLabel]);
    
  const getColumns = (label) => {
    switch (label) {
      case '최고금액고객':
        return [
          { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
          // { header: '고객명', key: 'customerName', className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최고매출 상품명', key: 'topSellingProduct', className: 'table-centered' },
          { header: '거래횟수', key: 'totalCountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최다거래 상품명', key: 'mostPurchasedProduct', className: 'table-centered' },
          { header: '특이사항', key: 'remarks', className: 'table-centered' },
        ];
      case '최다거래고객':
        return [
          { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
          // { header: '고객명', key: 'customerName', className: 'table-centered' },
          { header: '거래횟수', key: 'totalCountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최다거래 상품명', key: 'mostPurchasedProduct', className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최고매출 상품명', key: 'topSellingProduct', className: 'table-centered' },
          { header: '특이사항', key: 'remarks', className: 'table-centered' },
        ];
      default:
        return [
          { header: '번호', key: 'index', format: (_, index) => index + 1, className: 'table-centered' },
          // { header: '고객명', key: 'customerName', className: 'table-centered' },
          { header: '거래횟수', key: 'totalCountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최다거래 상품명', key: 'mostPurchasedProduct', className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForCustomer', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '최고매출 상품명', key: 'topSellingProduct', className: 'table-centered' },
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
      <TableModule data={rows} columns={getColumns(activeLabel)} onSort={onSort} />
      <CustomerStatusPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      /> 
    </div>
  );
}

export default CustomerStatusTable_Rank;