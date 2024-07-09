import React, { useMemo, useState, useEffect, useCallback, } from 'react';
import MgmtTable from './mgmtTable/Mgmt_2Table'
import ExcelPrint from './modules/ExcelPrintModule';
import instance from './../../api/axios';
import MgmtMenu from './mgmtTable/Mgmt_1TopMenu';
import CustomerStatusPagination from './modules/PaginationModule';


const CusMgmt = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const [onAddMode, setOnAddMode] = useState(false);
  const [onUpdateMode, setOnUpdateMode] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowData, setEditingRowData] = useState({});
  //검색
  const [searchKeyword, setSearchKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchedData, setSearchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  //페이지 네이션 데이터
  const [pageData, setPageData] = useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(true);
  //테이블 데이터
  const [filename, setFilename] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [formData, setFormData] = useState({});
  //모달 데이터
  const [showModal_viewDetail, setShowModal_viewDetail] = React.useState(false);
  const [modalData_viewDetail, setModalData_viewDetail] = React.useState({});
  const [showModal_deleteCheck, setShowModal_deleteCheck] = React.useState(false);
  const [showModal_editRowsSelectAlert, setShowModal_editRowsSelectAlert] = React.useState(false);
  
  useEffect(() => {
    const savedRowsPerPage = localStorage.getItem('CusMgmtRowsPerPage');
    if (savedRowsPerPage) {
      setRowsPerPage(Number(savedRowsPerPage));
    }

    const fetchData = async () => {
      try {
        const response = await instance.get('/customer/getAllList');
        setData(response.data);
        setFilteredData(response.data); 
        setTotalItems(response.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // 데이터 로드 완료 후 로딩 상태 false로 설정
      }
    };

    fetchData();

  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setFilteredData(data.slice(startIndex, endIndex));
    setTotalItems(data.length); // 데이터 변경 시 totalItems 재설정
  }, [data, currentPage, rowsPerPage]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fetchPageData = async () => {
    try {
      const response_pageData = await instance.post(`/customer/getAllList?page=${currentPage - 1}&size=${rowsPerPage}`);
      const page = response_pageData.data;
      const formattedPageData = page.content.map(item => ({
        ...item,
        registerDate: formatDate(item.registerDate),
        customerBirthDate: formatDate(item.customerBirthDate)
      }));
      setPageData(formattedPageData);
      setFilteredData(formattedPageData);
      setTotalItems(page.totalElements);

    } catch (error) {
      console.error('Error get MgmtTable:', error);
    }
  }

  useEffect(() => {
    fetchPageData();
  }, [currentPage, rowsPerPage]);

  const handleSaveClick = async () => {
    try {
      const response = await instance.put(`/customer/info/${editingRowId}`, editingRowData);

      const customerId = editingRowData.customerId;

      const newGradeData = {
        customerId,
        customerGrade: editingRowData.customerGrade || '일반', // 기본값 설정
      };

      const responseGrade = await instance.put(`/customer/grade/${customerId}`, newGradeData);
      console.log('Customer Grade Update Response:', responseGrade.data);
      const newNotesData = {
        customerId,
        notesDate: new Date().toISOString().split('T')[0],
        notes: editingRowData.customerNotes || '', // 기본값 설정
      };

      const responseNotes = await instance.post(`/customer/saveNotes`, newNotesData);

      setData(prevRows =>
        prevRows.map(row =>
          row.customerId === customerId ? { ...row, ...editingRowData } : row
        )
      );
      setEditingRowId(null);
      setEditingRowData({});
      setOnUpdateMode(false);

      window.location.reload();

    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleAddClick = async () => {
    try {
      // 필요한 필드 값 설정
      const newCustomerData = {
        customerName: editingRowData.customerName || '',
        customerGender: editingRowData.customerGender || '',
        customerBirthDate: editingRowData.customerBirthDate || '',
        customerAddr: editingRowData.customerAddr || '',
        customerTel: editingRowData.customerTel || '',
        registerDate: editingRowData.registerDate || new Date().toISOString().split('T')[0], // 현재 날짜 사용
      };

      const response = await instance.post(`/customer/add`, newCustomerData);
      const customerId = response.data.customerId;
      const newGradeData = {
        customerId,
        customerGrade: editingRowData.customerGrade || '일반', // 기본값 설정
      };

      const responseGrade = await instance.put(`/customer/grade/${customerId}`, newGradeData);

      const newNotesData = {
        customerId,
        notesDate: new Date().toISOString(),
        notes: editingRowData.customerNotes || '', // 기본값 설정
      };

      let responseNotes= { data: { notes: '' } };
      if (editingRowData.customerNotes) {
        newNotesData = {
          customerId,
          notesDate: new Date().toISOString().split('T')[0],
          notes: editingRowData.customerNotes,
        };
        responseNotes = await instance.post(`/customer/saveNotes`, newNotesData);
      }
      if (editingRowData.customerBirthDate) {
        await instance.get(`/customer/calculate_age_group`, newCustomerData);
      }
      if (editingRowData.customerAddr) {
        await instance.get(`/customer/calculate_region_group`, newCustomerData);
      }
      const savedCustomerData = response.data;
      const savedCustomerGrade = responseGrade.data;
      const savedCustomerNotes = responseNotes.data;

      setData(prevRows => [
        ...prevRows,
        {
          ...savedCustomerData,
          customerGrade: savedCustomerGrade.customerGrade,
          customerNotes: savedCustomerNotes.notes,
        },
      ]);

      setEditingRowId(null);
      setEditingRowData({});
      setOnAddMode(false); 

      window.location.reload();

    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const selectedCustomerIds = Object.keys(selectedRows).filter(customerId => selectedRows[customerId]);
      for (const customerId of selectedCustomerIds) {
        await instance.delete(`/customer/delete/${customerId}`);
      }
      setData(prevData => prevData.filter(item => !selectedRows[item.customerId]));
      setSelectedRows({});
      setShowModal_deleteCheck(false);

      window.location.reload();

    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  
  const handleCheckboxChange = useCallback((customerId, checked) => {
    setSelectedRows((prevSelectedRows) => ({
      ...prevSelectedRows,
      [customerId]: checked,
    }));
  }, []);

  const fetchSearchResults = async (keyword, startDate, endDate) => {
    try {
      let searchResults = [];
      let periodResults = [];

    // 키워드 검색 요청
    if (keyword) {
      const response_keyword = await instance.get(`/customer/searchKeyword?keyword=${keyword}`);
      searchResults = response_keyword.data.map(item => ({
        ...item,
        registerDate: formatDate(item.registerDate),
        customerBirthDate: formatDate(item.customerBirthDate)
      }));
    }

    // 기간 검색 요청
    if (startDate && endDate) {
      const response_period = await instance.get(`/customer/searchPeriod?startDate=${startDate}&endDate=${endDate}`);
      periodResults = response_period.data.map(item => ({
        ...item,
        registerDate: formatDate(item.registerDate),
        customerBirthDate: formatDate(item.customerBirthDate)
      }));
    }

      // 검색 결과 결합
    let combinedResults = searchResults;
    if (startDate && endDate) {
      const periodIds = new Set(periodResults.map(item => item.customerId));
      combinedResults = searchResults.filter(item => periodIds.has(item.customerId));
    }

    setFilteredData(combinedResults.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
    setTotalItems(combinedResults.length);
    setCurrentPage(1);
    
    } catch (error) {
      console.error('Error fetchSearchResults:', error);
    }
  };

  useEffect(() => {
    if (searchKeyword || startDate || endDate) {
      fetchSearchResults(searchKeyword, startDate, endDate);
    } else {
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      setFilteredData(data.slice(startIndex, endIndex));
      setTotalItems(data.length);
    }
  }, [searchKeyword, data, startDate, endDate]);

  const isAnyRowSelected = Object.values(selectedRows).some(checked => checked);
  
  if (loading) {
    return <div>Loading...</div>; // 로딩 중 상태 표시
  }
  
  const handleSearch = () => {
    setCurrentPage(1);
    fetchSearchResults(searchKeyword, startDate, endDate);
  };

  return (
    <div>
      <div className="Middle classification">
        <h3>회원 관리</h3>
      </div>
      <hr />
      <MgmtMenu
        data={data}
        setRowsPerPage={setRowsPerPage}
        handleDeleteClick={handleDeleteClick}
        handleSaveClick={handleSaveClick}
        handleAddClick={handleAddClick}
        isAnyRowSelected={isAnyRowSelected}
        onUpdateMode={onUpdateMode}
        onAddMode={onAddMode}
        editingRowId={editingRowId}
        setEditingRowId={setEditingRowId}
        setOnUpdateMode={setOnUpdateMode}
        setOnAddMode={setOnAddMode}
        selectedRows={selectedRows}
        setEditingRowData={setEditingRowData}

        showModal_deleteCheck={showModal_deleteCheck}
        setShowModal_deleteCheck={setShowModal_deleteCheck}
        showModal_editRowsSelectAlert={showModal_editRowsSelectAlert}
        setShowModal_editRowsSelectAlert={setShowModal_editRowsSelectAlert}

        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate} 
        setEndDate={setEndDate}
        onSearch={handleSearch}
      />

      <MgmtTable
        data={filteredData}
        setData={setData}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onAddMode={onAddMode}
        onUpdateMode={onUpdateMode}
        setOnUpdateMode={setOnUpdateMode}
        onCheckboxChange={handleCheckboxChange}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        editingRowId={editingRowId}
        editingRowData={editingRowData}
        setEditingRowData={setEditingRowData}
        setColumns={setColumns}
        setFilename={setFilename}
        formatDate={formatDate}
        setCurrentPage={setCurrentPage}

        // handleModalSave={handleModalSave}
        setModalData_viewDetail={setModalData_viewDetail}
        modalData_viewDetail={modalData_viewDetail}
        setShowModal_viewDetail={setShowModal_viewDetail}
        showModal_viewDetail={showModal_viewDetail}

        searchKeyword={searchKeyword}
        startDate={startDate}
        endDate={endDate} 
      />
      <div className='row'>
        <div className='col-10 col-md-8'>
          <CustomerStatusPagination
            totalItems={totalItems}
            itemsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
        <div className='col-2 col-md-4'>
        <div className="excel-print">
          <ExcelPrint 
            printData={filteredData} 
            columns={columns} 
            filename={filename} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default CusMgmt;
