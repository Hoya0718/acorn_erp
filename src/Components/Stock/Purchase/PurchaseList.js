import React from 'react';
import PurchaseForm from './PurchaseForm'; 
import './Purchase.css';
import {
  handleCheckboxChange, handleSelectAll, handleUpdateClick, handleDeleteClick,
  handleSubmitAdd, handleSubmitUpdate, handleChangeNewPurchase, handleChangeUpdatePurchase,
  handleCancelAdd, handleCancelUpdate
} from './Functions';

const PurchaseList = ({
  purchases, selectedPurchases, selectAll, handleCheckboxChange,
  handleSelectAll, handleUpdateClick, handleDeleteClick,
  isAddClicked, setIsAddClicked, setIsUpdateClicked, setPurchases, 
  setNewPurchase, setSelectedPurchases, setUpdatePurchase, newPurchase, 
  updatePurchase, isUpdateClicked 
}) => {
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
            <th>코드</th>
            <th>발주 품목명</th>  
            <th>발주 단위</th> 
            <th>발주 일자</th> 
            <th>발주 수량</th> 
            <th>가격</th> 
            <th>특이사항</th> 
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
          {purchases.map((purchase) => (
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
