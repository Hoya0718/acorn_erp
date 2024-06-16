import * as React from 'react'
import "../../Main/Main.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const CustomerStatusPeriodSerchBox = () => {

  return (
    <div className="customer-status-period-serchbox"> 
    
      <div className="radio righted">
        <input type="radio" name="search_for" id="3months" onClick={() => { }} />&nbsp;3개월&nbsp;&nbsp;
        <input type="radio" name="search_for" id="6months" onClick={() => { }} />&nbsp;6개월&nbsp;&nbsp;
        <input type="radio" name="search_for" id="1year" onClick={() => { }} />&nbsp;1년&nbsp;&nbsp;
        <input type="radio" name="search_for" id="custom" onClick={() => { }} />&nbsp;사용자 지정<br />
       
      </div>
      <div className="date righted">
        {/* 사용자 지정 체크 여부에 따라 활성화 */}
        <input type="date" id="startDate" disabled />&nbsp;~&nbsp;
        <input type="date" id="endDate" disabled />&nbsp;
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            검색
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">고객명</a></li>
            <li><a class="dropdown-item" href="#">상품평</a></li>
            <li><a class="dropdown-item" href="#">특이사항</a></li>
          </ul>
        </div>&nbsp;
        <div className="input-group">
          <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          <input type="text" id="keyword" className="form-control" placeholder="검색" />
        </div>&nbsp;
        <input type="submit" value="조회 >" className="btn btn-dark" />
      </div>
    </div>
  );
}

export default CustomerStatusPeriodSerchBox;