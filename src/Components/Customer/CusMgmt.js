import React, { useMemo, useCallback, useState, useEffect } from 'react';
import MgmtTable from './mgmtTable/MgmtTable'
import ExcelPrint from '../Stock/Vendor/ExcelPrint';
import instance from './../../api/axios';


const CusMgmt = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [onAddMode, setOnAddMode, onUpdateMode, setOnUpdateMode] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    const savedRowsPerPage = localStorage.getItem('CusMgmtRowsPerPage');
    if (savedRowsPerPage) {
      setRowsPerPage(Number(savedRowsPerPage));
    }

    fetch('/api/customers')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));

  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleCheckboxChange = useCallback((index) => {
    setData(prevData => {
      const updatedData = prevData.map((item, pos) =>
        pos === index ? { ...item, checked: !item.checked } : item
      );
      return updatedData;
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

  const handleAddClick = () => {
    setOnAddMode(true); // 추가 모드 활성화
  };
  const handleUpdateClick = () => {
    setOnUpdateMode(true); // 추가 모드 활성화
  };
  const handleEditClick = () => {
    setOnAddMode(false); // 추가 모드 비활성화
    setOnUpdateMode(false); // 추가 모드 비활성화
  };
  
  const handleDeleteClick = async () => {
    try {
      console.log("v", filteredData)
      const responseDelete = await instance.delete(`/customer/delete/${formData.customerId}`);
    } catch (error) {
      console.error('Error saving changes:', error);
  }

  };
  return (
    <div>
      <div className="Middle classification">
        <span>회원 관리</span>
      </div>

      <hr />
      <div className='items-subTitle'>
        <div className='items-subTitle'>
          <span>
            <button onClick={handleAddClick}>등록</button>
            <>
              <button onClick={handleUpdateClick}>수정</button>
              <button onClick={handleDeleteClick}>삭제</button>
            </>
            <button onClick={handleEditClick}>취소</button>
          </span>
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
      />
      {/* 엑셀&인쇄 */}
      <div className="excel-print">
        <ExcelPrint vendors={filteredData} />
      </div>
    </div>
  );
};

export default CusMgmt;
