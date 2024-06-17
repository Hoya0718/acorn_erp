// 작성자: 박승희
// 고객현황 메인페이지

import * as React from 'react'
import "../Main/Main.css"
import "./Customer.css"
import CustomerMain from './status/CustomerStatusChart.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import "./Customer.css"
import { Link } from 'react-router-dom';
import CustomerStatusSettingModal from './settingModal/settingModal.js';

const Customer_status = () => {
  return (
    <div className="Customer_status">
      <div className="row">
        <div className="col title">
          <span> 회원 현황 </span>
        </div>
        <div className="col-3  righted" >
          {/* 고객현황 데이터페이지로 연결되는 데이터 버튼 */}
          <Link to="/customerMgmt/StatusDataMain">
            <input type="submit" className="btn btn-outline-dark" value="데이터" />
          </Link>
        </div>
        <div className="col-1 centered">
          {/* 설정모달창 연결 버튼 */}
          <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#SettingModal">
            <FontAwesomeIcon icon={faGear} style={{ fontSize: '2em' }} />
          </button>
        </div>
      </div>
      <hr />
      <div className="content">
        {/* 데이터시각화자료 메인 페이지 */}
        <section>
          <CustomerMain />
        </section>
      </div>
      {/* 설장 모달 */}
      <CustomerStatusSettingModal />
    </div>
  );
}

export default Customer_status;