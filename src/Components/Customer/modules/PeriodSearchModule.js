// 작성자: 박승희
// 고객현황 데이터 페이지 기간선택 및 검색버튼 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"

const CustomerStatusPeriodSerch = ({ onSearch }) => {
  const [selectedOption, setSelectedOption] = React.useState('1년');
  const [isAbled, setIsAbled] = React.useState(false);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState(''); 
  
  const datas = ['3개월', '6개월', '1년', '사용자 지정']

  React.useEffect(() => {
    const now = new Date();
    const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0]; // 오늘 날짜로 설정
    
    setEndDate(today);

    const calculateStartDate = (monthsAgo) => {
      const date = new Date();
      date.setMonth(date.getMonth() - monthsAgo);
      return date.toISOString().split('T')[0];
    };

    switch (selectedOption) {
      case '3개월':
        setStartDate(calculateStartDate(3));
        setIsAbled(false);
        break;
      case '6개월':
        setStartDate(calculateStartDate(6));
        setIsAbled(false);
        break;
      case '1년':
        setStartDate(calculateStartDate(12));
        setIsAbled(false);
        break;
      case '사용자 지정':
        setIsAbled(true);
        setStartDate('');
        setEndDate(today);
        break;
      default:
        setIsAbled(false);
        setStartDate('');
        setEndDate(today);
        break;
    }
  }, [selectedOption]);
  
  React.useEffect(() => {
    // 초기값 설정
    setSelectedOption('1년');
  }, []);
  
  //라디오 옵션 변경
  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setIsAbled(value === '사용자 지정')
  }
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  }
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  }
  
  return (
    <div className="customer-status-period-serchbox">
      <div className="radio righted">
        {datas.map((data) => (
          <label key={data}>
            <input
              type="radio"
              name="search_for"
              value={data}
              checked={selectedOption === data}
              onChange={handleOptionChange}
            />&nbsp;{data}&nbsp;
          </label>
        ))}
      </div>
      <div className="date righted searchBox">
        <input type="date" id="startDate" disabled={!isAbled} value={startDate}  style={{minWidth:'110px'}} onChange={handleStartDateChange}/>&nbsp;~&nbsp;
        <input type="date" id="endDate" disabled={!isAbled} value={endDate} style={{minWidth:'110px'}} onChange={handleEndDateChange}/>
      </div>
      </div>
  );
}

export default CustomerStatusPeriodSerch;