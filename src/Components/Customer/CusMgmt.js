import React, { useMemo, useCallback, useState, useEffect } from 'react';
import MgmtTable from './mgmtTable/MgmtTable'
// import ExcelPrint from '../Stock/Vendor/';
import instance from './../../api/axios';


const CusMgmt = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [onAddMode, setOnAddMode] = useState(false);
  const [onUpdateMode, setOnUpdateMode] = useState(false);
  const [editingRowId, setEditingRowId] = useState([]);
  const [editingRowData, setEditingRowData] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = useState({});

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

  const handleCheckboxChange = useCallback((customerId, checked) => {
    setData(prevData => {
      return prevData.map(item =>
        item.customerId === customerId ? { ...item, checked } : item
      );
    });
  }, []);

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
      for (let customerId of editingRowId) {
        const response = await instance.put(`/customer/info/${customerId}`, editingRowData);
        console.log(editingRowData)

        customerId = editingRowData.customerId;

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

        console.log('Customer Notes Save Response:', responseNotes.data);
        setData(prevRows =>
          prevRows.map(row =>
            row.customerId === customerId ? { ...row, ...editingRowData } : row
          )
        );
        setEditingRowId(null);
        setEditingRowData({});
        setOnUpdateMode(false);
      }
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

      console.log("handleAddClick ", savedCustomerData);
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
      <div className='items-subTitle'>
        <div className='items-subTitle'>
          <div className='items-subTitle'>
            <span>
              {!onUpdateMode && isAnyRowSelected ? (
                <>
                  <button onClick={handleEditModeClick}>수정</button>
                  <button onClick={handleDeleteClick}>삭제</button>
                </>
              ) : null}
              {onUpdateMode && isAnyRowSelected ? (
                <>
                  <button onClick={() => handleSaveClick(data.customerId)}>수정 확인</button>
                  <button onClick={handleCloseClick}>취소</button>
                </>
              ) :
                null
              }
              {onAddMode && !isAnyRowSelected ? (
                <>
                  <button onClick={() => handleAddClick(data)}> 등록 확인</button>
                  <button onClick={handleCloseClick}>취소</button>
                </>
              ) : null
              }
              {!onAddMode && !onUpdateMode && !isAnyRowSelected ? (
                <button onClick={handleAddModeClick}>등록</button>
              ) : null}
            </span>
          </div>
        </div>
      </div>

      <br />
      <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
        <option value={10}>10줄 보기</option>
        <option value={20}>20줄 보기</option>
        <option value={30}>30줄 보기</option>
        <option value={40}>40줄 보기</option>
        <option value={50}>50줄 보기</option>
      </select>
      <div className="searcher">
        <div className="left">
          <label htmlFor="date">
            날짜를 선택하세요:

            <input type="date" id="date" max="2077-06-20" min="2077-06-05" value="2024-06-18" />
          </label>
        </div>

        <div className="right">
          <input
            type="text"
            className="search-input"
            placeholder="검색"
            value={searchTerm}
            onChange={() => { }}
          />
          <button className="search-button" onClick={() => { }}>조회</button>
        </div>
      </div>
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
        editingRowId={editingRowId}  // 추가된 부분
        editingRowData={editingRowData}  // 추가된 부분
        setEditingRowData={setEditingRowData}  // 추가된 부분
      />
      {/* 엑셀&인쇄 */}
      {/* <div className="excel-print">
          <ExcelPrint vendors={filteredData} />
        </div> */}
    </div>
  );
};

export default CusMgmt;
