import React,{useState, useEffect} from 'react';
//import './Purchase.css';
//import '../../Main/Main.css'

const PurchaseUpdate = ({ checkAll, purchaseData, onUpdatePurchase, index }) => {
  const [isChecked, setIsChecked] = useState(false);
  // 각 행마다 수정 상태 확인
  const [isEditing, setIsEditing] = useState(false); 
  // 추가하는 데이터 객체 
  const [localPurchase, setLocalPurchase] = useState({
    ...purchaseData
  });

 // 체크박스 상태 변화 훅
  useEffect(() => {
    setIsChecked(checkAll);
  }, [checkAll]); // checkAll 상태가 변할 때마다 isChecked 업데이트
 
  // 입력 필드 값이 변하면 호출한다.
  const handleChange = (e) => {
    const { name, value } = e.target; // 이벤트 객체에서 target으로 name과 value를 추출한다.
    setLocalPurchase({...localPurchase, [name]: value}); // setpurchaseData함수를 호출하여 데이터를 배열에 추가하고 속성을 업데이트한다.
  }

  const handleUpdate = () => {
    onUpdatePurchase(localPurchase, index);
    setIsEditing(false); // 수정 완료 후 수정 모드 종료
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing); // 수정 모드 토글
    if (!isEditing) {
      // 수정 모드 진입 시 현재 행의 데이터로 localPurchase 초기화
      setLocalPurchase({ ...purchaseData });
    }
  };
   
  return (
    <>
        <tr className='inputField'>
            <td><input type='checkbox' checked={isChecked} readOnly onChange={()=>setIsChecked(!isChecked)}></input></td>
            <td><input type='text' placeholder={purchaseData.purchaseCode} name='purchaseCode' value={localPurchase.purchaseCode} readOnly={!isEditing} onChange={handleChange}></input></td>
            <td><input type='text' placeholder={purchaseData.purchaseName} name='purchaseName' value={localPurchase.purchaseName} onChange={handleChange}></input></td>
            <td><input type='text' placeholder={purchaseData.purchaseUnit} name='purchaseUnit' value={localPurchase.purchaseUnit} onChange={handleChange}></input></td>
            <td><input type='text' placeholder={purchaseData.orderDate} name='orderDate' value={localPurchase.orderDate} onChange={handleChange}></input></td>
            <td><input type='number' placeholder={purchaseData.orderQuantity} name='orderQuantity' value={localPurchase.orderQuantity} onChange={handleChange}></input></td>
            <td><input type='number' step='100' placeholder={purchaseData.unitPrice} name='unitPrice' value={localPurchase.unitPrice} onChange={handleChange}></input></td>
            <td><input type='text' placeholder={purchaseData.purchaseRemark} name='purchaseRemark' value={localPurchase.purchaseRemark} onChange={handleChange}></input></td>
            {index === 0 && <td><button onClick={handleUpdate}>확인</button></td>}
        </tr> 

</>
  )}
export default PurchaseUpdate;
