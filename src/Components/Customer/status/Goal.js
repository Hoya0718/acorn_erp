import * as React from 'react'
import "../../Main/Main.css"

const Goal = () => {
    return (
        <div className="c_goal">
            <section>
                <div className='title'>
                    <h3>고객 유치 목표 달성도</h3>
                </div>
                <div className="app-card app-card-stat shadow-sm h-100 content" style={{ backgroundColor: 'white' }}>
                    <div className="app-card-body p-3 p-lg-4">
                        {/* <!-- 앱바디 안쪽 여백 등 글자 정렬 --> */}
                        {/* 현재 "{myname}"의 등록 고객은 {FormatNumber({ value: goal })}명 입니다.<br/><br/> */}
                        {/* <!-- 달성도 바 -->*/}
                        <div className="progress" style={{ height: '30px' }}>
                            <div className="progress-bar bg-success" role="progressbar" style={{ width: "100%" }}
                                aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{ }%
                            </div>
                        </div><br />
                        <div className="row">
                            <div className="col">
                                <h4>목표</h4>
                            </div>
                            <div className="col centered-right-content">
                                <h5>명</h5>
                            </div>
                        </div>	<br />
                        <div className="row">
                            <div className="col">
                                <h4>현재</h4>
                            </div>
                            <div className="col centered-right-content">
                                <h5> { }명</h5>
                            </div>
                        </div>
                        <div  className="row">
                            {/* <c:choose>
                                <c:when test="${customerData.c_achieve >= 50}">
                                    이제 목표까지 ${100 - 0}% 남았습니다!
                                </c:when>
                                <c:otherwise>
                                    목표를 벌써 ${}% 달성했어요!
                                </c:otherwise>
                            </c:choose> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Goal;