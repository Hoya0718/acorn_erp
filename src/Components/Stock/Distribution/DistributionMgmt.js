import React, { useState } from 'react';
import DistributionDelete from './DistributionDelete';
import DistributionAdd from './DistributionAdd';
import DistributionUpdate from './DistributionUpdate';
import "../../Main/Main.css";
import "./Distribution.css";

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

    const [items, setItems] = useState([
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
    const [checkAll, setCheckAll] = useState(false);

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
        alert("삭제 완료했습니다.");
        const updatedItems = items.filter(item => !selectedItems.includes(item.id));
        setItems(updatedItems);
        setDeletedItems([...deletedItems, ...selectedItems]);
        setSelectedItems([]);
    };

    const handleInputChange = (event, itemId, field) => {
        const { value } = event.target;
        const updatedItems = items.map(item => {
            if (item.id === itemId) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const handleRegisterClick = () => {
        const newId = items.length + 1;
        setItems([...items, { ...newItem, id: newId }]);
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

    const handleAddDistribution = (newDistribution) => {
        const newId = items.length + 1;
        setItems([...items, { ...newDistribution, id: newId }]);
    };

    const handleEditClick = (itemId) => {
        setEditingItemId(itemId);
    };

    const handleSaveClick = (itemId) => {
        setEditingItemId(null);
    };

    return (
        <div>
            <div className="Middle classification">
                <span><h2>물류관리</h2></span>
            </div>
            <hr />
            <div className="top-buttons">
                <span><button className='btn1' onClick={handleCancelClick}>취소</button></span>
                <span><button onClick={toggleNewItemForm}>등록</button></span>
                <span><button onClick={() => handleEditClick(selectedItems[0])} disabled={selectedItems.length !== 1}>수정</button></span>
                <span><DistributionDelete handleDeleteClick={handleDeleteClick} selectedItems={selectedItems} /></span>
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
                <table className='distribution-table'>
                    <thead>
                        <tr>
                            <th><input type="checkbox" onChange={() => {}} disabled /></th>
                            <th>품목코드</th>
                            <th>품목이름</th>
                            <th>입고일자</th>
                            <th>입고수량</th>
                            <th>기초재고</th>
                            <th>출고수량</th>
                            <th>집계재고</th>
                            <th>입고예정일</th>
                            {showNewItemForm && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {showNewItemForm && 
                            <DistributionAdd
                                onAddDistribution={handleAddDistribution}
                                handleCancelClick={handleCancelClick}
                            />
                        }
                        {items.map(item => (
                            <tr key={item.id}>
                                <td><input type="checkbox" onChange={() => handleCheckboxChange(item.id)} checked={selectedItems.includes(item.id)} /></td>
                                {editingItemId === item.id ? (
                                    <DistributionUpdate 
                                        item={item}
                                        handleInputChange={handleInputChange}
                                        handleSaveClick={handleSaveClick}
                                    />
                                ) : (
                                    <>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
                                        <td>{item.entryDate}</td>
                                        <td>{item.entryQuantity}</td>
                                        <td>{item.initialStock}</td>
                                        <td>{item.exitQuantity}</td>
                                        <td>{item.totalStock}</td>
                                        <td>{item.plannedEntryDate}</td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <div className="bottom-buttons">
                <span><button>엑셀다운</button></span>
                <span><button>인쇄</button></span>
            </div>
        </div>
    );
};

export default DistributionMgmt;