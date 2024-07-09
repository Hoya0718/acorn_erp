import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';

const DistributionAdd = ({
    checkAll,
    onAddDistribution,
    handleCancelClick,
    fetchPurchaseItems,
    purchaseData,
    handleSelectAll,
    onAddMaterials,
    isConfirmed 
}) => {
    const [isChecked, setIsChecked] = useState(false); // ✔ 표시 상태 관리
    const [distributionDataList, setDistributionDataList] = useState([]);
    

    useEffect(() => {
        const initialDataList = purchaseData.map((purchase) => ({
            materialsCode: purchase.purchaseCode || '',
            materialsName: purchase.purchaseName || '',
            receiptDate: '',
            orderQty: purchase.orderQty || '',
            initialQty: '',
            receivedQty: '',
            releaseQty: '',
            quantity: '',
            //price: purchase.purchase.price || ''
        }));
        setDistributionDataList(initialDataList);
    }, [purchaseData]);

    const handleInputChange = (index, name, value) => {
        const updatedDataList = [...distributionDataList];
        updatedDataList[index] = { ...updatedDataList[index], [name]: value };
        // 집계재고 계산
        const quantity = calculatequantity(updatedDataList[index]);
        updatedDataList[index] = { ...updatedDataList[index], quantity };
        setDistributionDataList(updatedDataList);
    };

    const calculatequantity = (data) => {
        const initialQty = parseInt(data.initialQty) || 0;
        const receivedQty = parseInt(data.receivedQty) || 0;
        const releaseQty = parseInt(data.releaseQty) || 0;
        const quantity = initialQty + receivedQty - releaseQty;
        return quantity;
    };

    const handleAdd = async (index) => {
        try {
            const dataToSend = {
                materialsCode: parseInt(distributionDataList[index].materialsCode),
                materialsName: distributionDataList[index].materialsName,
                receiptDate: distributionDataList[index].receiptDate,
                orderQty: parseInt(distributionDataList[index].orderQty),
                initialQty: parseInt(distributionDataList[index].initialQty),
                receivedQty: parseInt(distributionDataList[index].receivedQty),
                releaseQty: parseInt(distributionDataList[index].releaseQty),
                quantity: parseInt(distributionDataList[index].quantity),
                //price: parseInt(distributionDataList[index].price)
            };

            // Axios를 사용해 서버에 데이터 전송
            const response = await axios.post('/materials', dataToSend);

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
        setIsChecked(isConfirmed); // isConfirmed 상태에 따라 ✔ 표시 설정
    }, [isConfirmed]);

    const handleToggleConfirm = () => {
        setIsChecked(!isChecked); // ✔ 표시를 토글하는 함수
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
                    <th>품목코드</th>
                    <th>품목이름</th>
                    <th>입고일자</th>
                    <th>발주수량</th>
                    <th>입고수량</th>
                    <th>기초재고</th>
                    <th>출고수량</th>
                    <th>집계재고</th>
                </tr>
            </thead>
            <tbody>
                {purchaseData.map((purchase, index) => (
                    <tr key={index}>
                        <td>
                            <input
                                style={{ border: 'none', textAlign: 'center' }}
                                type='text'
                                placeholder={purchase.purchaseCode}
                                name='materialsCode'
                                value={distributionDataList[index]?.materialsCode || ''}
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
                                name='materialsName'
                                value={distributionDataList[index]?.materialsName || ''}
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
                            <input className="form-input"
                                type='number'
                                placeholder='집계재고'
                                name='quantity'
                                value={distributionDataList[index]?.quantity}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            />
                            <button type="submit" className="items-subTitle-button" onClick={() => handleAdd(index)} 
                            style={{ marginLeft: '10px', display: isChecked ? 'inline-block' : 'none' }}>
                                ✔
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DistributionAdd;
