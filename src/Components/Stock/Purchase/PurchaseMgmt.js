import React, {useState, useEffect} from 'react';
import './Purchase.css';
import '../../Main/Main.css'
import PurchaseAdd from './PurchaseAdd';
import PurchaseUpdate from './PurchaseUpdate';
import NewDatePicker from './DatePicker';
import Modal from './Modal';
import { AiOutlinePrinter } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { PiFileArrowUp } from "react-icons/pi";
import { AiOutlineCalendar } from 'react-icons/ai';


const PurchaseMgmt = () => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [checkAll, setCheckAll] = useState(false); // 체크박스 전체 선택
  const [updateData, setUpdateData] = useState(null); // 수정된 데이터를 저장할 상태
  // 테이블 추가/수정 변수
  const [addPurchase, setAddPurchase] = useState([
    // 초기 데이터 예시
    { purchaseCode: 'P001', purchaseName: 'Product A', purchaseUnit: 'Unit A', orderDate: '2023-06-01', orderQuantity: 100, unitPrice: 50, purchaseRemark: '' },
    { purchaseCode: 'P002', purchaseName: 'Product B', purchaseUnit: 'Unit B', orderDate: '2023-06-02', orderQuantity: 150, unitPrice: 70, purchaseRemark: '' },
  ]); // 추가할 데이터를 배열로 받는다.
  const [updatePurchase, setUpdatePurchase] = useState([]); // 수정할 데이터를 배열로 받는다.

  // 캘린더 날짜 변수
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 체크된 항목 관리 상태
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemIndexes, setSelectedItemIndexes] = useState([]);



///
  // 체크박스 전체 선택 상태 변경 함수
  const handleCheckAll = () => {
    setCheckAll(!checkAll); // 현재 상태의 반대로 토글
    if (!checkAll) {
      // 전체 선택 시 모든 항목을 선택된 항목으로 설정
      const allPurchaseCodes = addPurchase.map(purchase => purchase.purchaseCode);
      setSelectedItems(allPurchaseCodes);
      setSelectedItemIndexes(Array.from({ length:addPurchase.length }, (_, index) => index))
    } else {
      // 전체 선택 해제 시 선택된 항목 비우기
      setSelectedItems([]);
      setSelectedItemIndexes([]);
    }
  }
  
  const handleSingleCheckChange = (purchaseCode, index) => {
    if (selectedItems.includes(purchaseCode)) {
      // 이미 선택된 항목이면 제거
      setSelectedItems(selectedItems.filter(item => item !== purchaseCode));
      setSelectedItemIndexes(selectedItemIndexes.filter(item => item !== index));
    } else {
      // 선택된 항목이 아니면 추가
      setSelectedItems([...selectedItems, purchaseCode]);
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



  // purchaseAdd 파트
  const handleAddPurchase = (newAddPurchase) => {
    // 새로운 추가 데이터를 기존 테이블에 추가
    setAddPurchase([newAddPurchase, ...addPurchase ]);
  }
  useEffect(() => {
    // 데이터 추가 후에 수행할 작업
  }, [addPurchase]); // addPurchase 상태가 변경될 때마다 실행됨

    // 데이터 수정 함수
    const handleUpdatePurchase = (updatedPurchase, index) => {
      const updatedList = [...addPurchase];
      updatedList[index] = updatedPurchase;
      setAddPurchase(updatedList);
      setIsUpdateClicked(false); // 수정 모드 종료
      setSelectedItems([]);
      setSelectedItemIndexes([]);
    };

    // 삭제 파트
    const handleDeleteClick = () => {
      if (selectedItems.length === 0) {
        window.alert('삭제할 항목을 선택해 주세요.');
      } else {
        if (window.confirm('선택된 항목을 삭제하시겠습니까?')) {
          const remainingItems = addPurchase.filter(purchase => !selectedItems.includes(purchase.purchaseCode));
          setAddPurchase(remainingItems);
          setSelectedItems([]);
          setSelectedItemIndexes([]);
        }
      }
    };

     const handleCancelUpdate = () => {
    setIsAddClicked(false); // 등록 취소 시 부모 컴포넌트만 보이도록 설정
    setIsUpdateClicked(false);
    setSelectedItems([]);
    setSelectedItemIndexes([]);
  };


  return (
  <div>
    
    <div className="Middle classification">
      <span> <h3><b>발주 관리</b></h3> </span>
    </div>

    <hr />

    <div className="subTitle"> 
      <span>
        {!isUpdateClicked && (
          <>
            {isAddClicked ? (
              <>
                <button onClick={handleCancelUpdate}>취소</button>
                <button>기본값</button>
              </>
            ) : (
              <button onClick={handleAddClick}>등록</button>
            )}
            {!isAddClicked && <button onClick={handleUpdateClick} disabled={selectedItems.length === 0}>수정</button>}
            {!isAddClicked && <button onClick={handleDeleteClick} disabled={selectedItems.length === 0}>삭제</button>}
          </>
        )}
        {isUpdateClicked && <button onClick={() => handleUpdatePurchase(updatePurchase)}>확인</button>}
        {isUpdateClicked && <button onClick={handleCancelUpdate}>취소</button>}
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
          <select name="purchaseSorting">
            <option selected>발주 코드</option>
            <option>발주 품목명</option>
            <option>발주 품목가격</option>
          </select>
        </label>
     </div>
    </div>

      {/* 검색창 */}
      

      <br/><br/><br/>
      {/* 테이블 */}
      <section>        
        <div>
          <table className='purchaseTable'>
            <thead>
              <tr>
                <th><input type='checkbox' onChange={handleCheckAll} checked={checkAll}></input></th>
                <th>코드</th> <th>이름</th> <th>단위</th> <th>발주 일자</th> <th>발주 수량</th> <th>원가</th> <th>특이사항</th><th></th>
              </tr>
            </thead>
            <tbody>
              {isAddClicked ? (
                <PurchaseAdd checkAll={checkAll} onAddPurchase={handleAddPurchase} />
              ) : null}
              {isUpdateClicked ? (
                selectedItemIndexes.map((index) => (
                  <PurchaseUpdate
                    key={index}
                    purchaseData={addPurchase[index]}
                    onUpdatePurchase={handleUpdatePurchase}
                    checkAll={checkAll}
                    index={index}
                  />
                ))
              ) : (
                addPurchase.map((purchase, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(purchase.purchaseCode)}
                        onChange={() => handleSingleCheckChange(purchase.purchaseCode, index)}
                      />
                    </td>
                    <td>{purchase.purchaseCode}</td>
                    <td>{purchase.purchaseName}</td>
                    <td>{purchase.purchaseUnit}</td>
                    <td>{purchase.orderDate}</td>
                    <td>{purchase.orderQuantity}</td>
                    <td>{purchase.unitPrice}</td>
                    <td>{purchase.purchaseRemark}</td>
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
export default PurchaseMgmt;