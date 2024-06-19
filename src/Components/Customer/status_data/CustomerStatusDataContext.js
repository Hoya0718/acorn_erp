//작성자: 박승희
//고객현황 설정 사항 전역 관리를 위한 페이지

import React, { createContext, useState, useContext, useEffect } from 'react';

const CustomerStatusContext = createContext();

export const CustomerStatusProvider = ({ children }) => {
  const [customerCount_lastyear, setCustomerCount_lastyear] = useState(50000);
  const [customerCount, setCustomerCount] = useState(60000);
  const [checkboxes_prod, setCheckboxes_prod] = useState({
    amount: true,
    count: true,
    reaction: true
  });

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