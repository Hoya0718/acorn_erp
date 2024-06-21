import React, { useState } from 'react';
import DistributionTable from './distributiontable';
import "../../Main/Main.css";
import "./distribution.css";

const DistributionMgmt = () => {
    const initialNewItemState = {
        id: null,
        code: '',
        name: '',
        entryDate: '',
        entryQuantity: '',
        initialStock: '',
        exitQuantity: '',
        totalStock: '',
        plannedEntryDate: ''
    };

    const [Items, setItems] = useState([
        { id: 1, code: '12345', name: '케이크', entryDate: '2024.01.01', entryQuantity: 3, initialStock: 1, exitQuantity: 0, totalStock: 4, plannedEntryDate: '2024.01.08' },
        { id: 2, code: '12346', name: '파이', entryDate: '2024.01.01', entryQuantity: 3, initialStock: 1, exitQuantity: 0, totalStock: 4, plannedEntryDate: '2024.01.08' },
        { id: 3, code: '12347', name: '빵', entryDate: '2024.01.01', entryQuantity: 3, initialStock: 1, exitQuantity: 0, totalStock: 4, plannedEntryDate: '2024.01.08' },
        { id: 4, code: '12348', name: '케이크', entryDate: '2024.01.01', entryQuantity: 3, initialStock: 1, exitQuantity: 0, totalStock: 4, plannedEntryDate: '2024.01.08' },
    ]);

    const [selectedItems, setSelectedItems] = useState([]);
    const [deletedItems, setDeletedItems] = useState([]);
    const [showNewItemForm, setShowNewItemForm] = useState(false);
    const [newItem, setNewItem] = useState(initialNewItemState);
    const [editingItemId, setEditingItemId] = useState(null);

    const handleCheckboxChange = (itemId) => {
        const selectedIndex = selectedItems.indexOf(itemId);
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, itemId]);
        } else {
            const updatedItems = selectedItems.filter(item => item !== itemId);
            setSelectedItems(updatedItems);
        }
    };

    const handleDeleteClick = () => {
        if (selectedItems.length > 0) {
            const confirmDelete = window.confirm("선택된 항목을 삭제하시겠습니까?");
            if (confirmDelete) {
                handleConfirmDelete();
            }
        }
    };

    const handleConfirmDelete = () => {
        alert("삭제완료 했습니다.");
        const updatedItems = Items.filter(item => !selectedItems.includes(item.id));
        setItems(updatedItems);
        setDeletedItems([...deletedItems, ...selectedItems]);
        setSelectedItems([]);
    };

    const handleInputChange = (event, itemId, field) => {
        const { value } = event.target;
    
        // `Items` 배열에서 수정할 항목을 찾아 해당 필드를 업데이트
        const updatedItems = Items.map(item => {
            if (item.id === itemId) {
                return { ...item, [field]: value };
            }
            return item;
        });
    
        // 수정된 항목들로 상태 업데이트
        setItems(updatedItems);
    };

    const handleRegisterClick = () => {
        const newId = Items.length + 1;
        setItems([...Items, { ...newItem, id: newId }]);
        setNewItem(initialNewItemState);
        setShowNewItemForm(false);
    };

    const handleCancelClick = () => {
        setNewItem(initialNewItemState);
        setShowNewItemForm(false);
    };

    const toggleNewItemForm = () => {
        setShowNewItemForm(!showNewItemForm);
    };

    const handleEditClick = (itemId) => {
        setEditingItemId(itemId);
    };

    const handleSaveClick = (itemId) => {
        setEditingItemId(null); // 수정 완료 후 편집 상태 해제
        // 필요에 따라 저장 후 추가 작업 수행 가능
    };

    return (
        <div>
            <div className="Middle classification">
                <span> <h2>물류관리</h2> </span>
            </div>
    
            <hr />
    
            <div className="top-buttons">
                <span><button onClick={toggleNewItemForm}>등록</button></span>
                <span><button onClick={() => handleEditClick(selectedItems[0])} disabled={selectedItems.length === 0}>수정</button></span>
                <span><button onClick={handleDeleteClick} disabled={selectedItems.length === 0}>삭제</button></span>
            </div>
    
            <br />
    
            <div className="searcher">
                <div className="left">
                    <div className="middle-buttons">
                        <label htmlFor="date">
                            <input type="date" id="date" max="2077-06-20" min="2077-06-05" defaultValue="2024-07-18" />
                        </label>
                        <label>
                            <select>
                                <option value="">거래처 코드</option>
                                <option value="">거래처 명</option>
                                <option value="">거래처 번호</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="right">
                    <div className="middle-buttons">
                        <input type="text" placeholder='🔍︎검색' /><button>조회</button>
                    </div>
                </div>
            </div>
    
            <section className="distribution-table-container">
                <DistributionTable
                    items={Items}
                    selectedItems={selectedItems}
                    showNewItemForm={showNewItemForm}
                    handleCheckboxChange={handleCheckboxChange}
                    handleRegisterClick={handleRegisterClick}
                    handleInputChange={handleInputChange}
                    newItem={newItem}
                    handleCancelClick={handleCancelClick}
                    handleEditClick={handleEditClick}
                    handleSaveClick={handleSaveClick}
                    editingItemId={editingItemId}
                />
            </section>
    
            <div className="bottom-buttons">
                <span><button>엑셀다운</button></span>
                <span><button>인쇄</button></span>
            </div>
        </div>
    );
}

export default DistributionMgmt;