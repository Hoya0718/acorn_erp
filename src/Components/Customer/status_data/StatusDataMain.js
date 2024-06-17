import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import TabButton from './TabButton';
import Table from './Table';
import PeriodSearch from './PeriodSearch';
import Table_Dist from './TableDist';
import Table_Prod from './TableTopProd';
import Table_Rank from './TableRank';
import Pagination from './Pagination';
import CustomerStatusSettingModal from '../settingModal/settingModal.js';

const Customer_status = ()=> {
  const [activeTab, setActiveTab] = React.useState('distribution');

  const renderTable = () => {
    switch (activeTab) {
      case 'distribution':
        return <Table_Dist />;
      case 'product':
        return <Table_Prod />;
      case 'ranking':
        return <Table_Rank />;
      default:
        return null;
    }
  };
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
                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#SettingModal">
                  <FontAwesomeIcon icon={faGear} />
                </button>
              </div>
          </div>
          <hr /> 
          <div className="content">
            <section>
              <div className='row'>
                <div className='col'>
                  <TabButton activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className='col'>
                  <PeriodSearch/>
                </div>
              </div>
                {renderTable()}
            </section>
            <Pagination/>
          </div>
          <CustomerStatusSettingModal />
        </div>
    );
}

export default Customer_status;