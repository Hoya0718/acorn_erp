import React, { useState } from 'react';
import './Sales.css';

const orders = [
  {
    orderNumber: '1001',
    itemName: '단팥빵',
    csName: '홍길동',
    csPhoneNumber: '010-1234-5678',
    csAddress: '서울시 강남구',
    unitPrice: 100000,
    quantity: 100,
    deliveryFee: 5000,
    totalPrice: 105000,
    orderDate: '2023-06-15 10:30',
    itemReq: '',
    orderStatus: '결제 완료'
  }
];

const OrderTable = () => {
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
            <th>상품명</th>
            <th>이름</th>
            <th>연락처</th>
            <th>주소</th>
            <th>단가</th>
            <th>수량</th>
            <th>배송비</th>
            <th>판매금액</th>
            <th>판매일시</th>
            <th>요청사항</th>
            <th>주문상태</th>
            <th>배송정보</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td><input type="checkbox" checked={selectedOrders.some(selectedOrder => selectedOrder.orderNumber === order.orderNumber)} onChange={() => toggleOrderSelection(order)} /></td>
              <td>{order.orderNumber}</td>
              <td>{order.itemName}</td>
              <td>{order.csName}</td>
              <td>{order.csPhoneNumber}</td>
              <td>{order.csAddress}</td>
              <td>{order.unitPrice.toLocaleString()} 원</td>
              <td>{order.quantity}</td>
              <td>{order.deliveryFee.toLocaleString()} 원</td>
              <td>{order.totalPrice.toLocaleString()} 원</td>
              <td>{order.orderDate}</td>
              <td>{order.itemReq}</td>
              <td>{order.orderStatus}</td>
              <td><button className="button-register">등록</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
