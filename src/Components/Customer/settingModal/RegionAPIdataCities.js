// 작성자: 박승희
// 고객현황 세팅모달의 지역구분(시군구) 데이터 세팅 페이지
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSelector_Cities = ({ selectedProvince, onSelectCity, selectedCity }) => {
  const [cities, setCities] = useState([]);
  // const [selectedCity, setSelectedCity] = useState('');

  // console.log("LocationSelector_Citie 실행", selectedProvince);

  useEffect(() => {
    if (selectedProvince) {
      // 선택된 광역시도의 시군구 데이터를 가져오는 함수
      const fetchCities = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/cities', {
            params: { provinceCode: selectedProvince }
          });
          //console.log("API cities", response.data);

          const { admVOList } = response.data.admVOList;
          if (admVOList && Array.isArray(admVOList)) {
            setCities(admVOList);
          }
          else {
            console.log('cities_null:');
            setCities([]);
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
          setCities([]); // 빈 배열로 설정
        }
      };
     
      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  // const handleCityChange = (e) => {
  //   const city = e.target.value;
  //   setSelectedCity(city);
  // };
  
  return (
    <select
      id="city"
      value={selectedCity}
      onChange={(e) => onSelectCity(e.target.value)}
      disabled={!selectedProvince}
    >
      <option value="">시군구</option>
      {cities.map((city, index) => (
        <option key={index} value={city.admCode}>
           {city.lowestAdmCodeNm}
        </option>
      ))}
    </select>
  );
};

export default LocationSelector_Cities;