import React, { useState, useEffect } from 'react';
import './Sales.css'; 
import { Link, useLocation } from 'react-router-dom'; 
import OrderTable from './OrderTable'; 
import DateComponent from './DateComponent';
import axios from '../../api/axios';
import * as XLSX from 'xlsx'; 
import { GrDocumentUpload } from "react-icons/gr"; 
import { HiPrinter } from "react-icons/hi2"; 

const OrderMgmt = () => {
  const location = useLocation(); // 현재 경로를 가져오기 위해 useLocation을 사용합니다.
  const [isFormVisible, setIsFormVisible] = useState(false); // 입력 폼의 표시 여부를 관리하는 상태
  const [formData, setFormData] = useState({ // 입력 폼의 데이터를 관리하는 상태
    orderNum: '',
    itemName: '',
    customerName: '',
    customerTel: '',
    itemQty: '',
    orderPrice: '',
    orderDate: '',
    orderStatus: ''
  });

  const [errors, setErrors] = useState({}); // 입력 필드의 유효성 검사 오류를 관리하는 상태
  const [orders, setOrders] = useState([]); // 주문 목록을 관리하는 상태
  const [selectedOrders, setSelectedOrders] = useState([]); // 선택된 주문 목록을 관리하는 상태
  const [selectedOrder, setSelectedOrder] = useState(null); // 선택된 개별 주문을 관리하는 상태
  const [selectedLink, setSelectedLink] = useState(''); // 선택된 링크 상태를 관리하는 상태
  const [loading, setLoading] = useState(false); // 데이터 로딩 상태를 관리하는 상태
  const [searchTerm, setSearchTerm] = useState(''); // 검색어를 관리하는 상태
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 컴포넌트가 마운트될 때와 location.pathname이 변경될 때 주문 데이터를 가져오는 useEffect
  useEffect(() => {
    fetchOrders(); // 주문 데이터를 가져오는 함수 호출
    setSelectedLink(location.pathname); // 현재 경로를 설정하는 함수 호출
  }, [location.pathname]);

  // 주문 데이터를 가져오는 함수
  const fetchOrders = async () => {
    setLoading(true); // 로딩 상태를 true로 설정
    try {
      const response = await axios.get('/orders'); // 주문 데이터를 서버에서 가져옴
      setOrders(response.data); // 가져온 데이터를 상태에 설정
    } catch (error) {
      console.error('Error fetching orders:', error); // 오류 발생 시 콘솔에 오류 메시지 출력
    } finally {
      setLoading(false); // 로딩 상태를 false로 설정
    }
  };

  // 등록 버튼 클릭 시 입력 폼을 표시하는 함수
  const handleAddButtonClick = () => {
    setIsFormVisible(true); // 입력 폼 표시 상태를 true로 설정
    setSelectedOrder(null); // 선택된 주문을 null로 초기화
    clearFormData(); // 입력 폼 데이터 초기화 함수 호출
  };

  // 저장 버튼 클릭 시 데이터를 저장하는 함수
  const handleSave = async () => {
    if (!validateForm()) return; // 입력 폼 유효성 검사 함수 호출 후 유효하지 않으면 함수 종료

    try {
      if (selectedOrder) {
        const response = await axios.put(`/orders/${selectedOrder.orderNum}`, formData); // 선택된 주문을 업데이트하는 경우 PUT 요청
        const updatedOrders = orders.map(order => 
          order.orderNum === selectedOrder.orderNum ? response.data : order
        );
        setOrders(updatedOrders); // 주문 목록 업데이트
      } else {
        const totalPrice = parseFloat(formData.orderPrice) * parseInt(formData.itemQty);
        const newOrder = { ...formData, orderTotalPrice: totalPrice }; // 새 주문 데이터 생성
        const response = await axios.post('/orders', newOrder); // 새 주문 추가 POST 요청
        setOrders([response.data, ...orders]); // 주문 목록에 새 주문 추가
      }
      handleSaveSuccess(); // 저장 성공 후 처리 함수 호출
    } catch (error) {
      console.error('Error submitting order:', error); // 오류 발생 시 콘솔에 오류 메시지 출력
    }
  };

  // 저장 성공 후 처리 함수
  const handleSaveSuccess = () => {
    setIsFormVisible(false); // 입력 폼 숨기기
    clearFormData(); // 입력 폼 데이터 초기화
    setSelectedOrders([]); // 선택된 주문 목록 초기화
  };

  // 입력 폼 데이터 초기화 함수
  const clearFormData = () => {
    setFormData({
      orderNum: '',
      itemName: '',
      customerName: '',
      customerTel: '',
      itemQty: '',
      orderPrice: '',
      orderDate: '',
      orderStatus: ''
    });
    setErrors({}); // 오류 상태 초기화
    setSelectedOrder(null); // 선택된 주문 초기화
  };

  // 입력 폼 값 변경 시 호출되는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 수정 버튼 클릭 시 호출되는 함수
  const handleUpdateButtonClick = () => {
    if (selectedOrders.length === 1) {
      setIsFormVisible(true); // 입력 폼 표시
      setSelectedOrder(selectedOrders[0]); // 선택된 주문 설정
      setFormData({
        ...selectedOrders[0],
        orderDate: selectedOrders[0].orderDate.substring(0, 16) // 주문 날짜 포맷 설정
      });
    } else {
      alert("하나의 항목만 선택하세요."); // 선택된 항목이 하나가 아닌 경우 경고 메시지 출력
    }
  };

  // 취소 버튼 클릭 시 호출되는 함수
  const handleCancelButtonClick = () => {
    setIsFormVisible(false); // 입력 폼 숨기기
    clearFormData(); // 입력 폼 데이터 초기화
  };

  // 입력 폼 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemName) newErrors.itemName = '상품명을 입력하세요.'; // 상품명 필드 유효성 검사
    if (!formData.customerName) newErrors.customerName = '고객명을 입력하세요.'; // 고객명 필드 유효성 검사
    if (!formData.customerTel) newErrors.customerTel = '연락처를 입력하세요.'; // 연락처 필드 유효성 검사
    if (!formData.itemQty || isNaN(formData.itemQty) || parseInt(formData.itemQty) <= 0) newErrors.itemQty = '수량을 입력하세요.'; // 수량 필드 유효성 검사
    if (!formData.orderPrice || isNaN(formData.orderPrice) || parseFloat(formData.orderPrice) <= 0) newErrors.orderPrice = '단가를 입력하세요.'; // 단가 필드 유효성 검사
    if (!formData.orderDate) newErrors.orderDate = '주문 날짜를 선택하세요.'; // 주문 날짜 필드 유효성 검사
    if (!formData.orderStatus) newErrors.orderStatus = '주문 상태를 입력하세요.'; // 주문 상태 필드 유효성 검사

    setErrors(newErrors); // 오류 상태 업데이트
    return Object.keys(newErrors).length === 0; // 유효성 검사 결과 반환
  };

  // 링크 클릭 시 호출되는 함수
  const handleLinkClick = (path) => {
    setSelectedLink(path); // 선택된 링크 설정
  };

  // 엑셀 다운로드 기능 함수
  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders); // 주문 데이터를 시트로 변환
    const workbook = XLSX.utils.book_new(); // 새 워크북 생성
    XLSX.utils.book_append_sheet(workbook, worksheet, "orders"); // 시트를 워크북에 추가
    XLSX.writeFile(workbook, "orders.xlsx"); // 워크북을 파일로 다운로드
  };

  // 달력 기능
  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  // 인쇄 기능 함수
  const handlePrint = () => {
    window.print(); // 브라우저에서 인쇄
  };

  // 실시간 검색 필드 값 변경 시 호출되는 함수
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 상태 업데이트
  };

  // 실시간 검색 필터링 함수
  const filteredOrders = orders.filter(order => {
    return (
      order.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="Orders">
      <div className="Middle classification">
        <h3> 주문 관리 </h3>
      </div>
      <hr />

      <div className="order-subTitle">
        <span>
          <button
            className={selectedLink === '/layout/salesMgmt/orderMgmt' ? 'selected' : ''}
            onClick={() => handleLinkClick('/layout/salesMgmt/orderMgmt')}>
            <Link to="/layout/salesMgmt/orderMgmt">주문서 조회</Link>
          </button>
          <button
            className={selectedLink === '/layout/salesMgmt/return' ? 'selected' : ''}
            onClick={() => handleLinkClick('/layout/salesMgmt/return')}>
            <Link to="/layout/salesMgmt/return">취소 주문서 조회</Link>
          </button>
        </span>
      </div>
      
      <div className="searcher">
        <div className="left">
          <DateComponent onChange={handleDateChange} />
        </div>

        <div className="right">
          <input type="text" placeholder='🔍 이름/상품명 검색' value={searchTerm} onChange={handleSearchInputChange} />
          <button onClick={() => fetchOrders()}>조회</button>
        </div>
      </div>
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
              {/* <button onClick={handleDeleteClick}>삭제</button> */}
            </>
          )}
        </span>
      </div>
      <div>
        <section>
          <OrderTable 
            isFormVisible={isFormVisible} // 입력 폼 표시 여부
            formData={formData} // 입력 폼 데이터
            handleInputChange={handleInputChange} // 입력 폼 값 변경 시 처리 함수
            handleFormSubmit={handleSave} // 입력 폼 제출 시 처리 함수
            orders={filteredOrders} // 필터링된 주문 목록 데이터
            selectedOrder={selectedOrder} // 선택된 개별 주문
            selectedOrders={selectedOrders} // 선택된 주문 목록
            setSelectedOrders={setSelectedOrders} // 선택된 주문 목록 설정 함수
            setIsFormVisible={setIsFormVisible} // 입력 폼 표시 여부 설정 함수
            errors={errors} // 입력 필드 유효성 검사 오류
            startDate={startDate}
            endDate={endDate}
          />
        </section>
      </div>
      <div className="excel-print">
        <button onClick={handleExcelDownload}><GrDocumentUpload size={16}/> 엑셀 다운</button>
        <button onClick={handlePrint}><HiPrinter size={16}/> 인쇄</button>
      </div>
    </div>
  );
}

export default OrderMgmt; // OrderMgmt 컴포넌트를 내보냅니다.
