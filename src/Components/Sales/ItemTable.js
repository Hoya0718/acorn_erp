import React, { useState } from 'react';
import './Sales.css';

const ItemTable = ({ isFormVisible, formData, handleInputChange, handleFormSubmit, orders, selectedOrder, selectedOrders, setSelectedOrders, setIsFormVisible }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({
    itemCode: '',
    itemType: '',
    itemStatus: '',
    itemName: '',
    itemQty: '',
    itemPrice: '',
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
    const selectedIndex = selectedOrders.findIndex((selectedOrder) => selectedOrder.itemCode === order.itemCode);
    if (selectedIndex === -1) {
      setSelectedOrders([...selectedOrders, order]);
    } else {
      const updatedOrders = [...selectedOrders];
      updatedOrders.splice(selectedIndex, 1);
      setSelectedOrders(updatedOrders);
    }
  };

  // 컬럼 정렬
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
    setIsFormVisible(false); // 저장 버튼을 클릭하면 입력 필드가 사라지도록 설정
  };

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

  // 전체 선택 체크박스 상태 결정
  const selectAllCheckboxState = selectAll || (selectedOrders.length === orders.length && orders.length > 0);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllCheckboxState} onChange={toggleSelectAll} /></th>
            <th onClick={() => handleSort('itemCode')}>상품번호 {getSortDirection('itemCode')}</th>
            <th onClick={() => handleSort('itemType')}>구분 {getSortDirection('itemType')}</th>
            <th onClick={() => handleSort('itemStatus')}>판매상태 {getSortDirection('itemStatus')}</th>
            <th onClick={() => handleSort('itemName')}>상품명 {getSortDirection('itemName')}</th>
            <th onClick={() => handleSort('itemQty')}>상품수량(개) {getSortDirection('itemQty')}</th>
            <th onClick={() => handleSort('itemPrice')}>단가(원) {getSortDirection('itemPrice')}</th>
          </tr>
        </thead>
        <tbody>
          {isFormVisible && !selectedOrder && (
            <tr>
              <td></td>
              <td>
                <input type="text" 
                  name="itemCode" 
                  value={formData.itemCode} 
                  onChange={handleInputChange} 
                  placeholder="상품번호"
                  style={{ borderColor: errors.itemCode ? 'red' : undefined, width: '70px'  }} 
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
                  <option value="">구분</option>
                  <option value="빵">빵</option>
                  <option value="케이크">케이크</option>
                  <option value="디저트">디저트</option>
                  <option value="쿠키">쿠키</option>
                </select>
                {errors.itemType && <div style={{ color: 'red' }}>{errors.itemType}</div>}
              </td>
              <td>
                <select 
                  name="itemStatus" 
                  value={formData.itemStatus} 
                  onChange={handleInputChange} 
                  style={{ borderColor: errors.itemStatus ? 'red' : undefined }}
                >
                  <option value="">판매상태</option>
                  <option value="판매 중">판매 중</option>
                  <option value="품절">품절</option>
                  <option value="판매 중단">판매 중단</option>
                </select>
                {errors.itemStatus && <div style={{ color: 'red' }}>{errors.itemStatus}</div>}
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
                  placeholder="상품수량(개)"
                  style={{ borderColor: errors.itemQty ? 'red' : undefined }} 
                />
                {errors.itemQty && <div style={{ color: 'red' }}>{errors.itemQty}</div>}
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
                <button className="items-subTitle-button" onClick={handleFormSubmitInternal}>✔</button>
              </td>
            </tr>
          )}
          {sortedOrders.map((order, index) => (
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
                  <select 
                    className="item-select"
                    name="itemStatus" 
                    value={formData.itemStatus} 
                    onChange={handleInputChange} 
                    style={{ borderColor: errors.itemStatus ? 'red' : undefined, }}
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
                    placeholder="상품수량(개)"
                    style={{ borderColor: errors.itemQty ? 'red' : undefined }} 
                  />
                  {errors.itemQty && <div style={{ color: 'red' }}>{errors.itemQty}</div>}
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
                  <button className="items-subTitle-button" onClick={handleFormSubmitInternal}>✔</button>
                </td>

              </tr>
            ) : (
              <tr key={index}>
                <td><input type="checkbox" checked={selectedOrders.some((selectedOrder) => selectedOrder.itemCode === order.itemCode)} onChange={() => toggleOrderSelection(order)} /></td>
                <td>{order.itemCode}</td>
                <td>{order.itemType}</td>
                <td>{order.itemStatus}</td>
                <td>{order.itemName}</td>
                <td>{order.itemQty.toLocaleString()}</td>
                <td>{order.itemPrice.toLocaleString()}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
