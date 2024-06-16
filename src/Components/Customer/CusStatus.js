import * as React from 'react'
import "../Main/Main.css"
import "./Customer.css"
import CustomerMain from './status/CustomerMain.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import "./Customer.css"
import { Link } from 'react-router-dom';
import CustomerStatusSettingModal from './settingModal/settingModal.js';

const Customer_status = ()=> {
    return (
        <div className="Customer_status">
          <div className="row">
            <div className="col title">
              <span> 회원 현황 </span>
            </div>
              <div className="col-3  righted" >
                <Link to="/customerMgmt/StatusDataMain">
                  <input type="submit" className="btn btn-outline-dark" value="데이터"/>
                </Link>
              </div>
              <div className="col-1 centered">
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#SettingModal">
                  <FontAwesomeIcon icon={faGear} />
                </button>
              </div>
              
          </div>
          <hr /> 
          <div className="content">
            <section>
              <CustomerMain/>
            </section>
          </div>
          <CustomerStatusSettingModal />
        </div>
    );
}

export default Customer_status;