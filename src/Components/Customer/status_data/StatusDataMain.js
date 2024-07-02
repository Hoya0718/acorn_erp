import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import TabButton from '../modules/TabButtonModule';
import PeriodSearch from '../modules/PeriodSearchModule';
import Table_Dist from './TableDist';
import Table_Prod from './TableTopProd';
import Table_Rank from './TableRank';
import CustomerStatusSettingModal from '../settingModal/settingModal.js';
import SearchButton from '../modules/SearchButtonModule.js'
import KeywordSearch from '../modules/KeywordSearchModule.js'
import CustomerStatusPagination from '../modules/PaginationModule.js';

const Customer_status = () => {
  const [activeTab, setActiveTab] = React.useState('distribution'); //탭버튼 상태(대분류)
  const [activeLabel, setActiveLabel] = React.useState('고객분포');  //탭버튼 상태(소분류)
  const [period, setPeriod] = React.useState({}); //기간
  const [keyword, setKeyword] = React.useState(''); //검색어
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //블럭당 보여질 행 갯수
  const [currentPage, setCurrentPage] = React.useState(1);  //현재 페이지



  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderTable = () => {

    switch (activeTab) {
      case 'distribution':
        return (
          <div>
            <Table_Dist
              activeLabel={activeLabel}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        )
      case 'product':
        return (
          <div>
            <Table_Prod
              activeLabel={activeLabel}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        )
      case 'ranking':
        return (
          <div>
            <Table_Rank
              activeLabel={activeLabel}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        )
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
          <Link to="/layout/customerMgmt/cusStatus">
            <input type="submit" className="btn btn-dark" value="데이터" />
          </Link>
        </div>
        <div className="col-1 centered">
          <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#SettingModal">
            <FontAwesomeIcon icon={faGear} style={{ fontSize: '2em' }} />
          </button>
        </div>
      </div>
      <hr />
      <div className="content">
        <section>
          <form>
            <div className='row'>
              <div className='col'>
                <TabButton activeTab={activeTab} setActiveTab={setActiveTab} setActiveLabel={setActiveLabel} />
                {activeTab !== 'distribution' && (
                  <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                    <option value={10}>10줄 보기</option>
                    <option value={20}>20줄 보기</option>
                    <option value={30}>30줄 보기</option>
                    <option value={40}>40줄 보기</option>
                    <option value={50}>50줄 보기</option>
                  </select>
                )}
              </div>
              <div className='col-4'>
                <PeriodSearch setPeriod={setPeriod} />
                <KeywordSearch setKeyword={setKeyword} />
                <br></br>
              </div>
              <div className='col-1 centered'>
                {/* <SearchButton onSearch={handleSearch} /> */}
              </div>
            </div>
            {renderTable() }
          </form>
        </section>
      </div>
      <CustomerStatusSettingModal />
    </div>
  );
}

export default Customer_status;