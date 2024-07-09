import * as React from 'react'
import { useEffect } from 'react'; // useEffect 추가
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
import SearchButtonModule from '../modules/SearchButtonModule.js'
import KeywordSearch from '../modules/SearchModule.js'
import DropdownModule from '../modules/DropdownModule';
import { Button } from 'react-bootstrap';

const Customer_status = ({
  onSearch
}) => {
  const [activeTab, setActiveTab] = React.useState('distribution'); //탭버튼 상태(대분류)
  const [activeLabel, setActiveLabel] = React.useState('고객분포');  //탭버튼 상태(소분류)
  const [period, setPeriod] = React.useState({}); //기간
  const [startDate, setStartDate,] = React.useState({}); //기간
  const [endDate, setEndDate,] = React.useState({}); //기간
  const [searchKeyword, setSearchKeyword,] = React.useState(''); //검색어
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //블럭당 보여질 행 갯수
  const [currentPage, setCurrentPage] = React.useState(1);  //현재 페이지
  const [selectedOption_dropdown, setSelectedOption_dropdown] = React.useState('10줄 보기');
  const dropdownData = ['10줄 보기', '20줄 보기', '30줄 보기', '40줄 보기', '50줄 보기'];
  const handleSelect_dropdown = (option) => {
    setSelectedOption_dropdown(option);
    const newRowsPerPage = Number(option.replace('줄 보기', ''));
    setRowsPerPage(newRowsPerPage);
    localStorage.setItem('CusMgmtRowsPerPage', newRowsPerPage);
};

  useEffect(() => {
    const savedRowsPerPage = localStorage.getItem('StatusDataRowsPerPage');
    if (savedRowsPerPage) {
      setRowsPerPage(Number(savedRowsPerPage));
    }
  }, []);

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = Number(event.target.value);
    setRowsPerPage(newRowsPerPage);
    localStorage.setItem('StatusDataRowsPerPage', newRowsPerPage);  // 행수 저장
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
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate} 
              setEndDate={setEndDate}
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
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate} 
              setEndDate={setEndDate}
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
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate} 
              setEndDate={setEndDate}
            />
          </div>
        )
      default:
        return null;
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
};
  return (
    <div className="Customer_status">
      <div className="row">
        <div className="col title">
          <span> 회원 현황 데이터 </span>
        </div>
        <div className="col-3  righted"
        style={{margin: "0px"}} >
          <a href={"/layout/customerMgmt/cusStatus"}>
            <Button>
              데이터
            </Button>
          </a>
        </div>
        <div className="col-1 uppered">
          <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#SettingModal">
            <FontAwesomeIcon icon={faGear} style={{ fontSize: '2em' }} />
          </button>
        </div>
      </div>
      <hr />
      <div className="content">
        <section>
        <TabButton activeTab={activeTab} setActiveTab={setActiveTab} setActiveLabel={setActiveLabel} />           
                <PeriodSearch setPeriod={setPeriod} />
            <div className='row'>
              <div className='col-2'>
                {activeTab !== 'distribution' && (
                  <DropdownModule
                  selectedOption={selectedOption_dropdown}
                  handleSelect={handleSelect_dropdown}
                  options={dropdownData}
              />
                )}
              </div>
                <div className='col-10 righted uppered'
                  style={{ marginBottom: '-15px' }}
                >
                  <KeywordSearch
                    value={searchKeyword}
                    onChange={handleSearchChange} />
                  &nbsp;  &nbsp;
                  <SearchButtonModule
                    value={searchKeyword}
                    onClick={onSearch}
                  />
                </div>
                <br></br>
            </div>
            {renderTable()}
        </section>
      </div>
      <CustomerStatusSettingModal />
    </div>
  );
}

export default Customer_status;