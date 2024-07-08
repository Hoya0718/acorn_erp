import * as React from 'react'
import "../Main/Main.css"
import "./Customer.css"
import CustomerMain from './status/CustomerStatusChart.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CustomerStatusSettingModal from './settingModal/settingModal.js'
import { CustomerStatusProvider } from './settingModal/CustomerStatusSettingContext.js'
import { Button } from 'react-bootstrap';

const Customer_status = () => {
  return (
    <div className="Customer_status">
      <div className="row">
        <div className="col title">
          <h3> 회원 현황 </h3>
        </div>
        <div className="col-3  righted" >
          <a href={"/layout/customerMgmt/statusDataMain"}>
            <Button>
              데이터
            </Button>
          </a>
        </div>
        <div className="col-1 centered">
          <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#SettingModal">
            <FontAwesomeIcon icon={faGear} style={{ fontSize: '2em' }} />
          </button>
        </div>
      </div>
      <hr />
      <CustomerStatusProvider>
        {/* 데이터시각화자료 메인 페이지 */}
        <div className="content customerStatusMainContent">
          <CustomerMain />
        </div>
        {/* 설정창 모달 */}
        <CustomerStatusSettingModal />
      </CustomerStatusProvider>
    </div>
  );
}

export default Customer_status;