import React, { useMemo, useCallback, useState, useEffect } from 'react';
import MgmtTable from './mgmtTable/MgmtTable'


const CusMgmt = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    contact: '',
    dob: '',
    joinDate: '',
    membership: '',
    notes: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
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

  const handleDeleteRows = () => {
    const idsToDelete = data.filter(item => item.checked).map(item => item.id);

    fetch('/api/customers', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idsToDelete),
    })
      .then(response => {
        if (response.ok) {
          setData(prevData => prevData.filter(item => !item.checked));
        } else {
          console.error('Failed to delete rows');
        }
      })
      .catch(error => console.error('Error deleting rows:', error));
  };

  const handleAddRow = () => {
    setEditIndex(null);
    setFormData({
      id: '',
      name: '',
      gender: '',
      contact: '',
      dob: '',
      joinDate: '',
      membership: '',
      notes: '',
    });
    setShowModal(true);
  };

  const handleEditRows = () => {
    const selectedRow = data.findIndex(item => item.checked);
    if (selectedRow !== -1) {
      setEditIndex(selectedRow);
      setFormData(data[selectedRow]);
      setShowModal(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };


  return (
    <div>
      <div className="Middle classification">
        <span>회원 관리</span>
      </div>

      <hr />

      <div className="subTitle">
        <button className="edit-button btn " onClick={handleEditRows}>
          수정
        </button>
        <button className="add-button btn " onClick={handleAddRow}>
          추가
        </button>
        <button className="delete-button btn " onClick={handleDeleteRows}>
          삭제
        </button>
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
            onChange={handleSearchChange}
          />
          <button className="search-button" onClick={handleSearch}>조회</button>
        </div>
      </div>
      <MgmtTable 
        data={filteredData} 
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        />
    </div>
  );
};

export default CusMgmt;
