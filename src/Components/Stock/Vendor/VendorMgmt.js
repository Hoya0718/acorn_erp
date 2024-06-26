import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import VendorForm from './VendorForm';
import {
  fetchVendors, handleAddClick, handleUpdateClick, handleDeleteClick, handleSubmitAdd,
  handleSubmitUpdate, handleCheckboxChange, handleSelectAll, handleChangeNewVendor,
  handleChangeUpdateVendor, handleCancelAdd, handleCancelUpdate,
} from './Functions'; // 모듈화된 함수들을 import

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

  useEffect(() => {
    fetchVendors(setVendors);
  }, []);

  const handleAddClickWrapper = () => {
    handleAddClick(setIsAddClicked, setIsUpdateClicked);
  };

  return (
    <div>
      <div className='Middle classification'>
        <h3>거래처 관리</h3>
      </div>
      <hr/>

      <div className='items-subTitle'>
        <span>
          <button onClick={handleAddClickWrapper}>등록</button>
          {selectedVendors.length > 0 && !isAddClicked && (
            <div>
              <button onClick={() => handleUpdateClick(selectedVendors, vendors, setUpdateVendor, setIsUpdateClicked, setIsAddClicked)}>수정</button>
              <button onClick={() => handleDeleteClick(selectedVendors, vendors, setVendors, setSelectedVendors)}>삭제</button>
            </div>
           )}
        </span>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectAll}
                onChange={() => handleSelectAll(selectAll, vendors, setSelectedVendors, setSelectAll)} />
            </th>
            <th>코드</th><th>거래처명</th><th>거래처 연락처</th><th>거래처 주소</th><th>비고</th><th>납품 가능</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.vendorCode} style={{ display: selectedVendors.includes(vendor.vendorCode) && isUpdateClicked ? 'none' : 'table-row' }}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedVendors.includes(vendor.vendorCode)}
                  onChange={() => handleCheckboxChange(vendor.vendorCode, selectedVendors, setSelectedVendors)}
                />
              </td>
              <td>{vendor.vendorCode}</td>
              <td>{vendor.vendorName}</td>
              <td>{vendor.vendorContact}</td>
              <td>{vendor.vendorAddress}</td>
              <td>{vendor.vendorRemark}</td>
              <td>{vendor.deliverableStatus ? 'O' : 'X'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddClicked && (
        <VendorForm
          handleSubmit={(e) => handleSubmitAdd(e, newVendor, vendors, setVendors, setIsAddClicked, setNewVendor, setSelectedVendors)}
          handleCancel={() => handleCancelAdd(setIsAddClicked, setNewVendor)}
          vendorData={newVendor}
          handleChange={(field, value) => handleChangeNewVendor(field, value, newVendor, setNewVendor)}
          isNewVendor={true}
        />
      )}

      {isUpdateClicked && updateVendor && (
        <VendorForm
          handleSubmit={(e) => handleSubmitUpdate(e, updateVendor, vendors, setVendors, setIsUpdateClicked, setUpdateVendor)}
          handleCancel={() => handleCancelUpdate(setIsUpdateClicked, setUpdateVendor)}
          vendorData={updateVendor}
          handleChange={(field, value) => handleChangeUpdateVendor(field, value, updateVendor, setUpdateVendor)}
          isNewVendor={false}
        />
      )}
    </div>
  );
};

export default VendorMgmt;
