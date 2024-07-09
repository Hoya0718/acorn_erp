import React, { useState, useEffect } from 'react';
import "../Main/Main.css";
import { Link, useLocation } from 'react-router-dom';
import ReturnTable from './ReturnTable';
import * as XLSX from 'xlsx';
import { GrDocumentUpload } from "react-icons/gr";
import { HiPrinter } from "react-icons/hi2";

const Return = () => {
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState(location.pathname);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setSelectedLink(location.pathname);
    // Assume ReturnTable component fetches data and returns it
    // Here we set it to tableData state
    const data = fetchData(); // Replace with actual function to fetch data
    setTableData(data);
  }, [location.pathname]);

  // Mock function to fetch data (replace with actual data fetching logic)
  const fetchData = () => {
    return [
      { id: 1, name: 'John Doe', amount: 100 },
      { id: 2, name: 'Jane Smith', amount: 200 }
      // Add more data as needed
    ];
  };

  const handleLinkClick = (path) => {
    setSelectedLink(path);
  };

  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData); // Pass tableData here
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Name your sheet
    XLSX.writeFile(workbook, "filename.xlsx"); // Specify filename
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="Return">
      <div className="Middle classification">
        <h3> 주문 관리 </h3>
      </div>
      <hr />

      <div className="order-subTitle">
        <span>
          <button
            className={selectedLink === '/layout/salesMgmt/orderMgmt' ? 'selected' : ''}
            onClick={() => handleLinkClick('/layout/salesMgmt/orderMgmt')}>
            <Link to="/layout/salesMgmt/orderMgmt">주문서 조회</Link>
          </button>
          <button
            className={selectedLink === '/layout/salesMgmt/return' ? 'selected' : ''}
            onClick={() => handleLinkClick('/layout/salesMgmt/return')}>
            <Link to="/layout/salesMgmt/return">취소 주문서 조회</Link>
          </button>
        </span>
      </div>
      <br />

      <div className="searcher">
        <div className="left">
          <label htmlFor="date">날짜를 선택하세요 :
            <input type="date" id="date" max="2077-06-20" min="2077-06-05" value="2024-07-18" />
          </label>
        </div>

        <div className="right">
          <input type="text" placeholder='🔍 검색' /><button>조회 &gt;</button>
        </div>
      </div>
      <br />
      <div>
        <section>
          <ReturnTable setData={setTableData} />
        </section>
      </div>
      <div className="excel-print">
        <button onClick={handleExcelDownload}><GrDocumentUpload size={16} /> 엑셀 다운</button>
        <button onClick={handlePrint}><HiPrinter size={16} /> 인쇄</button>
      </div>
    </div>
  );
};

export default Return;
