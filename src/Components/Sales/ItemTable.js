import React, { useState } from 'react';
import './Sales.css';

const initialOrders = [
  {
    itemNumber: '1001',
    itemType: '빵',
    itemName: '단팥빵',
    itemStatus: '판매 중',
    unitPrice: '1000',
    quantity: 100
  },
];

const ItemTable = ({ isFormVisible, formData, handleInputChange, handleFormSubmit }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  // 테이블 추가/수정 변수
 const [add, setAddPurchase] = useState([]); // 추가할 데이터를 배열로 받는다.
 const [updatePurchase, setUpdatePurchase] = useState([]); // 수정할 데이터를 배열로 받는다.



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

  const handleFormSubmitInternal = (e) => {
    e.preventDefault();
    setOrders([formData, ...orders]);
    handleFormSubmit();
  };

  const handleCancel = () => {
    handleFormSubmit(); // 취소 시 입력폼 초기화
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllCheckboxState} onChange={toggleSelectAll} /></th>
            <th>상품번호</th>
            <th>구분</th>
            <th>상품명</th>
            <th>판매상태</th>
            <th>단가(원)</th>
            <th>상품수량(개)</th>
          </tr>
          {isFormVisible && (
            <tr>
              <td></td>
              <td><input type="text" name="orderNumber" value={formData.orderNumber} onChange={handleInputChange} /></td>
              <td>
                <select name="itemType" value={formData.itemType} onChange={handleInputChange}>
                  <option value="">선택하세요</option>
                  <option value="빵">빵</option>
                  <option value="케이크">케이크</option>
                  <option value="디저트">디저트</option>
                  <option value="쿠키">쿠키</option>
                </select>
              </td>
              <td><input type="text" name="itemName" value={formData.itemName} onChange={handleInputChange} /></td>
              <td>
                <select name="itemStatus" value={formData.itemStatus} onChange={handleInputChange}>
                  <option value="">선택하세요</option>
                  <option value="판매 중">판매 중</option>
                  <option value="품절">품절</option>
                  <option value="판매 중단">판매 중단</option>
                </select>
              </td>
              <td><input type="text" name="totalPrice" value={formData.totalPrice} onChange={handleInputChange} /></td>
              <td><input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} /></td>
              <td>
                <button onClick={handleFormSubmitInternal}>추가</button>
                <button onClick={handleCancel}>취소</button>
              </td>
            </tr>
          )}
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td><input type="checkbox" checked={selectedOrders.some(selectedOrder => selectedOrder.orderNumber === order.orderNumber)} onChange={() => toggleOrderSelection(order)} /></td>
              <td>{order.itemNumber}</td>
              <td>{order.itemType}</td>
              <td>{order.itemName}</td>
              <td>{order.itemStatus}</td>
              <td>{order.unitPrice}</td>
              <td>{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
