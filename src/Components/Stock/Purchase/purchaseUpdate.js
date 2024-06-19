import React, { useState, useEffect } from 'react';

const PurchaseUpdate = ({ checkAll, purchaseData, onUpdatePurchase, index }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [localPurchase, setLocalPurchase] = useState({ ...purchaseData });

  // 체크박스 상태 변화 훅
  useEffect(() => {
    setIsChecked(checkAll);
  }, [checkAll]); // checkAll 상태가 변할 때마다 isChecked 업데이트

  // 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalPurchase({ ...localPurchase, [name]: value });
  };

  // 수정 완료 핸들러
  const handleUpdate = () => {
    onUpdatePurchase(localPurchase, index);
  };

  return (
    <tr className='inputField'>
      <td><input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} /></td>
      <td><input type='text' name='purchaseCode' value={localPurchase.purchaseCode} onChange={handleChange} readOnly/></td>
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
