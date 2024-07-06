import React, { useMemo, useState, useEffect } from 'react';
import instance from '../../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ViewDetailsModal from './viewDetailsModal/viewDetailsModal';

const MgmtTable = ({
  data, 
  rowsPerPage, currentPage, setCurrentPage,
  onAddMode, onUpdateMode, 
  onCheckboxChange, selectedRows, setSelectedRows,
  editingRowId, setEditingRowId, editingRowData, setEditingRowData, 
  setColumns, setFilename, formatDate, handlePageChange,
  handleModalSave,
  modalData_viewDetail, setModalData_viewDetail,
  showModal_viewDetail, setShowModal_viewDetail
 
}) => {
  //테이블 데이터 
  const [filteredData, setFilteredData] = useState(data);
  const [rows, setRows] = React.useState([]); 
  //데이터 선택
  const [selectAll, setSelectAll] = useState(false);
  //데이터 정렬
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [filename] = useState("고개관리 테이블");
  
  useEffect(() => {
    setFilename(filename);
  }, [filename, setFilename]);

  const columns = useMemo(() => [
    { header: 'ID', accessor: 'customerId' },
    { header: '이름', accessor: 'customerName', isName: true },
    { header: '성별', accessor: 'customerGender' },
    { header: '연락처', accessor: 'customerTel' },
    { header: '생년월일', accessor: 'customerBirthDate' },
    { header: '주소', accessor: 'customerAddr' },
    { header: '가입일', accessor: 'registerDate' },
    { header: '회원등급', accessor: 'customerGrade' },
    { header: '특이사항', accessor: 'customerNotes' },
  ], []);

  useEffect(() => {
    setColumns(columns);
  }, [columns, setColumns]);

  const fetchTableData = async () => {
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
        };
      });
      setRows(mergedData);
    } catch (error) {
      console.error('Error fetching MgmtTable:', error);
    }
  };
    
  useEffect(() => {
    fetchTableData();
  }, []);

  useEffect(() => {
    setFilteredData(rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
  }, [rows, currentPage, rowsPerPage]);

  useEffect(() => {
    setSelectedRows({});
    setSelectAll(false);
  }, [data]);

  //체크박스: 전체 행 선택
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedRows = {};
    if (newSelectAll) {
      filteredData.forEach(item => {
        newSelectedRows[item.customerId] = true;
      });
    }
    setSelectedRows(newSelectedRows);
    filteredData.forEach(item => {
      onCheckboxChange(item.customerId, newSelectAll);
    });
  };
  //체크박스: 선택한 행 선택
  const handleRowSelect = (customerId, isSelected) => {
    const newSelectedRows = { ...selectedRows };

    console.log("handleRowSelect 실행")
    
    if (isSelected) {
      newSelectedRows[customerId] = true;
    } else {
      delete newSelectedRows[customerId];
    }
    setSelectedRows(newSelectedRows);
    onCheckboxChange(customerId, isSelected);
  };
  //제목행 컬럼 선택: 정렬
  const handleSort = (key) => {
    let direction = 'ascending';
    setCurrentPage(1);
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = 'none';
      }
    }

    setSortConfig({ key, direction });
    let sortedRows = [...rows];
    if (direction !== 'none') {
      sortedRows.sort((a, b) => {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    setRows(sortedRows);
    setFilteredData(sortedRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
  };

  //각 행 중 특정컬럼선택시 모달창 보기
  const handleNameClick = (rowData) => {
    setModalData_viewDetail(rowData);
    setShowModal_viewDetail(true);
  };
  
  //수정 모드 및 추가 모드에서 입력 데이터
  const handleInputChange = (e, accessor) => {
    setEditingRowData({
      ...editingRowData,
      [accessor]: e.target.value,
    });
   
  };

  return (
    <div className="customer-status-table">
      <table className="table table-hover" style={{ wordBreak: 'break-all' }}>
        <thead>
          <tr>
            <th scope="col" className="table-centered">
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                id="flexCheckDefault"
              />
            </th>
            {columns.map((column) => (
              <th
                scope="col"
                className="table-centered"
                key={column.accessor}
                onClick={() => handleSort(column.accessor)}
              >
                {column.header}
                {sortConfig.key === column.accessor && (
                  sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faCaretDown} /> :
                    sortConfig.direction === 'descending' ? <FontAwesomeIcon icon={faCaretUp} /> : ''
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-group-divider">

          {/* 등록모드 */}
          {onAddMode && (
            <tr>
               <td className="table-centered"></td>
               {columns.map((column) => (
             <td key={column.accessor} className={column.className || 'table-centered'}>
                  {column.accessor === 'customerId' ? (
                    <input type="text" value="자동 생성" className="form-control" readOnly />
                  ) : column.accessor === 'customerBirthDate' ? (
                    <input
                      type="date"
                      className="form-control"
                      name={column.accessor}
                      value={editingRowData[column.accessor] || ''}
                      onChange={(e) => handleInputChange(e, column.accessor)}
                    />
                  ) : column.accessor === 'registerDate' ? (
                    <input
                      type="date"
                      className="form-control"
                      name={column.accessor}
                      value={new Date().toISOString().split('T')[0]}
                    />
                   ) : column.accessor === 'customerGrade' ? (
                      <select
                        className="form-control"
                        name={column.accessor}
                        value={editingRowData[column.accessor] !== undefined ? editingRowData[column.accessor] : '일반'}
                        onChange={(e) => handleInputChange(e, column.accessor)}
                      >
                        <option value="">등급 선택</option>
                        <option value="우수">우수</option>
                        <option value="주의">주의</option>
                        <option value="일반">일반</option>
                      </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={column.header}
                      className="form-control"
                      name={column.accessor}
                      value={editingRowData[column.accessor] || ''}
                      onChange={(e) => handleInputChange(e, column.accessor)}
                    />

                  )}
                </td>
              ))}
            </tr>
          )}

          {/* 수정모드 */}
          {onUpdateMode && (
            <tr>
             <td className="table-centered"></td>
              {columns.map((column) => (
                <td 
                  key={column.accessor} 
                  className={column.className || 'table-centered'}>
                  {column.accessor === 'customerId' ? (
                    <input type="text" value={editingRowData[column.accessor] || '자동 생성'} className="form-control" readOnly />
                  ) : column.accessor === 'customerBirthDate' ? (
                    <input
                      type="date"
                      className="form-control"
                      name={column.accessor}
                      value={editingRowData[column.accessor] || ''}
                      onChange={(e) => handleInputChange(e, column.accessor)}
                    />
                  ) : column.accessor === 'registerDate' ? (
                    <input
                      type="date"
                      className="form-control"
                      name={column.accessor}
                      value={editingRowData[column.accessor] || new Date().toISOString().split('T')[0]}
                      readOnly
                    />
                  ) : column.accessor === 'customerGender' ? (
                    <select
                      className="form-control"
                      name={column.accessor}
                      value={editingRowData[column.accessor] || ''}
                      onChange={(e) => handleInputChange(e, column.accessor)}
                    >
                      <option value="">성별 선택</option>
                      <option value="남성">남성</option>
                      <option value="여성">여성</option>
                    </select>
                  ) : column.accessor === 'customerGrade' ? (
                    <select
                      className="form-control"
                      name={column.accessor}
                      value={editingRowData[column.accessor] || ''}
                      onChange={(e) => handleInputChange(e, column.accessor)}
                    >
                      <option value="">등급 선택</option>
                      <option value="우수">우수</option>
                      <option value="주의">주의</option>
                      <option value="일반" selected >일반</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={column.accessor}
                      value={editingRowData[column.accessor] || ''}
                      className="form-control"
                      onChange={(e) => handleInputChange(e, column.accessor)}
                    />
                  )}
                </td>
              ))}
            </tr>
          )}

          {/* 테이블데이터렌더링 */}
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td className="table-centered">
                <input
                  type="checkbox"
                  checked={selectedRows[row.customerId] || false}
                  onChange={() => handleRowSelect(row.customerId, !selectedRows[row.customerId])}
                />
              </td>
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={column.className || 'table-centered'}
                    onClick={column.isName ? () => handleNameClick(row) : undefined}
                    style={column.isName ? { cursor: 'pointer', textDecoration: 'underline' } : undefined}
                  >
                    <input
                      type="text"
                      style ={{border : 'none'}}
                      // onDoubleClick={handleDoubleEditmodeClick}
                      value={column.accessor === 'customerNotes' ? (
                        Array.isArray(row[column.accessor]) && row[column.accessor].length > 0
                          ? row[column.accessor][0].notes || '-'
                          : '-'
                      ) : (
                        row[column.accessor]
                      )}
                      readOnly
                    />
                  </td>
                ))}
              {/* )} */}
            </tr>
          ))}
        </tbody>
      </table>
      {showModal_viewDetail && (
        <ViewDetailsModal
          show={showModal_viewDetail}
          onHide={() => setShowModal_viewDetail(false)}
          data={modalData_viewDetail}
          onSave={handleModalSave}
        />)}
    </div>
  );
}

export default MgmtTable;
