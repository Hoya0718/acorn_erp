import axios from '../../../api/axios';
import DangerAlert from './DangerAlert';
import { useState, useMemo } from 'react';


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