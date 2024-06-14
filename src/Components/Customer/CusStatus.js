import * as React from 'react'
import "../Main/Main.css"
import CustomerMain from './status/CustomerMain.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const Customer_status = ()=> {
    return (
        <div className="Customer_status">
          <div className="title">
            <span>
              <span> 회원 현황 </span>
            </span>
            <span className="row">
              <span className="col-5 centered-right-content " >
                <input type="submit" className="btn btn-outline-primary centered-right-content" value="데이터"
                  onClick={() => (window.location.href = '/')}/>
              </span>
              <span className="col-1 centered-content">
                <FontAwesomeIcon icon={faGear} />
              </span>
            </span>
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