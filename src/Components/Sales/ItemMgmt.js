import React, { useState, useEffect } from 'react';
import './Sales.css';
import axios from '../../api/axios';
import ItemTable from './ItemTable';
import * as XLSX from 'xlsx';
import { GrDocumentUpload } from "react-icons/gr";
import { HiPrinter } from "react-icons/hi2";

const ItemMgmt = () => {
  // 상태 관리
  const [isFormVisible, setIsFormVisible] = useState(false); // 폼의 가시성 상태를 관리하는 상태
  const [formData, setFormData] = useState({ // 폼 데이터를 관리하는 상태
    itemCode: '',
    itemType: '',
    itemName: '',
    itemStatus: '',
    itemPrice: '',
    itemQty: '',
    stockOut: 0,
    stockQty: '' // stockQty로 수정
  });

  const [items, setItems] = useState([]); // 상품 목록을 관리하는 상태
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 상품 목록을 관리하는 상태
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 단일 상품을 관리하는 상태
  const [loading, setLoading] = useState(false); // 데이터 로딩 상태를 관리하는 상태
  const [errors, setErrors] = useState({}); // 유효성 검사 오류를 관리하는 상태
  const [searchTerm, setSearchTerm] = useState(''); // 검색어를 관리하는 상태

  useEffect(() => {
    fetchItems(); // 컴포넌트가 마운트될 때 상품 목록을 가져오는 함수 호출
  }, []);

  // 상품 목록을 가져오는 함수
  const fetchItems = async () => {
    setLoading(true); // 로딩 상태 설정
    try {
      const response = await axios.get('/items'); // 상품 목록 요청
      setItems(response.data); // 상품 목록 설정
    } catch (error) {
      console.error('Error fetching items:', error); // 오류 처리
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // 등록 버튼 클릭 시 폼을 표시하는 함수
  const handleAddButtonClick = () => {
    setIsFormVisible(true); // 폼 표시 상태 설정
    setSelectedItem(null); // 선택된 상품 초기화
    clearFormData(); // 폼 데이터 초기화 함수 호출
  };

  // 폼 데이터 저장 함수
  const handleSave = async () => {
    if (!validateForm()) return; // 폼 유효성 검사

    try {
      let response;
      if (selectedItem) {
        response = await axios.put(`/items/${selectedItem.itemCode}`, formData); // 선택된 상품 수정 요청
      } else {
        response = await axios.post('/items', formData); // 새 상품 등록 요청
      }

      const updatedItem = response.data; // 응답에서 업데이트된 상품 데이터
      if (selectedItem) {
        const updatedItems = items.map(item => 
          item.itemCode === updatedItem.itemCode ? updatedItem : item
        );
        setItems(updatedItems); // 수정된 상품 목록 업데이트
      } else {
        setItems([updatedItem, ...items]); // 새 상품을 포함한 상품 목록 업데이트
      }

      handleSaveSuccess(); // 저장 성공 처리 함수 호출
    } catch (error) {
      console.error('Error saving data:', error); // 오류 처리
    }
  };

  // 폼 입력 필드 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemType) newErrors.itemType = '구분을 선택하세요.';
    if (!formData.itemStatus) newErrors.itemStatus = '판매상태를 선택하세요.';
    if (!formData.itemName) newErrors.itemName = '상품명을 입력하세요.';
    if (!formData.itemQty || isNaN(formData.itemQty) || parseInt(formData.itemQty) <= 0) newErrors.itemQty = '수량을 입력하세요.';
    if (!formData.itemPrice || isNaN(formData.itemPrice) || parseFloat(formData.itemPrice) <= 0) newErrors.itemPrice = '단가를 입력하세요.';
    
    // 수정하는 경우에만 stockOut을 검증
    if (selectedItem && (!formData.stockOut || isNaN(formData.stockOut) || parseFloat(formData.stockOut) < 0)) {
      newErrors.stockOut = '출고 수량을 입력하세요.';
    }
    
    setErrors(newErrors); // 오류 상태 업데이트
    return Object.keys(newErrors).length === 0; // 오류가 없는지 여부 반환
  };

  // 저장 성공 시 처리 함수
  const handleSaveSuccess = () => {
    setIsFormVisible(false); // 폼 가시성 상태 초기화
    clearFormData(); // 폼 데이터 초기화 함수 호출
    setSelectedItems([]); // 선택된 상품 목록 초기화
  };

  // 폼 데이터 초기화 함수
  const clearFormData = () => {
    setFormData({
      itemCode: '',
      itemType: '',
      itemName: '',
      itemStatus: '',
      itemPrice: '',
      itemQty: '',
      stockOut: '',
      stockQty: '' // stockQty로 수정
    });
    setSelectedItem(null); // 선택된 상품 초기화
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 선택된 상품 삭제 함수
  const handleDeleteClick = async () => {
    if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
      try {
        const itemCodes = selectedItems.map(item => item.itemCode); // 선택된 상품 코드 배열
        await Promise.all(itemCodes.map(itemCode => axios.delete(`/items/${itemCode}`))); // 모든 선택된 상품 삭제 요청
        fetchItems(); // 상품 목록 다시 가져오기
        setSelectedItems([]); // 선택된 상품 목록 초기화
      } catch (error) {
        console.error('삭제 중 오류 발생:', error); // 오류 처리
      }
    }
  };

  // 수정 버튼 클릭 시 처리 함수
  const handleUpdateButtonClick = () => {
    if (selectedItems.length === 1) {
      setIsFormVisible(true); // 폼 표시 상태 설정
      setSelectedItem(selectedItems[0]); // 첫 번째 선택된 상품 설정
      setFormData(selectedItems[0]); // 폼 데이터 설정
    } else {
      alert("하나의 항목만 선택하세요."); // 한 개 이상의 항목을 선택한 경우 경고 메시지 표시
    }
  };

  // 취소 버튼 클릭 시 처리 함수
  const handleCancelButtonClick = () => {
    setIsFormVisible(false); // 폼 가시성 상태 초기화
    clearFormData(); // 폼 데이터 초기화 함수 호출
    setSelectedItems([]); // 선택된 상품 목록 초기화
  };

  // 엑셀 다운로드 처리 함수
  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(items); // 상품 목록을 시트로 변환
    const workbook = XLSX.utils.book_new(); // 새로운 워크북 생성
    XLSX.utils.book_append_sheet(workbook, worksheet, "Items"); // 시트를 워크북에 추가
    XLSX.writeFile(workbook, "items.xlsx"); // 엑셀 파일 다운로드
  };

  // 인쇄 처리 함수
  const handlePrint = () => {
    window.print(); // 브라우저 인쇄 기능 호출
  };

  // 실시간 검색 입력 핸들러
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 상태 업데이트
  };

  // 실시간 검색 필터링
  const filteredItems = items.filter(item => 
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="Middle classification">
        <h3>상품 관리</h3>
      </div>
      <hr /><br /><br /><br />
      <div className="searcher">
        <div className="right">
          <input 
            type="text" 
            placeholder='🔍 상품명 검색' 
            value={searchTerm} 
            onChange={handleSearchInputChange} // 검색어 입력 필드
          />
          <button onClick={fetchItems}>조회</button>
        </div>
      </div>
      <br />
      <div className="items-subTitle">
        <span>
          {isFormVisible ? (
            <>
              <button onClick={handleSave}>저장</button>
              <button onClick={handleCancelButtonClick}>취소</button>
            </>
          ) : (
            <button onClick={handleAddButtonClick}>등록</button>
          )}
          {!isFormVisible && (
            <>
              <button onClick={handleUpdateButtonClick}>수정</button>
              <button onClick={handleDeleteClick}>삭제</button>
            </>
          )}
        </span>
      </div>
      <div>
        <section>
          <ItemTable
            isFormVisible={isFormVisible}
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleSave}
            items={filteredItems} // 필터링된 아이템 목록 전달
            selectedItem={selectedItem}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            setIsFormVisible={setIsFormVisible}
          />
          </section>
        </div>
      <div className="excel-print">
        <button onClick={handleExcelDownload}><GrDocumentUpload size={16}/> 엑셀 다운</button>
        <button onClick={handlePrint}><HiPrinter size={16}/> 인쇄</button>
      </div>
    </div>
  );
};

export default ItemMgmt;
