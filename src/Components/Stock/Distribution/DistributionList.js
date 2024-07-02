import React from 'react';
import DistributionForm from './DistributionForm'; // PurchaseForm을 DistributionForm으로 변경
import './Distribution.css'; // Purchase.css를 Distribution.css로 변경
import {
  handleCheckboxChange, handleSelectAll, handleUpdateClick, handleDeleteClick,
  handleSubmitAdd, handleSubmitUpdate, handleChangeNewDistribution, handleChangeUpdateDistribution,
  handleCancelAdd, handleCancelUpdate
} from './Functions';

const DistributionList = ({
  distributions, selectedDistributions, selectAll, handleCheckboxChange, setIsUpdateClicked, setDistributions, 
  handleSelectAll, handleUpdateClick, handleDeleteClick, isAddClicked, setIsAddClicked, 
  setNewDistribution, setSelectedDistributions, setUpdateDistribution, newDistribution, updateDistribution, isUpdateClicked,
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
            <th>이름</th>
            <th>입고 일자</th>
            <th>발주 수량</th>
            <th>입고 수량</th>
            <th>기초 재고</th>
            <th>출고 수량</th>
            <th>집계 재고</th>
            <th>입고 예정일</th> 
          </tr>
        </thead>
        <tbody>
          {isAddClicked && (
            <DistributionForm
              handleSubmit={(e) => handleSubmitAdd(e, newDistribution, distributions, setDistributions, setIsAddClicked, setNewDistribution, setSelectedDistributions)}
              handleCancel={() => handleCancelAdd(setIsAddClicked, setNewDistribution)}
              distributionData={newDistribution} 
              handleChange={(field, value) => handleChangeNewDistribution(field, value, newDistribution, setNewDistribution)} 
              isNewDistribution={true} 
              showCancel={true} // 추가 상태일 때 취소 버튼 표시
            />
          )}
          {isUpdateClicked && updateDistribution && (
            <DistributionForm
              handleSubmit={(e) => handleSubmitUpdate(e, updateDistribution, distributions, setDistributions, setIsUpdateClicked, setUpdateDistribution)}
              handleCancel={() => handleCancelUpdate(setIsUpdateClicked, setUpdateDistribution)}
              distributionData={updateDistribution} 
              handleChange={(field, value) => handleChangeUpdateDistribution(field, value, updateDistribution, setUpdateDistribution)} 
              isNewDistribution={false} 
              showCancel={true} // 수정 상태일 때 취소 버튼 표시
           
            />
          )}
        {distributions.map((distribution) => (
          !(isUpdateClicked && updateDistribution && distribution.distributionCode === updateDistribution.distributionCode) && (
            <tr key={distribution.distributionCode}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedDistributions.includes(distribution.distributionCode)} 
                  onChange={() => handleCheckboxChange(distribution.distributionCode)} 
                />
              </td>
              <td>{distribution.purchase.purchaseCode}</td> 
              <td>{distribution.purchase.purchaseName}</td> 
              <td>{distribution.receiptDate}</td>
              <td>{distribution.purchase.orderQty}</td>
              <td>{distribution.initialQty}</td>
              <td>{distribution.releaseQty}</td>
              <td>{distribution.currentQty}</td>
              <td>{distribution.expectedReceiptDate}</td>
            </tr>
          )
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistributionList;
