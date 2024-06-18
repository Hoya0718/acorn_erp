import React, { useState } from 'react';
import './Financial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPrint } from '@fortawesome/free-solid-svg-icons';
import ModalForm from './ModalForm';

const TableComponent = ({ columns, data, toggleAllCheckboxes, toggleSingleCheckbox, handleSort, sortConfig }) => (
  <table className="table table-hover" style={{ wordBreak: 'break-all' }}>
    <thead>
      <tr>
        <th scope="col">
          <input
            type="checkbox"
            onChange={toggleAllCheckboxes}
            checked={data.every(row => row.checked)}
          />
        </th>
        {columns.map((col, index) => (
          <th key={index} scope="col" onClick={() => handleSort(col)}>
            {col}
            {sortConfig.key === col ? (
              sortConfig.direction === 'ascending' ? (
                <span className="sort-arrow"> 🔼</span>
              ) : (
                <span className="sort-arrow"> 🔽</span>
              )
            ) : (
              <span className="sort-arrow"> 🔽</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="table-group-divider">
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          <td>
            <input
              type="checkbox"
              onChange={() => toggleSingleCheckbox(rowIndex)}
              checked={row.checked}
            />
          </td>
          {columns.map((col, colIndex) => (
            <td key={colIndex}>{row[col]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const FinanceTable = () => {
  const [data, setData] = useState([
    { "상품번호": "A001", "상품구분": "케이크", "상품명": "초콜릿 케이크", "고객명": "음바페", "거래일시": "2024-07-01", "결제상태": "완료", "금액": "30,000", "단가": "30,000", "수량": "1", "특이사항": "", checked: false },
    { "상품번호": "A002", "상품구분": "음료", "상품명": "커피", "고객명": "할란드", "거래일시": "2024-07-01", "결제상태": "완료", "금액": "16,000", "단가": "8,000", "수량": "2", "특이사항": "", checked: false },
    { "상품번호": "A003", "상품구분": "빵", "상품명": "스콘", "고객명": "벨링엄", "거래일시": "2024-07-01", "결제상태": "완료", "금액": "30,000", "단가": "10,000", "수량": "3", "특이사항": "", checked: false },
    { "상품번호": "A004", "상품구분": "빵", "상품명": "소보루", "고객명": "비니시우스", "거래일시": "2024-07-01", "결제상태": "완료", "금액": "20,000", "단가": "5,000", "수량": "4", "특이사항": "", checked: false },
    { "상품번호": "A005", "상품구분": "케이크", "상품명": "생크림 케이크", "고객명": "포든", "거래일시": "2024-07-01", "결제상태": "완료", "금액": "150,000", "단가": "30,000", "수량": "5", "특이사항": "", checked: false },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [formData, setFormData] = useState({
    "상품번호": '',
    "상품구분": '',
    "상품명": '',
    "고객명": '',
    "거래일시": '',
    "결제상태": '완료',
    "금액": '',
    "단가": '',
    "수량": '',
    "특이사항": '',
  });
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

  const columns = ["상품번호", "상품구분", "상품명", "고객명", "거래일시", "결제상태", "금액", "단가", "수량", "특이사항"];

  const handleSearch = () => {
    console.log('검색 버튼 클릭');
  };

  const handleExcelDownload = () => {
    console.log('엑셀 다운로드 버튼 클릭');
  };

  const handlePrint = () => {
    console.log('인쇄 버튼 클릭');
  };

  const handleModalShow = (content) => {
    if (content === '수정') {
      const selectedData = data.find(row => row.checked);
      if (selectedData) {
        setFormData(selectedData);
      } else {
        alert('수정할 항목을 선택해주세요.');
        return;
      }
    }
    setModalContent(content);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      "상품번호": '',
      "상품구분": '',
      "상품명": '',
      "고객명": '',
      "거래일시": '',
      "결제상태": '완료',
      "금액": '',
      "단가": '',
      "수량": '',
      "특이사항": '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    if (modalContent === '등록') {
      setData([...data, { ...formData, checked: false }]);
    } else if (modalContent === '수정') {
      const updatedData = data.map((row) =>
        row.checked ? { ...formData, checked: row.checked } : row
      );
      setData(updatedData);
    }
    handleModalClose();
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updatedData = data.filter((row) => !row.checked);
      setData(updatedData);
      window.alert('삭제가 완료되었습니다.');
    }
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
        <span> 매입 관리 </span>
      </div>

      <div className="righted" style={{ textAlign: 'right', marginTop: '10px' }}>
        <input type="button" value="등록 >" className="btn btn-dark mr-2" onClick={() => handleModalShow('등록')} />
        <input type="button" value="수정 >" className="btn btn-dark mr-2" onClick={() => handleModalShow('수정')} />
        <input type="button" value="삭제 >" className="btn btn-dark" onClick={handleDelete} />
      </div>

      <hr />

      <div className="row">
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input type="date" id="startDate" className="form-control form-control-sm" />&nbsp;~&nbsp;
            <input type="date" id="endDate" className="form-control form-control-sm" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input type="text" id="keyword" className="form-control" placeholder="검색" />
            <button className="btn btn-dark ml-2" onClick={handleSearch}>조회</button>
          </div>
        </div>
        <ul className="nav nav-underline"></ul>
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

      <ModalForm
        show={showModal}
        handleClose={handleModalClose}
        handleInputChange={handleInputChange}
        handleSubmit={handleFormSubmit}
        formData={formData}
        columns={columns}
        modalContent={modalContent}
      />
    </div>
  );
};

export default FinanceTable;
