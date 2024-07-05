import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import ExcelPrint from './ExcelPrint';
import DateComponent from './DateComponent';
import FinancialSearch from './FinancialSearch';
import './Financial.css';

const FinancialMgmt = () => {
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    const handleDateChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    const handleSearchChange = (searchKeyword) => {
        setSearchTerm(searchKeyword);
    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
                console.log('Fetching items...');
                const response = await axios.get('/items');
                setItems(response.data);
                console.log("Item 데이터 호출 성공:", response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        const fetchOrders = async () => {
            try {
                console.log('Fetching orders...');
                const response = await axios.get('/orders');
                setOrders(response.data);
                console.log("Order 데이터 호출 성공:", response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchItems();
        fetchOrders();
    }, []);

    // orders와 items가 모두 데이터를 가져온 후에만 combinedData 생성
    useEffect(() => {
        if (orders.length > 0 && items.length > 0) {
            const combined = orders.map(order => {
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
            setCombinedData(combined);
        }
    }, [orders, items]);

    // 검색어 변경 시 데이터 필터링
    useEffect(() => {
        if (searchTerm.trim() === '') {
            // 검색어가 없을 때는 모든 데이터를 보여줌
            setFilteredData([]);
            return;
        }

        // 검색어가 있을 때는 필터링된 데이터를 보여줌
        const filteredBySearch = combinedData.filter(data =>
            data.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );
         // 날짜 범위에 맞게 데이터 필터링
         const filteredByDateRange = filteredBySearch.filter(data => {
            const orderDate = new Date(data.orderDate);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return orderDate >= start && orderDate <= end;
        });

        setFilteredData(filteredByDateRange);
    }, [searchTerm, startDate, endDate, combinedData]);

    return (
        <div>
            <div className="Middle classification">
                <h3>재무 관리</h3>
            </div>
            <hr />  <br />

            <div className="searcher">
                <div className="left">
                    <DateComponent onChange={handleDateChange} />
                </div>
            </div><br />
                <div className="search">
                    <FinancialSearch searchKeyword={searchTerm} onSearch={handleSearchChange} />
                </div>

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
                            {searchTerm.trim() === '' ? (
                                // 검색어가 없는 경우 모든 데이터를 보여줌
                                combinedData.map((data, index) => (
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
                                // 검색어가 있는 경우 필터링된 데이터를 보여줌
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
                            )}
                            {searchTerm.trim() !== '' && filteredData.length === 0 && (
                                <tr>
                                    <td colSpan="8">검색 결과가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </div><br/>

            {/* 엑셀&인쇄 */}
            <div className="excel-print">
                <ExcelPrint combinedData={searchTerm.trim() === '' ? combinedData : filteredData} />
            </div>

        </div>
    );
};

export default FinancialMgmt;
