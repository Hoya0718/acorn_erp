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
    const formattedEndDate = selectedOption === '사용자 지정' ? formatDateWithTime(endDate) : endDate;
    setPeriod({ selectedOption, startDate,  endDate: formattedEndDate });
  }, [selectedOption, startDate, endDate, setPeriod]);

  // React.useEffect(() => {
  //   setSelectedOption('1년');
  // }, []);

  const handleSelectedOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  }
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    const formattedEndDate = formatDateWithTime(endDate);
    setPeriod({ selectedOption, startDate: event.target.value, endDate: formattedEndDate });
  }
  const handleEndDateChange = (event) => {
    const value = event.target.value;
    const formattedEndDate = formatDateWithTime(value);
    setEndDate(value);
    setPeriod({ selectedOption, startDate, endDate: formattedEndDate });
  }
  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    date.setHours(23, 59, 59, 999); // 끝날을 23:59:59로 설정
    return date.toISOString();
  }
  return (
    <div className="customer-status-period-serchbox row ">
      <div className="radio righted col-12"
        style={{ fontSize: '14px' }} >
        {datas.map((data) => (
          <label key={data}>
            <input
              type="radio"
              name="search_for"
              value={data}
              checked={selectedOption === data}
              onChange={handleSelectedOptionChange}
            />&nbsp;{data}&nbsp;&nbsp;
          </label>
        ))}
        &nbsp;&nbsp;
        <input type="date" id="startDate"
          disabled={selectedOption !== '사용자 지정'}
          value={startDate}
          style={{ minWidth: '100px', fontSize: '14px', textAlign: 'center' }}
          onChange={handleStartDateChange}
          required
        />
          &nbsp;&nbsp;~&nbsp;&nbsp;
        <input type="date" id="endDate"
          disabled={selectedOption !== '사용자 지정'}
          value={endDate.split('T')[0]}
          style={{ minWidth: '100px', fontSize: '14px', textAlign: 'center', marginRight: '8px' }}
          onChange={handleEndDateChange}
          required />
      </div>
    </div>
  );
}

export default CustomerStatusPeriodSerch;