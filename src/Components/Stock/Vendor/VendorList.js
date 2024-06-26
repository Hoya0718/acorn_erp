// VendorList.js
import React from 'react';

const VendorList = ({
  vendors,
  selectedVendors,
  selectAll,
  handleCheckboxChange,
  handleSelectAll,
  handleUpdateClick,
  handleDeleteClick,
  isAddClicked,
}) => {
  return (
    <>
      {selectedVendors.length > 0 && !isAddClicked && (
        <div>
          <button onClick={handleUpdateClick}>수정</button>
          <button onClick={handleDeleteClick}>삭제</button>
        </div>
      )}

      <table>
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
          {vendors.map((vendor) => (
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
          ))}
        </tbody>
      </table>
    </>
  );
};

export default VendorList;
