import React, { useState, useEffect } from 'react';

const VendorUpdate = ({ checkAll, vendorData, onUpdateVendor, index }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [localVendor, setLocalVendor] = useState({ ...vendorData });

  // 체크박스 상태 변화 훅
  useEffect(() => {
    setIsChecked(checkAll);
  }, [checkAll]); // checkAll 상태가 변할 때마다 isChecked 업데이트

  // 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalVendor({ ...localVendor, [name]: value });
  };

  // 수정 완료 핸들러
  const handleUpdate = () => {
    onUpdateVendor(localVendor, index);
  };

  return (
    <tr className='inputField'>
      <td><input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} /></td>
      <td><input type='text' name='vendorCode' value={localVendor.vendorCode} onChange={handleChange} /></td>
      <td><input type='text' name='vendoName' value={localVendor.vendoName} onChange={handleChange} /></td>
      <td><input type='text' name='vendorContact' value={localVendor.vendorContact} onChange={handleChange} /></td>
      <td><input type='text' name='vendorAddress' value={localVendor.vendorAddress} onChange={handleChange} /></td>
      <td><input type='text' name='vendorRemark' value={localVendor.vendorRemark} onChange={handleChange} /></td>
      <td><input type='text' name='deliverableStatus' value={localVendor.deliverableStatus} onChange={handleChange} /></td>
      <td><button onClick={handleUpdate}>확인</button></td>
    </tr>
  );
};

export default VendorUpdate;
