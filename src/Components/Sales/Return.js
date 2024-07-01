import React, { useState, useEffect } from 'react'
import "../Main/Main.css"
import { Link, useLocation } from 'react-router-dom';
import ReturnTable from './ReturnTable';

const Return = () => {
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState(location.pathname);

  useEffect(() => {
    setSelectedLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (path) => {
    setSelectedLink(path);
  };

  return (
    <div className="Return">
      <div className="Middle classification">
        <h4> 주문 관리 </h4>
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
          <label for="date">날짜를 선택하세요 : 
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
          <ReturnTable />
        </section>
      </div>
      <div className="excel-print">
        <button>엑셀 다운</button>
        <button>인쇄</button>
      </div>
    </div>
  );
};

export default Return;