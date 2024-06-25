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
  const [tableData, setTableData] = React.useState([]); //전체 데이터
  const [filteredData, setFilteredData] = React.useState([]); //기간 및 검색어의해 걸러진 데이터
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //블럭당 보여질 행 갯수
  const [currentPage, setCurrentPage] = React.useState(1);  //현재 페이지

  React.useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);

  const handleSearch = () => {
    //const data = [{ header: '10대이하', key: 'age_10', format: (value) => value.toLocaleString(), className: 'table-centered' }];
    const [data, setDatas] = [
      { productName: '상품1', salesCount: 10, salesAmount: 1000, salesRating: 4.7, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품2', salesCount: 9, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품3', salesCount: 58, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품4', salesCount: 51, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품5', salesCount: 51, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품6', salesCount: 51, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품7', salesCount: 52, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품8', salesCount: 54, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품9', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품10', salesCount: 51, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품11', salesCount: 45, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품12', salesCount: 65, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품13', salesCount: 25, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품14', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품15', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품16', salesCount: 25, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품17', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품18', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품19', salesCount: 25, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품20', salesCount: 25, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품21', salesCount: 35, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품22', salesCount: 95, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품23', salesCount: 55, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품24', salesCount: 55, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품25', salesCount: 2, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품26', salesCount: 3, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품27', salesCount: 5555, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품28', salesCount: 52, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품29', salesCount: 45, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품30', salesCount: 15, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품26', salesCount: 3, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품27', salesCount: 5555, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품28', salesCount: 52, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },
      { productName: '상품29', salesCount: 45, salesAmount: 500, salesRating: 2.8, preferredgender: '남성', preferredageGroup: '30대', preferredregionGroup: '서울', },

    // 필요한 만큼 데이터를 추가
    ];
    const filtered = tableData.filter(item => {
      const withinPeriod = period.startDate && period.endDate ?
        new Date(item.date) >= new Date(period.startDate) && new Date(item.date) <= new Date(period.endDate) :
        true;
      const matchesKeyword = item.name.includes(keyword);
      return withinPeriod && matchesKeyword;
    });
    setFilteredData(filtered);
  };
  const handleSort = (key, direction) => {
    if (direction) {
      const sortedData = [...filteredData].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      });
      setFilteredData(sortedData);
    } else {
      setFilteredData(tableData);
    }
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderTable = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    switch (activeTab) {
      case 'distribution':
        return (
          <div>
            <Table_Dist
              activeLabel={activeLabel}
              data={currentData}
              onSort={handleSort}
            />
          </div>
        )
      case 'product':
        return (
          <div>
            <Table_Prod
              activeLabel={activeLabel}
              data={currentData}
              onSort={handleSort}
              totalItems={filteredData.length}
              itemsPerPage={rowsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <CustomerStatusPagination
              totalItems={filteredData.length}
              itemsPerPage={rowsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )
      case 'ranking':
        return (
          <div>
            <Table_Rank
              activeLabel={activeLabel}
              data={currentData}
              onSort={handleSort}
              totalItems={filteredData.length}
              itemsPerPage={rowsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <CustomerStatusPagination
              totalItems={filteredData.length}
              itemsPerPage={rowsPerPage}
              currentPage={currentPage}
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
                <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                  <option value={10}>10줄 보기</option>
                  <option value={20}>20줄 보기</option>
                  <option value={30}>30줄 보기</option>
                  <option value={40}>40줄 보기</option>
                  <option value={50}>50줄 보기</option>
                </select>
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