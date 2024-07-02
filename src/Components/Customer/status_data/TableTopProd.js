// 작성자: 박승희
// 고객현황 데이터 페이지 상품별고객선호도 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "../modules/TableModule"
import CustomerStatusPagination from '../modules/PaginationModule';
import instance from './../../../api/axios';
import { useCustomerStatus } from '../settingModal/CustomerStatusSettingContext';


const CustomerStatusTable_TopProd = ({ activeLabel, onSort,  onPageChange, rowsPerPage}) => {
  
  const { selectedRegion } = useCustomerStatus();
  
  const [rows, setRows] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  // const [itemsPerPage, setItemsPerPage] = React.useState(10); 
  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response_tableData = await instance.get('/customer/getListProdTable');
        const data = response_tableData.data;
        setRows(data);

        const response_pageData = await instance.post(`/customer/getListProdTable?page=${currentPage - 1}&size=${rowsPerPage}`);
        const page = response_pageData.data;
        
        setFilteredData(page.content);
        setTotalItems(page.totalElements);
        handleTable(activeLabel, data);
      } catch (error) {
        console.error('Error get TableData_prod:', error);
      }
    }
    fetchTableData();
  }, [activeLabel, selectedRegion, currentPage, rowsPerPage]);

  React.useEffect(() => {
    handleTable(activeLabel, rows);
  }, [activeLabel, currentPage, rowsPerPage, rows]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = rows.slice(startIndex, endIndex);

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
      case '반응좋은':
        return [
          { header: '상품명', key: 'itemName', className: 'table-centered' },
          //{ header: '평점', key: 'salesRating', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForProduct', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '거래횟수', key: 'totalCountForProduct', format: (value) => value.toLocaleString(), className: 'table-righted' },
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
      default:
        return [
          { header: '상품명', key: 'itemName', className: 'table-centered' },
          //{ header: '평점', key: 'salesRating', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForProduct', format: (value) => value.toLocaleString(), className: 'table-righted' },
          { header: '거래횟수', key: 'totalCountForProduct', format: (value) => value.toLocaleString(), className: 'table-righted' },
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
    }
  }

  // React.useEffect(() => {
  // }, [activeLabel]);

  const handleTable = (activeLabel, rows) => {
    let sortedRows = [...rows];
    if (activeLabel === '최고매출') {
      sortedRows.sort((a, b) => b.totalAmountForProduct - a.totalAmountForProduct);
    }
    if (activeLabel === '최다거래') {
      sortedRows.sort((a, b) => b.totalCountForProduct - a.totalCountForProduct);
    }
    if (activeLabel === '반응좋은') {
      sortedRows.sort((a, b) => b.salesRating - a.salesRating);
    }
    setFilteredData(sortedRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
  }

  const handleSort = (key, direction) => {
    let sortedData = [...rows];
    if (direction === 'ascending') {
      setCurrentPage(1);
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
          columns={getColumns(activeLabel)} 
          onSort={handleSort} 
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalData={rows}/>
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

export default CustomerStatusTable_TopProd;