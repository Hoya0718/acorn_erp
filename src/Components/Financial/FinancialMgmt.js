import React, { useState, useEffect } from 'react';
import { PiCurrencyDollarBold } from "react-icons/pi";
import './Financial.css';
import FinancialSearch from './FinancialSearch';
import FinancialSummary from './FinancialSummary';
import ExcelPrint from './ExcelPrint';
import * as Functions from './Functions'; // Functions.js에서 모든 함수들 import

const FinancialMgmt = () => {
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [summaryType, setSummaryType] = useState('');

    const handleSearchChange = (searchKeyword) => {
        setSearchTerm(searchKeyword);
    };

    // 아이템 및 주문 데이터 가져오기
    useEffect(() => {
        const fetchItemsAndOrders = async () => {
            const itemsData = await Functions.fetchItems();
            setItems(itemsData);

            const ordersData = await Functions.fetchOrders();
            setOrders(ordersData);
        };

        fetchItemsAndOrders();
    }, []);

    // 아이템 및 주문 데이터가 변경될 때마다 combinedData 조합하기
    useEffect(() => {
        const combined = Functions.combineData(orders, items);
        setCombinedData(combined);
    }, [orders, items]);

    // combinedData 변경 시 총매출 계산
    useEffect(() => {
        const total = Functions.calculateTotalSales(combinedData);
        setTotalSales(total);
    }, [combinedData]);

    // 검색어 및 상품번호로 데이터 필터링
    useEffect(() => {
        const filtered = Functions.filterData(searchTerm, combinedData);
        setFilteredData(filtered);
    }, [searchTerm, combinedData]);

    return (
        <div>
            <div className="Middle classification">
                <h3>재무 관리</h3>
            </div>
            <hr /> <br />

            {/* 총매출 표시 */}
            <div className="total-sales">
                <h4>💸 현재 총매출 : {totalSales.toLocaleString()} 원</h4>
            </div>

            <br />
            <div className="search">
                <FinancialSearch searchKeyword={searchTerm} onSearch={handleSearchChange} />
            </div>

            <div>
                <section>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>상품번호</th><th>상품구분</th><th>상품명</th><th>거래일시</th><th>결제상태</th><th>금액</th><th>단가</th><th>수량</th>     
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                // 필터링된 데이터를 보여줌
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
                                // 검색 결과가 없는 경우
                                <tr>
                                    <td colSpan="8">검색 결과가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
            <br />

            {/* FinancialSummary 컴포넌트 */}
            <div className="financial-summary">
                <FinancialSummary data={filteredData} summaryType={summaryType} />
            </div>

            {/* 엑셀&인쇄 */}
            <div className="excel-print">
                <ExcelPrint combinedData={filteredData} />
            </div>
        </div>
    );
};

export default FinancialMgmt;
