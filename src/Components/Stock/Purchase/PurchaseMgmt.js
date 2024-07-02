import React, { useState, useEffect } from 'react';
import PurchaseList from './PurchaseList';
import ExcelPrint from './ExcelPrint';
import DistributionMgmt from '../Distribution/DistributionMgmt';
import {
  fetchPurchases,
  handleAddClick,
  handleUpdateClick,
  handleDeleteClick,
  handleSubmitAdd,
  handleSubmitUpdate,
  handleCheckboxChange,
  handleSelectAll,
  handleChangeNewPurchase,
  handleChangeUpdatePurchase,
  handleCancelAdd,
  handleCancelUpdate
} from './Functions';

const PurchaseMgmt = () => {
  const [purchases, setPurchases] = useState([]);
  const [newPurchase, setNewPurchase] = useState({
    purchaseCode: '',
    purchaseName: '',
    purchaseUnit: '',
    orderDate: '',
    orderQty: 0,
    price: 0,
    remark: ''
  });
  const [updatePurchase, setUpdatePurchase] = useState(null);
  const [selectedPurchases, setSelectedPurchases] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);

  useEffect(() => {
    fetchPurchases(setPurchases);
  }, []);

  const handleAddClickWrapper = () => {
    handleAddClick(setIsAddClicked, setIsUpdateClicked);
  };

  const handleCancelForm = () => {
    setIsAddClicked(false);
    setIsUpdateClicked(false);
    setNewPurchase({
      purchaseCode: '',
      purchaseName: '',
      purchaseUnit: '',
      orderDate: '',
      orderQty: 0,
      price: 0,
      remark: ''
    });
    setUpdatePurchase(null);
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
      </div> <br />
     
      {/* PurchaseList 컴포넌트에 필요한 props 모두 전달 */}
      <PurchaseList
        purchases={purchases} 
        selectedPurchases={selectedPurchases}
        selectAll={selectAll}
        handleCheckboxChange={(purchaseId) => handleCheckboxChange(purchaseId, selectedPurchases, setSelectedPurchases)} 
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

      {/* 엑셀&인쇄 */}
      <div className="excel-print">
        <ExcelPrint purchases={purchases}/>       
      </div>
    </div>
  );
};

export default PurchaseMgmt;
