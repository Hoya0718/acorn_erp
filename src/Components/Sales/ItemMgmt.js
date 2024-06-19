import React, { useState } from 'react';
import '../Main/Main.css';
import './Sales.css';
import ItemTable from './ItemTable';

const ItemMgmt = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    orderNumber: '',
    returnType: '',
    itemName: '',
    returnStatus: '',
    totalPrice: '',
    quantity: ''
  });

  // '등록' 버튼 클릭 시 폼을 보이게 하는 함수
  const handleAddButtonClick = () => {
    setIsFormVisible(true);
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
      orderNumber: '',
      returnType: '',
      itemName: '',
      returnStatus: '',
      totalPrice: '',
      quantity: ''
    });
    setIsFormVisible(false);
  };

  return (
    <div>
      <div className="Middle classification">
        <h4>상품 관리</h4>
      </div>
      <hr />

      <div className="items-subTitle">
        <span>
          <button onClick={handleAddButtonClick}>등록</button>
          <button>수정</button>
          <button>삭제</button>
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

      <div>
        <section>
          <ItemTable
            isFormVisible={isFormVisible}
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
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
