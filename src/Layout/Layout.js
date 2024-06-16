import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemClick = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  return (
    <div className="layout">
      <header>
        <span>ACORN ERP</span>
      </header>
      <div className="container1">
        <div className="sidebar">
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

const MenuItem = ({ title, subMenuItems, expanded, onClick, path }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      if (expanded) {
        contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px';
      } else {
        contentRef.current.style.maxHeight = '0px';
      }
    }
  }, [expanded]);

  return (
    <li>
      <div onClick={onClick}>
        {subMenuItems ? (
          <span>{title}</span>
        ) : (
          <Link to={path}>{title}</Link>
        )}
      </div>
      {subMenuItems && (
        <div className={`submenu ${expanded ? 'active' : ''}`} ref={contentRef}>
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
      { title: "회원 관리", path: "/customerMgmt/cusMgmt" },
      { title: "고객 현황", path: "/customerMgmt/cusStatus" }
    ]
  },
  {
    title: "판매 관리",
    subMenuItems: [
      { title: "주문 관리", path: "/salesMgmt/orderMgmt" },
      { title: "상품 관리", path: "/salesMgmt/itemMgmt" },
      { title: "상품 재고 관리", path: "/salesMgmt/inventoryMgmt" }
    ]
  },
  {
    title: "재고 관리",
    subMenuItems: [
      { title: "자재 관리", path: "/stockMgmt/meterialMgmt" },
      { title: "물류 관리", path: "/stockMgmt/distributionMgmt" },
      { title: "발주 관리", path: "/stockMgmt/purchaseMgmt" },
      { title: "거래처 관리", path: "/stockMgmt/vendorMgmt" }
    ]
  },
  {
    title: "재무 관리",
    subMenuItems: [
      { title: "매출 관리", path: "/financialMgmt/exportMgmt" },
      { title: "매입 관리", path: "/financialMgmt/incomeMgmt" }
    ]
  },
  { title: "예약 관리", path: "/reservationMgmt" },
  { title: "커뮤니티", path: "/board" }
];

export default Layout;