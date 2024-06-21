// require('dotenv').config(); // 환경 변수 로드
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;
const baseURL = "https://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList";

app.use(cors());
let cachedData = null; // 데이터를 캐싱할 변수

async function fetchPageData(pageNo, numOfRows, retries = 3) {
  try {
    const response = await axios.get(baseURL, {
      params: {
        ServiceKey: 'WYyFpNUl0WJKt0wYKORHCGdVLFVENK+bfSIQHwerjw+aRVwaaBonxFjFYlrsuGrRrje9jawqfln2FVPyKVsZsQ==',
        type: 'json',
        pageNo: pageNo,
        numOfRows: numOfRows,
        flag: 'Y',
      },
    });

    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${3 - retries} attempts left)`);
      return fetchPageData(pageNo, numOfRows, retries - 1);
    } else {
      throw error;
    }
  }
}

async function fetchAllData() {
  let allData = [];
  let pageNo = 1;
  let totalCount = 0;
  const numOfRows = 1000;

  try {
    do {
      const response = await fetchPageData(pageNo, numOfRows);
      console.log(`API response for page ${pageNo}:`, response);

      const data = response.StanReginCd;
      if (data && data.length > 1 && data[1].row) {
        allData = allData.concat(data[1].row);
        totalCount = parseInt(data[0].head[0].totalCount);
        pageNo++;
      } else {
        break;
      }
    } while ((pageNo - 1) * numOfRows < totalCount);
  } catch (error) {
    console.error('Error fetching data:', error.message); // 에러 메시지 출력
  }
  return allData;
}

async function initializeData() {
  const allData = await fetchAllData();

  const extractedData = allData.map(item => {
    const addressParts = item.locatadd_nm.split(' ');
    const firstWord = addressParts[0];
    const secondWord = addressParts[1] || '';
    const thirdWord = addressParts[2] || '';
    return {
      ...item,
      firstWord: firstWord,
      secondWord: secondWord,
      thirdWord: thirdWord
    };
  });

  return extractedData;
}
// 서버 시작 시 데이터 초기화
(async () => {
  cachedData = await initializeData();
  console.log('Data initialized');
})();

// 라우터 설정
app.get('/api/provinces', (req, res) => {
  if (cachedData) {
    const provinces = [...new Set(cachedData.map(item => item.firstWord))].filter(Boolean).sort();
    res.json(provinces); 
  } else {
    res.status(500).send('Data not yet available');
  }
});

app.get('/api/cities', (req, res) => {
  const { province } = req.query;
  if (cachedData) {
    const filteredCities = cachedData.filter(item => item.firstWord === province);
    const cities = [...new Set(filteredCities.map(item => item.secondWord))].filter(Boolean).sort();
    res.json(cities); 
  } else {
    res.status(500).send('Data not yet available');
  }
});

app.get('/api/towns', (req, res) => {
  const { city } = req.query;
  if (cachedData) {
    const filteredTowns = cachedData.filter(item => item.secondWord === city);
    const towns = [...new Set(filteredTowns.map(item => item.thirdWord))].filter(Boolean).sort();
    res.json(towns); 
    res.status(500).send('Data not yet available');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});