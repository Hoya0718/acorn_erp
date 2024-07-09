import React, { useState, useEffect } from 'react';
import { useLocation, Outlet, Link } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Layout.css';
import MemoPad from './MemoPad';
import ThemeToggle from './ThemeToggle';
import LogoutIcon from './LogoutIcon';



const Layout = () => {
  const [expandedItem, setExpandedItem] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 세션 스토리지에서 사용자 정보 가져오기
    const userInfoFromStorage = sessionStorage.getItem('userInfo');
    
    if (userInfoFromStorage) {
      const user = JSON.parse(userInfoFromStorage);
      setUserInfo(user);

      // 환영 메시지가 이미 표시되었는지 확인
      const hasWelcomed = sessionStorage.getItem('hasWelcomed');
      if (!hasWelcomed) {
        // 환영 메시지 표시
        toast.success(`${user.shopName} 님, 안녕하세요!`);
        // 메시지를 표시한 후 상태 저장
        sessionStorage.setItem('hasWelcomed', 'true');
      }
    }
  }, []);

  const handleItemClick = (item) => {
    setExpandedItem(item === expandedItem ? null : item);
  };

  const handleLogoClick = () => {
    setExpandedItem(null); // ACORN ERP🐿️ 클릭 시 사이드바 닫기
  };

  return (
    <div className="layout1">
      <header className='header1'>
        <Link to="/layout" className="erp-title" onClick={handleLogoClick}>Acorn ERP🐿️</Link>
        <MemoPad />
      </header>
      <div className="container1">
        <div className="sidebar1">
          <nav>
            <ul style={{paddingLeft:"0"}}>
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
            <ThemeToggle />
            <LogoutIcon />
          </div>
        </div>
        <main className="main-content1">
          <Outlet />
        </main>
      </div>
       <ToastContainer
      position="top-center"
      transition={Slide}
      autoClose={2000}
      hideProgressBar={true}
      closeOnClick
      rtl={false}
      limit={1}
      />
    </div>
  );
};

const MenuItem = ({ title, subMenuItems, expanded, onClick, path }) => {
  return (
    <li style={{marginBottom:"7px"}}>
      <div className={`menu-item ${subMenuItems ? 'with-submenu' : 'no-submenu'}`} onClick={onClick}>
        <Link to={subMenuItems ? subMenuItems[0].path : path}>{title}</Link>
      </div>
      {subMenuItems && (
        <ul style={{paddingLeft:"50px"}}>
          {subMenuItems.map((subMenuItem, index) => (
            <li key={index} className={`submenu1 ${expanded ? 'active' : ''}`}>
              <Link to={subMenuItem.path}>{subMenuItem.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const menuItems = [
  {
    title: "👦🏻 고객 관리",
    subMenuItems: [
      { title: "회원 관리", path: "/layout/customerMgmt/cusMgmt" },
      { title: "고객 현황", path: "/layout/customerMgmt/cusStatus" }
    ]
  },
  {
    title: "🛒 판매 관리",
    subMenuItems: [
      { title: "주문 관리", path: "/layout/salesMgmt/orderMgmt" },
      { title: "상품 관리", path: "/layout/salesMgmt/itemMgmt" },
      { title: "상품 재고 관리", path: "/layout/salesMgmt/inventoryMgmt" }
    ]
  },
  {
    title: "📦 재고 관리",
    subMenuItems: [
      { title: "자재 관리", path: "/layout/stockMgmt/meterialMgmt" },
      { title: "물류 관리", path: "/layout/stockMgmt/distributionMgmt" },
      { title: "발주 관리", path: "/layout/stockMgmt/purchaseMgmt" },
      { title: "거래처 관리", path: "/layout/stockMgmt/vendorMgmt" }
    ]
  },
  {
    title: "💰 재무 관리",
    path: "/layout/financialMgmt"
  },
  {
    title: "📆 예약 관리",
    path: "/layout/reservationMgmt", 
  },
  {
    title: "💭 커뮤니티",
    path: "/layout/board",
  },
];

export default Layout;
