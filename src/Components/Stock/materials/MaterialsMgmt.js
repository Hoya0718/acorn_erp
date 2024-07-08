import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import * as XLSX from 'xlsx'; 

import MaterialsDelete from './MaterialsDelete';
import MaterialsAdd from './MaterialsAdd';
import MaterialsUpdate from './MaterialsUpdate';
import MaterialsSearch from './MaterialsSearch';
import MaterialsSearchDate from './MaterialsSearchDate';

import "../../Main/Main.css";
import "./Materials.css";

const MaterialsMgmt = () => {
    // 초기 상태를 정의
    const initialNewItemState = {
        id: '',
        materialsCode: '',
        materialsName: '',
        receiptDate: '',
        price: '',
        quantity: '',
        vendorCode: ''
    };

    // 상태 변수들
    const [items, setItems] = useState([]); //아이템 목록
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
    const [sortMaterials, setSortMaterials] = useState('asc'); // 정렬 방향 추가

    useEffect(() => {
        fetchItems();
    }, []);

    //백엔드 API에서 배포 항목을 가져와 items 상태를 업데이트, 오류가 발생하면 콘솔에 출력
    const fetchItems = async () => {
        try {
            const response = await axios.get('/materials');
            setItems(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleSelectAll = () => {
        setCheckAll(!checkAll);
        if (!checkAll) {
            setSelectedItems(items.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

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
    const handleDeleteClick = async () => {
        if (selectedItems.length > 0) {
            const confirmDelete = window.confirm("선택된 항목을 삭제하시겠습니까?");
            if (confirmDelete) {
                try {
                    await Promise.all(selectedItems.map(async (itemId) => {
                        await axios.delete(`/distribution/${itemId}`);
                    }));
                    alert("삭제 완료했습니다.");
                    const updatedItems = items.filter(item => !selectedItems.includes(item.id));
                    setItems(updatedItems);
                    setDeletedItems([...deletedItems, ...selectedItems]);
                    setSelectedItems([]);
                } catch (error) {
                    console.error("Error deleting items:", error);
                }
            }
        }
    };

    // 삭제 확인 처리
    const handleConfirmDelete = () => {
        alert("삭제 완료했습니다.");
        const updatedItems = items.filter(item => !selectedItems.includes(item.id));
        setItems(updatedItems);
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
        handleAddMaterials(newItem);
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
    const handleAddMaterials = async (newMaterials) => {
        try {
            const response = await axios.post('/materials', newMaterials);
            setItems([...items, response.data]);
        } catch (error) {
            console.error("Error adding materials:", error);
        }
    };

    // 수정 버튼 클릭 처리
    const handleEditClick = (itemId) => {
        setEditingItemId(itemId);
    };

    // 저장 버튼 클릭 처리
    const handleSaveClick = async (itemId) => {
        const itemToSave = items.find(item => item.id === itemId);
        try {
            await axios.put(`/materials/${itemId}`, itemToSave);
            setEditingItemId(null);
            fetchItems();  // 업데이트된 항목을 다시 불러옵니다.
        } catch (error) {
            console.error("Error saving item:", error);
        }
    };

    // 검색어 변경 처리
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 검색 버튼 클릭 처리
    const handleSearchClick = async () => {
        try {
            const response = await axios.get('http://localhost:9099/api/materials/search', {
                params: {
                    searchTerm: searchTerm
                }
            });
            setFilteredItems(response.data);
        } catch (error) {
            console.error("Error searching items:", error);
        }
    };

    // 정렬 옵션 변경 처리
    const handleSortChange = (selectedField) => {
        const isAsc = sortOption === selectedField && sortMaterials === 'asc';
        setSortOption(selectedField);
        setSortMaterials(isAsc ? 'desc' : 'asc');

        // 정렬된 항목들을 설정
        let sortedItems = [...items];
        sortedItems.sort((a, b) => {
            if (selectedField === 'materialsCode') {
                return isAsc ? a.materialsCode.localeCompare(b.materialsCode) : b.materialsCode.localeCompare(a.materialsCode);
            } else if (selectedField === 'materialsName') {
                return isAsc ? a.materialsName.localeCompare(b.materialsName) : b.materialsName.localeCompare(a.materialsName);
            } else if (selectedField === 'receiptDate') {
                return isAsc ? new Date(a.receiptDate) - new Date(b.receiptDate) : new Date(b.receiptDate) - new Date(a.receiptDate);
            }
            return 0;
        });

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
            const receiptDate = new Date(item.receiptDate);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return receiptDate >= start && receiptDate <= end;
        }
        return true;
    });
    
    // 인쇄 버튼 클릭 처리
    const handlePrintClick = () => {
        window.print();
    };

    // 엑셀 다운로드 버튼 클릭 처리
    const handleExcelDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(items);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Materials");

        // 워크북을 바이너리 형식으로 변환
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Blob을 생성하여 파일을 다운로드
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'materials.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 렌더링할 아이템 배열 선택
    const itemsToRender = filteredItems.length > 0 ? filteredItems : filteredByDateItems.length > 0 ? filteredByDateItems : items;

    return (
        <div>
            {/* 제목 영역 */}
            <div className="Middle classification">
                <span><h2>자재관리</h2></span>
            </div>
            <hr />

            {/* 상단 버튼 영역 */}
            <div className="top-buttons">
                <span><button onClick={toggleNewItemForm}>등록</button></span>
                <span><button onClick={() => handleEditClick(selectedItems[0])} disabled={selectedItems.length === 0}>수정</button></span>
                <span><MaterialsDelete handleDeleteClick={handleDeleteClick} selectedItems={selectedItems} /></span>
            </div>
            <br />

            {/* 검색 및 정렬 영역 */}
            <div className="searcher">
                <div className="left">
                    <div className="middle-buttons">
                        {/* 날짜 검색 컴포넌트 */}
                        <MaterialsSearchDate
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
                <MaterialsSearch
                    handleSearchChange={handleSearchChange}
                    handleSearchClick={handleSearchClick}
                />
            </div>

            {/* 테이블 영역 */}
            <section className="materials-table-container">
                <table className='materials-table'>
                    <thead>
                        <tr>
                            <th><input type="checkbox" onChange={handleSelectAll} checked={checkAll} /></th>
                            <th onClick={() => handleSortChange('materialsCode')}>
                                품목코드 {sortOption === 'materialsCode' && sortMaterials === 'asc' ? '▲' : '▼'}
                            </th>
                            <th onClick={() => handleSortChange('materialsName')}>
                                품목이름 {sortOption === 'materialsName' && sortMaterials === 'asc' ? '▲' : '▼'}
                            </th>
                            <th onClick={() => handleSortChange('receiptDate')}>
                                입고일자 {sortOption === 'receiptDate' && sortMaterials === 'asc' ? '▲' : '▼'}
                            </th>
                
                            <th>가격</th>
                            <th>수량</th>
                            <th>거래처코드</th>
                            {showNewItemForm && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        
                        {showNewItemForm &&
                            <MaterialsAdd
                                onAddMaterials={handleAddMaterials}
                                handleCancelClick={handleCancelClick}
                            />
                        }
                        {/* 물류 테이블 데이터 */}
                        {itemsToRender.map(item => (
                            <tr key={item.id}>
                                <td><input type="checkbox" onChange={() => handleCheckboxChange(item.id)} checked={selectedItems.includes(item.id)} /></td>
                                {/* 수정 중인 항목 */}
                                {editingItemId === item.id ? (
                                    <MaterialsUpdate
                                        item={item}
                                        handleInputChange={handleInputChange}
                                        handleSaveClick={handleSaveClick}
                                    />
                                ) : (

                                    // 일반 데이터 표시
                                    <>
                                        <td>{item.materialsCode}</td>
                                        <td>{item.materialsName}</td>
                                        <td>{item.receiptDate}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.vendorCode}</td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                
            </section>
            
            {/* 하단 버튼 영역 */}
            <div className="bottom-buttons">
                <span><button onClick={handleExcelDownload}>엑셀다운</button></span>
                <span><button onClick={handlePrintClick}>인쇄</button></span>
            </div>
        </div>
    );
};

export default MaterialsMgmt; //