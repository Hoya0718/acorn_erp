import React, { useState } from 'react';
import DistributionDelete from './DistributionDelete';
import DistributionAdd from './DistributionAdd';
import DistributionUpdate from './DistributionUpdate';
import DistributionSearch from './DistributionSearch';
import DistributionSearchDate from './DistributionSearchDate';

import "../../Main/Main.css";
import "./Distribution.css";

const DistributionMgmt = () => {
    // 초기 새 항목 상태
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

    // 상태 변수들
    const [items, setItems] = useState([  // 전체 아이템 목록
        { id: 1, code: '12345', name: '케이크', entryDate: '2024-06-06', entryQuantity: 3, initialStock: 1, exitQuantity: 0, totalStock: 4, plannedEntryDate: '2024-06-10' },
        { id: 2, code: '12346', name: '파이', entryDate: '2024-06-08', entryQuantity: 3, initialStock: 1, exitQuantity: 0, totalStock: 4, plannedEntryDate: '2024-06-13' },
        { id: 3, code: '12347', name: '빵', entryDate: '2024-06-13', entryQuantity: 3, initialStock: 1, exitQuantity: 0, totalStock: 4, plannedEntryDate: '2024-06-15' },
        { id: 4, code: '12348', name: '케이크', entryDate: '2024-06-05', entryQuantity: 3, initialStock: 1, exitQuantity: 0, totalStock: 4, plannedEntryDate: '2024-0-08' },
    ]);
    const [selectedItems, setSelectedItems] = useState([]);  // 선택된 아이템들
    const [deletedItems, setDeletedItems] = useState([]);    // 삭제된 아이템들
    const [showNewItemForm, setShowNewItemForm] = useState(false);  // 새 항목 등록 폼 보이기/감추기
    const [newItem, setNewItem] = useState(initialNewItemState);  // 새 항목
    const [editingItemId, setEditingItemId] = useState(null);  // 수정 중인 항목 ID
    const [checkAll, setCheckAll] = useState(false);  // 전체 선택 여부
    const [searchTerm, setSearchTerm] = useState('');  // 검색어
    const [filteredItems, setFilteredItems] = useState([]);  // 필터링된 결과
    const [sortOption, setSortOption] = useState("");  // 정렬 옵션
    const [startDate, setStartDate] = useState("");  // 시작 날짜
    const [endDate, setEndDate] = useState("");  // 종료 날짜

    // 체크박스 변경 처리
    const handleCheckboxChange = (itemId) => {
        const selectedIndex = selectedItems.indexOf(itemId);
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, itemId]);
        } else {
            const updatedItems = selectedItems.filter(item => item !== itemId);
            setSelectedItems(updatedItems);
        }
    };

    // 삭제 버튼 클릭 처리
    const handleDeleteClick = () => {
        if (selectedItems.length > 0) {
            const confirmDelete = window.confirm("선택된 항목을 삭제하시겠습니까?");
            if (confirmDelete) {
                handleConfirmDelete();
            }
        }
    };

    // 삭제 확인 처리
    const handleConfirmDelete = () => {
        alert("삭제 완료했습니다.");
        const updatedItems = items.filter(item => !selectedItems.includes(item.id));
        setItems(updatedItems);
        setDeletedItems([...deletedItems, ...selectedItems]);
        setSelectedItems([]);
    };

    // 입력 값 변경 처리
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

    // 등록 버튼 클릭 처리
    const handleRegisterClick = () => {
        const newId = items.length + 1;
        setItems([...items, { ...newItem, id: newId }]);
        setNewItem(initialNewItemState);
        setShowNewItemForm(false);
    };

    // 취소 버튼 클릭 처리
    const handleCancelClick = () => {
        setNewItem(initialNewItemState);
        setShowNewItemForm(false);
    };

    // 새 항목 등록 폼 토글
    const toggleNewItemForm = () => {
        setShowNewItemForm(!showNewItemForm);
    };

    // 새로운 물류 추가 처리
    const handleAddDistribution = (newDistribution) => {
        const newId = items.length + 1;
        setItems([...items, { ...newDistribution, id: newId }]);
    };

    // 수정 버튼 클릭 처리
    const handleEditClick = (itemId) => {
        setEditingItemId(itemId);
    };

    // 저장 버튼 클릭 처리
    const handleSaveClick = (itemId) => {
        setEditingItemId(null);
    };

    // 검색어 변경 처리
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 검색 버튼 클릭 처리
    const handleSearchClick = () => {
        // 검색어로 필터링된 결과를 업데이트
        const filteredItems = items.filter(item =>
            item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filteredItems);
    };

    // 정렬 옵션 변경 처리
    const handleSortChange = (event) => {
        const selectedOption = event.target.value;
        setSortOption(selectedOption);

        // 선택한 옵션에 따라 정렬된 배열 생성
        let sortedItems = [...items];
        if (selectedOption === "품목코드") {
            sortedItems.sort((a, b) => (a.code > b.code) ? 1 : -1);
        } else if (selectedOption === "품목이름") {
            sortedItems.sort((a, b) => (a.name > b.name) ? 1 : -1);
        } else if (selectedOption === "입고일자") {
            sortedItems.sort((a, b) => (a.entryDate > b.entryDate) ? 1 : -1);
        }

        setItems(sortedItems);
    };

    // 시작 날짜 변경 처리
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    // 종료 날짜 변경 처리
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    // 선택한 날짜 범위에 따라 필터링된 아이템
    const filteredByDateItems = items.filter(item => {
        if (startDate && endDate) {
            const entryDate = new Date(item.entryDate);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return entryDate >= start && entryDate <= end;
        }
        return true;
    });

    // 렌더링할 아이템 배열 선택
    const itemsToRender = filteredItems.length > 0 ? filteredItems : filteredByDateItems.length > 0 ? filteredByDateItems : items;

    return (
        <div>
            {/* 제목 영역 */}
            <div className="Middle classification">
                <span><h2>물류관리</h2></span>
            </div>
            <hr />

            {/* 상단 버튼 영역 */}
            <div className="top-buttons">
                <span><button className='btn1' onClick={handleCancelClick}>취소</button></span>
                <span><button onClick={toggleNewItemForm}>등록</button></span>
                <span><button onClick={() => handleEditClick(selectedItems[0])} disabled={selectedItems.length === 0}>수정</button></span>
                <span><DistributionDelete handleDeleteClick={handleDeleteClick} selectedItems={selectedItems} /></span>
            </div>
            <br />

            {/* 검색 및 정렬 영역 */}
            <div className="searcher">
                <div className="left">
                    <div className="middle-buttons">
                        {/* 날짜 검색 컴포넌트 */}
                        <DistributionSearchDate
                            startDate={startDate}
                            endDate={endDate}
                            handleStartDateChange={handleStartDateChange}
                            handleEndDateChange={handleEndDateChange}
                        />
                        {/* 정렬 옵션 선택 */}
                        <label>
                            <select onChange={handleSortChange} value={sortOption}>
                                <option value="품목코드">품목코드</option>
                                <option value="품목이름">품목이름</option>
                                <option value="입고일자">입고일자</option>
                            </select>
                        </label>
                    </div>
                </div>
                {/* 검색 입력란 */}
                <DistributionSearch
                    handleSearchChange={handleSearchChange}
                    handleSearchClick={handleSearchClick}
                />
            </div>

            {/* 테이블 영역 */}
            <section className="distribution-table-container">
                <table className='distribution-table'>
                    <thead>
                        <tr>
                            <th><input type="checkbox" onChange={() => { }} disabled /></th>
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
                        {/* 새 항목 등록 폼 */}
                        {showNewItemForm &&
                            <DistributionAdd
                                onAddDistribution={handleAddDistribution}
                                handleCancelClick={handleCancelClick}
                            />
                        }
                        {/* 물류 테이블 데이터 */}
                        {itemsToRender.map(item => (
                            <tr key={item.id}>
                                <td><input type="checkbox" onChange={() => handleCheckboxChange(item.id)} checked={selectedItems.includes(item.id)} /></td>
                                {/* 수정 중인 항목 */}
                                {editingItemId === item.id ? (
                                    <DistributionUpdate
                                        item={item}
                                        handleInputChange={handleInputChange}
                                        handleSaveClick={handleSaveClick}
                                    />
                                ) : (
                                    // 일반 데이터 표시
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

            {/* 하단 버튼 영역 */}
            <div className="bottom-buttons">
                <span><button>엑셀다운</button></span>
                <span><button>인쇄</button></span>
            </div>
        </div>
    );
};

export default DistributionMgmt;