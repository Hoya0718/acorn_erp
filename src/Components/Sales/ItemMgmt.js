import React, { useState } from 'react';
import '../Main/Main.css';
import './Sales.css';
import ItemTable from './ItemTable';
import ItemMgmtButtons from './ItemMgmtButtons'; // 버튼 컴포넌트 임포트

const ItemMgmt = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // 폼 가시성 상태
  const [isEditing, setIsEditing] = useState(false); // 편집 상태
  const [formData, setFormData] = useState({
    itemNumber: '',
    itemType: '',
    itemName: '',
    itemStatus: '',
    unitPrice: '',
    quantity: ''
  }); // 폼 데이터 상태

  // 초기 주문 데이터
  const [orders, setOrders] = useState([
    {
      itemNumber: '103',
      itemType: '빵',
      itemName: '단팥빵',
      itemStatus: '판매 중',
      unitPrice: '1000',
      quantity: 50
    },
    {
      itemNumber: '102',
      itemType: '케이크',
      itemName: '치즈케이크',
      itemStatus: '판매 중',
      unitPrice: '15000',
      quantity: 30
    },
    {
      itemNumber: '101',
      itemType: '쿠키',
      itemName: '초코칩 쿠키',
      itemStatus: '품절',
      unitPrice: '2000',
      quantity: 0
    }
  ]);

  const [selectedOrders, setSelectedOrders] = useState([]); // 선택된 주문 상태

  // '등록' 버튼 클릭 시 폼을 보이게 하는 함수
  const handleAddButtonClick = () => {
    setIsFormVisible(true);
    setIsEditing(true);
  };

  // '수정' 버튼 클릭 시 폼을 보이게 하는 함수
  const handleEditButtonClick = () => {
    setIsFormVisible(true);
    setIsEditing(true);
  };

  // '삭제' 버튼 클릭 시 선택된 항목 삭제
  const handleDeleteButtonClick = () => {
    if (window.confirm('삭제하시겠습니까?')) { // 삭제 확인
      const newOrders = orders.filter(order => !selectedOrders.includes(order));
      setOrders(newOrders); // 선택된 항목 삭제 후 상태 업데이트
      setSelectedOrders([]); // 선택된 항목 초기화
    }
  };

  // '저장' 버튼 클릭 시 폼 데이터를 추가
  const handleSaveButtonClick = () => {
    setOrders([formData, ...orders]); // 폼 데이터를 orders의 맨 앞에 추가
    handleFormSubmit(); // 폼 제출 처리
  };

  // '취소' 버튼 클릭 시 폼 제출 처리
  const handleCancelButtonClick = () => {
    handleFormSubmit(); // 폼 제출 처리
  };

  // 폼 입력 값이 변경될 때 상태를 업데이트하는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 폼 제출 시 호출되는 함수, 폼 데이터를 초기화하고 폼을 숨김
  const handleFormSubmit = () => {
    setFormData({
      itemNumber: '',
      itemType: '',
      itemName: '',
      itemStatus: '',
      unitPrice: '',
      quantity: ''
    });
    setIsFormVisible(false);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="Middle classification">
        <h4>상품 관리</h4>
      </div>
      <hr />

      <ItemMgmtButtons
        isEditing={isEditing}
        handleAddClick={handleAddButtonClick}
        handleEditClick={handleEditButtonClick}
        handleDeleteClick={handleDeleteButtonClick}
        handleSaveClick={handleSaveButtonClick}
        handleCancelClick={handleCancelButtonClick}
      />
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

      <div>
        <section>
          <ItemTable
            isFormVisible={isFormVisible}
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            orders={orders}
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
          />
        </section>
      </div>

      <div className="excel-print">
        <button>엑셀 다운</button>
        <button>인쇄</button>
      </div>
    </div>
  );
};

export default ItemMgmt;
