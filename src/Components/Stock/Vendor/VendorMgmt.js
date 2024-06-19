import React from "react";
import './Vendor.css';
import '../../Main/Main.css'



const Vendor = () => {

  // 달력 오늘 날짜로 설정하는 함수
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
  
    // 월과 일이 한 자리 수인 경우, 앞에 0을 추가하여 두 자리로 만듭니다.
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
  
    // yyyy-mm-dd 형식의 문자열로 반환합니다.
    return `${year}-${month}-${day}`;
  }


  return (
   
    <div>
    
    <div className="Middle classification">
      <span> 거래처 관리 </span>
    </div>

    <hr />
    

    <div className="subTitle"> 
      <span>
        <button>등록</button>
        <button>수정</button>
        <button>삭제</button>
      </span>
    </div>

    <br />
    
    <div className="searcher">
      
      {/* 캘린더 */}
      <div className="left">
        <label htmlFor="startDate">
          <input type="date" id="startDate" max="2077-06-20" min="2024-06-05" defaultValue={getCurrentDate()} />
        </label>
        <label htmlFor="endDate">
          <input type="date" id="endDate" max="2077-06-20" min="2024-06-05" defaultValue={getCurrentDate()} />
        </label>

          {/* 정렬기준 */}
        <label htmlFor="sorting">
          <select name="vendorSorting">
            <option selected>거래처 코드</option>
            <option>거래처명</option>
            <option>거래처 연락처</option>
          </select>
        </label>
      </div>



      {/* 검색창 */}
      <div className="right">
        <input type="text" placeholder='검색' /><button>조회</button>
      </div>

    </div>

    <div>
      <section>        
        <div>
          <table className='purchaseTable' color='black' border='2px'>
            <thead>
              <tr>
                <th><input type='checkbox'></input></th>
                <th>코드</th> <th>이름</th> <th>단위</th> <th>발주 일자</th> <th>발주 수량</th> <th>원가</th> <th>특이사항</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type='checkbox'></input></td>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr> 
            </tbody>
          
          </table>
        </div>
      </section>
    </div>
  </div>

  );
};

export default Vendor;