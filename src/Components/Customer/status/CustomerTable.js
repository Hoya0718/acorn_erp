import * as React from 'react'
import "../../Main/Main.css"

const CustomerTable = () => {
  return (
    <div>
      <div className="c_table">
        <span> 회원 현황 </span>
      </div>
      <hr />
      <div>
        <section>
          <div className="right">
            <div className="right-up">

              <div className="row">
                {/* <!-- 제목 --> */}
                <div className="col-4">
                  <h1>고객현황</h1>
                </div>
                <div className="col-5 ">

                </div>
                {/* <!-- 버튼 --> */}
                <div className="col-2 centered-right-content ">
                  <input 
                    type="button" 
                    className="btn btn-outline-primary centered-right-content"
                    value="고객현황"
                    onclick="window.location.href = '/TeamProject/status.do';" /> &nbsp;&nbsp;
                  <input 
                    type="submit" 
                    className="btn btn-primary centered-right-content" 
                    value="데이터"
                    onclick="window.location.href = '/TeamProject/delete.do';" />
                </div>
                <div className="col-1 centered-content">
                  <form 
                    action="/TeamProject/customerStatus/settings.jsp"
                    method="get">
                    <input 
                      type="image" 
                      className="settingbutton"
                      src="${pageContext.request.contextPath}/picture/settingbutton.png" 
                    />
                  </form>
                </div>
              </div>

            </div>
            <div className="right-mid">
              <section id="sec">
                <div className="row">
                  <div className="col-4">
                  </div>
                  <div className="col-6" id="search_box">
                    <div className="radio centered-right-content ">
                      <input type="radio" name="serch_for" id="3months" onclick="handleSubmit()" />&nbsp;3개월&nbsp;&nbsp;
                      <input type="radio" name="serch_for" id="6months" onclick="handleSubmit()" />&nbsp;6개월&nbsp;&nbsp;
                      <input type="radio" name="serch_for" id="1year" onclick="handleSubmit()" />&nbsp;1년&nbsp;&nbsp;
                      <input type="radio" name="serch_for" id="custom" onclick="handleSubmit()" />&nbsp;사용자 지정<br />
                    </div>
                    <div className="date centered-right-content">
                      {/* <!-- 사용자 지정 체크여부에 따라 활성화 --> */}
                      <input type="date" id="startDate" disabled />&nbsp;~&nbsp;
                      <input type="date" id="endDate" disabled />&nbsp;
                      <input type="text" id="keyword" />&nbsp;
                      <input type="submit" value="조회" className="btn btn-secondary" />
                    </div>
                  </div>
                  <div className="col-2  centered-right-content" id="crud_box ">
                    <input 
                    type="button" 
                    value="추가" 
                    />&nbsp;&nbsp;
                    <input 
                    type="button" 
                    value="삭제" 
                    />&nbsp;&nbsp;
                  </div>
                </div>
                <div id="alertPlaceholder"></div>
                <table className="table table-hover" style={{wordBreak: "breakAll"}}>
                  <thead>
                    <tr>
                      <th scope="col"><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></th>
                      <th scope="col">번호</th>
                      <th scope="col">주문번호</th>
                      <th scope="col">거래일자</th>
                      <th scope="col">상품명</th>
                      <th scope="col">판매수량</th>
                      <th scope="col">판매금액</th>
                      <th scope="col">고객명</th>
                      <th scope="col">고객아이디</th>
                      <th scope="col">생년월일</th>
                      <th scope="col">성별</th>
                      <th scope="col">연령그룹</th>
                      <th scope="col">지역그룹</th>
                      <th scope="col">특이사항</th>
                      <th scope="col">수정</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                      <tr>
                        <th scope="row"><input className="form-check-input" type="checkbox" id="flexCheckDefault" name="orderNum" value="${data.order_num}" /></th>
                        <th scope="row">{}</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <input 
                            type="submit" 
                            value="수정" 
                            className="btn btn-outline-secondary" 
                            onclick="passOrderNum(this)" /></td>
                      </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CustomerTable;