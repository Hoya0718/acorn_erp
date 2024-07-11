import React, { useState, useEffect } from 'react';
import VendorForm from './VendorForm';
import Pagination from 'react-bootstrap/Pagination'; 
import './Vendor.css';
import {
  handleCheckboxChange, handleSelectAll, handleUpdateClick, handleDeleteClick,
  handleSubmitAdd, handleSubmitUpdate, handleChangeNewVendor, handleChangeUpdateVendor,
  handleCancelAdd, handleCancelUpdate, useSortableData
} from './Functions';

const VendorList = ({
  vendors, selectedVendors, selectAll, sortBy, searchTerm, isUpdateClicked, setFilteredData,
  handleCheckboxChange, handleSelectAll, handleUpdateClick, handleDeleteClick,
  isAddClicked, setIsAddClicked, setIsUpdateClicked, setVendors, updateVendor,
  setNewVendor, setSelectedVendors, setUpdateVendor, newVendor, filteredData
}) => {

  const { items: sortedVendors, requestSort, sortConfig } = useSortableData(vendors, { key: sortBy });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 페이지 변경 시 호출될 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredData(vendors);
  }, [vendors]);

  // 페이지네이션을 위한 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = sortedVendors.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (key) => {
    const direction = sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    requestSort(key, direction);
  };

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th onClick={() => handleSort('vendorCode')}>
              코드 {sortConfig && sortConfig.key === 'vendorCode' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </th>
            <th onClick={() => handleSort('vendorName')}>
              거래처명 {sortConfig && sortConfig.key === 'vendorName' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </th>
            <th onClick={() => handleSort('vendorContact')}>
              거래처 연락처 {sortConfig && sortConfig.key === 'vendorContact' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </th>
            <th onClick={() => handleSort('vendorAddress')}>
              거래처 주소 {sortConfig && sortConfig.key === 'vendorAddress' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </th>
            <th onClick={() => handleSort('deliverableStatus')}>
              납품 가능 {sortConfig && sortConfig.key === 'deliverableStatus' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </th>
            <th onClick={() => handleSort('vendorRemark')}>
              특이사항 {sortConfig && sortConfig.key === 'vendorRemark' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {isAddClicked && (
            <VendorForm
              handleSubmit={(e) => handleSubmitAdd(e, newVendor, vendors, setVendors, setIsAddClicked, setNewVendor, setSelectedVendors)}
              handleCancel={() => handleCancelAdd(setIsAddClicked, setNewVendor)}
              vendorData={newVendor}
              handleChange={(field, value) => handleChangeNewVendor(field, value, newVendor, setNewVendor)}
              isNewVendor={true}
              showCancel={true} // 추가 상태일 때 취소 버튼 표시
            />
          )}
          {isUpdateClicked && updateVendor && (
            <VendorForm
              handleSubmit={(e) => handleSubmitUpdate(e, updateVendor, vendors, setVendors, setIsUpdateClicked, setUpdateVendor)}
              handleCancel={() => handleCancelUpdate(setIsUpdateClicked, setUpdateVendor)}
              vendorData={updateVendor}
              handleChange={(field, value) => handleChangeUpdateVendor(field, value, updateVendor, setUpdateVendor)}
              isNewVendor={false}
              showCancel={true} // 수정 상태일 때 취소 버튼 표시
            />
          )}
          {currentVendors
            .filter((vendor) => vendor.vendorName && vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((vendor) => (
              // updateVendor가 존재하고 vendor.vendorCode와 updateVendor.vendorCode가 같은 경우 해당 행은 숨깁니다.
              !(isUpdateClicked && updateVendor && vendor.vendorCode === updateVendor.vendorCode) && (
                <tr key={vendor.vendorCode}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedVendors.includes(vendor.vendorCode)}
                      onChange={() => handleCheckboxChange(vendor.vendorCode)}
                    />
                  </td>
                  <td>{vendor.vendorCode}</td>
                  <td>{vendor.vendorName}</td>
                  <td>{vendor.vendorContact}</td>
                  <td>{vendor.vendorAddress}</td>
                  <td>{vendor.deliverableStatus ? 'O' : 'X'}</td>
                  <td>{vendor.vendorRemark}</td>
                </tr>
              )
            ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {currentPage > 1 && <Pagination.Item onClick={() => paginate(1)}>1</Pagination.Item>}
          {currentPage > 3 && <Pagination.Ellipsis />}
          {currentPage === 3 && <Pagination.Item onClick={() => paginate(2)}>2</Pagination.Item>}
          {currentPage > 2 && currentPage !== 3 && <Pagination.Item onClick={() => paginate(currentPage - 1)}>{currentPage - 1}</Pagination.Item>}
          <Pagination.Item active>{currentPage}</Pagination.Item>
          {currentPage < Math.ceil(sortedVendors.length / itemsPerPage) - 1 && currentPage !== Math.ceil(sortedVendors.length / itemsPerPage) - 1 && <Pagination.Item onClick={() => paginate(currentPage + 1)}>{currentPage + 1}</Pagination.Item>}
          {currentPage < Math.ceil(sortedVendors.length / itemsPerPage) - 2 && <Pagination.Ellipsis />}
          {currentPage !== Math.ceil(sortedVendors.length / itemsPerPage) && <Pagination.Item onClick={() => paginate(Math.ceil(sortedVendors.length / itemsPerPage))}>{Math.ceil(sortedVendors.length / itemsPerPage)}</Pagination.Item>}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(sortedVendors.length / itemsPerPage)} />
        </Pagination>
      </div>
    </div>
  );
};

export default VendorList;
