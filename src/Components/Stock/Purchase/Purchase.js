import React, {useState} from 'react';
import './Purchase.css';
import '../../Main/Main.css'
import PurchaseAdd from './PurchaseAdd';
import PurchaseUpdate from './PurchaseUpdate';
import NewDatePicker from './DatePicker';
import { AiOutlinePrinter } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { PiFileArrowUp } from "react-icons/pi";
import { AiOutlineCalendar } from 'react-icons/ai';


const Purchase = () => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [checkAll, setCheckAll] = useState(false); // 체크박스 전체 선택

  // 캘린더 날짜 변수
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 체크박스 전체 선택 상태 변경 함수
  const handleCheckAll = () => {
    setCheckAll(!checkAll); // 현재 상태의 반대로 토글
  }

  const handleAddClick = () => {
    setIsAddClicked(true);
    setIsUpdateClicked(false);
    setIsDeleteClicked(false);
  }
  const handleUpdateClick = () => {
    setIsUpdateClicked(true);
    setIsAddClicked(false);
    setIsDeleteClicked(false);
  }
  const handleDeleteClick = () => {
    setIsDeleteClicked(true);
    setIsAddClicked(false);
    setIsUpdateClicked(false);
  }

  // purchaseUpdate 파트
  const [showModal, setShowModal] = useState(false);

  return (
  <div>
    
    <div className="Middle classification">
      <span> <h3><b>발주 관리</b></h3> </span>
    </div>

    <hr />

    <div className="subTitle"> 
      <span>
        <button onClick={handleAddClick}>등록</button>
        <button onClick={handleUpdateClick}>수정</button>
        <button onClick={handleDeleteClick}>삭제</button>
        {isAddClicked && <button>기본값</button>}
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


      {/* 검색창 */}
      <div className="right">
        <input type="text" placeholder={<AiOutlineSearch />+'검색'} />&nbsp;
        <button>조회 &gt;</button>
      </div>
    </div>  

      <br/><br/><br/>
      {/* 테이블 */}
      <section>        
        <div>
          <table className='purchaseTable'>
            <thead>
              <tr>
                <th><input type='checkbox' onChange={handleCheckAll} checked={checkAll}></input></th>
                <th>코드</th> <th>이름</th> <th>단위</th> <th>발주 일자</th> <th>발주 수량</th> <th>원가</th> <th>특이사항</th>
              </tr>
            </thead>
            <tbody>
              {isAddClicked ? <PurchaseAdd checkAll={checkAll}/> : null} 
              {isUpdateClicked ? <PurchaseUpdate checkAll={checkAll}/> : null}
              <tr>
                <td><input type='checkbox' checked={checkAll} onChange={()=>{}}></input></td>
                <td>#111</td><td>순우유</td><td>L</td><td>2024/06/17</td><td>30</td><td>3000</td><td></td>
              </tr> 
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
export default Purchase;