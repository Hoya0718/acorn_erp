import React, { useState, useEffect } from 'react';
import './Sales.css';
import { Link, useLocation } from 'react-router-dom';
import OrderTable from './OrderTable';
import axios from '../../api/axios';

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

  useEffect(() => {
    fetchOrders();
    setSelectedLink(location.pathname);
  }, [location.pathname]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddButtonClick = () => {
    setIsFormVisible(true);
    setSelectedOrder(null); 
    clearFormData();
  };

  const handleSave = () => {
    setIsFormVisible(false);
    clearFormData();
    setSelectedOrders([]);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
      handleSave();
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemName) newErrors.itemName = '상품명을 입력하세요.';
    if (!formData.customerName) newErrors.customerName = '고객명을 입력하세요.';
    if (!formData.customerTel) newErrors.customerTel = '연락처를 입력하세요.';
    if (!formData.itemQty || isNaN(formData.itemQty) || parseInt(formData.itemQty) <= 0) newErrors.itemQty = '유효한 수량을 입력하세요.';
    if (!formData.orderPrice || isNaN(formData.orderPrice) || parseFloat(formData.orderPrice) <= 0) newErrors.orderPrice = '유효한 단가를 입력하세요.';
    if (!formData.orderDate) newErrors.orderDate = '주문 날짜를 선택하세요.';
    if (!formData.orderStatus) newErrors.orderStatus = '주문 상태를 입력하세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLinkClick = (path) => {
    setSelectedLink(path);
  };

  return (
    <div className="Orders">
      <div className="Middle classification">
        <h4> 주문 관리 </h4>
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

      <div className="items-subTitle">
        <span>
          <button onClick={handleAddButtonClick}>등록</button>
        </span>
      </div>

      <div className="searcher">
        <div className="left">
          <label htmlFor="date">날짜를 선택하세요 :
            <input type="date" id="date" max="2077-06-20" min="2077-06-05" defaultValue="2024-07-18" />
          </label>
        </div>
        <div className="right">
          <input type="text" placeholder='🔍 검색' /><button>조회</button>
        </div>
      </div>
      <br />
      <div>
        <section>
          <OrderTable 
            isFormVisible={isFormVisible}
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            orders={orders}
            selectedOrder={selectedOrder}
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
            setIsFormVisible={setIsFormVisible}
            errors={errors} // 오류 메시지를 OrderTable에 전달
          />
        </section>
      </div>

      <div className="excel-print">
        <button>엑셀 다운</button>
        <button>인쇄</button>
      </div>
    </div>
  );
}

export default OrderMgmt;
