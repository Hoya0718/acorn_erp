import React, {useState, useEffect} from 'react';
import './Purchase.css';
//import '../../Main/Main.css'

const PurchaseAdd = ({ checkAll }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checkAll);
  }, [checkAll]); // checkAll 상태가 변할 때마다 isChecked 업데이트
   
  return (
    <>
        <tr className='inputField'>
            <td><input type='checkbox' checked={isChecked} onChange={()=>{}}></input></td>
            <td><input type='text' placeholder='코드'></input></td>
            <td><input type='text' placeholder='이름'></input></td>
            <td><input type='text' placeholder='단위'></input></td>
            <td><input type='text' placeholder='발주 일자'></input></td>
            <td><input type='number' placeholder='발주 수량'></input></td>
            <td><input type='number' step='100' placeholder='원가'></input></td>
            <td><input type='text' placeholder='특이사항'></input></td>
            <button>추가</button>
      
        </tr> 

</>
 
  )
}
export default PurchaseAdd;
