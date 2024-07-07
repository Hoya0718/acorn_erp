import React from 'react';
import PurchaseForm from './PurchaseForm'; 
import './Purchase.css';
import {
  handleCheckboxChange, handleSelectAll, handleUpdateClick, handleDeleteClick,
  handleSubmitAdd, handleSubmitUpdate, handleChangeNewPurchase, handleChangeUpdatePurchase,
  handleCancelAdd, handleCancelUpdate, handleUpdateClickWrapper, sortVendors, useSortableData
} from './Functions';

const PurchaseList = ({
  purchases, selectedPurchases, selectAll, handleCheckboxChange,
  handleSelectAll, handleUpdateClick, handleDeleteClick,
  isAddClicked, setIsAddClicked, setIsUpdateClicked, setPurchases, 
  setNewPurchase, setSelectedPurchases, setUpdatePurchase, newPurchase, 
  updatePurchase, isUpdateClicked, sortBy, searchTerm, startDate, endDate
}) => {

  const { items: sortedPurchases, requestSort, sortConfig } = useSortableData(purchases, { key: sortBy });

  const handleSort = (key) => {
    const direction = sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    requestSort(key, direction);
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
            <th onClick={() => handleSort('purchaseCode')}>
              코드 {sortConfig && sortConfig.key === 'purchaseCode' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
            <th onClick={() => handleSort('purchaseName')}>
              발주 품목명 {sortConfig && sortConfig.key === 'purchaseName' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
            <th onClick={() => handleSort('purchaseUnit')}>
              발주 단위 {sortConfig && sortConfig.key === 'purchaseUnit' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
            <th onClick={() => handleSort('orderDate')}>
              발주 일자 {sortConfig && sortConfig.key === 'orderDate' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
            <th onClick={() => handleSort('orderQty')}>
              발주 수량 {sortConfig && sortConfig.key === 'orderQty' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
            <th onClick={() => handleSort('price')}>
              가격 {sortConfig && sortConfig.key === 'price' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
            <th onClick={() => handleSort('remark')}>
              특이사항 {sortConfig && sortConfig.key === 'remark' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
          </tr>
        </thead>
        <tbody>
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
         {sortedPurchases
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
              // updatePurchase가 존재하고 purchase.purchaseCode와 updatePurchase.purchaseCode가 같은 경우 해당 행은 숨깁니다.
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
      </table>
    </div>
  );
};

export default PurchaseList;