import React, { useState } from 'react';
import './Sales.css';

const OrderTable = ({ handleFormSubmit, orders, selectedOrders, setSelectedOrders }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({
    orderNum: '',
    itemName: '',
    customerName: '',
    customerTel: '',
    quantity: '',
    totalPrice: '',
    orderDate: '',
    orderStatus: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedOrders([...orders]);
    } else {
      setSelectedOrders([]);
    }
  };

  const toggleOrderSelection = (order) => {
    const selectedIndex = selectedOrders.findIndex((selectedOrder) => selectedOrder.orderNum === order.orderNum);
    if (selectedIndex === -1) {
      setSelectedOrders([...selectedOrders, order]);
    } else {
      const updatedOrders = [...selectedOrders];
      updatedOrders.splice(selectedIndex, 1);
      setSelectedOrders(updatedOrders);
    }
  };

  //컬럼 정렬
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...orders].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setSelectedOrders([]);
    setSortConfig({ key, direction });
  };
  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '▼';
  };

  const handleFormSubmitInternal = (event) => {
    event.preventDefault();
    handleFormSubmit();
  };

  // orders 배열의 요소들을 숫자로 변환하여 새로운 배열을 생성
  const parsedOrders = orders.map(order => ({
    ...order,
    item_qty: parseInt(order.item_qty, 10), // item_qty를 정수로 변환
    order_total_price: parseFloat(order.order_total_price) // order_total_price를 부동 소수점 숫자로 변환
  }));

  // 정렬된 주문 목록
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortConfig.key) {
      const direction = sortConfig.direction === 'ascending' ? 1 : -1;
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return -1 * direction;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return 1 * direction;
      }
    }
    return 0;
  });

  const selectAllCheckboxState = selectAll || (selectedOrders.length === orders.length && orders.length > 0);


  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllCheckboxState} onChange={toggleSelectAll} /></th>
            <th onClick={() => handleSort('orderNum')}>주문번호{getSortDirection('orderNum')}</th>
            <th onClick={() => handleSort('orderDate')}>판매일시{getSortDirection('orderDate')}</th>
            <th onClick={() => handleSort('customerName')}>이름{getSortDirection('customerName')}</th>
            <th onClick={() => handleSort('customerTel')}>연락처{getSortDirection('customerTel')}</th>
            {/* <th onClick={() => handleSort('customerAddr')}>주소{getSortDirection('customerAddr')}</th> */}
            <th onClick={() => handleSort('itemName')}>상품명{getSortDirection('itemName')}</th>
            <th onClick={() => handleSort('quantity')}>수량{getSortDirection('quantity')}</th>
            {/* <th onClick={() => handleSort('unitPrice')}>단가{getSortDirection('unitPrice')}</th> */}
            {/* <th onClick={() => handleSort('deliveryFee')}>배송비{getSortDirection('deliveryFee')}</th> */}
            <th onClick={() => handleSort('totalPrice')}>판매금액{getSortDirection('totalPrice')}</th>
            {/* <th onClick={() => handleSort('itemReq')}>요청사항{getSortDirection('itemReq')}</th> */}
            <th onClick={() => handleSort('orderStatus')}>주문상태{getSortDirection('orderStatus')}</th>
            {/* <th>배송정보</th> */}
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order, index) => (
            <tr key={index}>
              <td><input type="checkbox" checked={selectedOrders.some(selectedOrder => selectedOrder.orderNum === order.orderNum)} onChange={() => toggleOrderSelection(order)} /></td>
              <td>{order.orderNum}</td>
              <td>{order.orderDate}</td>
              <td>{order.customerName}</td>
              <td>{order.customerTel}</td>
              {/* <td>{order.customerAddr}</td> */}
              <td>{order.itemName}</td>
              <td>{order.quantity}</td>
              {/* <td>{order.unitPrice.toLocaleString()} 원</td> */}
              {/* <td>{order.deliveryFee.toLocaleString()} 원</td> */}
              <td>{order.totalPrice} 원</td>
              {/* <td>{order.itemReq}</td> */}
              <td>{order.orderStatus}</td>
              {/* <td><button className="button-register">등록</button></td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
