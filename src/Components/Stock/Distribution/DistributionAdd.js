import React, { useState, useEffect } from 'react';

const DistributionAdd = ({ checkAll, onAddDistribution, handleCancelClick }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [distributionData, setDistributionData] = useState({
        code: '',
        name: '',
        entryDate: '',
        entryQuantity: '',
        initialStock: '',
        exitQuantity: '',
        totalStock: '',
        plannedEntryDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDistributionData({ ...distributionData, [name]: value });
    };

    const handleAdd = () => {
        onAddDistribution({ ...distributionData, isChecked });
        setDistributionData({
            code: '',
            name: '',
            entryDate: '',
            entryQuantity: '',
            initialStock: '',
            exitQuantity: '',
            totalStock: '',
            plannedEntryDate: ''
        });
    };

    // 체크박스 상태 변화 훅
    useEffect(() => {
        setIsChecked(checkAll);
    }, [checkAll]);

    return (
        <tr>
            <td><input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} /></td>
            <td><input type='text' placeholder='품목코드' name='code' value={distributionData.code} onChange={handleInputChange} /></td>
            <td><input type='text' placeholder='품목이름' name='name' value={distributionData.name} onChange={handleInputChange} /></td>
            <td><input type='text' placeholder='입고일자' name='entryDate' value={distributionData.entryDate} onChange={handleInputChange} /></td>
            <td><input type='text' placeholder='입고수량' name='entryQuantity' value={distributionData.entryQuantity} onChange={handleInputChange} /></td>
            <td><input type='text' placeholder='기초재고' name='initialStock' value={distributionData.initialStock} onChange={handleInputChange} /></td>
            <td><input type='text' placeholder='출고수량' name='exitQuantity' value={distributionData.exitQuantity} onChange={handleInputChange} /></td>
            <td><input type='text' placeholder='집계재고' name='totalStock' value={distributionData.totalStock} onChange={handleInputChange} /></td>
            <td><input type='text' placeholder='입고예정일' name='plannedEntryDate' value={distributionData.plannedEntryDate} onChange={handleInputChange} /></td>
            <td>
                <button className='btn1' onClick={handleAdd}>추가</button>
            </td>
        </tr>
    );
};

export default DistributionAdd;