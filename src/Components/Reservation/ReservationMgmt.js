import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import "../Main/Main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reservation.css';
import axios from '../../api/axios';
import acornImage from './Acorn-illustration-png.png';  // 이미지 경로 설정

const ReservationMgmt = () => {
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // 서버에서 데이터를 가져오는 함수
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
    fetchReservations();
  }, []);

  const addReservation = (newReservation) => {
    const updatedReservations = [...reservations, newReservation];
    setReservations(updatedReservations);
  };

  const deleteReservations = (idsToDelete) => {
    const updatedReservations = reservations.filter(reservation => !idsToDelete.includes(reservation.id));
    setReservations(updatedReservations);
  };

  const updateReservation = (updatedReservation) => {
    const updatedReservations = reservations.map(reservation =>
      reservation.id === updatedReservation.id ? updatedReservation : reservation
    );
    setReservations(updatedReservations);
  };

  const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);
    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();
    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();
    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];
    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
      }
    }
    for (let i = 1; i < 7 - TLDay; i++) {
      nextDates.push(i);
    }
    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    return dates.map((date, i) => {
      const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
      const isToday = new Date().toDateString() === new Date(viewYear, viewMonth, date).toDateString();
      const isReserved = reservations.some(reservation =>
        new Date(reservation.reservationDate).toDateString() === new Date(viewYear, viewMonth, date).toDateString()
      );
      const isCurrentMonth = condition === 'this';
      return (
        <div
          key={i}
          className={`date ${condition} ${isToday ? 'today' : ''}`}
          onClick={() => {
            let clickedMonth = viewMonth;
            if (condition === 'other') {
              clickedMonth = i < firstDateIndex ? viewMonth - 1 : viewMonth + 1;
            }
            handleDateClick(viewYear, clickedMonth, date);
          }}
        >
          <span>{date}</span>
          {isReserved && isCurrentMonth && <img src={acornImage} alt="Reserved" className="acorn-image" />}
        </div>
      );
    });
  };

  const handleDateClick = (year, month, day) => {
    let selectedDate;
    if (day < 1) {
      // 이전 달의 날짜
      selectedDate = new Date(year, month - 1, day);
    } else if (day > new Date(year, month + 1, 0).getDate()) {
      // 다음 달의 날짜
      selectedDate = new Date(year, month + 1, day - new Date(year, month + 1, 0).getDate());
    } else {
      // 현재 달의 날짜
      selectedDate = new Date(year, month, day);
    }

    const formattedDate = selectedDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });

    const reservationsForTheDay = reservations.filter(reservation =>
      new Date(reservation.reservationDate).toDateString() === selectedDate.toDateString()
    );

    const newWindow = window.open('', '_blank', 'width=600,height=400');
    newWindow.document.write(`
      <html>
        <head>
          <title>Reservations for ${formattedDate}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>${formattedDate} 예약현황</h1>
          ${reservationsForTheDay.length > 0 ? `
            <table>
              <thead>
                <tr>
                  <th>예약자 이름</th>
                  <th>휴대전화</th>
                  <th>결제 방식</th>
                  <th>추가 요청사항</th>
                  <th>성별</th>
                  <th>인원 수</th>
                </tr>
              </thead>
              <tbody>
                ${reservationsForTheDay.map(reservation => `
                  <tr key=${reservation.id}>
                    <td>${reservation.name}</td>
                    <td>${reservation.phone}</td>
                    <td>${reservation.payment}</td>
                    <td>${reservation.requests}</td>
                    <td>${reservation.gender}</td>
                    <td>${reservation.rsCount}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : '<p>No reservations for this date.</p>'}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const prevMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  };

  const nextMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  };

  const goToday = () => {
    setDate(new Date());
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reservations.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav aria-label="Page navigation example" style={{ marginTop: '50px' }}>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a onClick={() => paginate(number)} href="#" className="page-link">
                {number}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(reservations.length / itemsPerPage) ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div>
      <div id="Frame">
        <div id="body_Frame">
          <div className="body_flow">
            <div className="row">
              <div className="col--12"></div>
              <span>예약 관리</span>
              <div className="col-md-7 col-xs-12">
                <div className="left">
                  <div className="Middle classification">
                  </div>
                  <div className="calendar">
                    <div className="header">
                      <div className="year-month">{date.getFullYear()}년 {date.getMonth() + 1}월</div>
                      <div className="nav">
                        <button className="nav-btn go-prev" onClick={prevMonth}>&lt;</button>
                        <button className="nav-btn go-today" onClick={goToday}>Today</button>
                        <button className="nav-btn go-next" onClick={nextMonth}>&gt;</button>
                      </div>
                    </div>
                    <div className="main">
                      <div className="days">
                        <div className="day">일</div>
                        <div className="day">월</div>
                        <div className="day">화</div>
                        <div className="day">수</div>
                        <div className="day">목</div>
                        <div className="day">금</div>
                        <div className="day">토</div>
                      </div>
                      <div className="dates">
                        {renderCalendar()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-xs-12 custom-right-column">
                <div className="right">
                  <div className="right-up">
                    <Link to="mainReg">
                      <button className="btn btn-primary btn-register">예약 등록</button>
                    </Link>
                    <Link to="resTable">
                      <button className="btn btn-primary btn-search">예약 조회</button>
                    </Link>
                  </div>
                  <div className="right-mid">
                    <section id="sec">
                      <Outlet context={{
                        reservations: currentItems,  // 현재 페이지의 항목만 전달
                        addReservation,
                        deleteReservations,
                        updateReservation
                      }} />
                    </section>
                    {renderPagination()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer_Frame">
        <footer></footer>
      </div>
    </div>

  );
};

export default ReservationMgmt;
