import React from 'react';

class ReservationForm extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>예약 등록 작성</h1>
        <br /><br /><br />
        <main>
          <div>
            <form>
              <table id="calculator_table" border="1" align="center">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '150px', fontSize: '16px' }}>예약자 이름</th>
                    <td style={{ width: '200px' }}><input type="text" name="menu" placeholder="예약자 이름" style={{ fontSize: '15px' }} /></td>
                    <th style={{ width: '150px', fontSize: '16px' }}>휴대전화</th>
                    <td style={{ width: '200px' }}><input type="text" name="price" placeholder="휴대전화" style={{ fontSize: '15px' }} /></td>
                  </tr>
                  <tr>
                    <th style={{ width: '150px', fontSize: '16px' }}>결제 방식</th>
                    <td style={{ width: '200px' }}><input type="text" name="price" placeholder="결제 방식" style={{ fontSize: '15px' }} /></td>
                    <th style={{ width: '150px', fontSize: '16px' }}>추가 요청사항</th>
                    <td style={{ width: '200px' }}><input type="text" name="price" placeholder="추가 요청사항" style={{ fontSize: '15px' }} /></td>
                  </tr>
                  <tr>
                    <th scope="col" style={{ width: '150px', fontSize: '16px' }}>성별</th>
                    <td style={{ width: '200px' }}><input type="text" name="price" placeholder="성별" style={{ fontSize: '15px' }} /></td>
                    <th style={{ width: '150px', fontSize: '16px' }}>예약 일시</th>
                    <td style={{ width: '200px' }}><input type="text" name="price" placeholder="예약 일시" style={{ fontSize: '15px' }} /></td>
                  </tr>
                  <tr>
                    <th style={{ width: '150px', fontSize: '16px' }}>예약 번호</th>
                    <td style={{ width: '200px' }}><input type="text" name="price" placeholder="예약 번호" style={{ fontSize: '15px' }} /></td>
                    <th style={{ width: '150px', fontSize: '16px' }}>인원 수</th>
                    <td style={{ width: '200px' }}><input type="text" name="price" placeholder="인원 수" style={{ fontSize: '15px' }} /></td>
                  </tr>
                </thead>
              </table>
            </form>
          </div>
          <br /><br />
          <section id="calculator" align="center">
            <div id="calculator_addBtn">
              <button id="add_reg">등록</button>
              <button id="add_cancel">취소</button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  closeWindow() {
    window.close(); // Close the current window
  }
}

export default ReservationForm;