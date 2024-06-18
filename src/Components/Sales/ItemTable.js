import React, { useState } from 'react';
import './Sales.css';

const initialOrders = [
  {
    orderNumber: '1001',
    returnType: '빵',
    itemName: '단팥빵',
    returnStatus: '판매 중',
    totalPrice: '100000',
    quantity: 100
  },
];

const ItemTable = ({ isFormVisible, formData, handleInputChange, handleFormSubmit }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [editIndex, setEditIndex] = useState(null);  // 현재 편집 중인 행의 인덱스를 저장하는 상태
  const [editData, setEditData] = useState(null);    // 현재 편집 중인 행의 데이터를 저장하는 상태

  // 전체 선택 토글
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedOrders([...orders]);
    } else {
      setSelectedOrders([]);
    }
  };

  // 개별 주문 선택
  const toggleOrderSelection = (order) => {
    const selectedIndex = selectedOrders.findIndex((selectedOrder) => selectedOrder.orderNumber === order.orderNumber);
    if (selectedIndex === -1) {
      setSelectedOrders([...selectedOrders, order]);
    } else {
      const updatedOrders = [...selectedOrders];
      updatedOrders.splice(selectedIndex, 1);
      setSelectedOrders(updatedOrders);
    }
  };

  // 전체 선택 체크박스의 상태
  const selectAllCheckboxState = selectAll || (selectedOrders.length === orders.length && orders.length > 0);

  // 폼 제출 핸들러
  const handleFormSubmitInternal = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // 편집 모드인 경우 기존 데이터를 업데이트
      const updatedOrders = [...orders];
      updatedOrders[editIndex] = editData;
      setOrders(updatedOrders);
      setEditIndex(null);
      setEditData(null);
    } else {
      // 새로운 데이터를 추가
      setOrders([formData, ...orders]);
    }
    handleFormSubmit();
  };

  // 편집 모드 취소 핸들러
  const handleCancel = () => {
    handleFormSubmit(); // 취소 시 입력폼 초기화
    setEditIndex(null);
    setEditData(null);
  };

  // 편집 중인 데이터 변경 핸들러
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  // 편집 모드 시작 핸들러
  const startEdit = () => {
    if (selectedOrders.length === 1) {
      const index = orders.findIndex(order => order.orderNumber === selectedOrders[0].orderNumber);
      setEditIndex(index);
      setEditData(orders[index]);
    } else {
      alert("수정할 항목을 하나만 선택하세요.");
    }
  };

  // 선택한 주문 삭제 핸들러
  const deleteSelectedOrders = () => {
    setOrders(orders.filter(order => !selectedOrders.includes(order)));
    setSelectedOrders([]);
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
          {isFormVisible && (
            <tr>
              <td></td>
              <td><input type="text" name="orderNumber" value={formData.orderNumber} onChange={handleInputChange} /></td>
              <td>
                <select name="returnType" value={formData.returnType} onChange={handleInputChange}>
                  <option value="">선택하세요</option>
                  <option value="빵">빵</option>
                  <option value="케이크">케이크</option>
                  <option value="디저트">디저트</option>
                  <option value="쿠키">쿠키</option>
                </select>
              </td>
              <td><input type="text" name="itemName" value={formData.itemName} onChange={handleInputChange} /></td>
              <td>
                <select name="returnStatus" value={formData.returnStatus} onChange={handleInputChange}>
                  <option value="">선택하세요</option>
                  <option value="판매 중">판매 중</option>
                  <option value="품절">품절</option>
                  <option value="판매 중단">판매 중단</option>
                </select>
              </td>
              <td><input type="text" name="totalPrice" value={formData.totalPrice} onChange={handleInputChange} /></td>
              <td><input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} /></td>
              <td>
                <button onClick={handleFormSubmitInternal}>저장</button>
                <button onClick={handleCancel}>취소</button>
              </td>
            </tr>
          )}
        </thead>
        <tbody>
          {orders.map((order, index) => (
            editIndex === index ? (
              <tr key={index}>
                <td><input type="checkbox" checked={selectedOrders.some(selectedOrder => selectedOrder.orderNumber === order.orderNumber)} onChange={() => toggleOrderSelection(order)} /></td>
                <td><input type="text" name="orderNumber" value={editData.orderNumber} onChange={handleEditChange} /></td>
                <td>
                  <select name="returnType" value={editData.returnType} onChange={handleEditChange}>
                    <option value="">선택하세요</option>
                    <option value="빵">빵</option>
                    <option value="케이크">케이크</option>
                    <option value="디저트">디저트</option>
                    <option value="쿠키">쿠키</option>
                  </select>
                </td>
                <td><input type="text" name="itemName" value={editData.itemName} onChange={handleEditChange} /></td>
                <td>
                  <select name="returnStatus" value={editData.returnStatus} onChange={handleEditChange}>
                    <option value="">선택하세요</option>
                    <option value="판매 중">판매 중</option>
                    <option value="품절">품절</option>
                    <option value="판매 중단">판매 중단</option>
                  </select>
                </td>
                <td><input type="text" name="totalPrice" value={editData.totalPrice} onChange={handleEditChange} /></td>
                <td><input type="number" name="quantity" value={editData.quantity} onChange={handleEditChange} /></td>
                <td>
                  <button onClick={handleFormSubmitInternal}>저장</button>
                  <button onClick={handleCancel}>취소</button>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td><input type="checkbox" checked={selectedOrders.some(selectedOrder => selectedOrder.orderNumber === order.orderNumber)} onChange={() => toggleOrderSelection(order)} /></td>
                <td>{order.orderNumber}</td>
                <td>{order.returnType}</td>
                <td>{order.itemName}</td>
                <td>{order.returnStatus}</td>
                <td>{order.totalPrice}</td>
                <td>{order.quantity}</td>
                <td></td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
