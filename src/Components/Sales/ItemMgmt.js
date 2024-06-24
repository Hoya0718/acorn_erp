import React, { useState } from 'react';
import './Sales.css';
import ItemTable from './ItemTable'; // ItemTable 컴포넌트 임포트

const ItemMgmt = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    itemNumber: '',
    itemType: '',
    itemName: '',
    itemStatus: '',
    unitPrice: '',
    quantity: ''
  });

  const [orders, setOrders] = useState([
    {
      itemNumber: '1001',
      itemType: '빵',
      itemName: '단팥빵',
      itemStatus: '판매 중',
      unitPrice: '1000',
      quantity: 100
    },
    // 초기 주문 데이터 예시
  ]);

  const [selectedOrders, setSelectedOrders] = useState([]); // 선택된 주문 상태 추가

  const handleAddButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false); // 폼 숨기기
    setFormData({
      itemNumber: '',
      itemType: '',
      itemName: '',
      itemStatus: '',
      unitPrice: '',
      quantity: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = () => {
    setOrders([formData, ...orders]); // 최신 항목을 배열의 맨 앞에 추가
    setFormData({
      itemNumber: '',
      itemType: '',
      itemName: '',
      itemStatus: '',
      unitPrice: '',
      quantity: ''
    });
  };

  const handleDeleteClick = () => {
    if (window.confirm('선택된 항목을 삭제하시겠습니까?')) {
      const remainingOrders = orders.filter(order => !selectedOrders.some(selectedOrder => selectedOrder.itemNumber === order.itemNumber));
      setOrders(remainingOrders);
      setSelectedOrders([]); // 선택된 항목 초기화
    }
  };

  const toggleOrderSelection = (order) => {
    const isSelected = selectedOrders.some(selectedOrder => selectedOrder.itemNumber === order.itemNumber);

    if (isSelected) {
      const updatedOrders = selectedOrders.filter(selectedOrder => selectedOrder.itemNumber !== order.itemNumber);
      setSelectedOrders(updatedOrders);
    } else {
      setSelectedOrders([...selectedOrders, order]);
    }
  };

  return (
    <div>
      <div className="Middle classification">
        <h4>상품 관리</h4>
      </div>
      <hr />
     
      <div className="items-subTitle">
        <span>
          {isFormVisible ? (
            <button onClick={handleCancel}>취소</button>
          ) : (
            <button onClick={handleAddButtonClick}>등록</button>
          )}
          {!isFormVisible && (
            <>
              <button>수정</button>
              <button onClick={handleDeleteClick}>삭제</button>
            </>
          )}
        </span>
      </div>
      <br />

      <div className="searcher">
        <div className="left">
          <label htmlFor="date">날짜를 선택하세요 :
            <input type="date" id="date" max="2077-06-20" min="2077-06-05" value="2024-07-18" />
          </label>
        </div>

        <div className="right">
          <input type="text" placeholder='🔍 검색' /><button>조회 &gt;</button>
        </div>
      </div>
      <br />

      <ItemTable
        isFormVisible={isFormVisible}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        orders={orders}
        setOrders={setOrders} // 상태 업데이트 함수 전달
        selectedOrders={selectedOrders} // 선택된 주문 상태를 전달
        setSelectedOrders={setSelectedOrders} // 선택된 주문 상태 업데이트 함수 전달
      />
      <div className="excel-print">
        <button>엑셀 다운</button>
        <button>인쇄</button>
      </div>
    </div>
  );
};

export default ItemMgmt;
