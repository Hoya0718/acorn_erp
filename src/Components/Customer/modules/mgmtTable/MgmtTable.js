import React, { useMemo, useCallback, useState, useEffect } from 'react';
import instance from './../../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import CustomerStatusPagination from '../modules/PaginationModule';
import ViewDetailsModal from '../viewDetailsModal/viewDetailsModal';

const MgmtTable = ({ rowsPerPage }) => {
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [rows, setRows] = React.useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
          // const notesInfo = data_notes.find(CustomerNotes => CustomerNotes.customerId === customer.customerId);
          const notes = data_notes.filter(note => note.customerId === customer.customerId);
          return {
            ...customer,
            customerGrade: gradeInfo ? gradeInfo.customerGrade : '-',
            // customerNotes: notesInfo ? notesInfo.notes : '-',
            // customerNotes: notes,
            customerNotes: notes.length ? notes : [{ notes: '-' }],
          };
        });
        setRows(mergedData);
        console.log(rows[columns.accessor==='customerNotes'])
        
        //페이지네이션 데이터
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
    fetchTableData();
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    setSelectedRows({});
    setSelectAll(false);
  }, [data]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedRows = {};
    if (newSelectAll) {
      filteredData.forEach((_, index) => {
        newSelectedRows[index] = true;
      });
    }
    setSelectedRows(newSelectedRows);
  };

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
  useEffect(() => {
    setFilteredData(rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
  }, [rows, currentPage, rowsPerPage]);

  const handleRowSelect = (index) => {
    const newSelectedRows = { ...selectedRows };
    if (newSelectedRows[index]) {
      delete newSelectedRows[index];
    } else {
      newSelectedRows[index] = true;
    }
    setSelectedRows(newSelectedRows);
  };

  const handleNameClick = (rowData) => {
    setModalData(rowData);
    setShowModal(true);
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
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td className="table-centered">
                <input
                  type="checkbox"
                  checked={selectedRows[index] || false}
                  onChange={() => handleRowSelect(index)}
                />
              </td>
              {columns.map((column) => (
                <td
                  key={column.accessor} className={column.className || 'table-centered'}
                  onClick={column.isName ? () => handleNameClick(row) : undefined}
                  style={column.isName ? { cursor: 'pointer', textDecoration: 'underline' } : undefined}>
                 {column.accessor === 'customerNotes' ? (
                   Array.isArray(row[column.accessor]) && row[column.accessor].length > 0
                   ? row[column.accessor][0].notes || '-'
                   : '-'
                  ) : (
                    row[column.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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

export default MgmtTable;
