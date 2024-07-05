import React, { useState } from 'react';
import './Sales.css';

const ItemTable = ({ isFormVisible, formData, handleInputChange, handleFormSubmit, orders, selectedOrder, selectedOrders, setSelectedOrders }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({
    itemCode: '',
    itemType: '',
    itemName: '',
    itemStatus: '',
    itemPrice: '',
    itemQuantity: ''
  });

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedOrders([...orders]);
    } else {
      setSelectedOrders([]);
    }
  };

  const toggleOrderSelection = (order) => {
    const selectedIndex = selectedOrders.findIndex((selectedOrder) => selectedOrder.itemCode === order.itemCode);
    if (selectedIndex === -1) {
      setSelectedOrders([...selectedOrders, order]);
    } else {
      const updatedOrders = [...selectedOrders];
      updatedOrders.splice(selectedIndex, 1);
      setSelectedOrders(updatedOrders);
    }
  };

  const selectAllCheckboxState = selectAll || (selectedOrders.length === orders.length && orders.length > 0);

  const handleFormSubmitInternal = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.itemType.trim()) newErrors.itemType = '상품 구분을 선택하세요.';
    if (!formData.itemName.trim()) newErrors.itemName = '상품명을 입력하세요.';
    if (!formData.itemStatus.trim()) newErrors.itemStatus = '판매 상태를 선택하세요.';
    if (formData.itemPrice === '') newErrors.itemPrice = '단가를 입력하세요.';
    if (formData.itemQuantity === '') newErrors.itemQuantity = '수량을 입력하세요.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleFormSubmit();
      setErrors({});
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
          {isFormVisible && !selectedOrder && (
            <tr>
              <td></td>
              <td>
                <input 
                  type="text" 
                  name="itemCode" 
                  value={formData.itemCode} 
                  onChange={handleInputChange} 
                  placeholder="상품번호"
                  style={{ borderColor: errors.itemCode ? 'red' : undefined }} 
                  readOnly
                />
                {errors.itemCode && <div style={{ color: 'red' }}>{errors.itemCode}</div>}
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
                  placeholder="상품명"
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
                  type="number" 
                  name="itemPrice" 
                  value={formData.itemPrice} 
                  onChange={handleInputChange} 
                  placeholder="단가(원)"
                  style={{ borderColor: errors.itemPrice ? 'red' : undefined }} 
                />
                {errors.itemPrice && <div style={{ color: 'red' }}>{errors.itemPrice}</div>}
              </td>
              <td>
                <input 
                  type="number" 
                  name="itemQuantity" 
                  value={formData.itemQuantity} 
                  onChange={handleInputChange} 
                  placeholder="상품수량(개)"
                  style={{ borderColor: errors.itemQuantity ? 'red' : undefined }} 
                />
                {errors.itemQuantity && <div style={{ color: 'red' }}>{errors.itemQuantity}</div>}
                <button className="items-subTitle-button" onClick={handleFormSubmitInternal}>✔</button>
              </td>
            </tr>
          )}
          {orders.map((order, index) => (
            selectedOrder && selectedOrder.itemCode === order.itemCode ? (
              <tr key={index}>
                <td></td>
                <td>
                  <input 
                    type="text" 
                    name="itemCode" 
                    value={formData.itemCode} 
                    onChange={handleInputChange} 
                    placeholder="상품번호"
                    style={{ borderColor: errors.itemCode ? 'red' : undefined }} 
                    readOnly 
                  />
                  {errors.itemCode && <div style={{ color: 'red' }}>{errors.itemCode}</div>}
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
                    placeholder="상품명"
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
                    type="number" 
                    name="itemPrice" 
                    value={formData.itemPrice} 
                    onChange={handleInputChange} 
                    placeholder="단가(원)"
                    style={{ borderColor: errors.itemPrice ? 'red' : undefined }} 
                  />
                  {errors.itemPrice && <div style={{ color: 'red' }}>{errors.itemPrice}</div>}
                </td>
                <td>
                  <input 
                    type="number" 
                    name="itemQuantity" 
                    value={formData.itemQuantity} 
                    onChange={handleInputChange} 
                    placeholder="상품수량(개)"
                    style={{ borderColor: errors.itemQuantity ? 'red' : undefined }} 
                  />
                  {errors.itemQuantity && <div style={{ color: 'red' }}>{errors.itemQuantity}</div>}
                  <button className="items-subTitle-button" onClick={handleFormSubmitInternal}>✔</button>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td><input type="checkbox" checked={selectedOrders.some(selectedOrder => selectedOrder.itemCode === order.itemCode)} onChange={() => toggleOrderSelection(order)} /></td>
                <td>{order.itemCode}</td>
                <td>{order.itemType}</td>
                <td>{order.itemName}</td>
                <td>{order.itemStatus}</td>
                <td>{order.itemPrice}</td>
                <td>{order.itemQuantity}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
