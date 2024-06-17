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
import CustomerStatusPagination from './Pagination';
import CustomerStatusSettingModal from '../settingModal/settingModal.js';

const Customer_status = () => {
  const [activeTab, setActiveTab] = React.useState('distribution');
  const [activeLabel, setActiveLabel] = React.useState('고객분포');
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const itemsPerPage = 10; // 페이지당 항목 수
 
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const renderTable = () => {
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const currentData = data.slice(startIndex, endIndex);

    switch (activeTab) {
      case 'distribution':
        return <Table_Dist activeLabel={activeLabel} />;
      case 'product':
        return <Table_Prod activeLabel={activeLabel} />;
      case 'ranking':
        return <Table_Rank activeLabel={activeLabel} />;
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
            <input type="submit" className="btn btn-dark" value="데이터" />
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
              <TabButton activeTab={activeTab} setActiveTab={setActiveTab} setActiveLabel={setActiveLabel} />
            </div>
            <div className='col'>
              <PeriodSearch />
            </div>
          </div>
          {renderTable()}
        </section>
         <CustomerStatusPagination
          // totalItems={data.length}
          // itemsPerPage={itemsPerPage}
          // currentPage={currentPage}
          // onPageChange={handlePageChange}
           /> 
      </div>
      <CustomerStatusSettingModal />
    </div>
  );
}

export default Customer_status;