const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

// CORS 설정
app.use(cors());

// 기본 라우트 설정
app.get('/api/provinces', async (req, res) => {
    try {
      const response = await axios.get('http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList', {
        params: {
          ServiceKey: decodeURIComponent('66YBzAOO09yTFDqEcgyss5LcVKGuoQ7Gnq2XFo7El6I028k6zKPcRXRJ6zwWRQidZUDukhMF9TY5qc3IaE0gjg%3D%3D'),
          type: 'json',
          pageNo: 1,
          numOfRows: 100,
          flag: 'Y',
        }
      });
      console.log('API response:', response.data);  // 데이터 확인을 위한 콘솔 로그
      res.json(response.data.response.body.items); // 필요한 데이터만 추출
    } catch (error) {
      console.error('Error fetching data:', error.message); // 에러 메시지 출력
      if (error.response) {
          console.error('Error response data:', error.response.data); // 에러 응답 데이터 출력
          console.error('Error response status:', error.response.status); // 에러 응답 상태 출력
          console.error('Error response headers:', error.response.headers); // 에러 응답 헤더 출력
      }
      res.status(500).send('Error fetching data');
    }
  });
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });