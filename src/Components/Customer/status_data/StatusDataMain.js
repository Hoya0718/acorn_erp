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

const Customer_status = () => {
  const [activeTab, setActiveTab] = React.useState('distribution');
  const [activeLabel, setActiveLabel] = React.useState('고객분포');
  const [period, setPeriod] = React.useState({});
  const [keyword, setKeyword] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);

  const handleSearch = () => {
    const data = [{ header: '10대이하', key: 'age_10', format: (value) => value.toLocaleString(), className: 'table-centered' }];
    const filtered = data.filter(item => {
      const withinPeriod = period.startDate && period.endDate ? 
      new Date(item.date) >= new Date(period.startDate) && new Date(item.date) <= new Date(period.endDate) : 
      true;
      const matchesKeyword = item.name.includes(keyword); // 키워드 필터링 로직을 여기에 작성
      return withinPeriod && matchesKeyword;
    });
    setFilteredData(filtered);
  };

  const renderTable = () => {
    switch (activeTab) {
      case 'distribution':
        return <Table_Dist activeLabel={activeLabel} filteredData={filteredData} />;
      case 'product':
        return <Table_Prod activeLabel={activeLabel} filteredData={filteredData} />;
      case 'ranking':
        return <Table_Rank activeLabel={activeLabel} filteredData={filteredData} />;
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
              </div>
              <div className='col-4'>
                <PeriodSearch setPeriod={setPeriod} />
                <KeywordSearch setKeyword={setKeyword} />
                <br></br>
              </div>
              <div className='col-1 centered'>
                <SearchButton onSearch={handleSearch} />
              </div>
            </div>
            {renderTable()}
          </form>
        </section>
      </div>
      <CustomerStatusSettingModal />
    </div>
  );
}

export default Customer_status;