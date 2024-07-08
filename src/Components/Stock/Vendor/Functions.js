import axios from '../../../api/axios';
import DangerAlert from './DangerAlert';
import { useState, useMemo } from 'react';
import instance from './../../../api/axios';

export const fetchVendors = async (setVendors) => {
  try {
    const response = await axios.get('/vendor/list');
    setVendors(response.data);
  } catch (error) {
    console.error('Error fetching vendors:', error);
  }
};

export const handleAddClick = (setIsAddClicked, setIsUpdateClicked) => {
  setIsAddClicked(true);
  setIsUpdateClicked(false);
};

export const handleUpdateClick = (selectedVendors, vendors, setUpdateVendor, setIsUpdateClicked, setIsAddClicked) => {
  if (selectedVendors.length !== 1) {
    <DangerAlert/>
    return;
  }

  setIsUpdateClicked(true);
  setIsAddClicked(false);

  // 선택된 첫 번째 거래처의 정보를 updateVendor에 설정
  const selectedVendor = vendors.find(
    (vendor) => vendor.vendorCode === selectedVendors[0]
  );
  setUpdateVendor(selectedVendor);
};

export const handleDeleteClick = async (selectedVendors, vendors, setVendors, setSelectedVendors) => {
  if (selectedVendors.length === 0) {
    alert('삭제할 거래처를 선택해 주세요.');
    return;
  }

  if (window.confirm('선택된 항목들을 삭제하시겠습니까?')) {
    try {
      await Promise.all(
        selectedVendors.map(async (vendorCode) => {
          await axios.delete(`/vendor/${vendorCode}`);
        })
      );
      const updatedVendors = vendors.filter(
        (vendor) => !selectedVendors.includes(vendor.vendorCode)
      );
      setVendors(updatedVendors);
      setSelectedVendors([]);
    } catch (error) {
      console.error('Error deleting vendors:', error);
    }
  }
};

export const handleConfirmDelete = async (selectedVendors, vendors, setVendors, setSelectedVendors) => {
  try {
    await Promise.all(
      selectedVendors.map(async (vendorCode) => {
        await axios.delete(`/vendor/${vendorCode}`);
      })
    );
    const updatedVendors = vendors.filter(
      (vendor) => !selectedVendors.includes(vendor.vendorCode)
    );
    setVendors(updatedVendors);
    setSelectedVendors([]);
  } catch (error) {
    console.error('Error deleting vendors:', error);
  }
};

export const handleSubmitAdd = async (e, newVendor, vendors, setVendors, setIsAddClicked, setNewVendor, setSelectedVendors) => {
  e.preventDefault();
  try {
    const response = await axios.post('/vendor/add', newVendor);
    setVendors([response.data, ...vendors]);
    setIsAddClicked(false);
    setNewVendor({
      vendorName: '',
      vendorContact: '',
      vendorAddress: '',
      vendorRemark: '',
      deliverableStatus: false,
    });
    setSelectedVendors([]);
  } catch (error) {
    console.error('Error adding vendor:', error);
  }
};

export const handleSubmitUpdate = async (e, updateVendor, vendors, setVendors, setIsUpdateClicked, setUpdateVendor) => {
  e.preventDefault();
  try {
    await axios.put(`/vendor/${updateVendor.vendorCode}`, updateVendor); // 여기 수정 필요
    const updatedVendors = vendors.map((vendor) =>
      vendor.vendorCode === updateVendor.vendorCode ? updateVendor : vendor
    );
    setVendors(updatedVendors);
    setIsUpdateClicked(false);
    setUpdateVendor(null);
  } catch (error) {
    console.error('Error updating vendor:', error);
  }
};

export const handleCheckboxChange = (vendorCode, selectedVendors, setSelectedVendors) => {
  if (selectedVendors.includes(vendorCode)) {
    setSelectedVendors(selectedVendors.filter((code) => code !== vendorCode));
  } else {
    setSelectedVendors([...selectedVendors, vendorCode]);
  }
};

export const handleSelectAll = (selectAll, vendors, setSelectedVendors, setSelectAll) => {
  if (!selectAll) {
    const allVendorCodes = vendors.map((vendor) => vendor.vendorCode);
    setSelectedVendors(allVendorCodes);
  } else {
    setSelectedVendors([]);
  }
  setSelectAll(!selectAll);
};

export const handleChangeNewVendor = (field, value, newVendor, setNewVendor) => {
  setNewVendor({ ...newVendor, [field]: value });
};

export const handleChangeUpdateVendor = (field, value, updateVendor, setUpdateVendor) => {
  setUpdateVendor({ ...updateVendor, [field]: value });
};

export const handleCancelAdd = (setIsAddClicked, setNewVendor) => {
  setIsAddClicked(false);
  setNewVendor({
    vendorName: '',
    vendorContact: '',
    vendorAddress: '',
    vendorRemark: '',
    deliverableStatus: false,
  });
};


export const handleCancelUpdate = (setIsUpdateClicked, setUpdateVendor) => {
  setIsUpdateClicked(false);
  setUpdateVendor(null);
};

export const handleCancelForm = (setIsAddClicked, setIsUpdateClicked, setNewVendor, setUpdateVendor) => {
  setIsAddClicked(false);
  setIsUpdateClicked(false);
  setNewVendor({
    vendorName: '', vendorContact: '', vendorAddress: '', vendorRemark: '', deliverableStatus: false,
  });
  setUpdateVendor(null);
};

export const handleDeleteClickWrapper = (setShowDeleteModal) => {
  setShowDeleteModal(true);
};

export const handleModalConfirmDelete = async (selectedVendors, vendors, setVendors, setSelectedVendors, setShowDeleteModal) => {
  try {
    await Promise.all(
      selectedVendors.map(async (vendorCode) => {
        await axios.delete(`/vendor/${vendorCode}`);
      })
    );
    const updatedVendors = vendors.filter(
      (vendor) => !selectedVendors.includes(vendor.vendorCode)
    );
    setVendors(updatedVendors);
    setSelectedVendors([]);
    setShowDeleteModal(false); // 삭제 작업이 완료되면 모달을 닫습니다.
  } catch (error) {
    console.error('Error deleting vendors:', error);
  }
};


export const handleModalClose = (setShowDeleteModal) => {
  setShowDeleteModal(false);
};

export const handleUpdateClickWrapper = (selectedVendors, setIsUpdateClicked, setIsAddClicked, vendors, setUpdateVendor, setShowAlert) => {
  if (selectedVendors.length !== 1) {
    setShowAlert(true); 
    return;
  }
  setIsUpdateClicked(true);
  setIsAddClicked(false);

  // 선택된 첫 번째 거래처의 정보를 updateVendor에 설정
  const selectedVendor = vendors.find(
    (vendor) => vendor.vendorCode === selectedVendors[0]
  );
  setUpdateVendor(selectedVendor);

  // 하나만 선택한 경우 경고창 숨기기
  setShowAlert(false);
};

export const handleSearch = async (searchTerm) => {
  try {
    const response = await fetch(`/vendor/search?keyword=${searchTerm}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // 검색 결과를 반환
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};

export const sortVendors = (vendors, sortBy, sortOrder) => {
  return [...vendors].sort((a, b) => {
    if (!sortBy) {
      return a.vendorCode.toString().localeCompare(b.vendorCode.toString());
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
      return []; // items가 배열이 아니면 빈 배열 반환
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
    const response_pageData = await instance.get(`/vendor/listPage?page=${currentPage - 1}&size=${rowsPerPage}`);
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