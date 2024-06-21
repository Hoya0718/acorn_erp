// 작성자: 박승희
// 고객현황 데이터 페이지 기간선택 및 검색버튼 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"

const CustomerStatusPeriodSerch = ({ setPeriod }) => {
  const [selectedOption, setSelectedOption] = React.useState('1년');
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
        break;
      case '6개월':
        setStartDate(calculateStartDate(6));
        break;
      case '1년':
        setStartDate(calculateStartDate(12));
        break;
      case '사용자 지정':
        setStartDate('');
        setEndDate(today);
        break;
      default:
        setStartDate('');
        setEndDate(today);
        break;
    }
  }, [selectedOption]);
  React.useEffect(() => {
    setPeriod({ selectedOption, startDate, endDate });
  }, [startDate, endDate, setPeriod]);
  React.useEffect(() => {
    setSelectedOption('1년');
  }, []);

  const handleSelectedOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
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
              onChange={handleSelectedOptionChange}
            />&nbsp;{data}&nbsp;
          </label>
        ))}
      </div>
      <div className="dateSerchBox righted">
        <input type="date" id="startDate"
          disabled={selectedOption !== '사용자 지정'}
          value={startDate}
          style={{ minWidth: '130px' }}
          onChange={handleStartDateChange} />&nbsp;~&nbsp;
        <input type="date" id="endDate"
          disabled={selectedOption !== '사용자 지정'}
          value={endDate}
          style={{ minWidth: '130px' }}
          onChange={handleEndDateChange} />
      </div>
    </div>
  );
}

export default CustomerStatusPeriodSerch;