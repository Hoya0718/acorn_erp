import React, { useMemo, useCallback, useState, useEffect } from 'react';
import MgmtTable from './mgmtTable/MgmtTable'
import ExcelPrint from '../Customer/modules/ExcelPrint';
import instance from './../../api/axios';
import MgmtMenu from './mgmtTable/MgmtMenu';
import CustomerStatusPagination from './modules/PaginationModule';


const CusMgmt = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [onAddMode, setOnAddMode] = useState(false);
  const [onUpdateMode, setOnUpdateMode] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowData, setEditingRowData] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState({});

  const [columns, setColumns] = useState([]);
  const [filename, setFilename] = useState('');

  //페이지 네이션 데이터
  const [pageData, setPageData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleCheckboxChange = useCallback((customerId, checked) => {
    setData(prevData => {
      return prevData.map(item =>
        item.customerId === customerId ? { ...item, checked } : item
      );
    });
  }, []);

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
  


  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = Number(event.target.value);
    setRowsPerPage(newRowsPerPage);
    localStorage.setItem('CusMgmtRowsPerPage', newRowsPerPage);  // 행수 저장
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddModeClick = () => {
    setOnAddMode(true); // 추가 모드 활성화
  };

  const handleCloseClick = () => {
    setOnAddMode(false); // 추가 모드 비활성화
    setOnUpdateMode(false);
  };

  const handleEditModeClick = () => {
    const selectedCustomerIds = Object.keys(selectedRows).filter(customerId => selectedRows[customerId]);

    if (selectedCustomerIds.length > 0) {
      setEditingRowId(selectedCustomerIds[0]); // 첫 번째 선택된 ID를 설정
      const rowData = data.find(row => row.customerId.toString() === selectedCustomerIds[0].toString());
      if (rowData) {
        setEditingRowData(rowData); // editingRowData를 올바르게 설정
        setOnUpdateMode(true);
      } else {
        console.log("Selected row data not found");
      }
    }
  }

  const handleDeleteClick = async () => {
    try {
      const selectedCustomerIds = Object.keys(selectedRows).filter(customerId => selectedRows[customerId]);
      for (const customerId of selectedCustomerIds) {
        await instance.delete(`/customer/delete/${customerId}`);
      }
      setData(prevData => prevData.filter(item => !selectedRows[item.customerId]));
      setSelectedRows({});
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
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
        console.log('New Notes Data:', newNotesData);

        const responseNotes = await instance.post(`/customer/saveNotes`, newNotesData);

        setData(prevRows =>
          prevRows.map(row =>
            row.customerId === customerId ? { ...row, ...editingRowData } : row
          )
        );
        setEditingRowId(null);
        setEditingRowData({});
        setOnUpdateMode(false);

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
      const responseNotes = await instance.post(`/customer/saveNotes`, newNotesData);

      await instance.get(`/customer/calculate_age_group`, newCustomerData);
      await instance.get(`/customer/calculate_region_group`, newCustomerData);

      const savedCustomerData = response.data;
      const savedCustomerGrade = responseGrade.data;
      const savedCustomerNotes = responseNotes.data;

      // 로컬 상태를 업데이트하여 새 데이터를 포함하도록 설정
      setData(prevRows =>
        [...prevRows,
        {
          ...savedCustomerData,
          customerGrade: savedCustomerGrade.customerGrade,
          customerNotes: savedCustomerNotes.notes
        }
        ]);

      // 폼을 초기화
      setEditingRowId(null);
      setEditingRowData({});
      setOnAddMode(false);

    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };
  const isAnyRowSelected = Object.values(selectedRows).some(checked => checked);

  return (
    <div>
      <div className="Middle classification">
        <span>회원 관리</span>
      </div>
      <hr />
      <MgmtMenu 
        setRowsPerPage={setRowsPerPage}
        handleAddModeClick={handleAddModeClick}
        handleEditModeClick={handleEditModeClick}
        handleDeleteClick={handleDeleteClick}
        handleSaveClick={handleSaveClick}
        handleCloseClick={handleCloseClick}
        handleAddClick={handleAddClick}
        isAnyRowSelected={isAnyRowSelected}
        onUpdateMode={onUpdateMode}
        onAddMode={onAddMode}
      />
       
      <MgmtTable
        data={filteredData}
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
      />
      <CustomerStatusPagination
        totalItems={totalItems}
        itemsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ExcelPrint printData={filteredData} columns={columns} filename={filename}/>
    </div>
  );
};

export default CusMgmt;
