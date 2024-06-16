import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import TabButton from './TabButton';
import Table from './Table';
import PeriodSearch from './PeriodSearch';

const Customer_status = ()=> {
    return (
        <div className="Customer_status">
          <div className="row">
            <div className="col title">
              <span> 회원 현황 데이터 </span>
            </div>
              <div className="col-3  righted" >
                <Link to="/customerMgmt/cusStatus">
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
              <div className='row'>
                <div className='col'>
                  <TabButton/>
                </div>
                <div className='col'>
                  <PeriodSearch/>
                </div>
              </div>
                <Table/>
            </section>
          </div>
        </div>
    );
}

export default Customer_status;