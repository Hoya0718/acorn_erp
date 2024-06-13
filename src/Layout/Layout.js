import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';  // Import the CSS file

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <span>ACORN ERP</span>
      </header>
      <div className="container">
        <div className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/customer_mgmt">고객관리</Link>
            </li>
            <li>
              <Link to="/inventory_mgmt">재고관리</Link>
            </li>
            <ul>
              <li>
                <Link to="/sales_mgmt">판매관리</Link>
                <ul>
                  <li><Link to="/sales_mgmt/Orders">주문 관리</Link></li>
                  <li><Link to="/sales_mgmt/Items">상품 관리</Link></li>
                  <li><Link to="/sales_mgmt/ItemInventory">상품 재고 관리</Link></li>
                </ul>
              </li>
            </ul>
            <li>
              <Link to="/financial_mgmt">재무관리</Link>
            </li>
            <li>
              <Link to="/reservation_mgmt">예약관리</Link>
            </li>
            <li>
              <Link to="/board">커뮤니티</Link>
            </li>
          </ul>
        </nav>
        </div>
        
        <main className="main-content">
          <Outlet />
        </main>

      </div>
      <footer>
        <span>Copyright(c)2002 by Acorn_Mook. All Page content is property of Acorn_Mook</span>
      </footer>
    </div>
  );
};

export default Layout;