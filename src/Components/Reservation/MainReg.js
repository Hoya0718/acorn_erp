import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reservation.css';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';

const buttonStyle = {
  padding: '8px 16px',  // 패딩을 줄임
  fontSize: '13px',     // 폰트 크기를 줄임
  borderRadius: '6px',  // 모서리 반경을 약간 줄임
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  // 그림자를 약간 줄임
  transition: 'all 0.3s ease',
  width: '100px'        // 버튼 너비를 줄임
};

const MainReg = () => {
  const { reservations, addReservation, updateReservation } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    reservationDate: '',
    requests: '',
    payment: '',
    phone: '',
    gender: '',
    rsCount: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const existingReservation = reservations.find(res => res.id === parseInt(id));
      if (existingReservation) {
        setFormData(existingReservation);
      }
    } else {
      // 새 예약 등록 시 자동으로 가장 높은 예약번호 + 1을 할당
      const highestId = Math.max(...reservations.map(res => res.id), 0);
      setFormData(prev => ({ ...prev, id: (highestId + 1).toString() }));
    }
  }, [id, isEditMode, reservations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.reservationDate || !formData.payment) {
      setErrorMessage('등록이 불가합니다. 필수 입력 필드를 확인하세요.');
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(`/reservations/${formData.id}`, formData);
        updateReservation(formData);
      } else {
        await axios.post('/reservations', formData);
        addReservation(formData);
      }
      
      // 예약번호 순으로 정렬된 새로운 예약 목록 생성
      const updatedReservations = [...reservations, formData].sort((a, b) => a.id - b.id);
      
      navigate('/layout/reservationMgmt/resTable', { state: { reservations: updatedReservations } });
    } catch (error) {
      console.error("Error saving reservation:", error);
      setErrorMessage('예약 저장 중 오류가 발생했습니다. 다시 시도하세요.');
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333333', // Dark gray 
    backgroundColor: '#ADD8E6', // Light blue background
    padding: '20px',
    borderRadius: '10px',
    margin: '20px 0',}}>{isEditMode ? '예약 수정' : '예약 등록'}</h2>
      <br /><br />
      <main>
        <div>
          <form onSubmit={handleSubmit}>
            <table id="calculator_table" align="center" style={{ width: '100%', maxWidth: '500px', borderCollapse: 'separate', borderSpacing: '0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap', padding: '10px' }}>예약자 이름</th>
                  <td style={{ width: '30%', padding: '10px' }}>
                    <input type="text" name="name" placeholder="예약자 이름" style={{ fontSize: '15px', width: '100%', borderRadius: '4px', padding: '5px' }} onChange={handleChange} value={formData.name} />
                  </td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap', padding: '10px' }}>휴대전화</th>
                  <td style={{ width: '30%', padding: '10px' }}>
                    <input type="text" name="phone" placeholder="010-0000-0000" style={{ fontSize: '15px', width: '100%', borderRadius: '4px', padding: '5px' }} onChange={handleChange} value={formData.phone} />
                  </td>
                </tr>
                <tr>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap', padding: '10px' }}>결제 방식</th>
                  <td style={{ width: '30%', padding: '10px' }}>
                    <select
                      name="payment"
                      style={{ fontSize: '12px', width: '100%', borderRadius: '4px', padding: '5px' }}
                      onChange={handleChange}
                      value={formData.payment}
                    >
                      <option value="">결제 방식을 선택하세요</option>
                      <option value="카드">카드</option>
                      <option value="계좌이체">계좌이체</option>
                      <option value="네이버페이">네이버페이</option>
                    </select>
                  </td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap', padding: '10px' }}>추가 요청사항</th>
                  <td style={{ width: '30%', padding: '10px' }}>
                    <input type="text" name="requests" placeholder="추가 요청사항" style={{ fontSize: '15px', width: '100%', borderRadius: '4px', padding: '5px' }} onChange={handleChange} value={formData.requests} />
                  </td>
                </tr>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap', padding: '10px' }}>성별</th>
                  <td style={{ width: '30%', padding: '10px' }}>
                    <select
                      name="gender"
                      style={{ fontSize: '12px', width: '100%', borderRadius: '4px', padding: '5px' }}
                      onChange={handleChange}
                      value={formData.gender}
                    >
                      <option value="">성별을 선택하세요</option>
                      <option value="남자">남자</option>
                      <option value="여자">여자</option>
                    </select>
                  </td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap', padding: '10px' }}>예약 일시</th>
                  <td style={{ width: '30%', padding: '10px' }}>
                    <input type="date" name="reservationDate" style={{ fontSize: '15px', width: '100%', borderRadius: '4px', padding: '5px' }} onChange={handleChange} value={formData.reservationDate} />
                  </td>
                </tr>
                <tr>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap', padding: '10px' }}>예약 번호</th>
                  <td style={{ width: '30%', padding: '10px' }}>
                    <input type="text" name="id" placeholder="예약 번호" style={{ fontSize: '15px', width: '100%', borderRadius: '4px', padding: '5px' }} onChange={handleChange} value={formData.id} readOnly={!isEditMode} />
                  </td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap', padding: '10px' }}>인원 수</th>
                  <td style={{ width: '30%', padding: '10px' }}>
                    <input type="text" name="rsCount" placeholder="인원 수" style={{ fontSize: '15px', width: '100%', borderRadius: '4px', padding: '5px' }} onChange={handleChange} value={formData.rsCount} />
                  </td>
                </tr>
              </thead>
            </table>
            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
            <br/><br/>
            <section id="calculator" align="center">
              <div id="calculator_addBtn">
                <button 
                  type="submit" 
                  id="add_reg" 
                  className="btn btn-primary btn-lg m-2"
                  style={buttonStyle}
                >
                  {isEditMode ? '수정' : '등록'}
                </button>
                <button 
                  type="button" 
                  id="add_cancel" 
                  className="btn btn-danger btn-lg m-2"
                  onClick={() => navigate('/layout/reservationMgmt')}
                  style={buttonStyle}
                >
                  취소
                </button>
              </div>
            </section>
          </form>
        </div>
      </main>
    </div>
  );
};

export default MainReg;
