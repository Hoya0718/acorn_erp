import React, { useState, useEffect } from 'react';

const DistributionAdd = ({ checkAll, onAddDistribution, handleCancelClick }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [distributionData, setDistributionData] = useState({
        itemCode: '',
        itemName: '',
        receiptDate: '',
        initialQty: '',
        receivedQty: '',
        releaseQty: '',
        currentQty: '',
        expectedReceiptDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDistributionData({ ...distributionData, [name]: value });
    };

    const handleAdd = () => {
        onAddDistribution({ ...distributionData, isChecked });
        setDistributionData({
            itemCode: '',
            itemName: '',
            entryDate: '',
            initialQty: '',
            receivedQty: '',
            releaseQty: '',
            currentQty: '',
            expectedReceiptDate: ''
        });
    };

    useEffect(() => {
        setIsChecked(checkAll);
    }, [checkAll]);

    return (
        <tr>
            <td><input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} /></td>
            <td><input type='text' placeholder='품목코드' name='itemCode' value={distributionData.itemCode} onChange={handleInputChange} /></td>
            <td><input type='text' placeholder='품목이름' name='itemName' value={distributionData.itemName} onChange={handleInputChange} /></td>
            <td><input type='date' placeholder='입고일자' name='receiptDate' value={distributionData.receiptDate} onChange={handleInputChange} /></td>
            <td><input type='number' placeholder='입고수량' name='initialQty' value={distributionData.initialQty} onChange={handleInputChange} /></td>
            <td><input type='number' placeholder='기초재고' name='receivedQty' value={distributionData.receivedQty} onChange={handleInputChange} /></td>
            <td><input type='number' placeholder='출고수량' name='releaseQty' value={distributionData.releaseQty} onChange={handleInputChange} /></td>
            <td><input type='number' placeholder='집계재고' name='currentQty' value={distributionData.currentQty} onChange={handleInputChange} /></td>
            <td><input type='date' placeholder='입고예정일' name='expectedReceiptDate' value={distributionData.expectedReceiptDate} onChange={handleInputChange} /></td>
            <td>
                <button onClick={handleAdd}>추가</button>
                <button onClick={handleCancelClick}>취소</button>
            </td>
        </tr>
    );
};

export default DistributionAdd;