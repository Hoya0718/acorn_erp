import * as React from 'react'
import "../../Main/Main.css"

const CustomerMain = () => {
  return (
    <div>
      <div className="c_main">
        <span> 회원 현황 </span>
      </div>
      <hr />
      <div>
        <section>
          <div className="right">
            <div className="right-up" style={{marginBottom: "-15px"}}>
              {/* <!-- 상단 내용  --> */}
              <div className="row">
                {/* <!-- 제목 --> */}
                <div className="col-6">
                  <h1>고객현황</h1>
                </div>
                {/* <!-- 버튼 --> */}
                <div className="col-5 centered-right-content " >
                  <input type="button" className="btn btn-primary"
                    value="고객현황"
                    onclick="window.location.href = '/TeamProject/status.do';" /> &nbsp;&nbsp;
                  <input type="submit" className="btn btn-outline-primary centered-right-content" value="데이터"
                    onclick="window.location.href = '/TeamProject/delete.do';" />
                </div>

                {/* <!-- 설정메뉴 --> */}
                <div className="col-1 centered-content">
                  <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img className="settingbutton" src="${pageContext.request.contextPath}/picture/settingbutton.png" alt="Settings Button" />
                  </button>
                </div>
                {/* <!-- 설정 이모티콘 -->		 */}
                <i className="bi bi-gear"></i>
              </div>
            </div>
            <div className="right-mid" style={{display: "flex", paddingTop: "15px"}}>
              <section id="sec">
                <div>
                  <div>
                    <div className="row">
                      {/* <!-- 고객수목표 달성도 --> */}
                      <div className="col-xl-3 col-lg-12" style={{marginTop: "10px"}}>
                        {/* <!-- 칸이 작아지면 수직정렬 --> */}
                        {/* <%@ include file="c_goal.jsp"%> */}
                      </div>
                      {/* <!-- 고객분포도 --> */}
                      <div className="col-xl-9 col-lg-12" style={{marginTop: "10px"}}>
                        {/* <%@ include file="c_dist.jsp"%> */}
                      </div>
                    </div>
                  </div>
                  {/* <!-- 상품별 선호도 내용 --> */}
                  <div className="row" id="section1" style={{marginTop: "20px"}}>
                    {/* <%@ include file="prod_preference.jsp"%> */}
                  </div>

                  {/* <!-- 고객구매실적 --> */}
                  <div className="row" style={{marginTop: "20px"}}>
                    {/* <%@ include file="c_rank.jsp"%> */}
                  </div>
                </div>
              </section>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

export default CustomerMain;