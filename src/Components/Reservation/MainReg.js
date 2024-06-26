import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reservation.css';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';  // axios 불러오기

const MainReg = () => {
  const { reservations, addReservation, updateReservation } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    date: '',
    requests: '',
    payment: '',
    phone: '',
    gender: '',
    count: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const existingReservation = reservations.find(res => res.id === id);
      if (existingReservation) {
        setFormData(existingReservation);
      }
    }
  }, [id, isEditMode, reservations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.payment) {
      setErrorMessage('등록이 불가합니다. 필수 입력 필드를 확인하세요.');
      return;
    }
    try {console.log(id)
      if (isEditMode) {
        await axios.put(`/reservations/${formData.id}`, formData, {
          headers: { 'Content-Type': 'application/json' }
        });
        updateReservation(formData);
      } else {
        const response = await axios.post('/reservations', formData, {
          headers: { 'Content-Type': 'application/json' }
        });
        addReservation(response.data);
      }
      navigate('/layout/reservationMgmt/resTable');
    } catch (error) {
      console.error('Error saving reservation:', error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{isEditMode ? '예약 수정' : '예약 등록'}</h1>
      <br /><br /><br />
      <main>
        <div>
          <form onSubmit={handleSubmit}>
            <table id="calculator_table" border="1" align="center" style={{ width: '100%', maxWidth: '800px' }}>
              <thead>
                <tr>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>예약자 이름</th>
                  <td style={{ width: '30%' }}>
                    <input type="text" name="name" placeholder="예약자 이름" style={{ fontSize: '15px', width: '100%' }} onChange={handleChange} value={formData.name} />
                  </td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>휴대전화</th>
                  <td style={{ width: '30%' }}>
                    <input type="text" name="phone" placeholder="휴대전화" style={{ fontSize: '15px', width: '100%' }} onChange={handleChange} value={formData.phone} />
                  </td>
                </tr>
                <tr>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>결제 방식</th>
                  <td style={{ width: '30%' }}>
                    <input type="text" name="payment" placeholder="결제 방식" style={{ fontSize: '15px', width: '100%' }} onChange={handleChange} value={formData.payment} />
                  </td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>추가 요청사항</th>
                  <td style={{ width: '30%' }}>
                    <input type="text" name="requests" placeholder="추가 요청사항" style={{ fontSize: '15px', width: '100%' }} onChange={handleChange} value={formData.requests} />
                  </td>
                </tr>
                <tr>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>성별</th>
                  <td style={{ width: '30%' }}>
                    <input type="text" name="gender" placeholder="성별" style={{ fontSize: '15px', width: '100%' }} onChange={handleChange} value={formData.gender} />
                  </td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>예약 일시</th>
                  <td style={{ width: '30%' }}>
                    <input type="date" name="date" style={{ fontSize: '15px', width: '100%' }} onChange={handleChange} value={formData.date} />
                  </td>
                </tr>
                <tr>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>예약 번호</th>
                  <td style={{ width: '30%' }}>
                    <input type="text" name="id" placeholder="예약 번호" style={{ fontSize: '15px', width: '100%' }} onChange={handleChange} value={formData.id} disabled={isEditMode} />
                  </td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>인원 수</th>
                  <td style={{ width: '30%' }}>
                    <input type="text" name="count" placeholder="인원 수" style={{ fontSize: '15px', width: '100%' }} onChange={handleChange} value={formData.count} />
                  </td>
                </tr>
              </thead>
            </table>
            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
            <section id="calculator" align="center">
              <div id="calculator_addBtn">
                <button type="submit" id="add_reg">{isEditMode ? '수정' : '등록'}</button>
                <button type="button" id="add_cancel" onClick={() => navigate('/layout/reservationMgmt/resTable')}>취소</button>
              </div>
            </section>
          </form>
        </div>
      </main>
    </div>
  );
};

export default MainReg;
