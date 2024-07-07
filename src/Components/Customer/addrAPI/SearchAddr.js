import React, { useState } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';
import axios from '../../../api/axios';

const AddressSearchModal = ({ show, onHide }) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchAddr = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/provinces');
        if (response.data) {
          setResults(response.data.roadAddrPart1);
          
        } else {
          console.error('Expected an array but got:', response.data);
          setResults([]); // 빈 배열로 설정
        }
      } catch (error) {
        console.error('Error fetching addr data:', error);
        setResults([]); // 빈 배열로 설정
      }
    };
    fetchAddr();
  }, []);

  const searchAddress = async () => {
    if (searchText === '') {
      alert('주소를 입력해주세요');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=U01TX0FVVEgyMDI0MDcwNzEzMTM0NjExNDg5ODA=&currentPage=1&countPerPage=10&keyword=${searchText}&resultType=json`);
      const data = await response.json();
      console.log(data);
      setResults(data.results.juso || []);
    } catch (error) {
      console.error('Error fetching address:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>주소 검색</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          type="text"
          placeholder="도로명 또는 지번을 입력하세요"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={searchAddress} disabled={loading}>
          검색
        </Button>
        {loading && <p>검색 중...</p>}
        <ul>
          {results.map((item, index) => (
            <li key={index}>{item.roadAddr} ({item.jibunAddr})</li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default AddressSearchModal;