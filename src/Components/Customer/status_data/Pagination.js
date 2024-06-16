import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"

const CustomerStatusPagination = () => {

  return (
    <div
      className="customer-status-pagination centerd"
      style={{
        'width': '100%',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
      }}
    >
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link"
              style={{
                'color': 'gray',
              }}>
              &lt;
            </a>
          </li>
          <li class="page-item">
            <a class="page-link"
              href="#"
              style={{
                'color': 'gray',
              }}  >
              1</a>
          </li>
          <li class="page-item active" 
          aria-current="page" >
            <a class="page-link active-link"
              href="#"
              style={{
                'color': 'white',
              }}  >
              2
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              style={{
                'color': 'gray',
              }}  >
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" style={{
              'color': 'gray',
            }}  >&gt;</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CustomerStatusPagination;