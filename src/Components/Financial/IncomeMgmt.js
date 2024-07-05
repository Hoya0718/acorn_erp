import React, { useState, useEffect } from 'react';
import './Financial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPrint } from '@fortawesome/free-solid-svg-icons';
import TableComponent from './TableComponent';
import IncomeRegistrationModal from './IncomeRegistrationModal';

const FinanceTable = () => {
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    const apiEndpoint = 'http://localhost:9099/api/financials/a';
    
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        if (Array.isArray(data)) {
          setFinancialData(data);
        } else {
          console.error('Expected array data, received:', data);
        }
      })
      .catch(error => console.error('Error fetching financial data:', error));
  }, []);


  
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const toggleAllCheckboxes = () => {
    const updatedData = financialData.map(row => ({ ...row, checked: !financialData.every(row => row.checked) }));
    setFinancialData(updatedData);
  };

  const toggleSingleCheckbox = (index) => {
    const updatedData = [...financialData];
    updatedData[index] = { ...updatedData[index], checked: !updatedData[index].checked };
    setFinancialData(updatedData);
  };

  const [formData, setFormData] = useState({
    "proNo": '',
    "proDsc": '',
    "pronm": '',
    "cusnm": '',
    "proDtm": '',
    "paySts": '완료',
    "pay": '',
    "unitPay": '',
    "proNumber": '',
    "etc": '',
  });
  
  const columns = [
    { header: "상품번호", key: "proNo" },
    { header: "상품구분", key: "proDsc" },
    { header: "상품명", key: "pronm" },
    { header: "매입처", key: "cusnm" },
    { header: "거래일시", key: "proDtm" },
    { header: "결제상태", key: "paySts" },
    { header: "금액", key: "pay" },
    { header: "단가", key: "unitPay" },
    { header: "수량", key: "proNumber" },
    { header: "특이사항", key: "etc" },
  ];
  
  const handleSearch = () => {
    console.log('검색 버튼 클릭');
  };

  const handleExcelDownload = () => {
    console.log('엑셀 다운로드 버튼 클릭');
    // 여기에 엑셀 다운로드 로직 추가
  };

  const handlePrint = () => {
    console.log('인쇄 버튼 클릭');
    // 여기에 인쇄 로직 추가
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...financialData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setFinancialData(sortedData);
  };

  return (
    <div>
      <div className="Middle classification bold-and-large">
        <h4> 매입 관리 </h4>
      </div>

      <hr />

      <IncomeRegistrationModal data={financialData} setData={setFinancialData} />

      <div className="row">
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input type="date" id="startDate" className="form-control form-control-sm" />&nbsp;~&nbsp;
            <input type="date" id="endDate" className="form-control form-control-sm" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input type="text" id="keyword" className="form-control" placeholder='🔍 검색' />
            <button className="btn btn-dark ml-2" onClick={handleSearch}>조회</button>
          </div>
        </div>
      </div>

      <TableComponent
        columns={columns}
        data={financialData}
        toggleAllCheckboxes={toggleAllCheckboxes}
        toggleSingleCheckbox={toggleSingleCheckbox}
        handleSort={handleSort}
        sortConfig={sortConfig}
      />

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary mr-2" onClick={handleExcelDownload}>
          <FontAwesomeIcon icon={faFileExcel} /> 엑셀 다운
        </button>
        <button className="btn btn-secondary" onClick={handlePrint}>
          <FontAwesomeIcon icon={faPrint} /> 인쇄
        </button>
      </div>

      <nav aria-label="Page navigation example" style={{ marginTop: '50px' }}>
        <ul className="pagination justify-content-center">
          <li className="page-item"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
        </ul>
      </nav>
    </div>
  );
};

export default FinanceTable;