import {React, useState} from 'react';
import VendorForm from './VendorForm';
import UpdateModal from './DangerAlert'; 
import './Vendor.css';
import {
  handleCheckboxChange, handleSelectAll, handleUpdateClick, handleDeleteClick,
  handleSubmitAdd, handleSubmitUpdate, handleChangeNewVendor, handleChangeUpdateVendor,
  handleCancelAdd, handleCancelUpdate
} from './Functions';

const VendorList = ({
  vendors, selectedVendors, selectAll, sortBy, searchTerm, 
  handleCheckboxChange, handleSelectAll, handleUpdateClick, handleDeleteClick,
  isAddClicked, setIsAddClicked, setIsUpdateClicked, setVendors,
  setNewVendor, setSelectedVendors, setUpdateVendor, newVendor,
  updateVendor, isUpdateClicked
}) => {

// 정렬 함수
const sortedVendors = [...vendors].sort((a, b) => {
  let aValue = a[sortBy];
  let bValue = b[sortBy];

  // vendorCode가 문자열이 아닌 경우 toString()을 통해 문자열로 변환하여 비교
  if (sortBy === 'vendorCode') {
    aValue = aValue.toString();
    bValue = bValue.toString();
  }

  return aValue.localeCompare(bValue);
});

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
          <th>거래처명</th>
          <th>거래처 연락처</th>
          <th>거래처 주소</th>
          <th>비고</th>
          <th>납품 가능</th>
        </tr>
      </thead>
      <tbody>
        {isAddClicked && (
          <VendorForm
            handleSubmit={(e) => handleSubmitAdd(e, newVendor, vendors, setVendors, setIsAddClicked, setNewVendor, setSelectedVendors)}
            handleCancel={() => handleCancelAdd(setIsAddClicked, setNewVendor)}
            vendorData={newVendor}
            handleChange={(field, value) => handleChangeNewVendor(field, value, newVendor, setNewVendor)}
            isNewVendor={true}
            showCancel={true} // 추가 상태일 때 취소 버튼 표시
          />
        )}
        {isUpdateClicked && updateVendor && (
          <VendorForm
            handleSubmit={(e) => handleSubmitUpdate(e, updateVendor, vendors, setVendors, setIsUpdateClicked, setUpdateVendor)}
            handleCancel={() => handleCancelUpdate(setIsUpdateClicked, setUpdateVendor)}
            vendorData={updateVendor}
            handleChange={(field, value) => handleChangeUpdateVendor(field, value, updateVendor, setUpdateVendor)}
            isNewVendor={false}
            showCancel={true} // 수정 상태일 때 취소 버튼 표시
          />
        )}
        {sortedVendors
          .filter((vendor) => vendor.vendorName && vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((vendor) => (
            // updateVendor가 존재하고 vendor.vendorCode와 updateVendor.vendorCode가 같은 경우 해당 행은 숨깁니다.
            !(isUpdateClicked && updateVendor && vendor.vendorCode === updateVendor.vendorCode) && (
              <tr key={vendor.vendorCode}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedVendors.includes(vendor.vendorCode)}
                    onChange={() => handleCheckboxChange(vendor.vendorCode)}
                  />
                </td>
                <td>{vendor.vendorCode}</td>
                <td>{vendor.vendorName}</td>
                <td>{vendor.vendorContact}</td>
                <td>{vendor.vendorAddress}</td>
                <td>{vendor.vendorRemark}</td>
                <td>{vendor.deliverableStatus ? 'O' : 'X'}</td>
              </tr>
            )
          ))}
      </tbody>
    </table>
  </div>
  );
};

export default VendorList;