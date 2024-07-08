import React, { useState, useEffect } from 'react';
import './Sales.css';
import axios from '../../api/axios';
import InventoryTable from './InventoryTable';
import ItemMgmtButtons from './ItemMgmtButtons';

const InventoryMgmt = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    itemQty: '',
    stockOut: '',
    stockQty: ''
  });

  const [inventory, setInventory] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/inventory');
      const fetchedInventory = response.data;
      const sortedInventory = fetchedInventory.sort((a, b) => b.no - a.no);
      setInventory(sortedInventory);
    } catch (error) {
      console.error('Error fetching inventory:', error);
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
        response = await axios.put(`/inventory/${selectedItem.no}`, formData);
      } else {
        response = await axios.post('/inventory', formData);
      }
      const updatedItem = response.data;

      const updatedInventory = [...inventory];
      if (selectedItem) {
        const index = updatedInventory.findIndex(item => item.no === selectedItem.no);
        if (index !== -1) {
          updatedInventory[index] = updatedItem;
        }
      } else {
        updatedInventory.unshift(updatedItem);
      }
      setInventory(updatedInventory);

      handleSaveSuccess();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleSaveSuccess = () => {
    setIsFormVisible(false);
    clearFormData();
    setSelectedInventory([]);
  };

  const clearFormData = () => {
    setFormData({
      itemCode: '',
      itemName: '',
      itemQty: '',
      stockOut: '',
      stockQty: ''
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

  const handleDeleteClick = async () => {
    if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
      try {
        const inventoryNos = selectedInventory.map(inventory => inventory.no);
        await Promise.all(inventoryNos.map(inventoryNo => axios.delete(`/inventory/${inventoryNo}`)));
        fetchInventory();
        setSelectedInventory([]);
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
      }
    }
  };

  const handleUpdateButtonClick = () => {
    if (selectedInventory.length === 1) {
      setIsFormVisible(true);
      setSelectedItem(selectedInventory[0]);
      setFormData(selectedInventory[0]);
    } else {
      alert("하나의 항목만 선택하세요.");
    }
  };

  return (
    <div>
      <div className="Middle classification">
        <h3>상품 재고 관리</h3>
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
      {/* <br /> */}
      <div>
        <section>
          <InventoryTable
            isFormVisible={isFormVisible}
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleSave}
            inventory={inventory}
            selectedItem={selectedItem}
            selectedInventory={selectedInventory}
            setSelectedInventory={setSelectedInventory}
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

export default InventoryMgmt;
