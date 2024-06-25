import React, { useMemo, useCallback, useState, useEffect } from 'react';

import { useTable } from 'react-table';
import Checkbox from './Checkbox';


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

  useEffect(() => {
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

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    if (editIndex !== null) {
      fetch(`/api/customers/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(updatedItem => {
          setData(prevData => {
            const updatedData = [...prevData];
            updatedData[editIndex] = { ...updatedItem, checked: false };
            return updatedData;
          });
        })
        .catch(error => console.error('Error updating row:', error));
    } else {
      fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(newItem => {
          setData(prevData => [...prevData, { ...newItem, checked: false }]);
        })
        .catch(error => console.error('Error adding row:', error));
    }
    setShowModal(false);
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

  
  const columns = useMemo(
    () => [
      {
        Header: '선택',
        accessor: 'index',
        Cell: ({ row }) => (
          <Checkbox
            checked={row.original.checked}
            onChange={() => handleCheckboxChange(row.index)}
          />
        ),      
      },
      { Header: 'ID', accessor: 'id' },
      { Header: '이름', accessor: 'name' },
      { Header: '성별', accessor: 'gender' },
      { Header: '연락처', accessor: 'contact' },
      { Header: '생년월일', accessor: 'dob' },
      { Header: '가입일', accessor: 'joinDate' },
      { Header: '회원등급', accessor: 'membership' },
      { Header: '특이사항', accessor: 'notes' },
    ],
    [handleCheckboxChange]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredData,
    data: filteredData,
  });

  return (
    <div>
      <div className="Middle classification">
        <span>회원 관리</span>
      </div>
    
      <hr />

      <div className="subTitle">
        <button className="edit-button" onClick={handleEditRows}>
          수정
        </button>
        <button className="add-button" onClick={handleAddRow}>
          추가
        </button>
        <button className="delete-button" onClick={handleDeleteRows}>
          삭제
        </button>
        <button className="edit-button" onClick={handleEditRows}>
          수정
        </button>
        <button className="add-button" onClick={handleAddRow}>
          추가
        </button>
        <button className="delete-button" onClick={handleDeleteRows}>
          삭제
        </button>
      </div>

      <br />

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

      <hr />


      <hr />

      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="table-row">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>ID:</label>
                  <input type="text" className="form-control" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>이름:</label>
                  <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>성별:</label>
                  <input type="text" className="form-control" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>연락처:</label>
                  <input type="text" className="form-control" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>생년월일:</label>
                  <input type="text" className="form-control" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>가입일:</label>
                  <input type="text" className="form-control" value={formData.joinDate} onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>회원등급:</label>
                  <input type="text" className="form-control" value={formData.membership} onChange={(e) => setFormData({ ...formData, membership: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>특이사항:</label>
                  <input type="text" className="form-control" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>ID:</label>
                  <input type="text" className="form-control" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>이름:</label>
                  <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>성별:</label>
                  <input type="text" className="form-control" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>연락처:</label>
                  <input type="text" className="form-control" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>생년월일:</label>
                  <input type="text" className="form-control" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>가입일:</label>
                  <input type="text" className="form-control" value={formData.joinDate} onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>회원등급:</label>
                  <input type="text" className="form-control" value={formData.membership} onChange={(e) => setFormData({ ...formData, membership: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>특이사항:</label>
                  <input type="text" className="form-control" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CusMgmt;
