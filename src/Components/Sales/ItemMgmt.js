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
    itemQty: ''
  });

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/items');
      const fetchedItems = response.data;
      const sortedItems = fetchedItems.sort((a, b) => new Date(b.itemCode) - new Date(a.itemCode));
      setItems(sortedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddButtonClick = () => {
    setIsFormVisible(true);
    setSelectedItem(null); 
    clearFormData();
  };

  const handleSave = async () => {
    try {
      let response = null;
      if (selectedItem) {
        response = await axios.put(`/items/${selectedItem.itemCode}`, formData);
      } else {
        response = await axios.post('/items', formData);
      }
      const updatedItem = response.data;

      const updatedItems = [...items];
      if (selectedItem) {
        const index = updatedItems.findIndex(item => item.itemCode === selectedItem.itemCode);
        if (index !== -1) {
          updatedItems[index] = { ...updatedItem };
        }
      } else {
        updatedItems.unshift(updatedItem);
      }
      setItems(updatedItems);

      handleSaveSuccess();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleSaveSuccess = () => {
    setIsFormVisible(false);
    clearFormData();
    setSelectedItems([]);
  };

  const clearFormData = () => {
    setFormData({
      itemCode: '',
      itemType: '',
      itemName: '',
      itemStatus: '',
      itemPrice: '',
      itemQty: ''
    });
    setSelectedItem(null); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  //삭제 기능
  const handleDeleteClick = async () => {
    if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
      try {
        const itemCodes = selectedItems.map(item => item.itemCode);
        await Promise.all(itemCodes.map(itemCode => axios.delete(`/items/${itemCode}`)));
        fetchItems();
        setSelectedItems([]);
      } catch (error) {
        console.error('주문 삭제 중 오류 발생:', error);
      }
    }
  };

  const handleUpdateButtonClick = () => {
    if (selectedItems.length === 1) {
      setIsFormVisible(true);
      setSelectedItem(selectedItems[0]);
      setFormData(selectedItems[0]);
    } else {
      alert("하나의 항목만 선택하세요.");
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
            handleFormSubmit={handleSave}
            items={items}
            selectedItem={selectedItem}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            setIsFormVisible={setIsFormVisible}
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
