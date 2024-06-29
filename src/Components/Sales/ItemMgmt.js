import React, { useState, useEffect } from 'react';
import './Sales.css';
import axios from '../../api/axios';
import ItemTable from './ItemTable';

const ItemMgmt = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    itemCode: '',
    itemType: '',
    itemName: '',
    itemStatus: '',
    itemPrice: '',
    itemQuantity: ''
  });
  
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/items');
      const fetchedOrders = response.data;
      const sortedOrders = fetchedOrders.sort((a, b) => new Date(b.itemCode) - new Date(a.itemCode));
      setOrders(sortedOrders);
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

  const handleUpdateButtonClick = () => {
    if (selectedOrders.length === 1) {
      setIsFormVisible(true);
      setSelectedOrder(selectedOrders[0]);
      setFormData(selectedOrders[0]);
    } else {
      alert("하나의 항목만 선택하세요.");
    }
  };

  const handleSave = () => {
    setIsFormVisible(false);
    clearFormData();
    setSelectedOrders([]);
  };

  const clearFormData = () => {
    setFormData({
      itemCode: '',
      itemType: '',
      itemName: '',
      itemStatus: '',
      itemPrice: '',
      itemQuantity: ''
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
        const response = await axios.put(`/items/${selectedOrder.itemCode}`, formData);
        const updatedOrders = orders.map(order => 
          order.itemCode === selectedOrder.itemCode ? response.data : order
        );
        setOrders(updatedOrders);
      } else {
        const response = await axios.post('/items', formData);
        setOrders([response.data, ...orders]);
      }
      handleSave();
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const validateForm = () => {
    return formData.itemType.trim() !== '' &&
           formData.itemName.trim() !== '' &&
           formData.itemStatus.trim() !== '' &&
           formData.itemPrice !== '' &&
           formData.itemQuantity !== '';
  };

  const handleDeleteClick = async () => {
    if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
      try {
        const itemCodes = selectedOrders.map(order => order.itemCode);
        await Promise.all(itemCodes.map(itemCode => axios.delete(`/items/${itemCode}`)));
        fetchOrders();
        setSelectedOrders([]);
      } catch (error) {
        console.error('주문 삭제 중 오류 발생:', error);
      }
    }
  };

  return (
    <div>
      <div className="Middle classification">
        <h4>상품 관리</h4>
      </div>
      <hr />
      <div className="items-subTitle">
        <span>
          {isFormVisible ? (
            <button onClick={handleSave}>저장</button>
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
      <div className="searcher">
        <div className="left">
          <label htmlFor="date">날짜를 선택하세요 :
            <input type="date" id="date" max="2077-06-20" min="2077-06-05" value="2024-07-18" />
          </label>
        </div>
        <div className="right">
          <input type="text" placeholder='🔍 검색' /><button>조회</button>
        </div>
      </div>
      <br />
      <div>
        <section>
          <ItemTable
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
        <button>엑셀 다운로드</button>
        <button>인쇄</button>
      </div>
    </div>
  );
};

export default ItemMgmt;
