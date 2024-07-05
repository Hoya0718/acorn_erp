import React, { useState } from 'react';
import './Sales.css';

const initialOrders = [
  {
    orderNumber: '1001',
    returnType: '환불',
    itemName: '단팥빵',
    customerName: '홍길동',
    orderDate: '2023-06-15 10:30',
    customerAddr: '서울시 강남구',
    customerTel: '010-1234-5678',
    quantity: 100,
    totalPrice: 100000,
    returnReason: '',
    returnStatus: '환불 완료'
  },
  {
    orderNumber: '1002',
    returnType: '교환',
    itemName: '소보로빵',
    customerName: '이몽룡',
    orderDate: '2023-06-16 12:00',
    customerAddr: '서울시 서초구',
    customerTel: '010-5678-1234',
    quantity: 50,
    totalPrice: 50000,
    returnReason: '불만족',
    returnStatus: '교환 완료'
  }
];

const ReturnTable = () => {
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태
  const [selectedOrders, setSelectedOrders] = useState([]); // 선택된 주문 목록
  const [sortedOrders, setSortedOrders] = useState(initialOrders);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' }); // 정렬 설정

  // 전체 선택 토글 함수
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedOrders([...sortedOrders]); // 전체 선택 시 모든 주문을 선택 목록에 추가
    } else {
      setSelectedOrders([]); // 전체 선택 해제 시 선택 목록 초기화
    }
  };

  // 개별 주문 선택 토글 함수
  const toggleOrderSelection = (order) => {
    const selectedIndex = selectedOrders.findIndex((selectedOrder) => selectedOrder.orderNumber === order.orderNumber);
    if (selectedIndex === -1) {
      setSelectedOrders([...selectedOrders, order]); // 선택되지 않은 주문을 선택 목록에 추가
    } else {
      const updatedOrders = [...selectedOrders];
      updatedOrders.splice(selectedIndex, 1);  // 이미 선택된 주문을 선택 목록에서 제거
      setSelectedOrders(updatedOrders);
    }
  };

  //컬럼 정렬
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...sortedOrders].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setSortedOrders(sortedData);
    setSortConfig({ key, direction });
  };
  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '▼';
  };

  // 전체 선택 체크박스 상태 결정
  const selectAllCheckboxState = selectAll || (selectedOrders.length === sortedOrders.length && sortedOrders.length > 0);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllCheckboxState} onChange={toggleSelectAll} /></th>
            <th onClick={() => handleSort('orderNumber')}>주문번호 {getSortDirection('orderNumber')}</th>
            {/* <th onClick={() => handleSort('returnType')}>상태구분 {getSortDirection('returnType')}</th> */}
            <th onClick={() => handleSort('orderDate')}>판매일시 {getSortDirection('orderDate')}</th>
            <th onClick={() => handleSort('customerName')}>이름 {getSortDirection('customerName')}</th>
            <th onClick={() => handleSort('customerTel')}>연락처 {getSortDirection('customerTel')}</th>
            <th onClick={() => handleSort('itemName')}>상품명 {getSortDirection('itemName')}</th>
            <th onClick={() => handleSort('quantity')}>수량 {getSortDirection('quantity')}</th>
            <th onClick={() => handleSort('totalPrice')}>판매금액 {getSortDirection('totalPrice')}</th>
            {/* <th onClick={() => handleSort('customerAddr')}>주소 {getSortDirection('customerAddr')}</th> */}
            {/* <th onClick={() => handleSort('returnReason')}>사유 {getSortDirection('returnReason')}</th> */}
            <th onClick={() => handleSort('returnStatus')}>처리상태 {getSortDirection('returnStatus')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order, index) => (
            <tr key={index}>
              <td><input type="checkbox" checked={selectedOrders.some(selectedOrder => selectedOrder.orderNumber === order.orderNumber)} onChange={() => toggleOrderSelection(order)} /></td>
              <td>{order.orderNumber}</td>
              {/* <td>{order.returnType}</td> */}
              <td>{order.orderDate}</td>
              <td>{order.customerName}</td>
              <td>{order.customerTel}</td>
              <td>{order.itemName}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice.toLocaleString()} 원</td>
              {/* <td>{order.customerAddr}</td> */}
              {/* <td>{order.returnReason}</td> */}
              <td>{order.returnStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnTable;
