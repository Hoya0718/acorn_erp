import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"

const Rank = () => {
    const [customer, setCustomer] = React.useState('count'); // 기본값을 'most'로 설정
    const count = [
        { rank: 1, name: '박승희', count: '20', prod: '소세지빵' },
        { rank: 2, name: '박승희', count: '20', prod: '소세지빵' },
        { rank: 3, name: '박승희', count: '20', prod: '소세지빵' },
        { rank: 4, name: '박승희', count: '20', prod: '소세지빵' },
        { rank: 5, name: '박승희', count: '20', prod: '소세지빵' },
        { rank: 6, name: '박승희', count: '20', prod: '소세지빵' },
    ];
    const amount = [
        { rank: 1, name: '송지환', amount: '100', prod: '피자빵' },
        { rank: 2, name: '송지환', amount: '100', prod: '피자빵' },
        { rank: 3, name: '송지환', amount: '100', prod: '피자빵' },
        { rank: 4, name: '송지환', amount: '100', prod: '피자빵' },
        { rank: 5, name: '송지환', amount: '100', prod: '피자빵' },
        { rank: 6, name: '송지환', amount: '100', prod: '피자빵' },
    ];
    const renderCustomers = (customers) => {
        return customers.map((customer, index) => (
            <tr key={index}>
                <td className="table-centered rank ">{index + 1}</td>
                <td className="table-centered">{customer.rank < 1 ? '👩' : <i className="bi bi-caret-up"></i>}</td>
                <td className="table-centered name"><a href="">{customer.name}</a></td>
                <td className="table-righted">{customer.count || customer.amount}</td>
                <td className="table-centered prod">{customer.prod}</td>
            </tr>
        ));
    };
    let currentCustomers = [];
    if (customer === 'count') {
        currentCustomers = count;
    } else if (customer === 'amount') {
        currentCustomers = amount;
    }
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
                                            <th className="table-centered"><i className="bi bi-dash"></i></th>
                                            <th className="table-centered">고객명</th>
                                            <th className="table-centered">총 매출 금액(원)</th>
                                            <th className="table-centered">최고매출상품</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderCustomers(currentCustomers)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* 최고 매출 고객 랭킹 */}
                    <div className="col-md-6 col-lg-6" style={{ marginTop: "10px" }}>
                        <div className="app-card app-card-stats-table h-100 shadow-sm" style={{ backgroundColor: 'white', marginTop: '30px' }}>
                            <div className="app-card-header p-3 title" style={{ marginBottom: "-20px" }}>
                                <h3 className="app-card-title">최고 매출 고객 랭킹</h3>
                            </div>
                            <div className="app-card-body p-3 p-lg-4 content">
                                <table className="table table-hover" style={{ wordBreak: "breakAll" }}>
                                    <thead>
                                        <tr>
                                            <th className="table-centered">랭킹</th>
                                            <th className="table-centered"><i className="bi bi-dash"></i></th>
                                            <th className="table-centered">고객명</th>
                                            <th className="table-centered">총 매출 금액(원)</th>
                                            <th className="table-centered">최고매출상품</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderCustomers(amount)}
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