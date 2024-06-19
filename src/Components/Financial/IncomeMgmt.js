import React, { useState } from 'react';
import './Financial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPrint } from '@fortawesome/free-solid-svg-icons';
import TableComponent from './TableComponent';
import IncomeRegistrationModal from './IncomeRegistrationModal';

const FinanceTable = () => {
  const [data, setData] = useState([
    { "상품번호": "B001", "상품구분": "식재료", "상품명": "강력분", "매입처": "(주)음바페", "거래일시": "2024-07-01", "결제상태": "완료", "금액": "30,000", "단가": "30,000", "수량": "1", "특이사항": "", checked: false },
    { "상품번호": "B002", "상품구분": "식재료", "상품명": "박력분", "매입처": "(주)할란드", "거래일시": "2024-07-01", "결제상태": "완료", "금액": "16,000", "단가": "8,000", "수량": "2", "특이사항": "", checked: false },
    { "상품번호": "B003", "상품구분": "식재료", "상품명": "호두", "매입처": "(주)벨링엄", "거래일시": "2024-07-01", "결제상태": "완료", "금액": "30,000", "단가": "10,000", "수량": "3", "특이사항": "", checked: false },
    { "상품번호": "B004", "상품구분": "식재료", "상품명": "건포도", "매입처": "(주)비니시우스", "거래일시": "2024-07-01", "결제상태": "완료", "금액": "20,000", "단가": "5,000", "수량": "4", "특이사항": "", checked: false },
    { "상품번호": "B005", "상품구분": "포장지", "상품명": "OPP봉투", "매입처": "(주)포든", "거래일시": "2024-07-01", "결제상태": "완료", "금액": "150,000", "단가": "30,000", "수량": "5", "특이사항": "", checked: false },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const toggleAllCheckboxes = () => {
    const updatedData = data.map(row => ({ ...row, checked: !data.every(row => row.checked) }));
    setData(updatedData);
  };

  const toggleSingleCheckbox = (index) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], checked: !updatedData[index].checked };
    setData(updatedData);
  };

  const columns = ["상품번호", "상품구분", "상품명", "매입처", "거래일시", "결제상태", "금액", "단가", "수량", "특이사항"];

  const handleSearch = () => {
    console.log('검색 버튼 클릭');
  };

  const handleExcelDownload = () => {
    console.log('엑셀 다운로드 버튼 클릭');
  };

  const handlePrint = () => {
    console.log('인쇄 버튼 클릭');
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  return (
    <div>
      <div className="Middle classification bold-and-large">
        <h4> 매입 관리 </h4>
      </div>

      <hr />

      <IncomeRegistrationModal data={data} setData={setData} />

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
        data={data}
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
