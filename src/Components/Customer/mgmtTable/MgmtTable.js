import React, { useMemo, useCallback, useState, useEffect } from 'react';
import instance from './../../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import CustomerStatusPagination from '../modules/PaginationModule';

const MgmtTable = () => {
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [rows, setRows] = React.useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지당 아이템 수

  const columns = useMemo(() => [
    { header: 'ID', accessor: 'customerId' },
    { header: '이름', accessor: 'customerName' },
    { header: '성별', accessor: 'customerGender' },
    { header: '연락처', accessor: 'customerTel' },
    { header: '생년월일', accessor: 'customerBirthDate' },
    { header: '주소', accessor: 'customerAddr' },
    { header: '가입일', accessor: 'registerDate' },
    { header: '회원등급', accessor: 'membership' },
    { header: '특이사항', accessor: 'notes' },
  ], []);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response_tableData = await instance.get('/customer/getAllList');
        const data = response_tableData.data;
        // console.log("data", data);
        setRows(data);

        const response_pageData = await instance.post(`/customer/getAllList?page=${currentPage - 1}&size=${itemsPerPage}`);
        const page = response_pageData.data;
        setPageData(page.content)
        setFilteredData(page.content);
        setTotalItems(page.totalElements);

      } catch (error) {
        console.error('Error get MgmtTable:', error);
      }
    }
    fetchTableData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    setSelectedRows({});
    setSelectAll(false);
  }, [data]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedRows = {};
    if (newSelectAll) {
      data.forEach((row, index) => {
        newSelectedRows[index] = true;
      });
    }
    setSelectedRows(newSelectedRows);
  };
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
    }

      setSortConfig({ key, direction });

      if (direction) {
        const sortedData = [...filteredData].sort((a, b) => {
          if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
          if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
          return 0;
        });
        setFilteredData(sortedData);
      } else {
        setFilteredData(data);
      }
    };

    const handleRowSelect = (index) => {
      const newSelectedRows = { ...selectedRows };
      if (newSelectedRows[index]) {
        delete newSelectedRows[index];
      } else {
        newSelectedRows[index] = true;
      }
      setSelectedRows(newSelectedRows);
    };

    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = UseTable({
    //   columns,
    //   data: filteredData,
    //   data: filteredData,
    // });

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
                  {sortConfig.key === column.key && (
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
                  <td key={column.accessor} className={column.className || 'table-centered'}>
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <CustomerStatusPagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }

  export default MgmtTable;
