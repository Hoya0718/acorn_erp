import {React, useEffect, useState} from 'react';
import './Distribution.css';
import {purchaseInfo} from './Functions';

const DistributionForm = ({
  handleSubmit, distributionData, handleChange,isNewDistribution,
}) => {
  const [purchaseData, setPurchaseData] = useState({
    purchaseCode: '',
    purchaseName: '',
    orderQty: '',
  });

  useEffect(() => {
    const fetchPurchaseInfo = async () => {
      try {
        const info = await purchaseInfo();
        setPurchaseData(info); // purchaseInfo에서 반환되는 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching purchase info:', error);
      }
    };

    fetchPurchaseInfo();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={distributionData.distributionCode} 
          onChange={(e) => handleChange('distributionCode', e.target.value)}
          placeholder={purchaseData.purchaseCode}
          readOnly
        />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={distributionData.distributionName} 
          onChange={(e) => handleChange('distributionName', e.target.value)}
          placeholder={purchaseData.purchaseName}
          readOnly
        />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={distributionData.receiptDate} 
          onChange={(e) => handleChange('receiptDate', e.target.value)}
          placeholder="입고 일자"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="number"
          value={distributionData.orderQty} 
          onChange={(e) => handleChange('orderQty', e.target.value)}
          placeholder={purchaseData.orderQty}
          readOnly
        />
      </td>
      <td>
        <input
          className="form-input"
          type="number"
          value={distributionData.initialQty} 
          onChange={(e) => handleChange('initialQty', e.target.value)}
          placeholder="입고 수량"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="number"
          value={distributionData.releaseQty} 
          onChange={(e) => handleChange('releaseQty', e.target.value)}
          placeholder="기초 재고"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="number"
          value={distributionData.currentQty} 
          onChange={(e) => handleChange('currentQty', e.target.value)}
          placeholder="출고 수량"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={distributionData.expectedReceiptDate} 
          onChange={(e) => handleChange('expectedReceiptDate', e.target.value)}
          placeholder="집계 재고"
          required
        />
      </td>
      <td>
        <input
          className="form-input"
          type="text"
          value={distributionData.remark} 
          onChange={(e) => handleChange('remark', e.target.value)}
          placeholder="입고 예정일"
        />
        <button type="submit" className="items-subTitle-button" onClick={handleSubmit}>
          {isNewDistribution ? '✔' : '✔'}
        </button>
      </td>
    </tr>
  );
};

export default DistributionForm;
