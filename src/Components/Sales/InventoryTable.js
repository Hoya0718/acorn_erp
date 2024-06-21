import React, { useState } from 'react';
import './Sales.css';

const orders = [
  {
    itemNumber: '1002',
    itemName: '단팥빵 ',
    stockIn: 10,
    stockOut: 5,
    stockQuantity: 5,
  },
  {
    itemNumber: '1001',
    itemName: '단팥빵 ',
    stockIn: 10,
    stockOut: 5,
    stockQuantity: 5,
  },
];

const InventoryTable = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  // 전체 선택 토글
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedOrders([...orders]);
    } else {
      setSelectedOrders([]);
    }
  };

  // 개별 주문 선택
  const toggleOrderSelection = (order) => {
    const selectedIndex = selectedOrders.findIndex((selectedOrder) => selectedOrder.orderNumber === order.orderNumber);
    if (selectedIndex === -1) {
      setSelectedOrders([...selectedOrders, order]);
    } else {
      const updatedOrders = [...selectedOrders];
      updatedOrders.splice(selectedIndex, 1);
      setSelectedOrders(updatedOrders);
    }
  };

  // 전체 선택 체크박스의 상태
  const selectAllCheckboxState = selectAll || (selectedOrders.length === orders.length && orders.length > 0);
  
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllCheckboxState} onChange={toggleSelectAll} /></th>
            <th>상품번호</th>
            <th>상품명</th>
            <th>입고수량(개)</th>
            <th>출고수량(개)</th>
            <th>재고합계(개)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td><input type="checkbox" checked={selectedOrders.some(selectedOrder => selectedOrder.orderNumber === order.orderNumber)} onChange={() => toggleOrderSelection(order)} /></td>
              <td>{order.itemNumber}</td>
              <td>{order.itemName}</td>
              <td>{order.stockIn}</td>
              <td>{order.stockOut}</td>
              <td>{order.stockQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;