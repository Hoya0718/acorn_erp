import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios'; // axios 인스턴스 import

const VendorUpdate = ({ vendorData, onUpdateVendor }) => {
  const [updatedVendor, setUpdatedVendor] = useState(null); // 초기에는 null로 설정

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(`/vendor/${vendorData.id}`); // 백엔드에서 밴더 정보 가져오기
        setUpdatedVendor(response.data); // 가져온 데이터로 updatedVendor 상태 업데이트
      } catch (error) {
        console.error('Error fetching vendor:', error);
      }
    };

    if (vendorData) {
      fetchVendor(); // vendorData가 있을 때만 데이터 가져오는 함수 호출
    }
  }, [vendorData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? (checked ? '가능' : '불가능') : value;
    setUpdatedVendor({ ...updatedVendor, [name]: inputValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!updatedVendor) return; // updatedVendor가 없는 경우 처리
      
      // axios를 사용하여 백엔드 API에 PUT 요청을 보냄
      const response = await axios.put(`/vendor/${updatedVendor.id}`, updatedVendor);
      onUpdateVendor(response.data); // 수정된 데이터를 상태로 업데이트
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  // vendorData가 없는 경우에 대한 처리
  if (!vendorData) {
    return <div>Loading...</div>; // 혹은 다른 로딩 상태를 보여줄 수 있음
  }

  return (
    <tr>
      <td>
        <input type="checkbox" readOnly checked={true} />
      </td>
      <td>
        <form onSubmit={handleSubmit}>
          <input type="text" name="vendorCode" defaultValue={vendorData.vendorCode} onChange={handleInputChange} placeholder={vendorData.vendorCode} required />
          <input type="text" name="vendorName" defaultValue={vendorData.vendorName} onChange={handleInputChange} placeholder={vendorData.vendorName} required />
          <input type="text" name="vendorContact" defaultValue={vendorData.vendorContact} onChange={handleInputChange} placeholder={vendorData.vendorContact} required />
          <input type="text" name="vendorAddress" defaultValue={vendorData.vendorAddress} onChange={handleInputChange} placeholder={vendorData.vendorAddress} required />
          <input type="text" name="vendorRemark" defaultValue={vendorData.vendorRemark} onChange={handleInputChange} placeholder={vendorData.vendorRemark} />
          <label>
            Deliverable Status:
            <input type="checkbox" name="deliverableStatus" checked={updatedVendor && updatedVendor.deliverableStatus === '가능'} onChange={handleInputChange} />
          </label>
          <button type="submit">Update</button>
        </form>
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );
};

export default VendorUpdate;
