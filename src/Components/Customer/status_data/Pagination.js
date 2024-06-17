import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"

const CustomerStatusPagination = () => {
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handlePageChange = () => {
  //   if (page >= 1 && page <= totalPages) {
  //     onPageChange(page);
  //   }
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
              style={{
                color: 'gray',
              }}
              onClick={() => handlePageChange()}
              >
              &lt;
            </a>
          </li>
            <li className='page-item'>
              <a
                className="page-link"
                href="#"
                style={{ color:  'gray' }}
                onClick={() => handlePageChange()}
              >
                1
              </a>
            </li>
            <li className='page-item active'>
              <a
                className="page-link"
                href="#"
                style={{ color:  'white'}}
                onClick={() => handlePageChange()}
              >
                2
              </a>
            </li>
            <li className='page-item'>
              <a
                className="page-link"
                href="#"
                style={{ color: 'gray' }}
                onClick={() => handlePageChange()}
              >
                3
              </a>
            </li>
          <li className='page-item'>
            <a className="page-link" href="{currentPage+1}" style={{
              color: 'gray',
            }}  
            onClick={() => handlePageChange()}>
              &gt;</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CustomerStatusPagination;