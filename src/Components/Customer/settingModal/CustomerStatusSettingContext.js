//작성자: 박승희
//고객현황 설정 사항 전역 관리를 위한 페이지

import React, { createContext, useState, useContext, useEffect } from 'react';
import instance from '../../../api/axios';

const CustomerStatusContext = createContext();

export const CustomerStatusProvider = ({ children }) => {
  const [customerCount_lastyear, setCustomerCount_lastyear] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [customerTarget, setCustomerTarget] = useState(0);
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

  useEffect(() => {
    const storedRegion = localStorage.getItem('selectedRegion');
    const storedProvince = localStorage.getItem('selectedProvince');
    const storedCity = localStorage.getItem('selectedCity');

    if (storedRegion) setSelectedRegion(storedRegion);
    if (storedProvince) setSelectedProvince(storedProvince);
    if (storedCity) setSelectedCity(storedCity);

    const fetchCustomerCount = async () => {
      try {
        const response_all = await instance.get('/customer/getCountAll');
        setCustomerCount(response_all.data);
  //동적데이터로 변경하기!////////////////////////////////////////
        const response_lastyear = await instance.get('/customer/getCountLastyear', {
          params: { year: 2023 }
        });
        setCustomerCount_lastyear(response_lastyear.data);
      } catch (error) {
        console.error('Error fetching customer count:', error);
      }
    };
    fetchCustomerCount();
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때만 실행되도록 설정
  
   useEffect(() => {
    localStorage.setItem('selectedRegion', selectedRegion);
    localStorage.setItem('selectedProvince', selectedProvince);
    localStorage.setItem('selectedCity', selectedCity);
  }, [selectedRegion, selectedProvince, selectedCity]);

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