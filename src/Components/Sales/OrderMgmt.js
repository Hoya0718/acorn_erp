import React, { useState, useEffect } from 'react';
import "../Main/Main.css";
import { Link, useLocation } from 'react-router-dom';
import OrderTable from './OrderTable';

const OrderMgmt = () => {
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState('');

  useEffect(() => {
    setSelectedLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (path) => {
    setSelectedLink(path);
  };

  return (
    <div className="Orders">
      <div className="Middle classification">
        <h4> 주문 관리 </h4>
      </div>
      <hr />

      <div className="order-subTitle">
        <span>
          <button
            className={selectedLink === '/salesMgmt/orderMgmt' ? 'selected' : ''}
            onClick={() => handleLinkClick('/salesMgmt/orderMgmt')}>
            <Link to="/salesMgmt/orderMgmt">주문서 조회</Link>
          </button>
          <button
            className={selectedLink === '/salesMgmt/return' ? 'selected' : ''}
            onClick={() => handleLinkClick('/salesMgmt/return')}>
            <Link to="/salesMgmt/return">반품 및 교환 조회</Link>
          </button>
        </span>
      </div>
      <br />

      <div className="searcher">
        <div className="left">
          <label htmlFor="date">날짜를 선택하세요 :
            <input type="date" id="date" max="2077-06-20" min="2077-06-05" defaultValue="2024-07-18" />
          </label>
        </div>

        <div className="right">
          <input type="text" placeholder='🔍 검색' /><button>조회 &gt;</button>
        </div>
      </div>
      <br />
      <div>
        <section>
          <OrderTable />
        </section>
      </div>

      <div className="excel-print">
        <button>엑셀 다운</button>
        <button>인쇄</button>
      </div>
    </div>
  );
}

export default OrderMgmt;
