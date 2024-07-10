import React, { useState, useEffect } from 'react';
import './Sales.css'; // 스타일 시트를 import합니다.

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
  // 전체 선택 상태를 관리하는 상태
  const [selectAll, setSelectAll] = useState(false);

  // 입력 필드 유효성 검사 오류를 관리하는 상태
  const [errors, setErrors] = useState({
    itemCode: '',
    itemType: '',
    itemStatus: '',
    itemName: '',
    itemQty: '',
    itemPrice: ''
  });

  // 테이블의 정렬 설정을 관리하는 상태
  const [sortConfig, setSortConfig] = useState({ key: 'itemCode', direction: 'descending' });

  // 상품 목록을 정렬하여 관리하는 상태
  const [sortedItems, setSortedItems] = useState([...items].sort((a, b) => Number(b.itemCode) - Number(a.itemCode)));

  // 상품 목록이 변경되거나 정렬 설정이 변경될 때 실행되는 useEffect
  useEffect(() => {
    const sortedItems = [...items].sort((a, b) => {
      const direction = sortConfig.direction === 'ascending' ? 1 : -1;
      const aValue = isNaN(a[sortConfig.key]) ? a[sortConfig.key] : Number(a[sortConfig.key]);
      const bValue = isNaN(b[sortConfig.key]) ? b[sortConfig.key] : Number(b[sortConfig.key]);
      if (aValue < bValue) {
        return -1 * direction;
      }
      if (aValue > bValue) {
        return 1 * direction;
      }
      return 0;
    });
    setSortedItems(sortedItems);
  }, [items, sortConfig]);

  // 전체 선택/해제 함수
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems([...items]);
    } else {
      setSelectedItems([]);
    }
  };

  // 개별 상품 선택/해제 함수
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

  // 테이블 열 클릭 시 정렬 처리 함수
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // 정렬 방향 표시 함수
  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '▼';
  };

  // 입력 폼 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.itemType) newErrors.itemType = '구분을 선택하세요.';
    // if (!formData.itemStatus) newErrors.itemStatus = '판매상태를 선택하세요.';
    if (!formData.itemName) newErrors.itemName = '상품명을 입력하세요.';
    if (!formData.itemQty || isNaN(formData.itemQty) || parseInt(formData.itemQty) <= 0) newErrors.itemQty = '수량을 입력하세요.';
    if (!formData.itemPrice || isNaN(formData.itemPrice) || parseFloat(formData.itemPrice) <= 0) newErrors.itemPrice = '단가를 입력하세요.';
    
    // 등록 및 수정 시 출고 수량이 비어있으면 기본값 '0'으로 설정
    if (!formData.stockOut) {
      formData.stockOut = '0';
    }
    
    // 수정할 때 출고 수량 필드에 대한 유효성 검사를 제외함
    if (selectedItem && (!formData.stockOut || isNaN(formData.stockOut) || parseFloat(formData.stockOut) < 0)) {
      newErrors.stockOut = '출고 수량을 입력하세요.';
    }
    
    setErrors(newErrors); // 오류 상태 업데이트
    return Object.keys(newErrors).length === 0; // 유효성 검사 통과 여부 반환
  };

  // 폼 제출 처리 함수
  const handleFormSubmitInternal = (event) => {
    event.preventDefault(); // 기본 제출 동작 방지
    if (validateForm()) {
      handleFormSubmit(); // 폼 제출 함수 호출
      setIsFormVisible(false); // 입력 폼 숨기기
    }
  };

  // 전체 선택 체크박스 상태 계산
  const selectAllCheckboxState = selectAll || (selectedItems.length === items.length && items.length > 0);

  return (
    <div>
      {/* 상품 목록을 표시하는 테이블 */}
      <table className="table">
        <thead>
          <tr>
            {/* 전체 선택 체크박스 */}
            <th><input type="checkbox" checked={selectAllCheckboxState} onChange={toggleSelectAll} /></th>
            {/* 테이블 열 클릭 시 정렬 처리 */}
            <th onClick={() => handleSort('itemCode')}>상품번호 {getSortDirection('itemCode')}</th>
            <th onClick={() => handleSort('itemType')}>구분 {getSortDirection('itemType')}</th>
            {/* <th onClick={() => handleSort('itemStatus')}>판매상태 {getSortDirection('itemStatus')}</th> */}
            <th onClick={() => handleSort('itemName')}>상품명 {getSortDirection('itemName')}</th>
            <th onClick={() => handleSort('itemPrice')}>단가 {getSortDirection('itemPrice')}</th>
            <th onClick={() => handleSort('itemQty')}>입고수량 {getSortDirection('itemQty')}</th>
            <th onClick={() => handleSort('stockOut')}>출고수량 {getSortDirection('stockOut')}</th>
            <th onClick={() => handleSort('stockQty')}>재고합계 {getSortDirection('stockQty')}</th>
          </tr>
        </thead>
        <tbody>
          {/* 입력 폼이 보이고 선택된 상품이 없는 경우 */}
          {isFormVisible && !selectedItem && (
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  name="itemCode"
                  value={formData.itemCode}
                  onChange={handleInputChange}
                  placeholder="상품번호"
                  style={{ borderColor: errors.itemCode ? 'red' : undefined, width: '70px' }}
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
              {/* <td>
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
              </td> */}
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
                  name="stockOut"
                  value={formData.stockOut}
                  onChange={handleInputChange}
                  placeholder="출고수량(개)"
                  style={{ borderColor: errors.stockOut ? 'red' : undefined }}
                />
                {errors.stockOut && <div style={{ color: 'red' }}>{errors.stockOut}</div>}
              </td>
              <td>
                {/* 저장 버튼 */}
                <button className="items-subTitle-button" onClick={handleFormSubmitInternal}>✔</button>
              </td>
            </tr>
          )}

          {/* 선택된 상품이 있고 해당 상품을 수정하는 경우 */}
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
                    name="stockOut"
                    value={formData.stockOut}
                    onChange={handleInputChange}
                    placeholder="출고수량(개)"
                    style={{ borderColor: errors.stockOut ? 'red' : undefined }}
                  />
                  {errors.stockOut && <div style={{ color: 'red' }}>{errors.stockOut}</div>}
                </td>
                <td>
                  {/* 저장 버튼 */}
                  <button className="items-subTitle-button" onClick={handleFormSubmitInternal}>✔</button>
                </td>
              </tr>
            ) : (
              // 선택된 상품이 없거나 수정 중이 아닌 경우 기본 테이블 행 표시
              <tr key={index} onClick={() => toggleItemSelection(item)}>
                {/* 개별 선택 체크박스 */}
                <td><input type="checkbox" checked={selectedItems.some((selectedItem) => selectedItem.itemCode === item.itemCode)} onChange={(e) => {e.stopPropagation(); toggleItemSelection(item);}} /></td>
                {/* 상품 정보 표시 */}
                <td>{item.itemCode}</td>
                <td>{item.itemType}</td>
                {/* <td>{item.itemStatus}</td> */}
                <td>{item.itemName}</td>
                <td>{item.itemPrice.toLocaleString()} 원</td>
                <td>{item.itemQty.toLocaleString()} 개</td>
                <td>{item.stockOut} 개</td>
                <td>{item.stockQty} 개</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable; // ItemTable 컴포넌트를 내보냅니다.
