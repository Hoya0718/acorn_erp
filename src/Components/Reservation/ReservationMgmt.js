import * as React from 'react'
import "../Main/Main.css"

<<<<<<< HEAD
const ReservationMgmt= ()=> {
=======
const IncomeMgmt= ()=> {
>>>>>>> 205aede3a4b70a2fac3d1f8ba3d6584d2875f101
    return (
        <div>
    
          <div className="Middle classification">
<<<<<<< HEAD
            <span>예약 현황</span>
=======
            <span>매입 관리</span>
>>>>>>> 205aede3a4b70a2fac3d1f8ba3d6584d2875f101
          </div>
    
          <hr />
    
          <div className="subTitle"> 
            <span>(소분류 버튼) or (등록,수정,삭제 버튼)</span>
          </div>
    
          <br />
          
          <div className="searcher">
            
            <div className="left">
              <label for="date">날짜를 선택하세요:
                <input type="date" id="date" max="2077-06-20" min="2077-06-05" value="2024-07-18" />
              </label>
            </div>
    
            <div className="right">
              <input type="text" placeholder='검색' /><button>조회</button>
            </div>
    
          </div>
    
          <div>
            <section>
              테이블링.
            </section>
          </div>
        </div>
    );
}

<<<<<<< HEAD
export default ReservationMgmt;
=======
export default IncomeMgmt;
>>>>>>> 205aede3a4b70a2fac3d1f8ba3d6584d2875f101
