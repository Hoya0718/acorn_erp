import React, { useState } from 'react';
import './Sales.css';

const ItemTable = ({ isFormVisible, formData, handleInputChange, handleFormSubmit, orders, setOrders, selectedOrders, setSelectedOrders }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({
    itemNumber: '',
    itemType: '',
    itemName: '',
    itemStatus: '',
    unitPrice: '',
    quantity: ''
  });

  // 전체 선택 토글
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedOrders([...orders]);
    } else {
      setSelectedOrders([]);
    }
  };

  // 개별 주문 선택 토글
  const toggleOrderSelection = (order) => {
    const selectedIndex = selectedOrders.findIndex((selectedOrder) => selectedOrder.itemNumber === order.itemNumber);
    if (selectedIndex === -1) {
      setSelectedOrders([...selectedOrders, order]);
    } else {
      const updatedOrders = [...selectedOrders];
      updatedOrders.splice(selectedIndex, 1);
      setSelectedOrders(updatedOrders);
    }
  };

  // 전체 선택 체크박스 상태
  const selectAllCheckboxState = selectAll || (selectedOrders.length === orders.length && orders.length > 0);

  // 내부 제출 핸들러
  const handleFormSubmitInternal = (e) => {
    e.preventDefault();

    // 각 필드에 대한 유효성 검사
    const newErrors = {};
    if (!formData.itemNumber.trim()) newErrors.itemNumber = '상품 코드를 입력하세요.';
    if (!formData.itemType.trim()) newErrors.itemType = '상품 구분을 선택하세요.';
    if (!formData.itemName.trim()) newErrors.itemName = '상품명을 입력하세요.';
    if (!formData.itemStatus.trim()) newErrors.itemStatus = '판매 상태를 선택하세요.';
    if (!formData.unitPrice.trim() || isNaN(formData.unitPrice)) newErrors.unitPrice = '단가를 입력하세요.';
    if (!formData.quantity.trim() || isNaN(formData.quantity)) newErrors.quantity = '수량을 입력하세요.';

    setErrors(newErrors);

    // 오류가 없을 경우 제출 처리
    if (Object.keys(newErrors).length === 0) {
      setOrders([formData, ...orders]); // 새 주문을 목록의 맨 앞에 추가
      handleFormSubmit(); // 외부 제출 핸들러 호출
      setErrors({}); // 오류 메시지 초기화
    }
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
        </thead>
        <tbody>
          {isFormVisible && (
            <tr>
              <td></td>
              <td>
                <input 
                  type="text" 
                  name="itemNumber" 
                  value={formData.itemNumber} 
                  onChange={handleInputChange} 
                  style={{ borderColor: errors.itemNumber ? 'red' : undefined }} 
                />
                {errors.itemNumber && <div style={{ color: 'red' }}>{errors.itemNumber}</div>}
              </td>
              <td>
                <select 
                  name="itemType" 
                  value={formData.itemType} 
                  onChange={handleInputChange} 
                  style={{ borderColor: errors.itemType ? 'red' : undefined }}
                >
                  <option value="">선택하세요</option>
                  <option value="빵">빵</option>
                  <option value="케이크">케이크</option>
                  <option value="디저트">디저트</option>
                  <option value="쿠키">쿠키</option>
                </select>
                {errors.itemType && <div style={{ color: 'red' }}>{errors.itemType}</div>}
              </td>
              <td>
                <input 
                  type="text" 
                  name="itemName" 
                  value={formData.itemName} 
                  onChange={handleInputChange} 
                  style={{ borderColor: errors.itemName ? 'red' : undefined }} 
                />
                {errors.itemName && <div style={{ color: 'red' }}>{errors.itemName}</div>}
              </td>
              <td>
                <select 
                  name="itemStatus" 
                  value={formData.itemStatus} 
                  onChange={handleInputChange} 
                  style={{ borderColor: errors.itemStatus ? 'red' : undefined }}
                >
                  <option value="">선택하세요</option>
                  <option value="판매 중">판매 중</option>
                  <option value="품절">품절</option>
                  <option value="판매 중단">판매 중단</option>
                </select>
                {errors.itemStatus && <div style={{ color: 'red' }}>{errors.itemStatus}</div>}
              </td>
              <td>
                <input 
                  type="text" 
                  name="unitPrice" 
                  value={formData.unitPrice} 
                  onChange={handleInputChange} 
                  style={{ borderColor: errors.unitPrice ? 'red' : undefined }} 
                />
                {errors.unitPrice && <div style={{ color: 'red' }}>{errors.unitPrice}</div>}
              </td>
              <td>
                <input 
                  type="number" 
                  name="quantity" 
                  value={formData.quantity} 
                  onChange={handleInputChange} 
                  style={{ borderColor: errors.quantity ? 'red' : undefined }} 
                />
                {errors.quantity && <div style={{ color: 'red' }}>{errors.quantity}</div>}
              </td>
              <td>
                <button className="items-subTitle-button" onClick={handleFormSubmitInternal}>추가</button>
              </td>
            </tr>
          )}
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
