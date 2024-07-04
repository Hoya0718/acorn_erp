import React from 'react';
import './Vendor.css';

const VendorForm = ({
  handleSubmit,
  vendorData,
  handleChange,
  isNewVendor,
}) => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input
          className="form-input" type="text" placeholder="/"
          readOnly />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={vendorData.vendorName}
          onChange={(e) => handleChange('vendorName', e.target.value)}
          placeholder="거래처명"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={vendorData.vendorContact}
          onChange={(e) => handleChange('vendorContact', e.target.value)}
          placeholder="거래처 연락처"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={vendorData.vendorAddress}
          onChange={(e) => handleChange('vendorAddress', e.target.value)}
          placeholder="거래처 주소"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={vendorData.vendorRemark}
          onChange={(e) => handleChange('vendorRemark', e.target.value)}
          placeholder="비고"
        />
      </td>
      <td>
        <label>
          <input
            type="checkbox"
            checked={vendorData.deliverableStatus}
            onChange={(e) => handleChange('deliverableStatus', e.target.checked)}
          />
        <button type="submit" className="items-subTitle-button" onClick={handleSubmit}>
          {isNewVendor ? '✔' : '✔'}
        </button>
        </label>
       
      </td>
    </tr>
  );
};

export default VendorForm;
