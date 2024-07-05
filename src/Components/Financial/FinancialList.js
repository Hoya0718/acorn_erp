import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
// import ExcelPrint from './ExcelPrint'; 
import DateComponent from './DateComponent';
import FinancialSearch from './FinancialSearch';
import './Financial.css'; 

const FinancialMgmt = () => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleDateChange = (start, end) => {
    // DateComponent에서 전달받은 날짜 범위 처리 로직
  };

  const handleSearchChange = (searchKeyword) => {
    setSearchTerm(searchKeyword); // 검색어 업데이트
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await axios.get('/items');
        setItems(itemsResponse.data);

        const ordersResponse = await axios.get('/orders');
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // orders와 items가 모두 데이터를 가져온 후에만 combinedData 생성
    const combinedData = orders.map(order => {
      const item = items.find(item => item.itemName === order.itemName);
      return {
        itemCode: item ? item.itemCode : '',
        itemType: item ? item.itemType : '',
        itemName: order.itemName,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus,
        orderPrice: order.orderPrice,
        orderTotalPrice: order.orderTotalPrice,
        itemQty: order.itemQty
      };
    });

    // 검색어에 따라 필터링된 데이터 업데이트
    if (searchTerm.trim() !== '') {
      const filtered = combinedData.filter(data =>
        data.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(combinedData);
    }
  }, [orders, items, searchTerm]);

  return (
    <div>
      <div className="Middle classification">
        <h3>재무 관리</h3>
      </div>
      <hr />
    
      <br />

      <div className="searcher">
        <div className="left">
          <DateComponent onChange={handleDateChange}/>
        </div>


        <div className='search'>
          <FinancialSearch searchKeyword={searchTerm} onSearch={handleSearchChange}/>
        </div>
      </div><br />

      <div>
        <section>
          <table className="table">
            <thead>
              <tr>
                <th>상품번호</th>
                <th>상품구분</th>
                <th>상품명</th>
                <th>거래일시</th>
                <th>결제상태</th>
                <th>금액</th>
                <th>단가</th>
                <th>수량</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.itemCode}</td>
                    <td>{data.itemType}</td>
                    <td>{data.itemName}</td>
                    <td>{data.orderDate}</td>
                    <td>{data.orderStatus}</td>
                    <td>{data.orderTotalPrice}</td>
                    <td>{data.orderPrice}</td>
                    <td>{data.itemQty}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
      
      {/* 엑셀&인쇄 */}
      {/* <div className="excel-print">
        <ExcelPrint combinedData={filteredData}/>       
      </div> */}
      
    </div>
  );
};

export default FinancialMgmt;
