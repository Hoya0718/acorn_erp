import React, { useState } from 'react';
import './Sales.css';

const ItemTable = ({
  isFormVisible,
  formData,
  handleInputChange,
  handleFormSubmit,
  items,
  selectedItem,
  selectedItems,
  setSelectedItems,
  setIsFormVisible
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({
    itemCode: '',
    itemType: '',
    itemStatus: '',
    itemName: '',
    itemQty: '',
    itemPrice: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems([...items]);
    } else {
      setSelectedItems([]);
    }
  };

  const toggleItemSelection = (item) => {
    const selectedIndex = selectedItems.findIndex((selectedItem) => selectedItem.itemCode === item.itemCode);
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      const updatedItems = [...selectedItems];
      updatedItems.splice(selectedIndex, 1);
      setSelectedItems(updatedItems);
    }
  };

  // 컬럼 정렬
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...items].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setSelectedItems([]);
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
    if (!formData.itemType) newErrors.itemType = '구분을 선택하세요.';
    if (!formData.itemStatus) newErrors.itemStatus = '판매상태를 선택하세요.';
    if (!formData.itemName) newErrors.itemName = '상품명을 입력하세요.';
    if (!formData.itemQty || isNaN(formData.itemQty) || parseInt(formData.itemQty) <= 0) newErrors.itemQty = '유효한 수량을 입력하세요.';
    if (!formData.itemPrice || isNaN(formData.itemPrice) || parseFloat(formData.itemPrice) <= 0) newErrors.itemPrice = '유효한 단가를 입력하세요.';

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

  const sortedItems = [...items].sort((a, b) => {
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
  const selectAllCheckboxState = selectAll || (selectedItems.length === items.length && items.length > 0);

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
            <th onClick={() => handleSort('itemQty')}>상품수량 {getSortDirection('itemQty')}</th>
            <th onClick={() => handleSort('itemPrice')}>단가(원) {getSortDirection('itemPrice')}</th>
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
          {sortedItems.map((item, index) => (
            selectedItem && selectedItem.itemCode === item.itemCode ? (
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
                <td><input type="checkbox" checked={selectedItems.some((selectedItem) => selectedItem.itemCode === item.itemCode)} onChange={() => toggleItemSelection(item)} /></td>
                <td>{item.itemCode}</td>
                <td>{item.itemType}</td>
                <td>{item.itemStatus}</td>
                <td>{item.itemName}</td>
                <td>{item.itemQty.toLocaleString()} 개</td>
                <td>{item.itemPrice.toLocaleString()} 원</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
