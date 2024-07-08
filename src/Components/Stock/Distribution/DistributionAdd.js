import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';

const DistributionAdd = ({
    checkAll,
    onAddDistribution,
    handleCancelClick,
    fetchPurchaseItems,
    purchaseData,
    handleSelectAll,
    onAddMaterials
}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [distributionDataList, setDistributionDataList] = useState([]);

    useEffect(() => {
        const initialDataList = purchaseData.map((purchase) => ({
            distributionCode: purchase.purchaseCode || '',
            distributionName: purchase.purchaseName || '',
            receiptDate: '',
            orderQty: purchase.orderQty || '',
            initialQty: '',
            receivedQty: '',
            releaseQty: '',
            currentQty: '',
            expectedReceiptDate: ''
        }));
        setDistributionDataList(initialDataList);
    }, [purchaseData]);

    const handleInputChange = (index, name, value) => {
        const updatedDataList = [...distributionDataList];
        updatedDataList[index] = { ...updatedDataList[index], [name]: value };
        setDistributionDataList(updatedDataList);
    };

    const handleAdd = async (index) => {
        try {
            const dataToSend = {
                distributionCode: parseInt(distributionDataList[index].distributionCode),
                distributionName: distributionDataList[index].distributionName,
                receiptDate: distributionDataList[index].receiptDate,
                orderQty: parseInt(distributionDataList[index].orderQty),
                initialQty: parseInt(distributionDataList[index].initialQty),
                receivedQty: parseInt(distributionDataList[index].receivedQty),
                releaseQty: parseInt(distributionDataList[index].releaseQty),
                currentQty: parseInt(distributionDataList[index].currentQty),
                expectedReceiptDate: distributionDataList[index].expectedReceiptDate
            };

            // Axios를 사용해 서버에 데이터 전송
            const response = await axios.post('/distribution', dataToSend);

            // 데이터 추가 후 초기화
            const updatedList = [...distributionDataList];
            updatedList[index] = {
                distributionCode: purchaseData[index].purchaseCode || '',
                distributionName: purchaseData[index].purchaseName || '',
                receiptDate: '',
                orderQty: purchaseData[index].orderQty || '',
                initialQty: '',
                receivedQty: '',
                releaseQty: '',
                currentQty: '',
                expectedReceiptDate: ''
            };
            setDistributionDataList(updatedList);

            // 추가된 데이터를 상위 컴포넌트로 전달
            onAddDistribution(response.data);
            onAddMaterials(response.data);

            // 여기서 적절한 처리: 예를 들어 저장 성공 메시지 출력 등
            console.log('데이터 추가 성공:', response.data);
        } catch (error) {
            console.error('데이터 추가 에러:', error);
            // 여기서 적절한 오류 처리
        }
    };

    useEffect(() => {
        setIsChecked(checkAll);
    }, [checkAll]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchPurchaseItems();
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
                    <th>품목코드</th>
                    <th>품목이름</th>
                    <th>입고일자</th>
                    <th>발주수량</th>
                    <th>입고수량</th>
                    <th>기초재고</th>
                    <th>출고수량</th>
                    <th>집계재고</th>
                    <th>입고예정일</th>
                    <th>동작</th>
                </tr>
            </thead>
            <tbody>
                {purchaseData.map((purchase, index) => (
                    <tr key={index}>
                        <td>
                            <input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                        </td>
                        <td>
                            <input
                                style={{ border: 'none', textAlign: 'center' }}
                                type='text'
                                placeholder={purchase.purchaseCode}
                                name='distributionCode'
                                value={distributionDataList[index]?.distributionCode || ''}
                                onChange={(e) =>
                                    handleInputChange(
                                        index, e.target.name, e.target.value
                                    )}
                                readOnly
                            />
                        </td>
                        <td>
                            <input
                                style={{ border: 'none', textAlign: 'center' }}
                                type='text'
                                placeholder={purchase.purchaseName}
                                name='distributionName'
                                value={distributionDataList[index]?.distributionName || ''}
                                onChange={(e) =>
                                    handleInputChange(
                                        index, e.target.name, e.target.value
                                    )
                                }
                            />
                        </td>
                        <td>
                            <input
                                type='date'
                                placeholder='입고일자'
                                name='receiptDate'
                                value={distributionDataList[index]?.receiptDate || ''}
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
                                style={{ border: 'none', textAlign: 'center' }}
                                type='number'
                                placeholder={purchase.orderQty}
                                name='orderQty'
                                value={distributionDataList[index]?.orderQty || ''}
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
                                placeholder='입고수량'
                                name='initialQty'
                                value={distributionDataList[index]?.initialQty || ''}
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
                                placeholder='기초재고'
                                name='receivedQty'
                                value={distributionDataList[index]?.receivedQty || ''}
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
                                placeholder='출고수량'
                                name='releaseQty'
                                value={distributionDataList[index]?.releaseQty || ''}
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
                                placeholder='집계재고'
                                name='currentQty'
                                value={distributionDataList[index]?.currentQty || ''}
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
                                type='date'
                                placeholder='입고예정일'
                                name='expectedReceiptDate'
                                value={distributionDataList[index]?.expectedReceiptDate || ''}
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

export default DistributionAdd;
