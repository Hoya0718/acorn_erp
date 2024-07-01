// 작성자: 박승희
// 고객현황 데이터 페이지 상품별고객선호도 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "../modules/TableModule"
import CustomerStatusPagination from '../modules/PaginationModule';
import instance from './../../../api/axios';
import { useCustomerStatus } from '../settingModal/CustomerStatusSettingContext';


const CustomerStatusTable_TopProd = ({ activeLabel, onSort, totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const { selectedRegion } = useCustomerStatus();
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response_tableData = await instance.get('/customer/getListProdTable');
        const data = response_tableData.data;
        setRows(data);
      } catch (error) {
        console.error('Error get TableData_prod:', error);
      }
    }
    fetchTableData();
  }, [activeLabel, selectedRegion]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = rows.slice(startIndex, endIndex);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const getColumns = (activeLabel) => {
    switch (activeLabel) {
      case '최고매출':
        return [
          { header: '상품명', key: 'itemName', className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForProduct', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '거래횟수', key: 'totalCountForProduct', format: (value) => value.toLocaleString(), className: 'table-righted' },
          //{ header: '평점', key: 'salesRating', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '성별선호도', key: 'genderPreference', className: 'table-centered' },
          { header: '연령별선호도', key: 'agePreference', className: 'table-centered' },
          {
            header: '지역별선호도',
            key: selectedRegion === '전국' ? 'regionPreference_province' :
              selectedRegion === '시도' ? 'regionPreference_city' :
                'regionPreference_town',
            className: 'table-centered'
          },
        ];
      case '최다거래':
        return [
          { header: '상품명', key: 'itemName', className: 'table-centered' },
          { header: '거래횟수', key: 'totalCountForProduct', format: (value) => value.toLocaleString(), className: 'table-centered' },
          //{ header: '평점', key: 'salesRating', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForProduct', format: (value) => value.toLocaleString(), className: 'table-righted' },
          {
            header: '지역별선호도',
            key: selectedRegion === '전국' ? 'regionPreference_province' :
              selectedRegion === '시도' ? 'regionPreference_city' :
                'regionPreference_town',
            className: 'table-centered'
          },
        ];
      case '반응좋은':
        return [
          { header: '상품명', key: 'itemName', className: 'table-centered' },
          //{ header: '평점', key: 'salesRating', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForProduct', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '거래횟수', key: 'totalCountForProduct', format: (value) => value.toLocaleString(), className: 'table-righted' },
          {
            header: '지역별선호도',
            key: selectedRegion === '전국' ? 'regionPreference_province' :
              selectedRegion === '시도' ? 'regionPreference_city' :
                'regionPreference_town',
            className: 'table-centered'
          },
        ];
      default:
        return [
          { header: '상품명', key: 'itemName', className: 'table-centered' },
          //{ header: '평점', key: 'salesRating', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForProduct', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '거래횟수', key: 'totalCountForProduct', format: (value) => value.toLocaleString(), className: 'table-righted' },
          {
            header: '지역별선호도',
            key: selectedRegion === '전국' ? 'regionPreference_province' :
              selectedRegion === '시도' ? 'regionPreference_city' :
                'regionPreference_town',
            className: 'table-centered'
          },
        ];
    }
  }

  React.useEffect(() => {
    handleTable(activeLabel);
  }, [activeLabel]);

  const handleTable = (label) => {
    let sortedRows = [...rows];
    if (label === '최고매출') {
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
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default CustomerStatusTable_TopProd;