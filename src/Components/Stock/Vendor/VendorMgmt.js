import React, { useState, useEffect } from 'react';
import './Vendor.css';
import '../../Main/Main.css';
import VendorAdd from './VendorAdd';
import VendorUpdate from './VendorUpdate';
import NewDatePicker from './DatePicker';
import Modal from './Modal';
import { AiOutlinePrinter } from 'react-icons/ai';
import { PiFileArrowUp } from 'react-icons/pi';

const VendorMgmt = () => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [checkAll, setCheckAll] = useState(false); // 체크박스 전체 선택

  // 테이블 추가 변수
  const [addVendor, setAddVendor] = useState([
    // 초기 데이터 예시
    { vendorCode: 'V001', vendorName: 'A', vendorContact: 'Unit A', vendorAddress: '123-456-789', vendorRemark: '/', deliverableStatus: '가능' },
    { vendorCode: 'V002', vendorName: 'B', vendorContact: 'Unit B', vendorAddress: '111-222-333', vendorRemark: '/', deliverableStatus: '가능' },
  ]);

  // 캘린더 날짜 변수
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 체크된 항목 관리 상태
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemIndexes, setSelectedItemIndexes] = useState([]);
  const [updateVendor, setUpdateVendor] = useState([]); // 수정할 데이터를 배열로 받는다.


  // 체크박스 전체 선택 상태 변경 함수
  const handleCheckAll = () => {
    setCheckAll(!checkAll); // 현재 상태의 반대로 토글
    if (!checkAll) {
      // 전체 선택 시 모든 항목을 선택된 항목으로 설정
      const allVendorCodes = addVendor.map((vendor) => vendor.vendorCode);
      setSelectedItems(allVendorCodes);
      setSelectedItemIndexes(Array.from({ length: addVendor.length }, (_, index) => index));
    } else {
      // 전체 선택 해제 시 선택된 항목 비우기
      setSelectedItems([]);
      setSelectedItemIndexes([]);
    }
  };

  const handleSingleCheckChange = (vendorCode, index) => {
    if (selectedItems.includes(vendorCode)) {
      // 이미 선택된 항목이면 제거
      setSelectedItems(selectedItems.filter((item) => item !== vendorCode));
      setSelectedItemIndexes(selectedItemIndexes.filter((item) => item !== index));
    } else {
      // 선택된 항목이 아니면 추가
      setSelectedItems([...selectedItems, vendorCode]);
      setSelectedItemIndexes([...selectedItemIndexes, index]);
    }
  };

  const handleAddClick = () => {
    setIsAddClicked(!isAddClicked);
    setIsUpdateClicked(false);
  };

  const handleUpdateClick = () => {
    if (selectedItems.length === 0) {
      window.alert('수정할 항목을 선택해 주세요.');
    } else {
      setIsUpdateClicked(true);
      setIsAddClicked(false);
    }
  };

  // 삭제 버튼 클릭 시
  const handleDeleteClick = () => {
    if (selectedItems.length === 0) {
      window.alert('삭제할 항목을 선택해 주세요.');
    } else {
      if (window.confirm('선택된 항목을 삭제하시겠습니까?')) {
        const remainingItems = addVendor.filter((vendor) => !selectedItems.includes(vendor.vendorCode));
        setAddVendor(remainingItems);
        setSelectedItems([]);
        setSelectedItemIndexes([]);
      }
    }
  };

  // vendorAdd 파트
  const handleAddVendor = (newAddVendor) => {
    // 새로운 추가 데이터를 기존 테이블에 추가
    setAddVendor([newAddVendor, ...addVendor]);
  };

  // 데이터 수정 함수
  const handleUpdateVendor = (updatedVendor, index) => {
    const updatedList = [...addVendor];
    updatedList[index] = updatedVendor;
    setAddVendor(updatedList);
    setIsUpdateClicked(false); // 수정 모드 종료
    setSelectedItems([]);
    setSelectedItemIndexes([]);
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
        <span>
          <h3>
            <b>거래처 관리</b>
          </h3>{' '}
        </span>
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
              {!isAddClicked && <button onClick={handleUpdateClick}>수정</button>}
              {!isAddClicked && <button onClick={handleDeleteClick}>삭제</button>}
            </>
          )}
          {isUpdateClicked && <button onClick={() => handleUpdateVendor(updateVendor)}>확인</button>}
          {isUpdateClicked && <button onClick={handleCancelUpdate}>취소</button>}
        </span>
      </div>


      <div className="searcher">
        {/* 캘린더 */}
        <div className="left">
          <div className="newDatePickerContainer">
            <NewDatePicker className="newDatePicker" selectedDate={startDate} setSelectedDate={setStartDate} />
            <span>-</span>
            <NewDatePicker className="newDatePicker" selectedDate={endDate} setSelectedDate={setEndDate} />
          </div>

          {/* 정렬기준 */}
          <div className="sorting">
            <select name="vendorSorting">
              <option selected>거래처 코드</option>
              <option>거래처명</option>
              <option>거래처 연락처</option>
            </select>
          </div>
        </div>

        {/* 검색창 */}
        <div className="right">
          <input type="text" placeholder="검색" />
          <button>조회</button>
        </div>
      </div>

      <br />
      {/* 테이블 */}
      <section>
        <div>
          <table className="vendorTable">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" onChange={handleCheckAll} checked={checkAll} />
                </th>
                <th>코드</th>
                <th>거래처명</th>
                <th>거래처 연락처</th>
                <th>거래처 주소</th>
                <th>특이사항</th>
                <th>배송가능여부</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isAddClicked ? (
                <VendorAdd checkAll={checkAll} onAddVendor={handleAddVendor} />
              ) : isUpdateClicked ? (
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
                        onChange={() => handleSingleCheckChange(vendor.vendorCode, index)}
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
      <div className="print">
        <button>
          <PiFileArrowUp size={20} /> 엑셀 다운
        </button>
        <button>
          <AiOutlinePrinter size={20} /> 인쇄
        </button>
      </div>
    </div>
  );
};

export default VendorMgmt;
