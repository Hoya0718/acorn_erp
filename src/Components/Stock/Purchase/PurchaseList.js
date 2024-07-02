import React from 'react';
import PurchaseForm from './PurchaseForm'; 
import './Purchase.css';
import {
  handleCheckboxChange,
  handleSelectAll,
  handleUpdateClick,
  handleDeleteClick,
  handleSubmitAdd,
  handleSubmitUpdate,
  handleChangeNewPurchase,
  handleChangeUpdatePurchase,
  handleCancelAdd,
  handleCancelUpdate
} from './Functions';

const PurchaseList = ({
  purchases,
  selectedPurchases,
  selectAll,
  handleCheckboxChange,
  handleSelectAll,
  handleUpdateClick,
  handleDeleteClick,
  isAddClicked,
  setIsAddClicked,
  setIsUpdateClicked,
  setPurchases,
  setNewPurchase,
  setSelectedPurchases,
  setUpdatePurchase,
  newPurchase,
  updatePurchase,
  isUpdateClicked
}) => {

  // const handleSubmitAdd = (e, newPurchase, purchases, setPurchases, setIsAddClicked, setNewPurchase, setSelectedPurchases) => {
  //   e.preventDefault(); // 이 부분이 필요한지 확인
  //   console.log('handleSubmitAdd - newPurchase:', newPurchase);
  //   console.log('handleSubmitAdd - purchases:', purchases);

  //   // 나머지 로직 추가
  // };

  // const handleSubmitUpdate = (e, updatePurchase, purchases, setPurchases, setIsUpdateClicked, setUpdatePurchase) => {
  //   e.preventDefault(); // 이 부분이 필요한지 확인
  //   console.log('handleSubmitUpdate - updatePurchase:', updatePurchase);
  //   console.log('handleSubmitUpdate - purchases:', purchases);

  //   // 나머지 로직 추가
  // };

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
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedPurchases.includes(purchase.id)}
                  onChange={() => handleCheckboxChange(purchase.id)}
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
          ))}
        </tbody>
      </table>

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
    </div>
  );
};

export default PurchaseList;
