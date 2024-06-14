import Layout from '../Layout/Layout.js';

// 회원 관리
import CustomerMgmt from '../Components/Customer/CustomerMgmt.js';
import CusMgmt from '../Components/Customer/CusMgmt.js';
import CusStatus from '../Components/Customer/CusStatus.js';

// 재고 관리
import StockMgmt from '../Components/Stock/StockMgmt.js';
import DistributionMgmt from '../Components/Stock/DistributionMgmt.js';
import MeterialMgmt from '../Components/Stock/MeterialMgmt.js';
import PurchaseMgmt from '../Components/Stock/PurchaseMgmt.js';
import VendorMgmt from '../Components/Stock/VendorMgmt.js';

// 판매 관리
import SalesMgmt from '../Components/Sales/SalesMgmt.js';
import InventoryMgmt from '../Components/Sales/InventoryMgmt.js';
import ItemMgmt from '../Components/Sales/ItemMgmt.js';
import OrderMgmt from '../Components/Sales/OrderMgmt.js';

// 재무 관리
import FinancialMgmt from '../Components/Financial/FinancialMgmt.js';
import IncomeMgmt from '../Components/Financial/IncomeMgmt.js';
import ExportMgmt from '../Components/Financial/ExportMgmt.js';

// 예약 관리
import ReservationMgmt from '../Components/Reservation/ReservationMgmt.js';


// 로그인 & 회원가입
import Login from '../Components/Login/Login.js';
import FindId from '../Components/Login/FindId.js';
import FindPw from '../Components/Login/FindPw.js';
import SignUp from '../Components/Login/SignUp.js';

//게시판
import Board from '../Components/Board/Board.js';

//Router 
import { createBrowserRouter } from 'react-router-dom';

export const RouterInfo = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "customerMgmt",
        element: <CustomerMgmt />,
        children: [
          {
            path: "cusMgmt",
            element: <CusMgmt />
          },
          {
            path: "cusStatus",
            element: <CusStatus />
          }
        ]
      },
      {
        path: "stockMgmt",
        element: <StockMgmt />,
        children: [
          {
            path: "distributionMgmt",
            element: <DistributionMgmt />
          },
          {
            path: "meterialMgmt",
            element: <MeterialMgmt />
          },
          {
            path: "purchaseMgmt",
            element: <PurchaseMgmt />
          },
          {
            path: "vendorMgmt",
            element: <VendorMgmt />
          }
        ]
      },
      {
        path: "salesMgmt",
        element: <SalesMgmt />,
        children: [
          {
            path: "inventoryMgmt",
            element: <InventoryMgmt />
          },
          {
            path: "itemMgmt",
            element: <ItemMgmt />
          },
          {
            path: "orderMgmt",
            element: <OrderMgmt />
          }
        ]
      },
      {
        path: "financialMgmt",
        element: <FinancialMgmt />,
        children: [
          {
            path: "incomeMgmt",
            element: <IncomeMgmt />
          },
          {
            path: "exportMgmt",
            element: <ExportMgmt />
          }
        ]
      },
      {
        path: "reservationMgmt",
        element: <ReservationMgmt />,
        path: "CustomerMgmt",
        element: <CustomerMgmt />,
        label: 'customer'
      },
      {
        path: "InventoryMgmt",
        element: <InventoryMgmt />,
        label: 'inventory'
      },
      {
        path: "SalesMgmt",
        element: <SalesMgmt />,
        label: 'sales'
      },
      {
        path: "FinancialMgmt",
        element: <FinancialMgmt />,
        label: 'financial'
      },
      {
        path: "ReservationMgmt",
        element: <ReservationMgmt />,
        label: 'reservation'
      },
      {
        path: "board",
        element: <Board />,
        label: 'board'
      }
    ]
  },
  {
    path: "login",
    element: <Login />,
    children: [
      {
        path: "findId",
        element: <FindId />
      },
      {
        path: "findPw",
        element: <FindPw />
      },
      {
        path: "signUp",
        element: <SignUp />
      }
    ]
  }
]);