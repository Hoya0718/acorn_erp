// 작성자: 박승희
// 고객현황 데이터 시각화 "고객랭킹차트" 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import instance from './../../../api/axios';

//예제 데이터
const Rank = () => {
    const [rangeValue, setRangeValue] = React.useState(10);
    const [amount, setAmount] = React.useState([]);
    const [count, setCount] = React.useState([]);

    React.useEffect(() => {
        const savedSettings = localStorage.getItem('customerStatusSettings');
        const fetchTableData = async () => {
            try {
                const response_Amount = await instance.get('/customer/getTop10ByTotalAmount');
                const data_Amount = response_Amount.data.map((item, index) => ({
                    ...item,
                    rank: index + 1,
                    prevRank: item.prevRank || null
                }));
                setAmount(data_Amount);
                const response_Count = await instance.get('/customer/getTop10ByTotalCount');
                const data_Count = response_Count.data.map((item, index) => ({
                    ...item,
                    rank: index + 1,
                    prevRank: item.prevRank || null
                }));
                setCount(data_Count);

                if (savedSettings) {
                    const { rangeValue } = JSON.parse(savedSettings);
                    setRangeValue(Number(rangeValue));
                }
                
            } catch (error) {
                console.error('Error get TableData_dist:', error);
            }
        }
        fetchTableData();
    }, []);

    
    const getRankChange = (rank, prevRank) => {
        if (prevRank === null || prevRank === undefined || prevRank > 10) {
            return { icon: <span className="badge text-bg-success">New</span>, text: '' }; // new
        }
        if (rank < prevRank) {
            return { icon: <GoTriangleUp style={{ color: 'blue' }} />, text: ` ${Math.abs(prevRank - rank)}` }; // 상승
        }
        if (rank > prevRank) {
            return { icon: <GoTriangleDown style={{ color: 'red' }} />, text: ` ${Math.abs(prevRank - rank)}` }; // 하락
        }
        return { icon: "-", text: '' }; // 동일

    };
    const formatNumber = (num) => {
        return num.toLocaleString();
    };
    //전월 대비 랭킹 변동사항 확인: 변동사항 특이사항으로 저장하기
    const createRemarkCustomerRanking = (rank, prevRank, chartName) => {
        if (prevRank === null || prevRank === undefined || prevRank > rangeValue) {
            const newMsg = `${chartName} 랭킹에 진입`;
            console.log(newMsg);
        } else {
            const rankMsg = `{}월 ${chartName} 랭킹에서  ${rank}위 고객`;
            console.log(rankMsg);
            return;
        }
    }

    const renderCustomers = (customers, type, chartName) => {
        return customers.slice(0, rangeValue).map((customer, index) => {
            const rankChange = getRankChange(customer.rank, customer.prevRank);
            // createRemarkCustomerRanking(customer.rank, customer.prevRank, chartName);
            return (
                <tr key={index}>
                    <td className="table-centered rank ">{index + 1}</td>
                    <td className="table-centered name"><a href="">{customer.customerName}</a></td>
                    <td className="table-lefted">
                        {rankChange.icon}&nbsp;
                        {rankChange.text && <span> {rankChange.text}</span>}
                    </td>
                    <td className="table-righted">{formatNumber(type === 'count' ? customer.totalCountForCustomer : customer.totalAmountForCustomer)}</td>
                    <td className="table-centered prod">{type === 'count' ? customer.mostPurchasedProduct : customer.topSellingProduct}</td>
                </tr>
            );
        });
    };

    return (
        <div className="c_rank">
            <section>
                {/* <!-- 고객구매실적 --> */}
                <div className="row" style={{ margin: "auto" }}>
                    {/* 최다 거래 고객 랭킹 */}
                    <div className="col-md-6 col-lg-6" style={{ marginTop: "10px" }}>
                        <div className="app-card app-card-stats-table h-100 shadow-sm" style={{ backgroundColor: 'white', marginTop: '30px' }}>
                            <div className="app-card-header p-3 title" style={{ marginBottom: "-20px" }}>
                                <h3 className="app-card-title">최고 매출 고객 랭킹</h3>
                            </div>
                            <div className="app-card-body p-3 p-lg-4  content">
                                <table className="table table-hover" style={{ wordBreak: "breakAll" }}>
                                    <thead >
                                        <tr >
                                            <th className="table-centered">랭킹</th>
                                            <th className="table-centered" colSpan="2">고객명</th>
                                            <th className="table-centered">총 매출 금액(원)</th>
                                            <th className="table-centered">최고매출상품</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderCustomers(amount, 'amount', '최고 매출 고객')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* 최고 매출 고객 랭킹 */}
                    <div className="col-md-6 col-lg-6" style={{ marginTop: "10px" }}>
                        <div className="app-card app-card-stats-table h-100 shadow-sm" style={{ backgroundColor: 'white', marginTop: '30px' }}>
                            <div className="app-card-header p-3 title" style={{ marginBottom: "-20px" }}>
                                <h3 className="app-card-title">최다 거래 고객 랭킹</h3>
                            </div>
                            <div className="app-card-body p-3 p-lg-4 content">
                                <table className="table table-hover" style={{ wordBreak: "breakAll" }}>
                                    <thead>
                                        <tr>
                                            <th className="table-centered">랭킹</th>
                                            <th className="table-centered" colSpan="2">고객명</th>
                                            <th className="table-centered">총 거래 횟수(회)</th>
                                            <th className="table-centered">최다거래상품</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderCustomers(count, 'count', '최다 거래 고객')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Rank;