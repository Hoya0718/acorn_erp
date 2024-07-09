import React, { useState } from 'react';
import './Sales.css';

const InventoryTable = ({
  isFormVisible,
  formData,
  handleInputChange,
  handleFormSubmit,
  inventory,
  selectedItem,
  selectedInventory,
  setSelectedInventory,
  setIsFormVisible
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({
    itemCode: '',
    itemName: '',
    itemQty: '',
    stockOut: '',
    stockQty: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedInventory([...inventory]);
    } else {
      setSelectedInventory([]);
    }
  };

  const toggleInventorySelection = (item) => {
    const selectedIndex = selectedInventory.findIndex((selectedItem) => selectedItem.no === item.no);
    if (selectedIndex === -1) {
      setSelectedInventory([...selectedInventory, item]);
    } else {
      const updatedInventory = [...selectedInventory];
      updatedInventory.splice(selectedIndex, 1);
      setSelectedInventory(updatedInventory);
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
    if (!formData.itemName) newErrors.itemName = '상품명을 입력하세요.';
    if (!formData.itemQty || isNaN(formData.itemQty) || parseInt(formData.itemQty) <= 0) newErrors.itemQty = '유효한 수량을 입력하세요.';
    if (!formData.stockOut || isNaN(formData.stockOut) || parseFloat(formData.stockOut) < 0) newErrors.stockOut = '유효한 출고 수량을 입력하세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmitInternal = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleFormSubmit();
      setIsFormVisible(false); // 저장 버튼을 클릭하면 입력 필드가 사라지도록 설정
    }
  };

  const sortedInventory = [...inventory].sort((a, b) => {
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
  const selectAllCheckboxState = selectAll || (selectedInventory.length === inventory.length && inventory.length > 0);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllCheckboxState} onChange={toggleSelectAll} /></th>
            <th onClick={() => handleSort('itemCode')}>상품번호 {getSortDirection('itemCode')}</th>
            <th onClick={() => handleSort('itemName')}>상품명 {getSortDirection('itemName')}</th>
            <th onClick={() => handleSort('itemQty')}>입고수량(개) {getSortDirection('itemQty')}</th>
            <th onClick={() => handleSort('stockOut')}>출고수량(개) {getSortDirection('stockOut')}</th>
            <th onClick={() => handleSort('stockQty')}>재고합계(개) {getSortDirection('stockQty')}</th>
          </tr>
        </thead>
        <tbody>
          {isFormVisible && !selectedItem && (
            <tr>
              <td></td>
              <td>
                <input type="text" 
                  name="itemCode" 
                  value={formData.itemCode} 
                  onChange={handleInputChange} 
                  placeholder="상품번호" 
                  readOnly
                />
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
                  placeholder="입고수량(개)"
                  style={{ borderColor: errors.itemQty ? 'red' : undefined }} 
                />
                {errors.itemQty && <div style={{ color: 'red' }}>{errors.itemQty}</div>}
              </td>
              <td>
                <input 
                  type="number" 
                  name="stockOut" 
                  value={formData.stockOut} 
                  onChange={handleInputChange} 
                  placeholder="출고수량(개)"
                  style={{ borderColor: errors.stockOut ? 'red' : undefined }} 
                />
                {errors.stockOut && <div style={{ color: 'red' }}>{errors.stockOut}</div>}
              </td>
              <td>
                <input 
                  type="number" 
                  name="stockQty" 
                  value={formData.stockQty} 
                  onChange={handleInputChange} 
                  placeholder="재고합계(개)" 
                />
                <button className="items-subTitle-button" onClick={handleFormSubmitInternal}>✔</button>
              </td>
            </tr>
          )}
          {sortedInventory.map((item, index) => (
            selectedItem && selectedItem.no === item.no ? (
              <tr key={index}>
                <td></td>
                <td>
                  <input 
                    type="text" 
                    name="itemCode" 
                    value={formData.itemCode} 
                    onChange={handleInputChange} 
                    placeholder="상품번호" 
                    readOnly 
                  />
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
                    placeholder="입고수량(개)"
                    style={{ borderColor: errors.itemQty ? 'red' : undefined }}
                  />
                  {errors.itemQty && <div style={{ color: 'red' }}>{errors.itemQty}</div>}
                </td>
                <td>
                  <input 
                    type="number" 
                    name="stockOut" 
                    value={formData.stockOut} 
                    onChange={handleInputChange} 
                    placeholder="출고수량(개)"
                    style={{ borderColor: errors.stockOut ? 'red' : undefined }}
                  />
                  {errors.stockOut && <div style={{ color: 'red' }}>{errors.stockOut}</div>}
                </td>
                <td>
                  <input 
                    type="number" 
                    name="stockQty" 
                    value={formData.stockQty} 
                    onChange={handleInputChange} 
                    placeholder="재고합계(개)" 
                  />
                  <button className="items-subTitle-button" onClick={handleFormSubmitInternal}>✔</button>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td><input type="checkbox" checked={selectedInventory.some((selectedItem) => selectedItem.no === item.no)} onChange={() => toggleInventorySelection(item)} /></td>
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.itemQty}</td>
                <td>{item.stockOut}</td>
                <td>{item.itemQty - item.stockOut}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
