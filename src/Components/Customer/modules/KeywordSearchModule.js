// 작성자: 박승희
// 고객현황 데이터 페이지 기간선택 및 검색버튼 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const CustomerStatusPeriodSerchBox = ({ onSearch }) => {
  const [selectedOption, setSelectedOption] = React.useState('1년');
  const [isAbled, setIsAbled] = React.useState(false);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState(''); 
  const [selectedOption_dropdown, setSelectedOption_dropdown] = React.useState('검색');
  const [keyword, setKeyword] = React.useState('');

  //드롭다운 옵션 변경
  const handleSelect_dropdown = (option) => {
    setSelectedOption_dropdown(option);
  }
  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  //키워드 입력값 변경
  // const handleKeywordChange = (event) => {
  //   setKeyword(event.target.value);
  // };

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   onSearch({ selectedOption_dropdown, keyword, startDate, endDate });
  // };

  return (
    <div className="customer-status-period-serchbox">
      <div className="date righted">
        <div className="input-group">
          <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          <input type="text" id="keyword" className="form-control" value={keyword} onChange={()=>{}} placeholder="검색" />
        </div>&nbsp;
      </div>
    </div>
  );
}

export default CustomerStatusPeriodSerchBox;