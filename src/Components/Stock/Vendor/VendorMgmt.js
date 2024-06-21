import React, {useState, useEffect} from 'react';
import './Vendor.css';
import '../../Main/Main.css'
import VendorAdd from './VendorAdd';
import VendorUpdate from './VendorUpdate';
import NewDatePicker from './DatePicker';
import Modal from './Modal';
import { AiOutlinePrinter } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { PiFileArrowUp } from "react-icons/pi";
import { AiOutlineCalendar } from 'react-icons/ai';


const VendorMgmt = () => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [checkAll, setCheckAll] = useState(false); // 체크박스 전체 선택

  // 테이블 추가/수정 변수
  const [addVendor, setAddVendor] = useState([
    // 초기 데이터 예시
    { vendorCode: 'V001', vendorName: 'A', vendorContact: 'Unit A', vendorAddress: '123-456-789', vendorRemark: '/', deliverableStatus: '가능' },
    { vendorCode: 'V002', vendorName: 'B', vendorContact: 'Unit B', vendorAddress: '111-222-333', vendorRemark: '/', deliverableStatus: '가능' },
  ]); // 추가할 데이터를 배열로 받는다.
  const [updateVendor, setUpdateVendor] = useState([]); // 수정할 데이터를 배열로 받는다.

  // 캘린더 날짜 변수
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 체크된 항목 관리 상태
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemIndexes, setSelectedItemIndexes] = useState([]);


  // 모달 상태 관리
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


