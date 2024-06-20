// 작성자: 박승희
// 고객현황 세팅모달의 지역구분(광역시도) 데이터 세팅 페이지
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSelector_Provinces = ({ onSelectProvince }) => {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    // 광역시도 데이터를 가져오는 함수
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/provinces');
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);


  return (
    <select
      id="province"
      onChange={(e) => onSelectProvince(e.target.value)}
    >
      <option value="">광역시도</option>
      {provinces.map((province, index) => (
        <option key={index} value={province}>
          {province}
        </option>
      ))}
    </select>
  );
};

export default LocationSelector_Provinces;
