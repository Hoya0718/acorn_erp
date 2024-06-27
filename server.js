require('dotenv').config(); // 환경 변수 로드
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;
// const baseURL = "https://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList";
// const serverKey_En = process.env.Enconding_API_KEY
// const serverKey_De = process.env.Decoding_API_KEY
const baseURL_Province = "https://api.vworld.kr/ned/data/admCodeList";
const baseURL_City = "https://api.vworld.kr/ned/data/admSiList";
const baseURL_Town = "https://api.vworld.kr/ned/data/admDongList";
const serverKey_Region = "48C7F5A0-50CE-33A3-89F1-2CF64F2E39DE"; //process.API_KEY_RegionGroup;

app.use(cors());

let cachedData = null; // 데이터를 캐싱할 변수

async function fetchProvincesData(retries = 3) {
  try {
    const response = await axios.get(baseURL_Province, {
      params: {
        key: serverKey_Region,
        format: 'json',
        domain: 'https://github.com/Hoya0718/acorn_erp',
      },
    });
    return response.data.admVOList||[];
  } catch (error) {
    console.error('Error fetching provinces data:', error.message);
    // if (retries > 0) {
    //   console.warn(`Retrying... (${3 - retries} attempts left)`);
    //   return fetchProvincesData(retries - 1);
    // } else {
      throw error;
    // }
  }
}
async function fetchCitiesData(provinceCode) {
  try {
    const response = await axios.get(baseURL_City, {
      params: {
        key: serverKey_Region,
        // admCode: provinceCode, //시도코드
        format: 'json',
        domain: 'https://github.com/Hoya0718/acorn_erp',
      },
    });
    return response.data.admVOList||[];
  } catch (error) {
    console.error('Error fetching cities data:', error.message);
    throw error;
  }
}
async function fetchTownsData(cityCode) {
  try {
    const response = await axios.get(baseURL_Town, {
      params: {
        key: serverKey_Region,
        admCode: cityCode, //시도시군구코드
        format: 'json',
        domain: 'https://github.com/Hoya0718/acorn_erp',
      },
    });
    return response.data.admVOList||[];
  } catch (error) {
    console.error('Error fetching towns data:', error.message);
    throw error;
  }
}

// 라우터 설정
app.get('/api/provinces', async(req, res) => {
  try {
    const provinces = await fetchProvincesData();
    res.json(provinces||[]);
  } catch (error) {
    res.status(500).send('Error fetching provinces data');
  }
});

app.get('/api/cities',  async (req, res) => {
  const { provinceCode } = req.query;
  if (!provinceCode) {
    return res.status(400).send('Province code is required');
  }
  try {
    const cities = await fetchCitiesData(provinceCode);
    res.json({ admVOList: cities }||[]);
  } catch (error) {
    res.status(500).send('Error fetching cities data');
  }
});

app.get('/api/towns', async (req, res) => {
  const { cityCode } = req.query;
  if (!cityCode) {
    return res.status(400).send('City code is required');
  }
  try {
    const towns = await fetchTownsData(cityCode);
    res.json(towns||[]);
  } catch (error) {
    res.status(500).send('Error fetching towns data');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`serverKey_Region`,serverKey_Region);
});