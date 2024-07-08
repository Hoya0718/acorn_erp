import React from 'react';
import './Purchase.css';

const PurchaseForm = ({
  handleSubmit, purchaseData, handleChange, isNewPurchase,
}) => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input
          className="form-input" type="text" placeholder="/" readOnly
        />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={purchaseData.purchaseName} 
          onChange={(e) => handleChange('purchaseName', e.target.value)}
          placeholder="발주 품목명"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={purchaseData.purchaseUnit} 
          onChange={(e) => handleChange('purchaseUnit', e.target.value)}
          placeholder="발주 단위"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="date"
          value={purchaseData.orderDate} 
          onChange={(e) => handleChange('orderDate', e.target.value)}
          placeholder="발주 일자"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="number"
          value={purchaseData.orderQty} 
          onChange={(e) => handleChange('orderQty', e.target.value)}
          placeholder="발주 수량"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="number"
          value={purchaseData.price} 
          onChange={(e) => handleChange('price', e.target.value)}
          placeholder="가격"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={purchaseData.remark} 
          onChange={(e) => handleChange('remark', e.target.value)}
          placeholder="특이사항"  style={{ width: '120px' }}
        />
         <button type="submit" className="items-subTitle-button" onClick={handleSubmit}  style={{ marginLeft: '10px' }}>
            {isNewPurchase ? '✔' : '✔'} 
         </button>
      </td>
    </tr>
  );
};

export default PurchaseForm;