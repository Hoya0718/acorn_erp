import React, { useState, useEffect } from 'react';
import './Sales.css';
import axios from '../../api/axios';
import ItemTable from './ItemTable';
import * as XLSX from 'xlsx';
import { GrDocumentUpload } from "react-icons/gr";
import { HiPrinter } from "react-icons/hi2";

const ItemMgmt = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    itemCode: '',
    itemType: '',
    itemName: '',
    itemStatus: '',
    itemPrice: '',
    itemQty: '',
    stockOut: 0,
    stockQty: ''
  });

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // 페이지네이션 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 표시할 항목 수

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const fetchItems = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`/items/paged?page=${page - 1}&size=${itemsPerPage}`);
      setItems(response.data.content); // 'content'로 수정
      setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
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
    if (!validateForm()) return;

    try {
      let response;
      if (selectedItem) {
        response = await axios.put(`/items/${selectedItem.itemCode}`, formData);
      } else {
        response = await axios.post('/items', formData);
      }

      const updatedItem = response.data;
      if (selectedItem) {
        const updatedItems = items.map(item => 
          item.itemCode === updatedItem.itemCode ? updatedItem : item
        );
        setItems(updatedItems);
      } else {
        setItems([updatedItem, ...items]);
      }

      handleSaveSuccess();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemType) newErrors.itemType = '구분을 선택하세요.';
    if (!formData.itemStatus) newErrors.itemStatus = '판매상태를 선택하세요.';
    if (!formData.itemName) newErrors.itemName = '상품명을 입력하세요.';
    if (!formData.itemQty || isNaN(formData.itemQty) || parseInt(formData.itemQty) <= 0) newErrors.itemQty = '수량을 입력하세요.';
    if (!formData.itemPrice || isNaN(formData.itemPrice) || parseFloat(formData.itemPrice) <= 0) newErrors.itemPrice = '단가를 입력하세요.';
    
    if (selectedItem && (!formData.stockOut || isNaN(formData.stockOut) || parseFloat(formData.stockOut) < 0)) {
      newErrors.stockOut = '출고 수량을 입력하세요.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveSuccess = () => {
    setIsFormVisible(false);
    clearFormData();
    setSelectedItems([]);
    fetchItems(currentPage);
  };

  const clearFormData = () => {
    setFormData({
      itemCode: '',
      itemType: '',
      itemName: '',
      itemStatus: '',
      itemPrice: '',
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
        const itemCodes = selectedItems.map(item => item.itemCode);
        await Promise.all(itemCodes.map(itemCode => axios.delete(`/items/${itemCode}`)));
        fetchItems(currentPage);
        setSelectedItems([]);
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
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

  const handleCancelButtonClick = () => {
    setIsFormVisible(false);
    clearFormData();
    setSelectedItems([]);
  };

  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(items);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Items");
    XLSX.writeFile(workbook, "items.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(item => 
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onChange={handleSearchInputChange} 
          />
          <button onClick={() => fetchItems(currentPage)}>조회 &gt;</button>
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
            items={filteredItems} 
            selectedItem={selectedItem}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            setIsFormVisible={setIsFormVisible}
          />
        </section>
      </div>
      {renderPagination()}
      <div className="excel-print">
        <button onClick={handleExcelDownload}><GrDocumentUpload size={16}/> 엑셀 다운</button>
        <button onClick={handlePrint}><HiPrinter size={16}/> 인쇄</button>
      </div>
    </div>
  );
};

export default ItemMgmt;
