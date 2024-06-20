// 작성자: 박승희
// 고객현황 데이터 페이지 페이지네이션 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"

const CustomerStatusPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <a 
            className="page-link"
            href="#!"
            style={{ color: i === currentPage ? 'white' : 'black' }}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };
  return (
    <div
      className="customer-status-pagination centerd"
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className='page-item'>
            <a className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              href="#!"
              style={{ color: currentPage === 1 ? 'gray' : 'black' }}
            >
              &lt;
            </a>
          </li>
          {renderPageNumbers()}
          <li className='page-item'>
            <a className="page-link"
              href="#!"
              style={{ color: currentPage === totalPages ? 'gray' : 'black' }}
              onClick={() => handlePageChange(currentPage + 1)}>
              &gt;
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CustomerStatusPagination;