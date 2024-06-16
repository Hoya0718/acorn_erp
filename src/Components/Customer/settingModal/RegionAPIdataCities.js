import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSelector_Cities = ({ selectedProvince }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');


  useEffect(() => {
    if (selectedProvince) {
      // 선택된 광역시도의 시군구 데이터를 가져오는 함수
      const fetchCities = async () => {
        try {
          const response = await axios.get('http://apis.data.go.kr/1741000/StanReginCd', {
            params: {
              ServiceKey: '66YBzAOO09yTFDqEcgyss5LcVKGuoQ7Gnq2XFo7El6I028k6zKPcRXRJ6zwWRQidZUDukhMF9TY5qc3IaE0gjg%3D%3D',  // 여기에 본인의 인증키를 입력하세요
              type: 'json',
              flag: 'Y',
              pageNo: 1,
              numOfRows: 100,
              locatadd_nm: selectedProvince
            }
          });
          setCities(response.data.response.body.items);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    }
  }, [selectedProvince]);

  return (
    <select
      id="city"
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      disabled={!selectedProvince}
    >
      <option value="">시군구</option>
      {cities.map((city) => (
        <option key={city.region_cd} value={city.locatadd_nm}>
          {city.locatadd_nm}
        </option>
      ))}
    </select>
  );
};

export default LocationSelector_Cities;