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
import moment from 'moment';


const PurchaseMgmt = () => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [checkAll, setCheckAll] = useState(false); // 체크박스 전체 선택
  const [updateData, setUpdateData] = useState(null); // 수정된 데이터를 저장할 상태
  // 테이블 추가/수정 변수
  const [addPurchase, setAddPurchase] = useState([
    // 초기 데이터 예시
    { purchaseCode: 'P001', purchaseName: 'Product A', purchaseUnit: 'Unit A', orderDate: '2024-06-01', orderQuantity: 100, unitPrice: 50, purchaseRemark: '' },
    { purchaseCode: 'P002', purchaseName: 'Product B', purchaseUnit: 'Unit B', orderDate: '2024-06-02', orderQuantity: 150, unitPrice: 70, purchaseRemark: '' },
  ]); // 추가할 데이터를 배열로 받는다.
  const [updatePurchase, setUpdatePurchase] = useState([]); // 수정할 데이터를 배열로 받는다.

  // 캘린더 날짜 변수
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 체크된 항목 관리 상태
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemIndexes, setSelectedItemIndexes] = useState([]);

  // 검색어 변수
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const [filteredPurchase, setFilteredPurchase] = useState([]); // 검색된 데이터를 저장할 상태 추가

  // 정렬 기준 선택
  const [sortOption, setSortOption] = useState('purchaseCode'); // 정렬 기준 선택

 // 삭제 모달 관련 상태
 const [showDeleteModal, setShowDeleteModal] = useState(false);

  ///

  useEffect(() => {
    // 최초에 전체 데이터로 초기화
    setFilteredPurchase(addPurchase);
  }, [addPurchase]);

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
    if (selectedItems.length === 0) {
      window.alert('수정할 항목을 선택해 주세요.');
    } else {
      setIsUpdateClicked(true);
      setIsAddClicked(false);
    }
  };


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
        setShowDeleteModal(true); // 삭제 모달을 보이도록 설정
      }
    };
  
    const handleDeleteConfirmed = () => {
      // 실제 삭제 로직을 처리하는 함수
      const remainingItems = addPurchase.filter(purchase => !selectedItems.includes(purchase.purchaseCode));
      setAddPurchase(remainingItems);
      setSelectedItems([]);
      setShowDeleteModal(false); // 모달 닫기
    };

    const handleCancelUpdate = () => {
      setIsAddClicked(false); // 등록 취소 시 부모 컴포넌트만 보이도록 설정
      setIsUpdateClicked(false);
      setSelectedItems([]);
      setSelectedItemIndexes([]);
    };

    useEffect(() => {
      const modalElement = document.getElementById('exampleModal');
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement);
      }
    }, []);


    // 검색어 업데이트 함수
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
      const filteredData = addPurchase.filter((purchase) =>
        purchase.purchaseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.purchaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.purchaseUnit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.orderDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.orderQuantity.toString().includes(searchTerm.toLowerCase()) ||
        purchase.unitPrice.toString().includes(searchTerm.toLowerCase()) ||
        purchase.purchaseRemark.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPurchase(filteredData); // 필터링된 데이터로 상태 업데이트
    };


    const handleSortChange = (e) => {
      setSortOption(e.target.value);
      // 정렬 기준에 따라 데이터를 정렬하여 저장
      const sortedData = [...filteredPurchase].sort((a, b) => {
        if (e.target.value === 'purchaseCode') {
          return a.purchaseCode.localeCompare(b.purchaseCode);
        } else if (e.target.value === 'purchaseName') {
          return a.purchaseName.localeCompare(b.purchaseName);
        } else if (e.target.value === 'unitPrice') {
          return a.unitPrice - b.unitPrice;
        }
        // 기본적으로 purchaseCode 기준으로 정렬
        return a.purchaseCode.localeCompare(b.purchaseCode);
      });
      setFilteredPurchase(sortedData);
    };

      // 기간 선택에 따른 데이터 필터링
      const handleDateRangeChange = () => {
        // startDate를 하루 전 날짜로 설정하기
        const yesterday = new Date(startDate);
        yesterday.setDate(startDate.getDate() - 1);
      
        // endDate는 그대로 사용
        const filteredData = addPurchase.filter((purchase) => {
          const purchaseDate = moment(purchase.orderDate, 'YYYY-MM-DD'); // orderDate를 moment 객체로 변환
          return purchaseDate.isSameOrAfter(moment(yesterday)) && purchaseDate.isSameOrBefore(moment(endDate));
        });
      
        setFilteredPurchase(filteredData);
      };
      
      // startDate 또는 endDate 변경 시 필터링 업데이트
      useEffect(() => {
        handleDateRangeChange();
      }, [startDate, endDate]);
    


  return (
  <div>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>

    <div className="Middle classification">
      <span> <h3><b>발주 관리</b></h3> </span>
    </div>

    <hr />

     {/* 삭제 모달 */}
     {showDeleteModal && <Modal onDeleteConfirmed={handleDeleteConfirmed} />}

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
            {!isAddClicked && <button onClick={handleUpdateClick} >수정</button>}
            {!isAddClicked && (
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleDeleteClick}>
                  삭제
                </button>
              )}
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
            <NewDatePicker
              className="newDatePicker"
              selectedDate={startDate}
              setSelectedDate={(date) => {
                setStartDate(date);
                handleDateRangeChange(); // 날짜 선택 변경 시 자동으로 데이터 조회
              }}
            />
            <span> ~ </span>
            <NewDatePicker
              className="newDatePicker"
              selectedDate={endDate}
              setSelectedDate={(date) => {
                setEndDate(date);
                handleDateRangeChange(); // 날짜 선택 변경 시 자동으로 데이터 조회
              }}
            />
          </div>
            
            {/* 정렬기준 */}
          <div className="sorting">
            <select name="purchaseSorting" value={sortOption} onChange={handleSortChange}>
              <option value="purchaseCode">발주 코드</option>
              <option value="purchaseName">발주 품목명</option>
              <option value="unitPrice">발주 품목가격</option>
            </select>
          </div>
        </div>

        {/* 검색창 */}
        <div className="right">
          <input type="text" placeholder="검색" value={searchTerm} onChange={handleSearchChange} />
          <button onClick={handleSearch}>조회</button>
        </div>

    </div>

    
      <br/><br/><br/><br/><br/>
      {/* 테이블 */}
      <section>        
        <div>
          <table className='table'>
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
                filteredPurchase.map((purchase, index) => (
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