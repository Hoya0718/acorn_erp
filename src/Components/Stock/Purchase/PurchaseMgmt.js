import React, { useState, useEffect } from 'react';
import ExcelPrint from './ExcelPrint';
import DangerAlert from './DangerAlert';
import DeleteModal from './DeleteModal';
import DateComponent from './DateComponent';
import Pagination from '../../Customer/modules/PaginationModule';
import PurchaseList from './PurchaseList';
import instance from './../../../api/axios';
import {
  fetchPurchases, handleAddClick, handleUpdateClick, handleDeleteClick, handleSubmitAdd,
  handleSubmitUpdate, handleCheckboxChange, handleSelectAll, handleChangeNewPurchase,
  handleChangeUpdateVendor, handleConfirmDelete, handleCancelForm, handleModalConfirmDelete, handleUpdateClickWrapper,
  handleChangeUpdatePurchase, handleCancelAdd, handleCancelUpdate, handleModalClose, handleDeleteClickWrapper,
  handleSearch, 
} from './Functions';

const PurchaseMgmt = () => {
  const [purchases, setPurchases] = useState([]);
  const [newPurchase, setNewPurchase] = useState({
    purchaseName: '', purchaseUnit: '', orderDate: '', orderQty: 0, price: 0, remark: '',
  });
  const [updatePurchase, setUpdatePurchase] = useState(null);
  const [selectedPurchases, setSelectedPurchases] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [sortBy, setSortBy] = useState('purchaseCode');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

    //페이지 네이션 데이터
    const [filteredData, setFilteredData] = useState(purchases);
    const [pageData, setPageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchPurchases(setPurchases);
  }, []);

  useEffect(() => {
    fetchPageData();
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    fetchPageData();
  }, [purchases]);

  const handleAddClickWrapper = () => {
    handleAddClick(setIsAddClicked, setIsUpdateClicked);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCancelForm = () => {
    setIsAddClicked(false);
    setIsUpdateClicked(false);
    setNewPurchase({
      purchaseName: '', purchaseUnit: '', orderDate: '', orderQty: 0, price: 0, remark: '',
    });
    setUpdatePurchase(null);
  };

  //페이지네이션 데이터
  const fetchPageData = async () => {
    try {
      const response_pageData = await instance.get(`/purchase/listPage?page=${currentPage - 1}&size=${rowsPerPage}`);
      const page = response_pageData.data;
      const formattedPageData = page.content.map(item => ({
        ...item
      }));
      setFilteredData(formattedPageData);
      setTotalItems(page.totalElements);
    } catch (error) {
      console.error('Error get PageData:', error);
    }
  }
  useEffect(() => {
    fetchPageData();
  }, [currentPage, rowsPerPage]);

  return (
    <div>
      <div className='Middle classification'>
        <h3>발주 관리</h3>
      </div>
      <hr />

      {showAlert && <DangerAlert onClose={() => setShowAlert(false)} />}

      <div className='items-subTitle'>
        <span>
          {!isAddClicked && !isUpdateClicked && (
            <button onClick={handleAddClickWrapper}>등록</button>
          )}
          {selectedPurchases.length > 0 && !isAddClicked && !isUpdateClicked && (
            <>
              <button onClick={() => handleUpdateClickWrapper(selectedPurchases, setIsUpdateClicked, setIsAddClicked, purchases, setUpdatePurchase, setShowAlert)}>수정</button>
              <button onClick={() => handleDeleteClickWrapper(setShowDeleteModal)}>삭제</button>
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
          <DateComponent onChange={handleDateChange} />
        </div>

        <div className="right">
          <input type="text" placeholder='🔍 품목명으로 조회' value={searchTerm} onChange={handleSearchChange} />
          <button onClick={handleSearch}>조회 &gt;</button>
        </div>
      </div>
      <br />

      <PurchaseList
        purchases={filteredData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        selectedPurchases={selectedPurchases}
        selectAll={selectAll}
        sortBy={sortBy}
        handleCheckboxChange={(purchaseCode) => handleCheckboxChange(purchaseCode, selectedPurchases, setSelectedPurchases)}
        handleSelectAll={() => handleSelectAll(selectAll, purchases, setSelectedPurchases, setSelectAll)}
        handleUpdateClick={handleUpdateClickWrapper}
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
        handleUpdateClickWrapper={handleUpdateClickWrapper}
        searchTerm={searchTerm}
        startDate={startDate}
        endDate={endDate}
      />
      <br />

      {/* 페이지네이션 */}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <div className="excel-print">
        <ExcelPrint purchases={purchases} />
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => handleModalClose(setShowDeleteModal)}
        onConfirm={() => handleModalConfirmDelete(selectedPurchases, purchases, setPurchases, setSelectedPurchases, setShowDeleteModal)}
      />
    </div>
  );
};

export default PurchaseMgmt;
