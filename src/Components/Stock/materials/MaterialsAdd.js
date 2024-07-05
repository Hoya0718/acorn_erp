import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';

const MaterialsAdd = ({
    checkAll,
    onAddDistribution,
    handleCancelClick,
    fetchDistributionItems,
    distributionData,
    handleSelectAll
}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [materialsDataList, setMaterialsDataList] = useState([]);

    useEffect(() => {
        const initialDataList = distributionData.map((distribution) => ({
            materialsCode: distribution.distributionCode || '',
            materialsName: distribution.distributionName || '',
            receiptDate: '',
            orderQty: distribution.orderQty || '',
            initialQty: '',
            receivedQty: '',
            releaseQty: '',
            currentQty: '',
            expectedReceiptDate: ''
        }));
        setMaterialsDataList(initialDataList);
    }, [distributionData]);

    const handleInputChange = (index, name, value) => {
        const updatedDataList = [...materialsDataList];
        updatedDataList[index] = { ...updatedDataList[index], [name]: value };
        setMaterialsDataList(updatedDataList);
    };
    const handleAdd = async (index) => {
        try {
            const dataToSend = {
                materialsCode: parseInt(materialsDataList[index].materialsCode),
                materialsName: materialsDataList[index].materialsName,
                receiptDate: materialsDataList[index].receiptDate,
                orderQty: parseInt(materialsDataList[index].orderQty),
                initialQty: parseInt(materialsDataList[index].initialQty),
                receivedQty: parseInt(materialsDataList[index].receivedQty),
                releaseQty: parseInt(materialsDataList[index].releaseQty),
                currentQty: parseInt(materialsDataList[index].currentQty),
                expectedReceiptDate: materialsDataList[index].expectedReceiptDate
            };
    
            console.log('전송할 데이터:', dataToSend);
            // axios를 사용해 서버에 데이터 전송
            const response = await axios.post('/materials', dataToSend);
    
            // 데이터 추가 후 초기화
            const updatedList = [...materialsDataList];
            updatedList[index] = {
                materialsCode: distributionData[index].distributionCode || '',
                materialsName: distributionData[index].distributionName || '',
                receiptDate: '',
                orderQty: distributionData[index].orderQty || '',
                initialQty: '',
                receivedQty: '',
                releaseQty: '',
                currentQty: '',
                expectedReceiptDate: ''
            };
            setMaterialsDataList(updatedList);
    
            // 추가된 데이터를 상위 컴포넌트로 전달
            onAddDistribution(response.data);
    
            // 여기서 적절한 처리: 예를 들어 저장 성공 메시지 출력 등
            console.log('Data added successfully:', response.data);
        } catch (error) {
            console.error('Error adding data:', error);
            // 여기서 적절한 오류 처리
        }
    };
    useEffect(() => {
        setIsChecked(checkAll);
    }, [checkAll]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchDistributionItems();
        };
        fetchData();
    }, []);

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>
                        <input
                            type='checkbox'
                            onChange={handleSelectAll}
                            checked={checkAll}
                        />
                    </th>
                    <th>자재코드</th><th>자재이름</th><th>가격</th><th>수량</th><th>거래처코드</th>
                </tr>
            </thead>
            <tbody>
                {distributionData.map((distribution, index) => (
                    <tr key={index}>
                        <td>
                            <input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                        </td>        
                        <td>
                            <input style={{border:'none', textAlign:'center'}}
                                    type='text' placeholder={distribution.distributionCode} name='distributionCode'
                                    value={materialsDataList[index]?.materialsCode || ''} 
                                    onChange={(e) =>
                                        handleInputChange(
                                            index, e.target.name, e.target.value
                                        )}
                                    readOnly
                            />
                        </td>
                        <td>
                            <input style={{border:'none', textAlign:'center'}}
                                type='text'
                                placeholder={distribution.distributionName} name='distributionName'
                                value={materialsDataList[index]?.materialsName || ''}
                                onChange={(e) =>
                                    handleInputChange(
                                        index, e.target.name, e.target.value
                                    )
                                }
                            />
                        </td>
                        <td>
                            <input
                                type='number'
                                placeholder='가격'
                                name='price'
                                value={materialsDataList[index]?.price || ''}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            />
                        </td>
                        <td>
                            <input style={{border:'none', textAlign:'center'}}
                                type='number'
                                placeholder={distribution.quantity}
                                name='quantity'
                                value={materialsDataList[index]?.quantity || ''}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            />
                        </td>
                        <td>
                            <input
                                type='number'
                                placeholder='거래처코드'
                                name='vendorCode'
                                value={materialsDataList[index]?.vendorCode || ''}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            />
                        </td>
                        <td>
                            <button onClick={() => handleAdd(index)}>추가</button>
                            <button onClick={handleCancelClick}>취소</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MaterialsAdd;
