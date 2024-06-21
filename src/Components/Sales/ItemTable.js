import React, { useState } from 'react';
import './Sales.css';

const ItemTable = ({ isFormVisible, formData, handleInputChange, handleFormSubmit, orders, selectedOrders, setSelectedOrders }) => {
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태

  // 전체 선택 토글
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedOrders([...orders]); // 전체 선택 시 모든 주문을 선택된 목록에 추가
    } else {
      setSelectedOrders([]); // 선택 해제 시 선택된 목록 초기화
    }
  };

  // 개별 주문 선택 토글
  const toggleOrderSelection = (order) => {
    const selectedIndex = selectedOrders.findIndex((selectedOrder) => selectedOrder.itemNumber === order.itemNumber);
    if (selectedIndex === -1) {
      setSelectedOrders([...selectedOrders, order]); // 선택되지 않은 경우 선택된 목록에 추가
    } else {
      const updatedOrders = [...selectedOrders];
      updatedOrders.splice(selectedIndex, 1); // 선택된 경우 선택된 목록에서 제거
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
            <th>구분</th>
            <th>상품명</th>
            <th>판매상태</th>
            <th>단가(원)</th>
            <th>상품수량(개)</th>
          </tr>
          {isFormVisible && (
            <tr>
              <td></td>
              <td><input type="text" name="itemNumber" value={formData.itemNumber} onChange={handleInputChange} /></td>
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
              <td><input type="text" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange} /></td>
              <td><input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} /></td>
            </tr>
          )}
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td><input type="checkbox" checked={selectedOrders.some(selectedOrder => selectedOrder.itemNumber === order.itemNumber)} onChange={() => toggleOrderSelection(order)} /></td>
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
