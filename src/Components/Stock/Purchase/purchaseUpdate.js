import React,{useState, useEffect} from 'react';
//import './Purchase.css';
//import '../../Main/Main.css'

const PurchaseUpdate = ({ checkAll }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checkAll);
  }, [checkAll]); // checkAll 상태가 변할 때마다 isChecked 업데이트

  return (
        <tr className='inputField'>
            <td><input type='checkbox' checked={isChecked} onChange={()=>{}}></input></td>
            <td><input type='text' placeholder='#111'></input></td>
            <td><input type='text' placeholder='순우유'></input></td>
            <td><input type='text' placeholder='L'></input></td>
            <td><input type='text' placeholder='2024/06/17'></input></td>
            <td><input type='number' placeholder='30'></input></td>
            <td><input type='number' step='100' placeholder='3000'></input></td>
            <td><input type='text' ></input></td>
            <td><button>확인</button></td>
        </tr> 

 
  )
}
export default PurchaseUpdate;
