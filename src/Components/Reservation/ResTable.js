import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reservation.css';

const ResTable = () => {
    return (
        <div>
            <table className="table table-hover" style={{ wordBreak: 'break-all' }}>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">예약번호</th>
                        <th scope="col">예약자이름</th>
                        <th scope="col">예약일시</th>
                        <th scope="col">추가요청사항</th>
                        <th scope="col">결제내역</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    <tr>
                        <th scope="row"><input className="form-check-input" type="checkbox" id="flexCheckDefault" /></th>
                        <th scope="row">2</th>
                        <td>홍시진</td>
                        <td><input type="date" /></td>
                        <td>주차 필요합니다.</td>
                        <td>2024-02-14 11:26 네이버페이</td>
                    </tr>
                    <tr>
                        <th scope="row"><input className="form-check-input" type="checkbox" id="flexCheckDefault" /></th>
                        <th scope="row">1</th>
                        <td>홍대희</td>
                        <td><input type="date" /></td>
                        <td>준비물 X</td>
                        <td>2024-02-14 10:26 카드결제</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ResTable;