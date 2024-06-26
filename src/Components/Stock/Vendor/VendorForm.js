// VendorForm.js
import React from 'react';

const VendorForm = ({
  handleSubmit,
  handleCancel,
  vendorData,
  handleChange,
  isNewVendor,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={vendorData.vendorName}
        onChange={(e) => handleChange('vendorName', e.target.value)}
        placeholder="Vendor Name"
        required
      />
      <input
        type="text"
        value={vendorData.vendorContact}
        onChange={(e) => handleChange('vendorContact', e.target.value)}
        placeholder="Vendor Contact"
        required
      />
      <input
        type="text"
        value={vendorData.vendorAddress}
        onChange={(e) => handleChange('vendorAddress', e.target.value)}
        placeholder="Vendor Address"
        required
      />
      <input
        type="text"
        value={vendorData.vendorRemark}
        onChange={(e) => handleChange('vendorRemark', e.target.value)}
        placeholder="Vendor Remark"
      />
      <label>
        Deliverable Status:
        <input
          type="checkbox"
          checked={vendorData.deliverableStatus}
          onChange={(e) => handleChange('deliverableStatus', e.target.checked)}
        />
      </label>
      <button type="submit">{isNewVendor ? '추가' : '수정'}</button>
      <button type="button" onClick={handleCancel}>
        취소
      </button>
    </form>
  );
};

export default VendorForm;
