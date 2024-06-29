import React, { useState, useEffect } from 'react';
import PurchaseList from './PurchaseList'; // PurchaseList로 변경
import {
  fetchPurchases, handleAddClick, handleUpdateClick, handleDeleteClick, handleSubmitAdd,
  handleSubmitUpdate, handleCheckboxChange, handleSelectAll, handleChangeNewPurchase, // 함수 이름 변경
  handleChangeUpdatePurchase, handleCancelAdd, handleCancelUpdate,
} from './Functions'; // Functions.js에서 모든 필요한 함수들을 import합니다.

const PurchaseMgmt = () => {
  const [purchases, setPurchases] = useState([]); // purchases로 변수명 변경
  const [newPurchase, setNewPurchase] = useState({ // newPurchase로 변수명 변경
    purchaseName: '', purchaseUnit: '', orderDate: '', orderQty: 0, price: 0, remark: '', // 필드명 변경
  });
  const [updatePurchase, setUpdatePurchase] = useState(null); // updatePurchase로 변수명 변경
  const [selectedPurchases, setSelectedPurchases] = useState([]); // selectedPurchases로 변수명 변경
  const [selectAll, setSelectAll] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false); // isUpdateClicked 변수 추가

  useEffect(() => {
    fetchPurchases(setPurchases); // fetchPurchases로 변경
  }, []);

  const handleAddClickWrapper = () => {
    handleAddClick(setIsAddClicked, setIsUpdateClicked); // handleAddClick로 변경
  };

  const handleCancelForm = () => {
    setIsAddClicked(false);
    setIsUpdateClicked(false);
    setNewPurchase({
      purchaseName: '', purchaseUnit: '', orderDate: '', orderQty: 0, price: 0, remark: '', // 필드명 변경
    });
    setUpdatePurchase(null); // setUpdatePurchase로 변경
  };

  return (
    <div>
      <div className='Middle classification'>
        <h3>발주 관리</h3>
      </div>
      <hr/>

      <div className='items-subTitle'>
        <span>
          {!isAddClicked && !isUpdateClicked && (
            <button onClick={handleAddClickWrapper}>등록</button>
          )}
          {selectedPurchases.length > 0 && !isAddClicked && !isUpdateClicked && (
            <>
              <button onClick={() => handleUpdateClick(selectedPurchases, purchases, setUpdatePurchase, setIsUpdateClicked, setIsAddClicked)}>수정</button>
              <button onClick={() => handleDeleteClick(selectedPurchases, purchases, setPurchases, setSelectedPurchases)}>삭제</button>
            </>
          )}
          {(isAddClicked || isUpdateClicked) && (
            <button onClick={handleCancelForm}>취소</button>
          )}
        </span>
      </div><br />

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

      {/* PurchaseList 컴포넌트에 필요한 props 모두 전달 */}
      <PurchaseList
        purchases={purchases} 
        selectedPurchases={selectedPurchases}
        selectAll={selectAll}
        handleCheckboxChange={(purchaseCode) => handleCheckboxChange(purchaseCode, selectedPurchases, setSelectedPurchases)} 
        handleSelectAll={() => handleSelectAll(selectAll, purchases, setSelectedPurchases, setSelectAll)} 
        handleUpdateClick={() => handleUpdateClick(selectedPurchases, purchases, setUpdatePurchase, setIsUpdateClicked, setIsAddClicked)} 
        handleDeleteClick={() => handleDeleteClick(selectedPurchases, purchases, setPurchases, setSelectedPurchases)} 
        isAddClicked={isAddClicked}
        setIsAddClicked={setIsAddClicked}
        setIsUpdateClicked={setIsUpdateClicked}
        setPurchases={setPurchases} 
        setNewPurchase={setNewPurchase} 
        setSelectedPurchases={setSelectedPurchases} 
        setUpdatePurchase={setUpdatePurchase} 
        newPurchase={newPurchase} 
        updatePurchase={updatePurchase} 
        isUpdateClicked={isUpdateClicked} 
      /> <br/>

      <div className="excel-print">
        <button>엑셀 다운</button>
        <button>인쇄</button>
      </div>
    </div>
  );
};

export default PurchaseMgmt;
