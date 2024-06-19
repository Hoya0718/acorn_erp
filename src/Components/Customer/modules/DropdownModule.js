// 작성자: 박승희
// 고객현황 데이터 페이지 기간선택 및 검색버튼 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const CustomerStatusPeriodSerchBox = ({ onSearch }) => {
  const [selectedOption_dropdown, setSelectedOption_dropdown] = React.useState('검색');
  //드롭다운 옵션 변경
  const handleSelect_dropdown = (option) => {
    setSelectedOption_dropdown(option);
  }

  return (
    <div className="customer-status-period-serchbox">
      <div className="date righted">
        {/* 사용자 지정 체크 여부에 따라 활성화 */}
        <div className="dropdown ">
          <button 
            className="btn btn-outline-secondary dropdown-toggle btn-sm " 
            type="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false">
            {selectedOption_dropdown}
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" name="customerName" href="#" onClick={() => handleSelect_dropdown('고객명')}>고객명</a></li>
            <li><a className="dropdown-item" name="productName" href="#" onClick={() => handleSelect_dropdown('상품명')}>상품명</a></li>
            <li><a className="dropdown-item" name="remarks" href="#" onClick={() => handleSelect_dropdown('특이사항')}>특이사항</a></li>
          </ul>
        </div>&nbsp;
      </div>
    </div>
  );
}

export default CustomerStatusPeriodSerchBox;