import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import StatusDataTable from './StatusDataTable';

const Customer_status = ()=> {
    return (
        <div className="Customer_status">
          <div className="row">
            <div className="col title">
              <span> 회원 현황 데이터 </span>
            </div>
              <div className="col-3  righted" >
                <Link to="../cusStatus">
                    <input type="submit" className="btn btn-dark" value="데이터"/>
                </Link>
              </div>
              <div className="col-1 centered">
                <FontAwesomeIcon icon={faGear} />
              </div>
          </div>
          <hr /> 
          <div className="content">
            <section>
                <StatusDataTable/>
            </section>
          </div>
        </div>
    );
}

export default Customer_status;