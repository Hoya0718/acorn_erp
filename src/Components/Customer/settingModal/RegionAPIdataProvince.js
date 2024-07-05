// 작성자: 박승희
// 고객현황 세팅모달의 지역구분(광역시도) 데이터 세팅 페이지
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSelector_Provinces = ({ onSelectProvince, selectedProvince }) => {
  const [provinces, setProvinces] = useState([]);
  
  useEffect(() => {
    // 광역시도 데이터를 가져오는 함수
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/provinces');
        if (response.data.admVOList && Array.isArray(response.data.admVOList)) {
          setProvinces(response.data.admVOList);
          
        } else {
          console.error('Expected an array but got:', response.data);
          setProvinces([]); // 빈 배열로 설정
        }
      } catch (error) {
        console.error('Error fetching provinces data:', error);
        setProvinces([]); // 빈 배열로 설정
      }
    };
    fetchProvinces();
  }, []);


  return (
    <select
      id="province"
      value={selectedProvince}  // 여기 추가
      onChange={(e) => onSelectProvince(e.target.value)}
    >
      <option value="">광역시도</option>
      {provinces.map((province) => (
        <option key={province.admCode}value={province.admCode}>
          {province.lowestAdmCodeNm}
        </option>
      ))}
    </select>
  );
};

export default LocationSelector_Provinces;
