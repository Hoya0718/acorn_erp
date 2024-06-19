// 작성자: 박승희
// 고객현황 데이터 페이지 기간선택 및 검색버튼 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const CustomerStatusPeriodSerchBox = ({ setKeyword }) => {
  const [keyword, setKeywordLocal] = React.useState('');

  const handleKeywordChange = (event) => {
    const value = event.target.value;
    setKeywordLocal(value);
    setKeyword(value);
  };

  return (
    <div className="customer-status-period-serchbox">
      <div className="date righted">
        <div className="input-group">
          <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          <input type="text" id="keyword" className="form-control" value={keyword} onChange={handleKeywordChange} placeholder="검색" />
        </div>&nbsp;
      </div>
    </div>
  );
}

export default CustomerStatusPeriodSerchBox;