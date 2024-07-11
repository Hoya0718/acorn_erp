import React, { useState, useEffect } from 'react';
import VendorList from './VendorList';
import ExcelPrint from './ExcelPrint';
import DeleteModal from './DeleteModal';
import DangerAlert from './DangerAlert';
import Pagination from '../../Customer/modules/PaginationModule'; // Pagination 모듈이 필요하다면 임포트

import {
  fetchVendors, handleAddClick, handleUpdateClick, handleDeleteClick, handleSubmitAdd,
  handleSubmitUpdate, handleCheckboxChange, handleSelectAll, handleChangeNewVendor,
  handleChangeUpdateVendor, handleCancelAdd, handleCancelUpdate, handleConfirmDelete, handleCancelForm, handleDeleteClickWrapper, handleModalConfirmDelete,
  handleModalClose, handleUpdateClickWrapper, handleSearch, fetchPageData
} from './Functions'; 

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
  const [sortBy, setSortBy] = useState('vendorCode'); //정렬 기준을 상태로 추가, 기본값은 'vendorCode'
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 변수

  // 필터된 데이터 상태
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchVendors(setVendors);
  }, []);

  // 검색어 변경 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className='Middle classification'>
        <h3>거래처 관리</h3>
      </div>
      <hr /><br/><br/>

      {/* 경고창 */}
      {showAlert && <DangerAlert onClose={() => setShowAlert(false)} />}

      <div className="searcher">
        <div className="right">
          <input type="text" placeholder='🔍 거래처명으로 조회' value={searchTerm} onChange={handleSearchChange} />
          <button onClick={handleSearch}>조회 &gt;</button>
        </div>
      </div><br/>

      <div className='items-subTitle'>
        <span>
          {!isAddClicked && !isUpdateClicked && (
            <button onClick={() => handleAddClick(setIsAddClicked, setIsUpdateClicked)}>등록</button>
          )}
          {selectedVendors.length > 0 && !isAddClicked && !isUpdateClicked && (
            <>
              <button onClick={() => handleUpdateClickWrapper(selectedVendors, setIsUpdateClicked, setIsAddClicked, vendors, setUpdateVendor, setShowAlert)}>수정</button>
              <button onClick={() => handleDeleteClickWrapper(setShowDeleteModal)}>삭제</button>
            </>
          )}
          {(isAddClicked || isUpdateClicked) && (
           <button onClick={() => handleCancelForm(setIsAddClicked, setIsUpdateClicked, setNewVendor, setUpdateVendor)}>취소</button>
          )}
        </span>
       
      </div>
      {/* VendorList 컴포넌트에 필요한 props 모두 전달 */}
      <VendorList
        vendors={vendors}
        selectedVendors={selectedVendors}
        setFilteredData={setFilteredData}
        selectAll={selectAll}
        sortBy={sortBy}
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
        searchTerm={searchTerm} // 검색어 상태 전달
      />
      <br />

      {/* 엑셀&인쇄 */}
      <div className="excel-print">
        <ExcelPrint vendors={vendors}/>       
      </div>

      {/* 삭제 모달 */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => handleModalClose(setShowDeleteModal)}
        onConfirm={() => handleModalConfirmDelete(selectedVendors, vendors, setVendors, setSelectedVendors, setShowDeleteModal)}
      />
    </div>
  )
}

export default VendorMgmt;
