import * as React from 'react'
import "../Main/Main.css"
import './Sales.css';
import InventoryTable from './InventoryTable';

const OrderMgmt = ()=> {
    return (
        <div>
          <div className="Middle classification">
            <h4>상품 재고 관리</h4>
          </div>
          <hr />
    
          <div className="subTitle"> <br /></div>
          <br />
          
          <div className="searcher">
            <div className="left">
              <label for="date">날짜를 선택하세요 :
                <input type="date" id="date" max="2077-06-20" min="2077-06-05" value="2024-07-18" />
              </label>
            </div>
    
            <div className="right">
              <input type="text" placeholder='🔍 검색' /><button>조회</button>
            </div>
          </div>
          <br />
          <div>
            <section>
              <InventoryTable />
            </section>
          </div>
          
          <div className="excel-print">
            <button>엑셀 다운</button>
            <button>인쇄</button>
          </div>
        </div>
    );
}

export default OrderMgmt;