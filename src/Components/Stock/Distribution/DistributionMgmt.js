import React, { useState, useEffect } from 'react';
import DistributionList from './DistributionList'; 
import ExcelPrint from './ExcelPrint';
import {
  fetchDistributions, handleAddClick, handleUpdateClick, handleDeleteClick, handleSubmitAdd,
  handleSubmitUpdate, handleCheckboxChange, handleSelectAll, handleChangeNewDistribution, // 함수 이름 변경
  handleChangeUpdateDistribution, handleCancelAdd, handleCancelUpdate, purchaseInfo
} from './Functions'; 

const DistributionMgmt = () => {
  const [distributions, setDistributions] = useState([]); // distributions로 변수명 변경
  const [newDistribution, setNewDistribution] = useState({ 
    distributionCode: '', distributionName: '', receiptDate: '', orderQty: '', initialQty: '', releaseQty: 0, currentQty: '', expectedReceiptDate: ''
  });
  const [updateDistribution, setUpdateDistribution] = useState(null); // updateDistribution로 변수명 변경
  const [selectedDistributions, setSelectedDistributions] = useState([]); // selectedDistributions로 변수명 변경
  const [selectAll, setSelectAll] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false); // isUpdateClicked 변수 추가

  useEffect(() => {
    fetchDistributions(setDistributions); // fetchDistributions로 변경
  }, []);

  const handleAddClickWrapper = () => {
    handleAddClick(setIsAddClicked, setIsUpdateClicked); // handleAddClick로 변경
  };

  const handleCancelForm = () => {
    setIsAddClicked(false);
    setIsUpdateClicked(false);
    setNewDistribution({
      distributionCode: '', distributionName: '', receiptDate: '', orderQty: '', initialQty: '', releaseQty: 0, currentQty: '', expectedReceiptDate: ''
    });
    setUpdateDistribution(null); // setUpdateDistribution로 변경
  };

  return (
    <div>
      <div className='Middle classification'>
        <h3>물류 관리</h3>
      </div>
      <hr/>

      <div className='items-subTitle'>
        <span>
          {!isAddClicked && !isUpdateClicked && (
            <button onClick={handleAddClickWrapper}>등록</button>
          )}
          {selectedDistributions.length > 0 && !isAddClicked && !isUpdateClicked && (
            <>
              <button onClick={() => handleUpdateClick(selectedDistributions, distributions, setUpdateDistribution, setIsUpdateClicked, setIsAddClicked)}>수정</button>
              <button onClick={() => handleDeleteClick(selectedDistributions, distributions, setDistributions, setSelectedDistributions)}>삭제</button>
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

      {/* DistributionList 컴포넌트에 필요한 props 모두 전달 */}
      <DistributionList
        distributions={distributions} 
        purchaseInfo={purchaseInfo}
        selectedDistributions={selectedDistributions}
        selectAll={selectAll}
        handleCheckboxChange={(distributionCode) => handleCheckboxChange(distributionCode, selectedDistributions, setSelectedDistributions)} 
        handleSelectAll={() => handleSelectAll(selectAll, distributions, setSelectedDistributions, setSelectAll)} 
        handleUpdateClick={() => handleUpdateClick(selectedDistributions, distributions, setUpdateDistribution, setIsUpdateClicked, setIsAddClicked)} 
        handleDeleteClick={() => handleDeleteClick(selectedDistributions, distributions, setDistributions, setSelectedDistributions)} 
        isAddClicked={isAddClicked}
        setIsAddClicked={setIsAddClicked}
        setIsUpdateClicked={setIsUpdateClicked}
        setDistributions={setDistributions} 
        setNewDistribution={setNewDistribution} 
        setSelectedDistributions={setSelectedDistributions} 
        setUpdateDistribution={setUpdateDistribution} 
        newDistribution={newDistribution} 
        updateDistribution={updateDistribution} 
        isUpdateClicked={isUpdateClicked} 
      /> <br/>

       {/* 엑셀&인쇄 */}
       <div className="excel-print">
        <ExcelPrint distributions={distributions}/>       
      </div>
    </div>
  );
};

export default DistributionMgmt;
