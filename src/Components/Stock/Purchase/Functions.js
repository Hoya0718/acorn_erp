import axios from '../../../api/axios';
import DangerAlert from './DangerAlert';
import { useState, useMemo } from 'react';
import instance from './../../../api/axios';

export const fetchPurchases = async (setPurchases) => {
  try {
    const response = await axios.get('/purchase/list');
    setPurchases(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching purchases:', error);
  }
};

export const handleAddClick = (setIsAddClicked, setIsUpdateClicked) => {
  setIsAddClicked(true);
  setIsUpdateClicked(false);
};

export const handleUpdateClick = (selectedPurchases, purchases, setUpdatePurchase, setIsUpdateClicked, setIsAddClicked) => {
  if (selectedPurchases.length !== 1) {
    <DangerAlert/>
    return;
  }

  setIsUpdateClicked(true);
  setIsAddClicked(false);

  // 선택된 첫 번째 발주 품목의 정보를 updatePurchase에 설정
  const selectedPurchase = purchases.find(
    (purchase) => purchase.purchaseCode === selectedPurchases[0]
  );
  setUpdatePurchase(selectedPurchase);
};

export const handleUpdateClickWrapper = (selectedPurchases, setIsUpdateClicked, setIsAddClicked, purchases, setUpdatePurchase, setShowAlert) => {
  if (selectedPurchases.length !== 1) {
    setShowAlert(true); 
    return;
  }
  setIsUpdateClicked(true);
  setIsAddClicked(false);

  // 선택된 첫 번째 발주의 정보를 updatePurchase에 설정
  const selectedPurchase = purchases.find(
    (purchase) => purchase.purchaseCode === selectedPurchases[0]
  );
  setUpdatePurchase(selectedPurchase);

  // 하나만 선택한 경우 경고창 숨기기
  setShowAlert(false);
};

export const handleDeleteClick = async (selectedPurchases, purchases, setPurchases, setSelectedPurchases) => {
  if (selectedPurchases.length === 0) {
    alert('삭제할 발주 품목을 선택해 주세요.');
    return;
  }

  if (window.confirm('선택된 항목들을 삭제하시겠습니까?')) {
    try {
      await Promise.all(
        selectedPurchases.map(async (purchaseCode) => {
          await axios.delete(`/purchase/${purchaseCode}`);
        })
      );
      const updatedPurchases = purchases.filter(
        (purchase) => !selectedPurchases.includes(purchase.purchaseCode)
      );
      setPurchases(updatedPurchases);
      setSelectedPurchases([]);
    } catch (error) {
      console.error('Error deleting purchases:', error);
    }
  }
};

export const handleSubmitAdd = async (e, newPurchase, purchases, setPurchases, setIsAddClicked, setNewPurchase, setSelectedPurchases) => {
  e.preventDefault();
  try {
    const response = await axios.post('/purchase/add', newPurchase);
    setPurchases([response.data, ...purchases]);
    setIsAddClicked(false);
    setNewPurchase({
      purchaseName: '',
      purchaseUnit: '',
      orderDate: '',
      orderQty: 0,
      price: 0,
      remark: '',
    });
    setSelectedPurchases([]);
  } catch (error) {
    console.error('Error adding purchase:', error);
  }
};

export const handleSubmitUpdate = async (e, updatePurchase, purchases, setPurchases, setIsUpdateClicked, setUpdatePurchase) => {
  e.preventDefault();
  try {
    await axios.put(`/purchase/${updatePurchase.purchaseCode}`, updatePurchase);
    const updatedPurchases = purchases.map((purchase) =>
      purchase.purchaseCode === updatePurchase.purchaseCode ? updatePurchase : purchase
    );
    setPurchases(updatedPurchases);
    setIsUpdateClicked(false);
    setUpdatePurchase(null);
  } catch (error) {
    console.error('Error updating purchase:', error);
  }
};

export const handleCheckboxChange = (purchaseCode, selectedPurchases, setSelectedPurchases) => {
  if (selectedPurchases.includes(purchaseCode)) {
    setSelectedPurchases(selectedPurchases.filter((code) => code !== purchaseCode));
  } else {
    setSelectedPurchases([...selectedPurchases, purchaseCode]);
  }
};

export const handleSelectAll = (selectAll, purchases, setSelectedPurchases, setSelectAll) => {
  if (!selectAll) {
    const allPurchaseCodes = purchases.map((purchase) => purchase.purchaseCode);
    setSelectedPurchases(allPurchaseCodes);
  } else {
    setSelectedPurchases([]);
  }
  setSelectAll(!selectAll);
};

export const handleChangeNewPurchase = (field, value, newPurchase, setNewPurchase) => {
  setNewPurchase({ ...newPurchase, [field]: value });
};

export const handleChangeUpdatePurchase = (field, value, updatePurchase, setUpdatePurchase) => {
  setUpdatePurchase({ ...updatePurchase, [field]: value });
};

export const handleCancelAdd = (setIsAddClicked, setNewPurchase) => {
  setIsAddClicked(false);
  setNewPurchase({
    purchaseName: '',
    purchaseUnit: '',
    orderDate: '',
    orderQty: 0,
    price: 0,
    remark: '',
  });
};

export const handleCancelUpdate = (setIsUpdateClicked, setUpdatePurchase) => {
  setIsUpdateClicked(false);
  setUpdatePurchase(null);
};
export const handleConfirmDelete = async (selectedPurchases, purchases, setPurchases, setSelectedPurchases) => {
  try {
    await Promise.all(
      selectedPurchases.map(async (purchaseCode) => {
        await axios.delete(`/purchase/${purchaseCode}`);
      })
    );
    const updatedPurchases = purchases.filter(
      (purchase) => !selectedPurchases.includes(purchase.purchaseCode)
    );
    setPurchases(updatedPurchases);
    setSelectedPurchases([]);
  } catch (error) {
    console.error('Error deleting purchases:', error);
  }
};


export const handleCancelForm = (setIsAddClicked, setIsUpdateClicked, setNewPurchase, setUpdatePurchase) => {
  setIsAddClicked(false);
  setIsUpdateClicked(false);
  setNewPurchase({
    purchaseName: '', purchaseUnit: '', orderDate: '', orderQty: 0, price: 0, remark: '',
  });
  setUpdatePurchase(null);
};

export const handleDeleteClickWrapper = (setShowDeleteModal) => {
  setShowDeleteModal(true);
};

export const handleModalConfirmDelete = async (selectedPurchases, purchases, setPurchases, setSelectedPurchases, setShowDeleteModal) => {
  try {
    await Promise.all(
      selectedPurchases.map(async (purchaseCode) => {
        await axios.delete(`/purchase/${purchaseCode}`);
      })
    );
    const updatedPurchases = purchases.filter(
      (purchase) => !selectedPurchases.includes(purchase.purchaseCode)
    );
    setPurchases(updatedPurchases);
    setSelectedPurchases([]);
    setShowDeleteModal(false); // 삭제 작업이 완료되면 모달을 닫습니다.
  } catch (error) {
    console.error('Error deleting purchases:', error);
  }
};


export const handleModalClose = (setShowDeleteModal) => {
  setShowDeleteModal(false);
};


export const handleSearch = async (searchTerm) => {
  try {
    const response = await fetch(`/purchase/search?keyword=${searchTerm}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Return search results
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error; // Throw the error again to be handled by the calling component
  }
};

export const sortPurchases = (purchases, sortBy, sortOrder) => {
  return [...purchases].sort((a, b) => {
    if (!sortBy) {
      return a.purchaseCode.toString().localeCompare(b.purchaseCode.toString());
    }

    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (typeof aValue !== 'string') {
      aValue = aValue.toString();
    }
    if (typeof bValue !== 'string') {
      bValue = bValue.toString();
    }

    return sortOrder === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });
};

export const useSortableData = (items, initialSortConfig = { key: null, direction: 'ascending' }) => {
  const [sortConfig, setSortConfig] = useState(initialSortConfig);

  const sortedItems = useMemo(() => {
    if (!Array.isArray(items)) {
      return []; // Return empty array if items is not an array
    }
    let sortableItems = [...items];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

// 페이지네이션
export const fetchPageData = async (currentPage, rowsPerPage, setFilteredData, setTotalItems) => {
  try {
    const response_pageData = await instance.get(`/purchase/listPage?page=${currentPage - 1}&size=${rowsPerPage}`);
    const page = response_pageData.data;
    const formattedPageData = page.content.map(item => ({
      ...item
    }));
    setFilteredData(formattedPageData); // filteredData 업데이트
    setTotalItems(page.totalElements); // totalItems 업데이트
  } catch (error) {
    console.error('페이지 데이터를 가져오는 중 오류 발생:', error);
  }
};