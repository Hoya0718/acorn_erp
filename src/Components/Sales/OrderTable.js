import React, { useState } from 'react';
import './Sales.css';

const OrderTable = ({
  isFormVisible,
  formData,
  handleInputChange,
  handleFormSubmit,
  orders,
  selectedOrder,
  selectedOrders,
  setSelectedOrders,
  setIsFormVisible
}) => {
  const [selectAll, setSelectAll] = useState(false); // 모두 선택 체크 상태를 관리하는 상태
  const [errors, setErrors] = useState({ // 입력 필드의 유효성 검사 오류를 관리하는 상태
    orderStatus: '',
    orderDate: '',
    customerName: '',
    customerTel: '',
    itemName: '',
    itemQty: '',
    orderPrice: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'orderNum', direction: 'descending' }); // 테이블 정렬 설정을 관리하는 상태

  // 모두 선택 체크 상태를 토글하는 함수
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedOrders([...orders]);
    } else {
      setSelectedOrders([]);
    }
  };

  // 주문 선택을 토글하는 함수
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

  // 테이블 열 클릭 시 정렬 방향을 설정하는 함수
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // 정렬 방향에 따라 화살표 표시를 반환하는 함수
  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '▼';
  };

  // 입력 폼 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {};
    if (!formData.orderStatus) newErrors.orderStatus = '주문상태를 입력하세요.';
    if (!formData.orderDate) newErrors.orderDate = '판매일시를 선택하세요.';
    if (!formData.customerName) newErrors.customerName = '이름을 입력하세요.';
    if (!formData.customerTel) newErrors.customerTel = '연락처를 입력하세요.';
    if (!formData.itemName) newErrors.itemName = '상품명을 입력하세요.';
    if (!formData.itemQty || isNaN(formData.itemQty) || parseInt(formData.itemQty) <= 0) newErrors.itemQty = '수량을 입력하세요.';
    if (!formData.orderPrice || isNaN(formData.orderPrice) || parseFloat(formData.orderPrice) <= 0) newErrors.orderPrice = '단가를 입력하세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출 처리 함수
  const handleFormSubmitInternal = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleFormSubmit();
      setIsFormVisible(false);
    }
  };

  // 정렬된 주문 목록을 반환하는 변수
  const sortedOrders = [...orders].sort((a, b) => {
    const direction = sortConfig.direction === 'ascending' ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return -1 * direction;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return 1 * direction;
    }
    return 0;
  });

  // 모든 주문을 선택하는 체크박스 상태
  const selectAllCheckboxState = selectAll || (selectedOrders.length === orders.length && orders.length > 0);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllCheckboxState} onChange={toggleSelectAll} /></th>
            <th onClick={() => handleSort('orderNum')}>주문번호 {getSortDirection('orderNum')}</th>
            <th onClick={() => handleSort('orderStatus')}>주문상태 {getSortDirection('orderStatus')}</th>
            <th onClick={() => handleSort('orderDate')}>판매일시 {getSortDirection('orderDate')}</th>
            <th onClick={() => handleSort('customerName')}>이름 {getSortDirection('customerName')}</th>
            <th onClick={() => handleSort('customerTel')}>연락처 {getSortDirection('customerTel')}</th>
            <th onClick={() => handleSort('itemName')}>상품명 {getSortDirection('itemName')}</th>
            <th onClick={() => handleSort('itemQty')}>수량 {getSortDirection('itemQty')}</th>
            <th onClick={() => handleSort('orderPrice')}>단가 {getSortDirection('orderPrice')}</th>
            <th onClick={() => handleSort('orderTotalPrice')}>판매금액 {getSortDirection('orderTotalPrice')}</th>
          </tr>
        </thead>
        <tbody>
          {isFormVisible && !selectedOrder && (
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  name="orderNum"
                  value={formData.orderNum}
                  onChange={handleInputChange}
                  placeholder="주문번호"
                  readOnly
                />
              </td>
              <td>
                <select
                  name="orderStatus"
                  value={formData.orderStatus}
                  onChange={handleInputChange}
                  style={{ borderColor: errors.orderStatus ? 'red' : undefined }}
                >
                  <option value="">주문상태</option>
                  <option value="결제완료">결제완료</option>
                  <option value="취소완료">취소완료</option>
                </select>
                {errors.orderStatus && <div style={{ color: 'red' }}>{errors.orderStatus}</div>}
              </td>
              <td>
                <input
                  type="datetime-local"
                  name="orderDate"
                  value={formData.orderDate}
                  onChange={handleInputChange}
                  placeholder="판매일시"
                  style={{ borderColor: errors.orderDate ? 'red' : undefined }}
                />
                {errors.orderDate && <div style={{ color: 'red' }}>{errors.orderDate}</div>}
              </td>
              <td>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="이름"
                  style={{ borderColor: errors.customerName ? 'red' : undefined }}
                />
                {errors.customerName && <div style={{ color: 'red' }}>{errors.customerName}</div>}
              </td>
              <td>
                <input
                  type="text"
                  name="customerTel"
                  value={formData.customerTel}
                  onChange={handleInputChange}
                  placeholder="연락처"
                  style={{ borderColor: errors.customerTel ? 'red' : undefined }}
                />
                {errors.customerTel && <div style={{ color: 'red' }}>{errors.customerTel}</div>}
              </td>
              <td>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  placeholder="상품명"
                  style={{ borderColor: errors.itemName ? 'red' : undefined }}
                />
                {errors.itemName && <div style={{ color: 'red' }}>{errors.itemName}</div>}
              </td>
              <td>
                <input
                  type="number"
                  name="itemQty"
                  value={formData.itemQty}
                  onChange={handleInputChange}
                  placeholder="수량"
                  style={{ borderColor: errors.itemQty ? 'red' : undefined }}
                />
                {errors.itemQty && <div style={{ color: 'red' }}>{errors.itemQty}</div>}
              </td>
              <td>
                <input
                  type="number"
                  name="orderPrice"
                  value={formData.orderPrice}
                  onChange={handleInputChange}
                  placeholder="단가"
                  style={{ borderColor: errors.orderPrice ? 'red' : undefined }}
                />
                {errors.orderPrice && <div style={{ color: 'red' }}>{errors.orderPrice}</div>}
                <button className="items-subTitle-button" onClick={handleFormSubmitInternal}>✔</button>
              </td>
              <td>
              </td>
            </tr>
          )}
          {sortedOrders.map((order, index) => (
            selectedOrder && selectedOrder.orderNum === order.orderNum ? (
              <tr key={index}>
                <td></td>
                <td>
                  <input
                    type="text"
                    name="orderNum"
                    value={formData.orderNum}
                    onChange={handleInputChange}
                    placeholder="주문번호"
                    readOnly
                  />
                </td>
                <td>
                <select
                  name="orderStatus"
                  value={formData.orderStatus}
                  onChange={handleInputChange}
                  style={{ borderColor: errors.orderStatus ? 'red' : undefined }}
                >
                  <option value="">주문상태</option>
                  <option value="결제완료">결제완료</option>
                  <option value="취소완료">취소완료</option>
                </select>
                {errors.orderStatus && <div style={{ color: 'red' }}>{errors.orderStatus}</div>}
              </td>
                <td>
                  <input
                    type="datetime-local"
                    name="orderDate"
                    value={formData.orderDate}
                    onChange={handleInputChange}
                    placeholder="판매일시"
                    style={{ borderColor: errors.orderDate ? 'red' : undefined }}
                  />
                  {errors.orderDate && <div style={{ color: 'red' }}>{errors.orderDate}</div>}
                </td>
                <td>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="이름"
                    style={{ borderColor: errors.customerName ? 'red' : undefined }}
                  />
                  {errors.customerName && <div style={{ color: 'red' }}>{errors.customerName}</div>}
                </td>
                <td>
                  <input
                    type="text"
                    name="customerTel"
                    value={formData.customerTel}
                    onChange={handleInputChange}
                    placeholder="연락처"
                    style={{ borderColor: errors.customerTel ? 'red' : undefined }}
                  />
                  {errors.customerTel && <div style={{ color: 'red' }}>{errors.customerTel}</div>}
                </td>
                <td>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    placeholder="상품명"
                    style={{ borderColor: errors.itemName ? 'red' : undefined }}
                  />
                  {errors.itemName && <div style={{ color: 'red' }}>{errors.itemName}</div>}
                </td>
                <td>
                  <input
                    type="number"
                    name="itemQty"
                    value={formData.itemQty}
                    onChange={handleInputChange}
                    placeholder="수량"
                    style={{ borderColor: errors.itemQty ? 'red' : undefined }}
                  />
                  {errors.itemQty && <div style={{ color: 'red' }}>{errors.itemQty}</div>}
                </td>
                <td>
                  <input
                    type="number"
                    name="orderPrice"
                    value={formData.orderPrice}
                    onChange={handleInputChange}
                    placeholder="단가"
                    style={{ borderColor: errors.orderPrice ? 'red' : undefined }}
                  />
                  {errors.orderPrice && <div style={{ color: 'red' }}>{errors.orderPrice}</div>}
                  <button className="items-subTitle-button" onClick={handleFormSubmitInternal}>✔</button>
                </td>
                <td>
                </td>
              </tr>
            ) : (
              <tr key={index} onClick={() => toggleOrderSelection(order)}>
                <td><input type="checkbox" checked={selectedOrders.some(selectedOrder => selectedOrder.orderNum === order.orderNum)} onChange={() => toggleOrderSelection(order)} /></td>
                <td>{order.orderNum}</td>
                <td>{order.orderStatus}</td>
                <td>{order.orderDate}</td>
                <td>{order.customerName}</td>
                <td>{order.customerTel}</td>
                <td>{order.itemName}</td>
                <td>{order.itemQty} 개</td>
                <td>{order.orderPrice} 원</td>
                <td>{order.orderTotalPrice} 원</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
