//작성자: 박승희
//고객현황 설정 사항 전역 관리를 위한 페이지

import React, { createContext, useState, useContext, useEffect } from 'react';

const CustomerStatusContext = createContext();

export const CustomerStatusProvider = ({ children }) => {
  const [customerCount_lastyear, setCustomerCount_lastyear] = useState(50000);
  const [customerCount, setCustomerCount] = useState(60000);
  const [customerTarget, setCustomerTarget] = useState('');
  const [goalOption, setGoalOption] = useState('전체고객수');
  const [selectedOption, setSelectedOption] = useState('');
  
  const [period, setPeriod] = useState('1년');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checkboxes_dist, setCheckboxes_dist] = useState({
    gender: true,
    age: true,
    region: true,
  });
  const [checkboxes_prod, setCheckboxes_prod] = useState({
    amount: true,
    count: true,
    reaction: true
  });
  const [rangeValue, setRangeValue] = useState(5);
  const [selectedRegion, setSelectedRegion] = useState('전국');
  const [selectedProvince, setSelectedProvince,] = useState('');
  const [selectedCity, setSelectedCity,] = useState('');

  return (
    <CustomerStatusContext.Provider value={{
      customerCount_lastyear, setCustomerCount_lastyear,
      customerCount, setCustomerCount,
      customerTarget, setCustomerTarget,
      goalOption, setGoalOption,
      selectedOption, setSelectedOption,
      period, setPeriod,
      startDate, setStartDate,
      checkboxes_dist, setCheckboxes_dist,
      checkboxes_prod, setCheckboxes_prod,
      endDate, setEndDate,
      selectedRegion, setSelectedRegion,
      rangeValue, setRangeValue,
      selectedProvince, setSelectedProvince,
      selectedCity, setSelectedCity,
    }}>
      {children}
    </CustomerStatusContext.Provider>
  );
};

export const useCustomerStatus = () => useContext(CustomerStatusContext);