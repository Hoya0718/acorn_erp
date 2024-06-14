import React, {useState} from 'react';
//import './Purchase.css';
//import '../../Main/Main.css'

const PurchaseAdd = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };

  return (
    <>
        <tr>
            <td><input type='checkbox'></input></td>
            <td><input type='text'></input></td>
            <td><input type='text'></input></td>
            <td><input type='text'></input></td>
            <td><input type='text'></input></td>
            <td><input type='number'></input></td>
            <td><input type='number' step='100'></input></td>
            <td><input type='text'></input></td>
            <button>추가</button>
            <button>기본값</button>
        </tr> 
        {showModal ? (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <p>기본값으로 설정되었습니다.</p>
              </div>
            </div>
          ) : null}
</>
 
  )
}
export default PurchaseAdd;
