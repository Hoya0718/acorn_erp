import React from 'react';

const VendorTable = ({ vendors, handleEdit, deleteVendor }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Vendor Code</th>
                    <th>Vendor Name</th>
                    <th>Vendor Contact</th>
                    <th>Vendor Address</th>
                    <th>Vendor Remark</th>
                    <th>Deliverable Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {vendors.map(vendor => (
                    <tr key={vendor.id}>
                        <td>{vendor.vendorCode}</td>
                        <td>{vendor.vendorName}</td>
                        <td>{vendor.vendorContact}</td>
                        <td>{vendor.vendorAddress}</td>
                        <td>{vendor.vendorRemark}</td>
                        <td>{vendor.deliverableStatus ? 'Yes' : 'No'}</td>
                        <td>
                            <button onClick={() => handleEdit(vendor)}>Edit</button>
                            <button onClick={() => deleteVendor(vendor.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default VendorTable;
