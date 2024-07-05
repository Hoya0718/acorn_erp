import React, { useState, useEffect } from 'react';
import './Sales.css';
import axios from '../../api/axios';
import InventoryTable from './InventoryTable';

const InventoryMgmt = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    itemQty: '',
    stockOut: '',
    stockQty: '',
  });

  const [items, setItems] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/items'); // /items 엔드포인트로 변경
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
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
      setFormData({
        ...selectedOrders[0],
        stockOut: '', // 출고 수량 초기화
        stockQty: selectedOrders[0].itemQty - selectedOrders[0].stockOut, // 재고 수량 계산
      });
    } else {
      alert('하나의 항목만 선택하세요.');
    }
  };

  const handleSave = async () => {
    try {
      if (selectedOrder) {
        const updatedInventory = items.map((item) =>
          item.itemCode === selectedOrder.itemCode ? { ...item, ...formData } : item
        );
        setItems(updatedInventory);
      } else {
        const newInventory = { ...formData, itemCode: Date.now().toString() };
        setItems([newInventory, ...items]);
      }
      setIsFormVisible(false);
      clearFormData();
      setSelectedOrders([]);
    } catch (error) {
      console.error('Error saving inventory item:', error);
    }
  };

  const clearFormData = () => {
    setFormData({
      itemCode: '',
      itemName: '',
      itemQty: '',
      stockOut: '',
      stockQty: '',
    });
    setSelectedOrder(null);
  };

  const handleInputChange = (itemCode, newStockOut) => {
    setSelectedOrders((prevSelectedOrders) =>
      prevSelectedOrders.map((order) =>
        order.itemCode === itemCode ? { ...order, stockOut: newStockOut } : order
      )
    );
  };

  const handleDeleteClick = async () => {
    if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
      try {
        const itemCodes = selectedOrders.map((order) => order.itemCode);
        await Promise.all(itemCodes.map((itemCode) => axios.delete(`/items/${itemCode}`))); // /items/${itemCode} 엔드포인트로 변경
        setItems(items.filter((item) => !itemCodes.includes(item.itemCode)));
        setSelectedOrders([]);
      } catch (error) {
        console.error('Error deleting orders:', error);
      }
    }
  };

  const handleFormSubmitInternal = async (item) => {
    try {
      // 선택된 아이템들의 정보를 인벤토리 데이터베이스에 저장하는 로직 추가
      await axios.put(`/items/${item.itemCode}`, item); // /items/${item.itemCode} 엔드포인트로 변경
    } catch (error) {
      console.error('Error saving inventory item:', error);
    }
  };

  return (
    <div>
      <div className="Middle classification">
        <h4>상품 재고 관리</h4>
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
          <label htmlFor="date">
            날짜를 선택하세요 :
            <input type="date" id="date" max="2077-06-20" min="2077-06-05" value="2024-07-18" />
          </label>
        </div>

        <div className="right">
          <input type="text" placeholder="🔍 검색" />
          <button>조회</button>
        </div>
      </div>
      <br />
      <div>
        <section>
          <InventoryTable
            isFormVisible={isFormVisible}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            items={items} // 인벤토리 아이템 데이터 전달
            selectedOrder={selectedOrder}
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
            handleFormSubmitInternal={handleFormSubmitInternal}
          />
        </section>
      </div>

      <div className="excel-print">
        <button>엑셀 다운</button>
        <button>인쇄</button>
      </div>
    </div>
  );
};

export default InventoryMgmt;
