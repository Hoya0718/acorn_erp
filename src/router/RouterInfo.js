import Layout from '../Layout/Layout.js';
import CustomerMgmt from '../Components/Customer/CustomerMgmt.js';
import InventoryMgmt from '../Components/Inventory/InventoryMgmt.js';
import SalesMgmt from '../Components/Sales/Sales_mgmt.js';
import FinancialMgmt from '../Components/Financial/FinancialMgmt.js';
import ReservationMgmt from '../Components/Reservation/ReservationMgmt.js';
import Board from '../Components/Board/Board.js';

export const RouterInfo = [
  {
    path: "/",
    element: <Layout />,
    children: [
     
      {
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
        path: "Board",
        element: <Board />,
        label: 'board'
      },
    ]
  },
];