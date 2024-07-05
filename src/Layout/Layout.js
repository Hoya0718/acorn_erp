import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';
import MemoPad from './MemoPad';
import ThemeToggle from './ThemeToggle';
import LogoutIcon from './LogoutIcon';

const Layout = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  //글꼴
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lilita+One&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleItemClick = (item) => {
    setExpandedItem(item === expandedItem ? null : item);
  };

  return (
    <div className="layout1">
      <header className='header1'>
      <Link to="/layout" style={{textDecoration: 'none', color: 'black' }}><span className="erp-title">ACORN ERP</span></Link>
        <MemoPad />
      </header>
      <div className="container1">
        <div className="sidebar1">
          <nav>
            <ul>
              {menuItems.map((menuItem, index) => (
                <MenuItem
                  key={index}
                  title={menuItem.title}
                  expanded={expandedItem === menuItem.title}
                  onClick={() => handleItemClick(menuItem.title)}
                  subMenuItems={menuItem.subMenuItems}
                  path={menuItem.path}
                />
              ))}
            </ul>
            </nav>
            <div className='icon-container'>
                <ThemeToggle></ThemeToggle>
                <LogoutIcon></LogoutIcon>
              </div>
          
        </div>
        <main className="main-content1">
          <Outlet />
        </main>
      </div>
      <footer>
        <span>Copyright(c)2002 by Acorn_Mook. All Page content is property of Acorn_Mook</span>
      </footer>
    </div>
  );
};

const MenuItem = ({ title, subMenuItems, expanded, onClick, path }) => {
  return (
    <li>
      <div className={`menu-item ${subMenuItems ? '' : 'no-submenu'}`} onClick={onClick}>
        <Link to={subMenuItems ? subMenuItems[0].path : path}>{title}</Link>
      </div>
      {subMenuItems && expanded && (
        <div className={`submenu1 active`}>
          <ul>
            {subMenuItems.map((subMenuItem, index) => (
              <li key={index}>
                <Link to={subMenuItem.path}>{subMenuItem.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

const menuItems = [
  {
    title: "고객 관리",
    subMenuItems: [
      { title: "회원 관리", path: "/layout/customerMgmt/cusMgmt" },
      { title: "고객 현황", path: "/layout/customerMgmt/cusStatus" }
    ]
  },
  {
    title: "판매 관리",
    subMenuItems: [
      { title: "주문 관리", path: "/layout/salesMgmt/orderMgmt" },
      { title: "상품 관리", path: "/layout/salesMgmt/itemMgmt" },
      { title: "상품 재고 관리", path: "/layout/salesMgmt/inventoryMgmt" }
    ]
  },
  {
    title: "재고 관리",
    subMenuItems: [
      { title: "자재 관리", path: "/layout/stockMgmt/meterialMgmt" },
      { title: "물류 관리", path: "/layout/stockMgmt/distributionMgmt" },
      { title: "발주 관리", path: "/layout/stockMgmt/purchaseMgmt" },
      { title: "거래처 관리", path: "/layout/stockMgmt/vendorMgmt" }
    ]
  },
  {
    title: "재무 관리",
    subMenuItems: [
      { title: "매입 관리", path: "/layout/financialMgmt/incomeMgmt" },
      { title: "매출 관리", path: "/layout/financialMgmt/exportMgmt" }
    ]
  },
  {
    title: "예약 관리",
    path: "/layout/reservationMgmt"
  },
  {
    title: "커뮤니티",
    path: "/layout/board"
  }
];

export default Layout;