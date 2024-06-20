import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reservation.css';

const MainReg = () => {
  const closeWindow = () => {
    // 창을 닫는 로직을 여기에 추가하세요.
    console.log('Window closed');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>예약 등록 작성</h1>
      <br /><br /><br />
      <main>
        <div>
          <form>
            <table id="calculator_table" border="1" align="center" style={{ width: '100%', maxWidth: '800px' }}>
              <thead>
                <tr>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>예약자 이름</th>
                  <td style={{ width: '30%' }}><input type="text" name="menu" placeholder="예약자 이름" style={{ fontSize: '15px', width: '100%' }} /></td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>휴대전화</th>
                  <td style={{ width: '30%' }}><input type="text" name="price" placeholder="휴대전화" style={{ fontSize: '15px', width: '100%' }} /></td>
                </tr>
                <tr>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>결제 방식</th>
                  <td style={{ width: '30%' }}><input type="text" name="price" placeholder="결제 방식" style={{ fontSize: '15px', width: '100%' }} /></td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>추가 요청사항</th>
                  <td style={{ width: '30%' }}><input type="text" name="price" placeholder="추가 요청사항" style={{ fontSize: '15px', width: '100%' }} /></td>
                </tr>
                <tr>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>성별</th>
                  <td style={{ width: '30%' }}><input type="text" name="price" placeholder="성별" style={{ fontSize: '15px', width: '100%' }} /></td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>예약 일시</th>
                  <td style={{ width: '30%' }}><input type="text" name="price" placeholder="예약 일시" style={{ fontSize: '15px', width: '100%' }} /></td>
                </tr>
                <tr>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>예약 번호</th>
                  <td style={{ width: '30%' }}><input type="text" name="price" placeholder="예약 번호" style={{ fontSize: '15px', width: '100%' }} /></td>
                  <th scope="col" style={{ width: '20%', fontSize: '16px', whiteSpace: 'nowrap' }}>인원 수</th>
                  <td style={{ width: '30%' }}><input type="text" name="price" placeholder="인원 수" style={{ fontSize: '15px', width: '100%' }} /></td>
                </tr>
              </thead>
            </table>
          </form>
        </div>
        <br /><br />
        <section id="calculator" align="center">
          <div id="calculator_addBtn">
            <button id="add_reg">등록</button>
            <button id="add_cancel" onClick={closeWindow}>취소</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainReg;
