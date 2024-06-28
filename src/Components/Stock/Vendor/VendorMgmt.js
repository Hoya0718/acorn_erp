import React, { useState, useEffect } from 'react';
import VendorList from './VendorList';
import DeleteModal from './DeleteModal';
import DangerAlert from './DangerAlert'; // DangerAlert 컴포넌트를 import 합니다.
import {
  fetchVendors, handleAddClick, handleUpdateClick, handleDeleteClick, handleSubmitAdd,
  handleSubmitUpdate, handleCheckboxChange, handleSelectAll, handleChangeNewVendor,
  handleChangeUpdateVendor, handleCancelAdd, handleCancelUpdate, handleConfirmDelete
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
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // showAlert 상태 추가

  useEffect(() => {
    fetchVendors(setVendors);
  }, []);

  const handleCancelForm = () => {
    setIsAddClicked(false);
    setIsUpdateClicked(false);
    setNewVendor({
      vendorName: '', vendorContact: '', vendorAddress: '', vendorRemark: '', deliverableStatus: false,
    });
    setUpdateVendor(null);
  };

  const handleDeleteClickWrapper = () => {
    if (selectedVendors.length === 0) {
      alert('삭제할 거래처를 선택해 주세요.');
      return;
    }
    setShowDeleteModal(true);
  };

  const handleModalConfirmDelete = async () => {
    await handleConfirmDelete(selectedVendors, vendors, setVendors, setSelectedVendors);
    setShowDeleteModal(false);
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleUpdateClickWrapper = () => {
    if (selectedVendors.length !== 1) {
      setShowAlert(true); // showAlert 상태 변경
      return;
    }

    setIsUpdateClicked(true);
    setIsAddClicked(false);

    // 선택된 첫 번째 거래처의 정보를 updateVendor에 설정
    const selectedVendor = vendors.find(
      (vendor) => vendor.vendorCode === selectedVendors[0]
    );
    setUpdateVendor(selectedVendor);

    // 하나만 선택한 경우 경고창 숨기기
    setShowAlert(false);
  };

  return (
    <div>
      <div className='Middle classification'>
        <h3>거래처 관리</h3>
      </div>
      <hr />

      {/* 경고창 */}
      {showAlert && <DangerAlert onClose={() => setShowAlert(false)} />}

      <div className='items-subTitle'>
        <span>
          {!isAddClicked && !isUpdateClicked && (
            <button onClick={() => handleAddClick(setIsAddClicked, setIsUpdateClicked)}>등록</button>
          )}
          {selectedVendors.length > 0 && !isAddClicked && !isUpdateClicked && (
            <>
              <button onClick={handleUpdateClickWrapper}>수정</button>
              <button onClick={handleDeleteClickWrapper}>삭제</button>
            </>
          )}
          {(isAddClicked || isUpdateClicked) && (
            <button onClick={handleCancelForm}>취소</button>
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

      {/* VendorList 컴포넌트에 필요한 props 모두 전달 */}
      <VendorList
        vendors={vendors}
        selectedVendors={selectedVendors}
        selectAll={selectAll}
        handleCheckboxChange={(vendorCode) => handleCheckboxChange(vendorCode, selectedVendors, setSelectedVendors)}
        handleSelectAll={() => handleSelectAll(selectAll, vendors, setSelectedVendors, setSelectAll)}
        handleUpdateClick={handleUpdateClickWrapper}
        handleDeleteClick={handleDeleteClickWrapper}
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
      />
      <br />

      <div className="excel-print">
        <button>엑셀 다운</button>
        <button>인쇄</button>
      </div>

      {/* 삭제 모달 */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleModalClose}
        onConfirm={handleModalConfirmDelete}
      />
    </div>
  );
};

export default VendorMgmt;
