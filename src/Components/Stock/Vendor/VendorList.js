import {React, useState, useEffect} from 'react';
import VendorForm from './VendorForm';
import UpdateModal from './DangerAlert'; 
import './Vendor.css';
import {
  handleCheckboxChange, handleSelectAll, handleUpdateClick, handleDeleteClick,
  handleSubmitAdd, handleSubmitUpdate, handleChangeNewVendor, handleChangeUpdateVendor,
  handleCancelAdd, handleCancelUpdate, useSortableData, sortVendors
} from './Functions';

const VendorList = ({
  vendors, selectedVendors, selectAll, sortBy, searchTerm, 
  handleCheckboxChange, handleSelectAll, handleUpdateClick, handleDeleteClick,
  isAddClicked, setIsAddClicked, setIsUpdateClicked, setVendors,
  setNewVendor, setSelectedVendors, setUpdateVendor, newVendor,
  updateVendor, isUpdateClicked
}) => {

  const { items: sortedVendors, requestSort, sortConfig } = useSortableData(vendors, { key: sortBy });

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
          <th onClick={() => handleSort('vendorCode')}>
              코드 {sortConfig && sortConfig.key === 'vendorCode' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
            <th onClick={() => handleSort('vendorName')}>
              거래처명 {sortConfig && sortConfig.key === 'vendorName' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
            <th onClick={() => handleSort('vendorContact')}>
              거래처 연락처 {sortConfig && sortConfig.key === 'vendorContact' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
            <th onClick={() => handleSort('vendorAddress')}>
              거래처 주소 {sortConfig && sortConfig.key === 'vendorAddress' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>  
            <th onClick={() => handleSort('deliverableStatus')}>
              납품 가능 {sortConfig && sortConfig.key === 'deliverableStatus' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
            <th onClick={() => handleSort('vendorRemark')}>
              특이사항 {sortConfig && sortConfig.key === 'vendorRemark' && (
                sortConfig.direction === 'ascending' ? '▼' : '▲'
              )}
            </th>
         

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
                <td>{vendor.deliverableStatus ? 'O' : 'X'}</td>
                <td>{vendor.vendorRemark}</td>
              </tr>
            )
          ))}
      </tbody>
    </table>
  </div>
  );
};

export default VendorList;