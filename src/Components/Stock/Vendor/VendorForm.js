import React from 'react';

const VendorForm = ({ vendor, handleInputChange, onSubmit, onCancelEdit }) => {
    
   return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Vendor Code"
                name="vendorCode"
                value={vendor.vendorCode}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Vendor Name"
                name="vendorName"
                value={vendor.vendorName}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Vendor Contact"
                name="vendorContact"
                value={vendor.vendorContact}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Vendor Address"
                name="vendorAddress"
                value={vendor.vendorAddress}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Vendor Remark"
                name="vendorRemark"
                value={vendor.vendorRemark}
                onChange={handleInputChange}
            />
            <label>
                Deliverable Status:
                <input
                    type="checkbox"
                    name="deliverableStatus"
                    checked={vendor.deliverableStatus}
                    onChange={handleInputChange}
                />
            </label>

            <button type="submit">Submit</button>
            <button type="button" onClick={onCancelEdit}>Cancel</button>
        </form>
    );
};

export default VendorForm;
