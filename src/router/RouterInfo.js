// Router 설정 파일
import Layout from '../Layout/Layout.js';

// 회원 관리
import CustomerMgmt from '../Components/Customer/CustomerMgmt.js';
import CusMgmt from '../Components/Customer/CusMgmt.js';
import CusStatus from '../Components/Customer/CusStatus.js';
import StatusDataMain from '../Components/Customer/status_data/StatusDataMain.js';

// 재고 관리
import StockMgmt from '../Components/Stock/StockMgmt.js';
import DistributionMgmt from '../Components/Stock/Distribution/DistributionMgmt.js';
import MeterialMgmt from '../Components/Stock/MeterialMgmt.js';
import PurchaseMgmt from '../Components/Stock/Purchase/PurchaseMgmt.js';
import VendorMgmt from '../Components/Stock/Vendor/VendorMgmt.js';

// 판매 관리
import SalesMgmt from '../Components/Sales/SalesMgmt.js';
import InventoryMgmt from '../Components/Sales/InventoryMgmt.js';
import ItemMgmt from '../Components/Sales/ItemMgmt.js';
import OrderMgmt from '../Components/Sales/OrderMgmt.js';
import Return from '../Components/Sales/Return.js';

// 재무 관리
import FinancialMgmt from '../Components/Financial/FinancialMgmt.js';

// 예약 관리
import ReservationMgmt from '../Components/Reservation/ReservationMgmt.js';
import MainReg from '../Components/Reservation/MainReg.js';
import ResTable from '../Components/Reservation/ResTable.js';

// 로그인 & 회원가입
import Login from '../Components/Login/Login.js';
import LoginForm from '../Components/Login/LoginForm.js'
import FindPw from '../Components/Login/FindPw.js';
import FindEmail from '../Components/Login/FindEmail.js'
import SignUp from '../Components/Login/SignUp.js';
import ChangePw from '../Components/Login/ChangePw.js'
import ShowEmail from '../Components/Login/ShowEmail.js'

// 게시판
import Board from '../Components/Board/Board.js';
import BoardDetail from '../Components/Board/BoardDetail.js';
import BoardPost from '../Components/Board/BoardPost.js';

// Router 
import { createBrowserRouter } from 'react-router-dom';


export const RouterInfo = createBrowserRouter([
  {
    path: "/layout",
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
          },
          {
            path: "statusDataMain",
            element: <StatusDataMain />
          }
        ]
      },
      {
        path: "stockMgmt",
        element: <StockMgmt />,
        children: [
          {
            path: "meterialMgmt",
            element: <MeterialMgmt />
          },
          {
            path: "DistributionMgmt",
            element: <DistributionMgmt />
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
          },
          {
            path: "return",
            element: <Return />
          }
        ]
      },
      {
        path: "financialMgmt",
        element: <FinancialMgmt />,
      },
      {
        path: "reservationMgmt",
        element: <ReservationMgmt />,
        children: [
          {
            index: true,
            element: <ResTable />
          },
          {
            path: "mainReg",
            element: <MainReg />
          },
          {
            path: "resTable",
            element: <ResTable />
          }
        ]
      },
      // 게시판 관련 경로
      {
        index : true,
        element: <Board />,
      },    
      {
        path: "board",
        element: <Board />,
      },    
      {
        path: "post",
        element: <BoardPost />
      },
      {
        path: "detail/:id",
        element: <BoardDetail />
      },
      // 새로운 경로 설정 추가
      {
        path: "customerMgmt/cusStatus",
        element: <CusStatus />
      }
    ]
  },
  {
    path: "/mainReg",
    element: <MainReg />
  },

  {
    path: "/",
    element: <Login />,
    children: [
      {
        index: true,
        element: <LoginForm />
      },
      {
        path: "findPw",
        element: <FindPw />
      },
      {
        path: "findEmail",
        element: <FindEmail />
      },
      {
        path: "signUp",
        element: <SignUp />
      },
      {
        path:"changePw",
        element: <ChangePw />
      },
      {
        path:"showEmail",
        element: <ShowEmail />
      }
    ]
  },
  {
    path: 'StatusDataMain',
    element: <StatusDataMain />
  }
]
)