///
  // 체크박스 전체 선택 상태 변경 함수
  const handleCheckAll = () => {
    setCheckAll(!checkAll); // 현재 상태의 반대로 토글
    if (!checkAll) {
      // 전체 선택 시 모든 항목을 선택된 항목으로 설정
      const allVendorsCodes = addVendor.map(vendor => vendor.vendorCode);
      setSelectedItems(allVendorsCodes);
      setSelectedItemIndexes(Array.from({ length:addVendor.length }, (_, index) => index))
    } else {
      // 전체 선택 해제 시 선택된 항목 비우기
      setSelectedItems([]);
      setSelectedItemIndexes([]);
    }
  }
  
  const handleSingleCheckChange = (vendorCode, index) => {
    if (selectedItems.includes(vendorCode)) {
      // 이미 선택된 항목이면 제거
      setSelectedItems(selectedItems.filter(item => item !== vendorCode));
      setSelectedItemIndexes(selectedItemIndexes.filter(item => item !== index));
    } else {
      // 선택된 항목이 아니면 추가
      setSelectedItems([...selectedItems, vendorCode]);
      setSelectedItemIndexes([...selectedItemIndexes, index]);
    }
  }


  const handleAddClick = () => {
    setIsAddClicked(!isAddClicked);
    setIsUpdateClicked(false);
    setIsDeleteClicked(false);
  }
  const handleUpdateClick = () => {
    setIsUpdateClicked(true);
    setIsAddClicked(false);
    setIsDeleteClicked(false);
  }
  // 삭제 버튼 클릭 시
  const handleDeleteClick = () => {
    setShowModal(true); // 모달 창 보이기
    setModalMessage('선택된 항목을 삭제하시겠습니까?'); // 모달 메시지 설정
  };

  // 모달에서 확인 클릭 시 실행될 함수
  const handleModalConfirm = () => {
    // 선택된 항목을 삭제하는 로직 구현
    const remainingItems = addVendor.filter((vendor) => !selectedItems.includes(vendor.vendorCode));
    setAddVendor(remainingItems);
    setSelectedItems([]); // 선택된 항목 비우기
    setSelectedItemIndexes([]);
    setShowModal(false); // 모달 닫기
  };

  // 모달에서 취소 클릭 시 실행될 함수
  const handleModalCancel = () => {
    setShowModal(false); // 모달 닫기
  };

  // purchaseAdd 파트
  const handleAddVendor = (newAddVendor) => {
    // 새로운 추가 데이터를 기존 테이블에 추가
    setAddVendor([newAddVendor, ...addVendor ]);
  }
  useEffect(() => {
    // 데이터 추가 후에 수행할 작업
  }, [addVendor]); // addPurchase 상태가 변경될 때마다 실행됨

    // 데이터 수정 함수
    const handleUpdateVendor = (updatedVendor, index) => {
      const updatedList = [...addVendor];
      updatedList[index] = updatedVendor;
      setAddVendor(updatedList);
      setIsUpdateClicked(false); // 수정 모드 종료
      setSelectedItems([]);
      setSelectedItemIndexes([]);
    };


  return (
  <div>
    
    <div className="Middle classification">
      <span> <h3><b>거래처 관리</b></h3> </span>
    </div>

    <hr />

    <div className="subTitle"> 
      <span>
        <button onClick={handleAddClick}>{isAddClicked ? '취소' : '등록'}</button>
        <button onClick={handleUpdateClick} disabled={selectedItems.length === 0}>{isUpdateClicked ? '취소' : '수정'}</button>
        <button onClick={handleDeleteClick} disabled={selectedItems.length === 0}>삭제</button>
        {isAddClicked && <button>기본값</button>} 
        {isUpdateClicked && <button onClick={() => handleUpdateVendor(updateVendor)}>확인</button>}
      </span>
    </div>

    
    <div className="searcher">
      
      {/* 캘린더 */}
      <div className="left">
      <div className="newDatePickerContainer">
        <AiOutlineCalendar size={20} />
            <NewDatePicker
              className="newDatePicker"
              selectedDate={startDate}
              setSelectedDate={setStartDate}
            />
            <span>-</span>
            <NewDatePicker
              className="newDatePicker"
              selectedDate={endDate}
              setSelectedDate={setEndDate}
            />
          </div>
        
        {/* 정렬기준 */}
        <label htmlFor="sorting">
          <select name="vendorSorting">
            <option selected>거래처 코드</option>
            <option>거래처명</option>
            <option>거래처 연락처</option>
          </select>
        </label>
     </div>
    </div>

      {/* 검색창 */}
      

      <br/><br/><br/>
      {/* 테이블 */}
      <section>        
        <div>
          <table className='vendorTable'>
            <thead>
              <tr>
                <th><input type='checkbox' onChange={handleCheckAll} checked={checkAll}></input></th>
                <th>코드</th> <th>거래처먕</th> <th>거래처 연락처</th> <th>거래처 주소</th> <th>특이사항</th> <th>배송가능여부</th> <th></th>
              </tr>
            </thead>
            <tbody>
              {isAddClicked ? (
                <VendorAdd checkAll={checkAll} onAddVendor={handleAddVendor} />
              ) : null}
              {isUpdateClicked ? (
                selectedItemIndexes.map((index) => (
                  <VendorUpdate
                    key={index}
                    vendorData={addVendor[index]}
                    onUpdateVendor={handleUpdateVendor}
                    checkAll={checkAll}
                    index={index}
                  />
                ))
              ) : (
                addVendor.map((vendor, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(vendor.vendorCode)}
                        onChange={() => handleSingleCheckChange(vendor.vendorCodeCode, index)}
                      />
                    </td>
                    <td>{vendor.vendorCode}</td>
                    <td>{vendor.vendorName}</td>
                    <td>{vendor.vendorContact}</td>
                    <td>{vendor.vendorAddress}</td>
                    <td>{vendor.vendorRemark}</td>
                    <td>{vendor.deliverableStatus}</td>
                    <td></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

    {/* 엑셀 및 인쇄 */}
    <div className='print'>
      <button><PiFileArrowUp size={20}/> 엑셀 다운</button>
      <button><AiOutlinePrinter size={20}/> 인쇄</button>
    </div>
  </div>

  )

}
export default VendorMgmt;