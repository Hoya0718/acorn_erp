// 작성자: 박승희
// 고객현황 데이터 페이지 고객랭킨 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "../modules/TableModule"
import CustomerStatusPagination from '../modules/PaginationModule';
import instance from './../../../api/axios';
import ViewDetailsModal from '../mgmtTable/viewDetailsModal/viewDetailsModal';

const CustomerStatusTable_Rank = ({ activeLabel, onSort, onPageChange, rowsPerPage }) => {
  // 예제 데이터
  const [rows, setRows] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const [filteredData, setFilteredData] = React.useState([]);

  const [rows_details, setRows_details] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [modalData, setModalData] = React.useState({});

  React.useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response_tableData = await instance.get('/customer/getListRankTable');
        const data = response_tableData.data;
        setRows(data);
        //특이사항 데이터 호출
        const response_notes = await instance.get('/customer/getNotes');
        const data_notes = response_notes.data
        const mergedData = data.map(customer => {
          const notes = data_notes.filter(note => note.customerId === customer.customerId);
          return {
            ...customer,
             customerNotes: notes.length ? notes[0].notes : '-',
          };
        });
        setRows(mergedData);

        //페이지네이션
        const response_pageData = await instance.post(`/customer/getListRankTable?page=${currentPage - 1}&size=${rowsPerPage}`);
        const page = response_pageData.data;
        setFilteredData(page.content);
        setTotalItems(page.totalElements);
        handleTable(activeLabel, data);

        await fetchCustomerDetails();

      } catch (error) {
        console.error('Error get TableData_rank:', error);
      }
    }
    fetchTableData();
  }, [activeLabel, currentPage, rowsPerPage]);

  React.useEffect(() => {
    handleTable(activeLabel, rows);
  }, [activeLabel, currentPage, rowsPerPage, rows]);

 React.useEffect(() => {
    console.log("rows updated", rows);
  }, [rows]);
  
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = rows.slice(startIndex, endIndex);

  const getColumns = (label) => {
    switch (label) {
      case '최고금액고객':
        return [
          { header: '고객명', key: 'customerName', className: 'table-centered', isName: true },
          { header: '거래금액', key: 'totalAmountForCustomer', format: (value) => value ? value.toLocaleString() : '-', className: 'table-righted' },
          { header: '최고매출 상품명', key: 'topSellingProduct', className: 'table-centered' },
          { header: '거래횟수', key: 'totalCountForCustomer',format: (value) => value ? value.toLocaleString() : '-',  className: 'table-righted' },
          { header: '최다거래 상품명', key: 'mostPurchasedProduct', className: 'table-centered' },
          { header: '특이사항', key: 'customerNotes', className: 'table-centered' },
        ];
      case '최다거래고객':
        return [
          { header: '고객명', key: 'customerName', className: 'table-centered', isName: true },
          { header: '거래횟수', key: 'totalCountForCustomer', format: (value) => value ? value.toLocaleString() : '-',  className: 'table-righted' },
          { header: '최다거래 상품명', key: 'mostPurchasedProduct', className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForCustomer', format: (value) => value ? value.toLocaleString() : '-',  className: 'table-righted' },
          { header: '최고매출 상품명', key: 'topSellingProduct', className: 'table-centered' },
          { header: '특이사항', key: 'customerNotes', className: 'table-centered' },
        ];
      default:
        return [
          { header: '고객명', key: 'customerName', className: 'table-centered', isName: true },
          { header: '거래횟수', key: 'totalCountForCustomer', format: (value) => value ? value.toLocaleString() : '-',  className: 'table-righted' },
          { header: '최다거래 상품명', key: 'mostPurchasedProduct', className: 'table-centered' },
          { header: '거래금액', key: 'totalAmountForCustomer',format: (value) => value ? value.toLocaleString() : '-',  className: 'table-righted' },
          { header: '최고매출 상품명', key: 'topSellingProduct', className: 'table-centered' },
          { header: '특이사항', key: 'customerNotes', className: 'table-centered' },
        ];
    }
  };

  const handleTable = (activeLabel, rows) => {
    let sortedRows = [...rows];
    if (activeLabel === '최고금액고객' || sortedRows === '고객랭킹') {
      sortedRows.sort((a, b) => b.totalAmountForCustomer - a.totalAmountForCustomer);
    }
    if (activeLabel === '최다거래고객') {
      sortedRows.sort((a, b) => b.totalCountForCustomer - a.totalCountForCustomer);
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

const fetchCustomerDetails = async () => {
    try {
       //테이블 데이터 호출
    const response_tableData = await instance.get('/customer/getAllList');
    const data = response_tableData.data.map(item => ({
      ...item,
      registerDate: formatDate(item.registerDate),
      customerBirthDate: formatDate(item.customerBirthDate)
    }));

    //고객등급 데이터 호출
    const response_gradeData = await instance.get('/customer/getGrade');
    const data_grade = response_gradeData.data
    //특이사항 데이터 호출
    const response_notes = await instance.get('/customer/getNotes');
    const data_notes = response_notes.data

    //테이블데이터+고객등급데이터+특이사항데이터 병합
    const mergedData = data.map(customer => {
      const gradeInfo = data_grade.find(grade => grade.customerId === customer.customerId);
      const notes = data_notes.filter(note => note.customerId === customer.customerId);
      return {
        ...customer,
        customerGrade: gradeInfo ? gradeInfo.customerGrade : '-',
        customerNotes: notes.length ? notes : [{ notes: '-' }],
      }});

    setRows_details(mergedData);

    } catch (error) {
        console.error('Error fetching customer details:', error);
        return null;
    }
};

  const handleNameClick = async (customer) => {
    const customerDetails = rows.find(row_details => row_details.customerId === customer.customerId);
    if (customerDetails) {
      setModalData(customerDetails);
      setShowModal(true);
    }
  };
  
  return (
    <div>
      <TableModule
        data={filteredData}
        // sortedData={filteredData} 
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
      {showModal && (
        <ViewDetailsModal
          show={showModal}
          onHide={() => setShowModal(false)}
          data={modalData}
        />)}
    </div>
  );
}

export default CustomerStatusTable_Rank;