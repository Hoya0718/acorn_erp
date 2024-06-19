import React, {useState, useEffect} from 'react';
import './Vendor.css';
//import '../../Main/Main.css'

const VendorAdd = ({ checkAll, onAddVendor }) => {
  const [isChecked, setIsChecked] = useState(false);
  // 추가하는 데이터 객체 
  const [vendorData, setVendorData] = useState({
    vendorCode: '',
    vendorName: '',
    vendorContact: '',
    vendorAddress: '',
    vendorRemark: '',
    deliverableStatus: ''
  });

  // 입력 필드 값이 변하면 호출한다.
  const handleChange = (e) => {
    const { name, value } = e.target; // 이벤트 객체에서 target으로 name과 value를 추출한다.
    setVendorData({...vendorData, [name]: value}); // setVendorData함수를 호출하여 데이터를 배열에 추가하고 속성을 업데이트한다.
  }


  // 부모 컴포넌트로 업데이트된 데이터 전달
  const handleAdd = () => {
    onAddVendor({...vendorData, isChecked}); // 부모에게 데이터 전달
    // 추가 버튼을 누르면 입력 필드 초기화
    setVendorData({
      vendorCode: '',
      vendorName: '',
      vendorContact: '',
      vendorAddress: '',
      vendorRemark: '',
      deliverableStatus: ''
    });
  }
  // 체크박스 상태 변화 훅
  useEffect(() => {
    setIsChecked(checkAll || false);
  }, [checkAll]); // checkAll 상태가 변할 때마다 isChecked 업데이트
   
  return (
    <>
        <tr className='inputField'>
            <td><input type='checkbox' checked={isChecked} onChange={()=>setIsChecked(!isChecked)}></input></td>
            <td><input type='text' placeholder='코드' name='vendorCode' value={vendorData.vendorCode} onChange={handleChange}></input></td>
            <td><input type='text' placeholder='거래처명' name='vendorName' value={vendorData.vendorName} onChange={handleChange}></input></td>
            <td><input type='text' placeholder='연락처' name='vendorContact' value={vendorData.vendorContact} onChange={handleChange}></input></td>
            <td><input type='text' placeholder='주소' name='vendorAddress' value={vendorData.vendorAddress} onChange={handleChange}></input></td>
            <td><input type='text' placeholder='특이사항' name='vendorRemark' value={vendorData.vendorRemark} onChange={handleChange}></input></td>
            <td><input type='text' placeholder='배송가능여부' name='deliverableStatus' value={vendorData.deliverableStatus} onChange={handleChange}></input></td>
            <td><button onClick={handleAdd}>추가</button></td>
        </tr> 

</>
 
  )
}
export default VendorAdd;
