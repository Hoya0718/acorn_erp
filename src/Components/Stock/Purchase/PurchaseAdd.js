import React, {useState, useEffect} from 'react';
import './Purchase.css';
//import '../../Main/Main.css'

const PurchaseAdd = ({ checkAll, onAddPurchase }) => {
  const [isChecked, setIsChecked] = useState(false);
  // 추가하는 데이터 객체 
  const [purchaseData, setPurchaseData] = useState({
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
    setPurchaseData({...purchaseData, [name]: value}); // setpurchaseData함수를 호출하여 데이터를 배열에 추가하고 속성을 업데이트한다.
  }


  // 부모 컴포넌트로 업데이트된 데이터 전달
  const handleAdd = () => {
    onAddPurchase({...purchaseData, isChecked}); // 부모에게 데이터 전달
    // 추가 버튼을 누르면 입력 필드 초기화
    setPurchaseData({
      purchaseCode: '',
      purchaseName: '',
      purchaseUnit: '',
      orderDate: '',
      orderQuantity: '',
      unitPrice: '',
      purchaseRemark: ''
    });
  }
  // 체크박스 상태 변화 훅
  useEffect(() => {
    setIsChecked(checkAll);
  }, [checkAll]); // checkAll 상태가 변할 때마다 isChecked 업데이트
   
  return (
    <>
        <tr className='inputField'>
            <td><input type='checkbox' checked={isChecked} onChange={()=>setIsChecked(!isChecked)}></input></td>
            <td><input type='text' placeholder='코드' name='purchaseCode' value={purchaseData.purchaseCode} onChange={handleChange}></input></td>
            <td><input type='text' placeholder='이름' name='purchaseName' value={purchaseData.purchaseName} onChange={handleChange}></input></td>
            <td><input type='text' placeholder='단위' name='purchaseUnit' value={purchaseData.purchaseUnit} onChange={handleChange}></input></td>
            <td><input type='text' placeholder='발주 일자' name='orderDate' value={purchaseData.orderDate} onChange={handleChange}></input></td>
            <td><input type='number' placeholder='발주 수량' name='orderQuantity' value={purchaseData.orderQuantity} onChange={handleChange}></input></td>
            <td><input type='number' step='100' placeholder='원가' name='unitPrice' value={purchaseData.unitPrice} onChange={handleChange}></input></td>
            <td><input type='text' placeholder='특이사항' name='purchaseRemark' value={purchaseData.purchaseRemark} onChange={handleChange}></input></td>
            <td><button onClick={handleAdd}>추가</button></td>
        </tr> 

</>
 
  )
}
export default PurchaseAdd;
