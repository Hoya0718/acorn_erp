import React,{useState, useEffect} from 'react';
//import './Purchase.css';
//import '../../Main/Main.css'

const PurchaseUpdate = ({ checkAll, purchaseData, onUpdatePurchase, index }) => {
  const [isChecked, setIsChecked] = useState({...purchaseData});
  // 추가하는 데이터 객체 
  const [updatedPurchase, setUpdatedPurchase] = useState({
    purchaseCode: '',
    purchaseName: '',
    purchaseUnit: '',
    orderDate: '',
    orderQuantity: '',
    unitPrice: '',
    purchaseRemark: ''
  });

  // 입력 필드 값이 변하면 호출한다.
  const handleChange = (e) => {
    const { name, value } = e.target; // 이벤트 객체에서 target으로 name과 value를 추출한다.
    setUpdatedPurchase({...updatedPurchase, [name]: value}); // setpurchaseData함수를 호출하여 데이터를 배열에 추가하고 속성을 업데이트한다.
  }


  const handleUpdate = () => {
    onUpdatePurchase(updatedPurchase);
  };

  // 체크박스 상태 변화 훅
  useEffect(() => {
    setIsChecked(checkAll);
  }, [checkAll]); // checkAll 상태가 변할 때마다 isChecked 업데이트
   
  return (
    <>
        <tr className='inputField'>
            <td><input type='checkbox' checked={isChecked} readOnly onChange={()=>setIsChecked(!isChecked)}></input></td>
            <td>{updatedPurchase.purchaseCode}</td>
            <td><input type='text' placeholder={purchaseData.purchaseCode} name='purchaseCode' value={updatedPurchase.purchaseCode} onChange={handleChange}></input></td>
            <td><input type='text' placeholder={purchaseData.purchaseName} name='purchaseName' value={updatedPurchase.purchaseName} onChange={handleChange}></input></td>
            <td><input type='text' placeholder={purchaseData.purchaseUnit} name='purchaseUnit' value={updatedPurchase.purchaseUnit} onChange={handleChange}></input></td>
            <td><input type='text' placeholder={purchaseData.orderDate} name='orderDate' value={updatedPurchase.orderDate} onChange={handleChange}></input></td>
            <td><input type='number' placeholder={purchaseData.orderQuantity} name='orderQuantity' value={updatedPurchase.orderQuantity} onChange={handleChange}></input></td>
            <td><input type='number' step='100' placeholder={purchaseData.unitPrice} name='unitPrice' value={updatedPurchase.unitPrice} onChange={handleChange}></input></td>
            <td><input type='text' placeholder={purchaseData.purchaseRemark} name='purchaseRemark' value={updatedPurchase.purchaseRemark} onChange={handleChange}></input></td>
            <td><button onClick={handleUpdate}>확인</button></td>
        </tr> 

</>
  )}
export default PurchaseUpdate;
