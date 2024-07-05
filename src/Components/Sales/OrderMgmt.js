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
    quantity: '',
    totalPrice: '',
    orderDate: '',
    orderStatus: ''
  });
  
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
      const fetchedOrders = response.data;
      const sortedOrders = fetchedOrders.map(order => ({
        ...order,
        item_qty: parseInt(order.item_qty, 10), // item_qty를 정수로 변환
        order_total_price: parseFloat(order.order_total_price) // order_total_price를 부동 소수점 숫자로 변환
      }));
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
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
      quantity: '',
      totalPrice: '',
      orderDate: '',
      orderStatus: ''
    });
    setSelectedOrder(null); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (selectedOrder) {
        const response = await axios.put(`/orders/${selectedOrder.orderNum}`, formData);
        const updatedOrders = orders.map(order => 
          order.orderNum === selectedOrder.orderNum ? response.data : order
        );
        setOrders(updatedOrders);
      } else {
        const response = await axios.post('/orders', formData);
        setOrders([response.data, ...orders]);
      }
      handleSave();
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const validateForm = () => {
    return formData.orderNum !== '' &&
           formData.itemName !== '' &&
           formData.customerName !== '' &&
           formData.customerTel !== '' &&
           formData.quantity !== '' &&
           formData.totalPrice !== '' &&
           formData.orderDate !== '' &&
           formData.orderStatus !== '';
  };

  const handleDeleteClick = async () => {
    if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
      try {
        const orderNums = selectedOrders.map(order => order.orderNum);
        await Promise.all(orderNums.map(orderNum => axios.delete(`/orders/${orderNum}`)));
        fetchOrders();
        setSelectedOrders([]);
      } catch (error) {
        console.error('주문 삭제 중 오류 발생:', error);
      }
    }
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
            onClick={() => handleLinkClick('/slayout/alesMgmt/return')}>
            <Link to="/layout/salesMgmt/return">취소 주문서 조회</Link>
          </button>
        </span>
      </div>
      <br />

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
