import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';  // Import the CSS file

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <span>ACORN ERP</span>
      </header>
      <div className="container1">
        <div className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/customerMgmt">고객관리</Link>
            </li>
            <li>
              <Link to="/inventoryMgmt">재고관리</Link>
            </li>
            <li>
              <Link to="/salesMgmt">판매관리</Link>
            </li>
            <li>
              <Link to="/financialMgmt">재무관리</Link>
            </li>
            <li>
              <Link to="/reservationMgmt">예약관리</Link>
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