import React, { useState, useEffect } from 'react';
import './Sales.css';
import { Link, useLocation } from 'react-router-dom';
import OrderTable from './OrderTable';
import axios from '../../api/axios';  // axios 인스턴스 사용
import * as XLSX from 'xlsx';
import { GrDocumentUpload } from "react-icons/gr";
import { HiPrinter } from "react-icons/hi2";
import SalesDateComponent from './SalesDateComponent';

const OrderMgmt = () => {
  const location = useLocation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    orderNum: '',
    itemName: '',
    customerName: '',
    customerTel: '',
    itemQty: '',
    orderPrice: '',
    orderDate: '',
    orderStatus: ''
  });

  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedLink, setSelectedLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // 페이징네이션 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;  // 한 페이지에 표시할 항목 수

  const fetchOrders = async (page = 1) => {
    console.log('주문을 가져오는 중...');
    setLoading(true);
    try {
      const response = await axios.get(`/orders/paged?page=${page - 1}&size=${itemsPerPage}`); // 페이지 번호를 0부터 시작하도록 수정하고 size 추가
      console.log('주문 가져오기 완료:', response.data);
      setOrders(response.data.content); // 'content'로 수정
      setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
    } catch (error) {
      console.error('주문 가져오기 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setSelectedLink(location.pathname);
  }, [location.pathname]);

  const handleAddButtonClick = () => {
    setIsFormVisible(true);
    setSelectedOrder(null);
    clearFormData();
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      if (selectedOrder) {
        const response = await axios.put(`/orders/${selectedOrder.orderNum}`, formData);
        const updatedOrders = orders.map(order => 
          order.orderNum === selectedOrder.orderNum ? response.data : order
        );
        setOrders(updatedOrders);
      } else {
        const totalPrice = parseFloat(formData.orderPrice) * parseInt(formData.itemQty);
        const newOrder = { ...formData, orderTotalPrice: totalPrice };
        const response = await axios.post('/orders', newOrder);
        setOrders([response.data, ...orders]);
      }
      handleSaveSuccess();
    } catch (error) {
      console.error('주문 제출 오류:', error);
    }
  };

  const handleSaveSuccess = () => {
    setIsFormVisible(false);
    clearFormData();
    setSelectedOrders([]);
    fetchOrders(currentPage);  // 새로고침하여 등록된 데이터 포함
  };

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
    setErrors({});
    setSelectedOrder(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdateButtonClick = () => {
    if (selectedOrders.length === 1) {
      setIsFormVisible(true);
      setSelectedOrder(selectedOrders[0]);
      setFormData({
        ...selectedOrders[0],
        orderDate: selectedOrders[0].orderDate.substring(0, 16)
      });
    } else {
      alert("하나의 항목만 선택하세요.");
    }
  };

  const handleCancelButtonClick = () => {
    setIsFormVisible(false);
    clearFormData();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemName) newErrors.itemName = '상품명을 입력하세요.';
    if (!formData.customerName) newErrors.customerName = '고객명을 입력하세요.';
    if (!formData.customerTel) newErrors.customerTel = '연락처를 입력하세요.';
    if (!formData.itemQty || isNaN(formData.itemQty) || parseInt(formData.itemQty) <= 0) newErrors.itemQty = '수량을 입력하세요.';
    if (!formData.orderPrice || isNaN(formData.orderPrice) || parseFloat(formData.orderPrice) <= 0) newErrors.orderPrice = '단가를 입력하세요.';
    if (!formData.orderDate) newErrors.orderDate = '주문 날짜를 선택하세요.';
    if (!formData.orderStatus) newErrors.orderStatus = '주문 상태를 입력하세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLinkClick = (path) => {
    setSelectedLink(path);
  };

  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const filterOrdersByDate = (orders, startDate, endDate) => {
    if (!startDate || !endDate) return orders;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // 종료 날짜를 포함하도록 조정

    return orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= start && orderDate <= end;
    });
  };

  const filteredOrders = filterOrdersByDate(orders, startDate, endDate).filter(order => {
    return (
      order.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    const pageGroup = Math.ceil(currentPage / 5);
    const lastPage = pageNumbers.length;
    const startPage = (pageGroup - 1) * 5 + 1;
    const endPage = Math.min(pageGroup * 5, lastPage);
  
    return (
      <nav aria-label="Page navigation example" style={{ marginTop: '50px' }}>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => setCurrentPage(Math.max(1, startPage - 5))} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pageNumbers.slice(startPage - 1, endPage).map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a onClick={() => setCurrentPage(number)} href="#" className="page-link">
                {number}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => setCurrentPage(Math.min(lastPage, endPage + 1))} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  };

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
      <br />

      <div className="searcher">
        <SalesDateComponent onChange={handleDateChange} />
        <div className="right">
          <input 
            type="text" 
            placeholder='🔍 이름/상품명 검색' 
            value={searchTerm} 
            onChange={handleSearchInputChange} 
          />
          <button onClick={() => fetchOrders(currentPage)}>조회</button>
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
            </>
          )}
        </span>
      </div>
      <div>
        <section>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <OrderTable 
              isFormVisible={isFormVisible}
              formData={formData}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleSave}
              orders={filteredOrders}
              selectedOrder={selectedOrder}
              selectedOrders={selectedOrders}
              setSelectedOrders={setSelectedOrders}
              setIsFormVisible={setIsFormVisible}
              errors={errors}
            />
          )}
        </section>
      </div>
      {renderPagination()}
      <div className="excel-print">
        <button onClick={handleExcelDownload}><GrDocumentUpload size={16}/> 엑셀 다운</button>
        <button onClick={handlePrint}><HiPrinter size={16}/> 인쇄</button>
      </div>
    </div>
  );
}

export default OrderMgmt;
