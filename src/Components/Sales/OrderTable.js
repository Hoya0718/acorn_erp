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
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({
    orderStatus: '',
    orderDate: '',
    customerName: '',
    customerTel: '',
    itemName: '',
    itemQty: '',
    orderPrice: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'orderNum', direction: 'descending' });

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

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '▼';
  };

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

  const handleFormSubmitInternal = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleFormSubmit();
      setIsFormVisible(false);
    }
  };

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

  const selectAllCheckboxState = selectAll || (selectedOrders.length === orders.length && orders.length > 0);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllCheckboxState} onChange={toggleSelectAll} /></th>
            <th className="orderNum" onClick={() => handleSort('orderNum')}>주문번호 {getSortDirection('orderNum')}</th>
            <th className="orderStatus" onClick={() => handleSort('orderStatus')}>주문상태 {getSortDirection('orderStatus')}</th>
            <th className="orderDate" onClick={() => handleSort('orderDate')}>판매일시 {getSortDirection('orderDate')}</th>
            <th className="customerName" onClick={() => handleSort('customerName')}>이름 {getSortDirection('customerName')}</th>
            <th className="customerTel" onClick={() => handleSort('customerTel')}>연락처 {getSortDirection('customerTel')}</th>
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
              <td className="orderNum">
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
                  placeholder="010-0000-0000"
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
                  placeholder="수량(개)"
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
                  placeholder="단가(원)"
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
                <td className="orderNum">
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
                    placeholder="010-0000-0000"
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
                    placeholder="수량(개)"
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
                    placeholder="단가(원)"
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
                <td className="orderNum">{order.orderNum}</td>
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
