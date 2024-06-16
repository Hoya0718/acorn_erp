import * as React from 'react'
import "../../Main/Main.css"
import PeriodSearch from '../status_data/PeriodSearch'

const CustomerStatusSettingModal = () => {

    return (
        <div className="modal fade" id="SettingModal" tabIndex="-1" aria-labelledby="SettingModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="SettingModalLabel">설정</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <div><h4>목표선택</h4></div>
                            <div>현재 고객수 : { }</div>
                            <div>목표 고객수
                                <input type='number' />
                                <button type="button" className="btn btn-outline-dark" >저장</button>
                                <br></br>
                                <label>
                                    <input type='radio' name="goalOption" /> 전체고객수
                                </label>
                                <label>
                                    <input type='radio' name="goalOption" /> 목표고객수
                                </label>
                            </div>
                        </div>
                        <hr></hr>
                        <div>
                            <h4>기간선택</h4>
                            <PeriodSearch />
                        </div>
                        <hr></hr>
                        <div>
                            <h4>볼메뉴 선택</h4>
                            <h5>고객유치목표</h5>
                            <h5>고객분포도</h5>
                            <label>
                                <input type='checkbox' name="goalOption" />성별
                            </label>
                            <label>
                                <input type='checkbox' name="goalOption" /> 연령별
                            </label>
                            <label>
                                <input type='checkbox' name="goalOption" /> 지역별
                            </label>
                            <h5>상품별 고객선호도</h5>
                            <label>
                                <input type='checkbox' name="goalOption" />최고매출상품
                            </label>
                            <label>
                                <input type='checkbox' name="goalOption" />최다거래상품
                            </label>
                            <label>
                                <input type='checkbox' name="goalOption" />반응좋은상품
                            </label>
                            <h5>고객랭킹</h5>
                            <input type='range' />
                        </div>
                        <hr></hr>
                        <div>
                            <h4>지역분류선택</h4>
                            <label>
                                <input type='radio' name="goalOption" /> 전국
                            </label>
                            <label>
                                <input type='radio' name="goalOption" /> 시도
                            </label>
                            <label>
                                <input type='radio' name="goalOption" /> 시군구
                            </label>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    지역선택
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">서울특별시</a></li>
                                    <li><a class="dropdown-item" href="#">경기도</a></li>
                                    <li><a class="dropdown-item" href="#">경상도</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">취소</button>
                        <button type="button" className="btn btn-dark">저장</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerStatusSettingModal;