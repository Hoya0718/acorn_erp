import React, { useState } from 'react';
import axios from 'axios';

const PurchaseUpdate = ({ checkAll, purchaseData, onUpdatePurchase, index }) => {
  const [localPurchase, setLocalPurchase] = useState({ ...purchaseData });

  // 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalPurchase({ ...localPurchase, [name]: value });
  };

  // 수정 완료 핸들러
  const handleUpdate = async () => {
    try {
      // 서버로 전송할 데이터 준비
      const updatedPurchase = {
        ...localPurchase,
        id: purchaseData.id, // 백엔드에서 데이터를 식별할 수 있는 ID 필요
      };

      // 서버로 PUT 요청 보내기
      const response = await axios.put(`/api/purchase/${updatedPurchase.id}`, updatedPurchase);

      // 업데이트 완료 후 부모 컴포넌트의 콜백 함수 호출
      onUpdatePurchase(response.data, index);
    } catch (error) {
      console.error('Error updating purchase:', error);
      // 에러 처리 로직 추가
    }
  };

  return (
    <tr className='inputField'>
      {/* 각 입력 필드 */}
      <td><input type='checkbox' checked={checkAll} readOnly /></td>
      <td><input type='text' name='purchaseCode' value={localPurchase.purchaseCode} onChange={handleChange} readOnly /></td>
      <td><input type='text' name='purchaseName' value={localPurchase.purchaseName} onChange={handleChange} /></td>
      <td><input type='text' name='purchaseUnit' value={localPurchase.purchaseUnit} onChange={handleChange} /></td>
      <td><input type='text' name='orderDate' value={localPurchase.orderDate} onChange={handleChange} /></td>
      <td><input type='number' name='orderQuantity' value={localPurchase.orderQuantity} onChange={handleChange} /></td>
      <td><input type='number' name='unitPrice' step='100' value={localPurchase.unitPrice} onChange={handleChange} /></td>
      <td><input type='text' name='purchaseRemark' value={localPurchase.purchaseRemark} onChange={handleChange} /></td>
      <td><button onClick={handleUpdate}>확인</button></td>
    </tr>
  );
};

export default PurchaseUpdate;
