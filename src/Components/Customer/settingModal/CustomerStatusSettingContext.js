//작성자: 박승희
//고객현황 설정 사항 전역 관리를 위한 페이지

import React, { createContext, useState, useContext, useEffect } from 'react';
import instance from '../../../api/axios';

const CustomerStatusContext = createContext();

export const CustomerStatusProvider = ({ children }) => {
  //Goal차트설정
  const [customerCount_lastyear, setCustomerCount_lastyear] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [customerTarget, setCustomerTarget] = useState(0);
  const [goalOption, setGoalOption] = useState('전체고객수');
  const [selectedOption, setSelectedOption] = useState('');
  //Period설정
  const [period, setPeriod] = useState('1년');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //Mene설정
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
  //Rank설정
  const [rangeValue, setRangeValue] = useState(5);
  //Region설정
  const [selectedRegion, setSelectedRegion] = useState('전국');
  const [selectedProvince, setSelectedProvince,] = useState('');
  const [selectedCity, setSelectedCity,] = useState('');

  useEffect(() => {

    const fetchCustomerCount = async () => {
      try {
        const response_all = await instance.get('/customer/getCountAll');
        setCustomerCount(response_all.data);
//동적데이터로 변경하기!: year: 2023////////////////////////////////////////
        const response_lastyear = await instance.get('/customer/getCountLastyear', {
          params: { year: 2023 }
        });
        setCustomerCount_lastyear(response_lastyear.data);
      } catch (error) {
        console.error('Error fetching customer count:', error);
      }
    };
    fetchCustomerCount();
  }, []); 

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