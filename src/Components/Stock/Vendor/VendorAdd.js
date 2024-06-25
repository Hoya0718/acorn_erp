import React, { useState } from 'react';
import axios from '../../../api/axios'; 

const VendorAdd = ({ onAddVendor }) => {
  const [newVendor, setNewVendor] = useState({
    vendorCode: '',
    vendorName: '',
    vendorContact: '',
    vendorAddress: '',
    vendorRemark: '',
    deliverableStatus: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/vendor', newVendor); // POST 요청을 보내어 새로운 Vendor 데이터를 서버에 전송
      onAddVendor(response.data); // 부모 컴포넌트로 전달할 새로운 Vendor 데이터
      setNewVendor({
        vendorCode: '',
        vendorName: '',
        vendorContact: '',
        vendorAddress: '',
        vendorRemark: '',
        deliverableStatus: false,
      });
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Vendor Code" name="vendorCode" value={newVendor.vendorCode} onChange={(e) => setNewVendor({ ...newVendor, vendorCode: e.target.value })} required />
      <input type="text" placeholder="Vendor Name" name="vendorName" value={newVendor.vendorName} onChange={(e) => setNewVendor({ ...newVendor, vendorName: e.target.value })} required />
      <input type="text" placeholder="Vendor Contact" name="vendorContact" value={newVendor.vendorContact} onChange={(e) => setNewVendor({ ...newVendor, vendorContact: e.target.value })} required />
      <input type="text" placeholder="Vendor Address" name="vendorAddress" value={newVendor.vendorAddress} onChange={(e) => setNewVendor({ ...newVendor, vendorAddress: e.target.value })} required />
      <input type="text" placeholder="Vendor Remark" name="vendorRemark" value={newVendor.vendorRemark} onChange={(e) => setNewVendor({ ...newVendor, vendorRemark: e.target.value })} />
      <label>
        Deliverable Status:
        <input type="checkbox" name="deliverableStatus" checked={newVendor.deliverableStatus} onChange={(e) => setNewVendor({ ...newVendor, deliverableStatus: e.target.checked })} />
      </label>
      <button type="submit">Add Vendor</button>
    </form>
  );
};

export default VendorAdd;
