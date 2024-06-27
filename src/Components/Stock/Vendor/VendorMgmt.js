import React, { useState, useEffect } from 'react';
import VendorList from './VendorList';
import {
  fetchVendors, handleAddClick, handleUpdateClick, handleDeleteClick, handleSubmitAdd,
  handleSubmitUpdate, handleCheckboxChange, handleSelectAll, handleChangeNewVendor,
  handleChangeUpdateVendor, handleCancelAdd, handleCancelUpdate,
} from './Functions'; // Functions.js에서 모든 필요한 함수들을 import합니다.

const VendorMgmt = () => {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({
    vendorName: '', vendorContact: '', vendorAddress: '', vendorRemark: '', deliverableStatus: false,
  });
  const [updateVendor, setUpdateVendor] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false); // isUpdateClicked 변수 추가

  useEffect(() => {
    fetchVendors(setVendors);
  }, []);

  const handleAddClickWrapper = () => {
    handleAddClick(setIsAddClicked, setIsUpdateClicked);
  };

  const handleCancelForm = () => {
    setIsAddClicked(false);
    setIsUpdateClicked(false);
    setNewVendor({
      vendorName: '', vendorContact: '', vendorAddress: '', vendorRemark: '', deliverableStatus: false,
    });
    setUpdateVendor(null);
  };

  return (
    <div>
      <div className='Middle classification'>
        <h3>거래처 관리</h3>
      </div>
      <hr/>

      <div className='items-subTitle'>
        <span>
          {!isAddClicked && !isUpdateClicked && (
            <button onClick={handleAddClickWrapper}>등록</button>
          )}
          {selectedVendors.length > 0 && !isAddClicked && !isUpdateClicked && (
            <>
              <button onClick={() => handleUpdateClick(selectedVendors, vendors, setUpdateVendor, setIsUpdateClicked, setIsAddClicked)}>수정</button>
              <button onClick={() => handleDeleteClick(selectedVendors, vendors, setVendors, setSelectedVendors)}>삭제</button>
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

      {/* VendorList 컴포넌트에 필요한 props 모두 전달 */}
      <VendorList
        vendors={vendors}
        selectedVendors={selectedVendors}
        selectAll={selectAll}
        handleCheckboxChange={(vendorCode) => handleCheckboxChange(vendorCode, selectedVendors, setSelectedVendors)}
        handleSelectAll={() => handleSelectAll(selectAll, vendors, setSelectedVendors, setSelectAll)}
        handleUpdateClick={() => handleUpdateClick(selectedVendors, vendors, setUpdateVendor, setIsUpdateClicked, setIsAddClicked)}
        handleDeleteClick={() => handleDeleteClick(selectedVendors, vendors, setVendors, setSelectedVendors)}
        isAddClicked={isAddClicked}
        setIsAddClicked={setIsAddClicked}
        setIsUpdateClicked={setIsUpdateClicked}
        setVendors={setVendors}
        setNewVendor={setNewVendor}
        setSelectedVendors={setSelectedVendors}
        setUpdateVendor={setUpdateVendor}
        newVendor={newVendor}
        updateVendor={updateVendor}
        isUpdateClicked={isUpdateClicked}
      /> <br/>

      <div className="excel-print">
        <button>엑셀 다운</button>
        <button>인쇄</button>
      </div>
    </div>
  );
};

export default VendorMgmt;
