import React, { useState } from 'react';
import PurchaseForm from './PurchaseForm'; 
import './Purchase.css';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  handleSubmitAdd, handleCancelAdd, handleChangeNewPurchase,
  handleSubmitUpdate, handleCancelUpdate, handleChangeUpdatePurchase,
  handleCheckboxChange, handleSelectAll, useSortableData
} from './Functions';

const PurchaseList = ({
  purchases, selectedPurchases, selectAll, handleCheckboxChange, setFilteredData, 
  handleSelectAll, handleUpdateClick, handleDeleteClick, filteredData,
  isAddClicked, setIsAddClicked, setIsUpdateClicked, setPurchases, 
  setNewPurchase, setSelectedPurchases, setUpdatePurchase, newPurchase, 
  updatePurchase, isUpdateClicked, sortBy, searchTerm, startDate, endDate
}) => {
  // useSortableData 훅을 사용하여 purchases 데이터와 정렬 설정을 관리합니다.
  const { items: sortedPurchases, requestSort, sortConfig, setSortConfig } = useSortableData(purchases, { key: sortBy });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 페이지네이션을 위한 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedPurchases.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 시 호출될 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 열 클릭 시 정렬 방향 설정
  const handleColumnClick = (column) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    // setSortConfig 함수를 호출하여 정렬 설정 업데이트
    setSortConfig({ key: column, direction });
  };

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            {/* 각 열에 SortableHeader 컴포넌트를 사용하여 클릭 이벤트와 정렬 설정 전달 */}
            <SortableHeader
              label="코드"
              field="purchaseCode"
              requestSort={requestSort}
              sortConfig={sortConfig}
              handleColumnClick={handleColumnClick}
            />
            <SortableHeader
              label="발주 품목명"
              field="purchaseName"
              requestSort={requestSort}
              sortConfig={sortConfig}
              handleColumnClick={handleColumnClick}
            />
            <SortableHeader
              label="발주 단위"
              field="purchaseUnit"
              requestSort={requestSort}
              sortConfig={sortConfig}
              handleColumnClick={handleColumnClick}
            />
            <SortableHeader
              label="발주 일자"
              field="orderDate"
              requestSort={requestSort}
              sortConfig={sortConfig}
              handleColumnClick={handleColumnClick}
            />
            <SortableHeader
              label="발주 수량"
              field="orderQty"
              requestSort={requestSort}
              sortConfig={sortConfig}
              handleColumnClick={handleColumnClick}
            />
            <SortableHeader
              label="가격"
              field="price"
              requestSort={requestSort}
              sortConfig={sortConfig}
              handleColumnClick={handleColumnClick}
            />
            <SortableHeader
              label="특이사항"
              field="remark"
              requestSort={requestSort}
              sortConfig={sortConfig}
              handleColumnClick={handleColumnClick}
            />
          </tr>
        </thead>
        <tbody>
          {/* 추가 및 수정 폼 */}
          {isAddClicked && (
            <PurchaseForm
              handleSubmit={(e) => handleSubmitAdd(e, newPurchase, purchases, setPurchases, setIsAddClicked, setNewPurchase, setSelectedPurchases)}
              handleCancel={() => handleCancelAdd(setIsAddClicked, setNewPurchase)}
              purchaseData={newPurchase}
              handleChange={(field, value) => handleChangeNewPurchase(field, value, newPurchase, setNewPurchase)}
              isNewPurchase={true}
              showCancel={true} // 추가 상태일 때 취소 버튼 표시
            />
          )}
          {isUpdateClicked && updatePurchase && (
            <PurchaseForm
              handleSubmit={(e) => handleSubmitUpdate(e, updatePurchase, purchases, setPurchases, setIsUpdateClicked, setUpdatePurchase)}
              handleCancel={() => handleCancelUpdate(setIsUpdateClicked, setUpdatePurchase)}
              purchaseData={updatePurchase}
              handleChange={(field, value) => handleChangeUpdatePurchase(field, value, updatePurchase, setUpdatePurchase)}
              isNewPurchase={false}
              showCancel={true} // 수정 상태일 때 취소 버튼 표시
            />
          )}
          {/* 현재 페이지의 데이터 표시 */}
          {currentItems
            .filter((purchase) => {
              const orderDate = new Date(purchase.orderDate);
              return (
                purchase.purchaseName &&
                purchase.purchaseName.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!startDate || orderDate >= new Date(startDate)) &&
                (!endDate || orderDate <= new Date(endDate))
              );
            })
            .map((purchase) => (
              !(isUpdateClicked && updatePurchase && purchase.purchaseCode === updatePurchase.purchaseCode) && (
                <tr key={purchase.purchaseCode}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPurchases.includes(purchase.purchaseCode)}
                      onChange={() => handleCheckboxChange(purchase.purchaseCode)}
                    />
                  </td>
                  <td>{purchase.purchaseCode}</td>
                  <td>{purchase.purchaseName}</td>
                  <td>{purchase.purchaseUnit}</td>
                  <td>{purchase.orderDate}</td>
                  <td>{purchase.orderQty}</td>
                  <td>{purchase.price}</td>
                  <td>{purchase.remark}</td>
                </tr>
              )
            ))}
        </tbody>
      </table><br/>
      
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          <Pagination.Item onClick={() => paginate(1)} active={currentPage === 1}>{1}</Pagination.Item>
          {currentPage > 3 && <Pagination.Ellipsis />}
          {currentPage > 2 && <Pagination.Item onClick={() => paginate(currentPage - 1)}>{currentPage - 1}</Pagination.Item>}
          {currentPage !== 1 && currentPage !== Math.ceil(sortedPurchases.length / itemsPerPage) && <Pagination.Item active>{currentPage}</Pagination.Item>}
          {currentPage < Math.ceil(sortedPurchases.length / itemsPerPage) - 1 && <Pagination.Item onClick={() => paginate(currentPage + 1)}>{currentPage + 1}</Pagination.Item>}
          {currentPage < Math.ceil(sortedPurchases.length / itemsPerPage) - 2 && <Pagination.Ellipsis />}
          <Pagination.Item onClick={() => paginate(Math.ceil(sortedPurchases.length / itemsPerPage))} active={currentPage === Math.ceil(sortedPurchases.length / itemsPerPage)}>{Math.ceil(sortedPurchases.length / itemsPerPage)}</Pagination.Item>
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(sortedPurchases.length / itemsPerPage)} />
        </Pagination>
      </div>
    </div>
  );
};

// 정렬 가능한 헤더 컴포넌트
const SortableHeader = ({ label, field, requestSort, sortConfig, handleColumnClick }) => {
  const handleClick = () => {
    handleColumnClick(field); 
  };

  return (
    <th onClick={handleClick}>
      {label} {sortConfig && sortConfig.key === field && (
        sortConfig.direction === 'ascending' ? '▲' : '▼'
      )}
    </th>
  );
};

export default PurchaseList;
