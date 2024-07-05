// 작성자: 박승희
// 고객현황 데이터 시각화 "고객랭킹차트" 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import instance from './../../../api/axios';
import ViewDetailsModal from '../mgmtTable/viewDetailsModal/viewDetailsModal';




const Rank = () => {
    const [rangeValue, setRangeValue] = React.useState(10);
    const [amount, setAmount] = React.useState([]);
    const [count, setCount] = React.useState([]);

    const [showModal, setShowModal] = React.useState(false);
    const [modalData, setModalData] = React.useState({});

    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        const savedSettings = localStorage.getItem('customerStatusSettings');
        const fetchTableData = async () => {
            try {
                const response_Amount = await instance.get('/customer/getTop10ByTotalAmount');
                const data_Amount = response_Amount.data.map((item, index) => ({
                    ...item,
                    rank: index + 1,
                    prevRank: item.prevRank_count || null
                }));
                setAmount(data_Amount);
                const response_Count = await instance.get('/customer/getTop10ByTotalCount');
                const data_Count = response_Count.data.map((item, index) => ({
                    ...item,
                    rank: index + 1,
                    prevRank: item.prevRank_amount || null
                }));

                setCount(data_Count);

                if (savedSettings) {
                    const { rangeValue } = JSON.parse(savedSettings);
                    setRangeValue(Number(rangeValue));
                }

                data_Amount.forEach(customer => {
                    createRemarkCustomerRanking(customer.rank, customer.prevRank_amount, '최고 매출 고객', customer.customerId);
                });
                data_Count.forEach(customer => {
                    createRemarkCustomerRanking(customer.rank, customer.prevRank_count, '최다 거래 고객', customer.customerId);
                });
                await fetchCustomerDetails();

            } catch (error) {
                console.error('Error get TableData_dist:', error);
            }
        }
        fetchTableData();
    }, []);


    const getRankChange = (rank, prevRank) => {
        if (prevRank === null || prevRank === undefined || prevRank > rangeValue) {
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

    //전월 대비 랭킹 변동사항 특이사항으로 저장하기
    const createRemarkCustomerRanking = async (rank, prevRank, chartName, customerId) => {
        try {
            let notesMessage;
            if (prevRank === null || prevRank === undefined || prevRank > rangeValue) {
                notesMessage = `${chartName} 랭킹에 진입`;
            } else {
                notesMessage = `${chartName} 랭킹에서 ${rank}위`;
            }
            await instance.post('/customer/saveNotes', {
                customerId: customerId,
                notes: notesMessage
            });
            
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
    
    const fetchCustomerDetails = async () => {
        try {
           //테이블 데이터 호출
        const response_tableData = await instance.get('/customer/getAllList');
        const data = response_tableData.data.map(item => ({
          ...item,
          registerDate: formatDate(item.registerDate),
          customerBirthDate: formatDate(item.customerBirthDate)
        }));

        //고객등급 데이터 호출
        const response_gradeData = await instance.get('/customer/getGrade');
        const data_grade = response_gradeData.data
        //특이사항 데이터 호출
        const response_notes = await instance.get('/customer/getNotes');
        const data_notes = response_notes.data

        //테이블데이터+고객등급데이터+특이사항데이터 병합
        const mergedData = data.map(customer => {
          const gradeInfo = data_grade.find(grade => grade.customerId === customer.customerId);
          // const notesInfo = data_notes.find(CustomerNotes => CustomerNotes.customerId === customer.customerId);
          const notes = data_notes.filter(note => note.customerId === customer.customerId);
          return {
            ...customer,
            customerGrade: gradeInfo ? gradeInfo.customerGrade : '-',
            // customerNotes: notesInfo ? notesInfo.notes : '-',
            // customerNotes: notes,
            customerNotes: notes.length ? notes : [{ notes: '-' }],
          }});
        setRows(mergedData);
        } catch (error) {
            console.error('Error fetching customer details:', error);
            return null;
        }
    };

    const handleNameClick = async (customer) => {
        const customerDetails = rows.find(row => row.customerId === customer.customerId);
        if (customerDetails) {
            setModalData(customerDetails);;
            setShowModal(true);
        }
    };

    const renderCustomers = (customers, type, chartName) => {
        return customers.slice(0, rangeValue).map((customer, index) => {
            const rankChange = getRankChange(customer.rank, type === 'count' ? customer.prevRank_count : customer.prevRank_amount);
            return (
                <tr key={index}>
                    <td className="table-centered rank ">{index + 1}</td>
                    <td className="table-centered name"
                        onClick={() => handleNameClick(customer)}
                        style={ {cursor: 'pointer', textDecoration: 'underline'} }
                    >{customer.customerName}</td>
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
                        <div className="app-card app-card-stats-table h-100 shadow-sm" style={{marginTop: '30px' }}>
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
                        <div className="app-card app-card-stats-table h-100 shadow-sm" style={{ marginTop: '30px' }}>
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
            {showModal && (
                <ViewDetailsModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    data={modalData}
                />)}
        </div>
    );
}

export default Rank;