import React, { useState, useEffect } from 'react';

const DateComponent = ({ onChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    const formattedDate = `${year}-${month}-${day}`;
    setStartDate(formattedDate);
    setEndDate(formattedDate);
    onChange(formattedDate, formattedDate); // 초기값으로 오늘 날짜 전달
  }, [onChange]); // onChange 함수를 의존성 배열에 추가

  const handleStartDateChange = (event) => {
    const value = event.target.value;
    setStartDate(value); // 상태 업데이트
    onChange(value, endDate); // 변경된 값을 사용하여 onChange 호출
  };

  const handleEndDateChange = (event) => {
    const value = event.target.value;
    setEndDate(value); // 상태 업데이트
    onChange(startDate, value); // 변경된 값을 사용하여 onChange 호출
  };

  return (
    <div className="left">
      <label htmlFor="startDate">
        <input
          type="date"
          id="startDate"
          max="2077-06-20"
          min="1900-06-05"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </label>
      ~
      <label htmlFor="endDate">
        <input
          type="date"
          id="endDate"
          max="2077-06-20"
          min="1900-06-05"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </label>
    </div>
  );
};

export default DateComponent;
