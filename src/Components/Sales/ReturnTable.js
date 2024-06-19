import React, { useState } from 'react';
import './Sales.css';

const orders = [
  {
    orderNumber: '1001',
    returnType: '환불',
    itemName: '단팥빵 ',
    csName: '홍길동',
    orderDate: '2023-06-15 10:30',
    csAddress: '서울시 강남구',
    csPhoneNumber: '010-1234-5678',
    quantity: 100,
    totalPrice: 100000,
    returnReason: '',
    returnStatus: '환불 완료'
  },
  {
    orderNumber: '1001',
    returnType: '환불',
    itemName: '단팥빵 ',
    csName: '홍길동',
    orderDate: '2023-06-15 10:30',
    csAddress: '서울시 강남구',
    csPhoneNumber: '010-1234-5678',
    quantity: 100,
    totalPrice: 100000,
    returnReason: '',
    returnStatus: '환불 완료'
  },
];

const ReturnTable = () => {
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
            <th>주문번호</th>
            <th>상태구분</th>
            <th>상품명</th>
            <th>이름</th>
            <th>판매일시</th>
            <th>주소</th>
            <th>연락처</th>
            <th>수량</th>
            <th>판매금액</th>
            <th>사유</th>
            <th>처리상태</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td><input type="checkbox" checked={selectedOrders.some(selectedOrder => selectedOrder.orderNumber === order.orderNumber)} onChange={() => toggleOrderSelection(order)} /></td>
              <td>{order.orderNumber}</td>
              <td>{order.returnType}</td>
              <td>{order.itemName}</td>
              <td>{order.csName}</td>
              <td>{order.orderDate}</td>
              <td>{order.csAddress}</td>
              <td>{order.csPhoneNumber}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice.toLocaleString()} 원</td>
              <td>{order.returnReason}</td>
              <td>{order.returnStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnTable;