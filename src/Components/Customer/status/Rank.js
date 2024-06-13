import * as React from 'react'
import "../../Main/Main.css"

const Rank = () => {
    return (
        <div>
            <div className="c_rank">
                <span> 회원 현황 </span>
            </div>
            <hr />
            <div>
                <section>
                    {/* <!-- 고객구매실적 --> */}
                    <div className="row" style={{margin: "auto"}}>
                        {/* <!-- 최다구매고객 -->			     */}
                        <div className="col-md-6 col-lg-6" style={{marginTop: "10px"}}>
                            <div className="app-card app-card-stats-table h-100 shadow-sm" style={{backgroundColor: 'white', marginTop: '30px'}}>
                                <div className="app-card-header p-3" style={{marginBottom: "-20px"}}>
                                    <h3 className="app-card-title">최다 거래 고객 랭킹</h3>
                                </div>
                                <div className="app-card-body p-3 p-lg-4">
                                    <table className="table table-hover" style={{wordBreak: "breakAll"}}>
                                        <thead>
                                            <tr>
                                                <th className="table-centerd">랭킹</th>
                                                <th className="table-centerd"></th>
                                                <th className="table-centerd">고객명</th>
                                                <th className="table-centerd">총 거래 횟수(회)</th>
                                                <th className="table-centerd">최다거래상품</th>
                                            </tr>
                                        </thead>
                                       
                                            <tbody>
                                                <tr>
                                                    <td className="table-centerd">{}</td>
                                                    <td className="table-centerd"><i className="bi bi-caret-up"></i></td>
                                                    <td className="table-centerd"><a href="">${}</a></td>
                                                    <td className="table-right">{}</td>
                                                    <td className="table-centerd">${}</td>
                                                </tr>
                                            </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* <!-- 최고매출고객 -->     */}
                        <div className="col-md-6 col-lg-6" style={{marginTop: "10px"}}>
                            <div className="app-card app-card-stats-table h-100 shadow-sm" style={{backgroundColor: 'white', marginTop: '30px'}}>
                                <div className="app-card-header p-3" style={{ marginBottom: "-20px"}}>
                                    <h3 className="app-card-title">최고 매출 고객 랭킹</h3>
                                </div>
                                <div className="app-card-body p-3 p-lg-4">
                                    <table className="table table-hover" style={{wordBreak: "breakAll"}}>
                                        <thead >
                                            <tr >
                                                <th className="table-centerd">랭킹</th>
                                                <th className="table-centerd"><i className="bi bi-dash"></i></th>
                                                <th className="table-centerd">고객명</th>
                                                <th className="table-centerd">총 매출 금액(원)</th>
                                                <th className="table-centerd">최고매출상품</th>
                                            </tr>
                                        </thead>
                                       
                                            <tbody>
                                                <tr>
                                                    <td className="table-centerd">{}</td>
                                                    <td className="table-centerd"><i className="bi bi-caret-down"></i></td>
                                                    <td className="table-centerd"><a href="">{}</a></td>
                                                    <td className="table-right">{}</td>
                                                    <td className="table-centerd">{}</td>
                                                </tr>
                                            </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}

export default Rank;