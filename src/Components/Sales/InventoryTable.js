import React, { useState } from 'react';
import './Sales.css';
import axios from '../../api/axios';

const InventoryTable = ({
  isFormVisible,
  items,
  handleInputChange,
  handleSave,
  selectedOrders,
  setSelectedOrders,
  handleFormSubmitInternal, // 추가된 핸들러
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  // 전체 선택 및 개별 선택 관련 함수
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedOrders([...items]);
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

  // 정렬 관련 함수
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
    setSelectedOrders([]);
    setSortConfig({ key, direction });
  };

  // 정렬 방향을 표시하는 함수
  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '▼';
  };

  // 정렬된 아이템 리스트
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

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
            </th>
            <th onClick={() => handleSort('itemCode')}>
              상품번호{getSortDirection('itemCode')}
            </th>
            <th onClick={() => handleSort('itemName')}>
              상품명{getSortDirection('itemName')}
            </th>
            <th onClick={() => handleSort('itemQty')}>
              입고수량(개){getSortDirection('itemQty')}
            </th>
            <th onClick={() => handleSort('stockOut')}>
              출고수량(개){getSortDirection('stockOut')}
            </th>
            <th onClick={() => handleSort('stockQty')}>
              재고합계(개){getSortDirection('stockQty')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedOrders.some(
                    (selectedOrder) => selectedOrder.itemCode === item.itemCode
                  )}
                  onChange={() => toggleOrderSelection(item)}
                />
              </td>
              <td>{item.itemCode}</td>
              <td>{item.itemName}</td>
              <td>{item.itemQty}</td>
              <td>
                <input
                  type="number"
                  name="stockOut"
                  value={
                    selectedOrders.find((selectedOrder) => selectedOrder.itemCode === item.itemCode)?.stockOut || 0
                  }
                  onChange={(e) => handleInputChange(item.itemCode, parseInt(e.target.value, 10))}
                  placeholder="출고 수량"
                />
                {/* 체크 버튼 추가 */}
                <button className="items-subTitle-button" onClick={() => handleFormSubmitInternal(item)}>✔</button>
              </td>
              <td>
                {item.itemQty -
                  (selectedOrders.find((selectedOrder) => selectedOrder.itemCode === item.itemCode)?.stockOut || 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
