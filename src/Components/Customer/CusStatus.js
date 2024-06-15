import * as React from 'react'
import "../Main/Main.css"
import "./Customer.css"
import CustomerMain from './status/CustomerMain.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import "./Customer.css"

const Customer_status = ()=> {
    return (
        <div className="Customer_status">
          <div className="row">
            <div className="col title">
              <span> 회원 현황 </span>
            </div>
              <div className="col-3  righted" >
                <input type="submit" className="btn btn-outline-primary" value="데이터"
                  onClick={() => (window.location.href = '/')}/>
              </div>
              <div className="col-1 centered">
                <FontAwesomeIcon icon={faGear} />
              </div>
          </div>
          <hr /> 
          <div className="content">
            <section>
              <CustomerMain/>
            </section>
          </div>
        </div>
    );
}

export default Customer_status;