import React , {useState} from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom';
import "../Main/Main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reservation.css';

const ReservationMgmt = () => {

  const navigate = useNavigate();

  // const handleMainRegClick = () => {
  //   navigate('/layout/reservationMgmt/mainReg');
  // };

  const [date, setDate] = useState(new Date());

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
      return (
        <div 
          key={i} 
          className={`date ${condition} ${isToday ? 'today' : ''}`} 
          onClick={() => handleDateClick(date)}
        >
          <span>{date}</span>
        </div>
      );
    });
  };

  const handleDateClick = (selectedDate) => {
    const selectedMonth = date.getMonth() + 1;
    const selectedYear = date.getFullYear();
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<h1>${selectedYear}년 ${selectedMonth}월 ${selectedDate}일</h1>`);
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

  return (
    <div>
      <div id="Frame">
        {/* 이 부분은 body_Frame입니다 */}
        <div id="body_Frame">
          {/* body_flow */}
          <div className="body_flow">
            {/* row */}
            <div className="row">
              {/* col-md-1 */}
              <div className="col--12">
                {/* flex-shrink-0 */}
              </div>
              {/* col-md-5 */}
              <div className="col-md-7 col-xs-12">
                {/* left */}
                <div className="left">
                  {/* Middle classification */}
                  <div className="Middle classification">
                    <span>예약 관리</span>
                  </div>
                  {/* calendar */}
                  <div className="calendar">
                    {/* header */}
                    <div className="header">
                      <div className="year-month">{date.getFullYear()}년 {date.getMonth() + 1}월</div>
                      <div className="nav">
                        <button className="nav-btn go-prev" onClick={prevMonth}>&lt;</button>
                        <button className="nav-btn go-today" onClick={goToday}>Today</button>
                        <button className="nav-btn go-next" onClick={nextMonth}>&gt;</button>
                      </div>
                    </div>
                    {/* main */}
                    <div className="main">
                      {/* days */}
                      <div className="days">
                        <div className="day">일</div>
                        <div className="day">월</div>
                        <div className="day">화</div>
                        <div className="day">수</div>
                        <div className="day">목</div>
                        <div className="day">금</div>
                        <div className="day">토</div>
                      </div>
                      {/* dates */}
                      <div className="dates">
                        {renderCalendar()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* col-md-6 */}
              <div className="col-md-5 col-xs-12 rightFrame">
                {/* right */}
                <div className="right">
                  {/* right-up */}
                  <div className="right-up">
                    {/* <button className="btn btn-outline-primary" onClick={handleMainRegClick}>예약 등록</button> */}
                    <Link to="mainReg">
                      <button className="btn btn-primary">예약 등록</button>
                    </Link>
                    <Link to="">
                      <button className="btn btn-primary">예약 조회</button>
                    </Link>
                  </div>
                  {/* right-mid */}
                  <div className="right-mid">
                    {/* sec */}
                    <section id="sec">
                      <Outlet />
                    </section>
                    {/* 페이지 네비게이션 */}
                    <nav aria-label="Page navigation example" style={{ marginTop: '50px' }}>
                      <ul className="pagination justify-content-center">
                        <li className="page-item"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* footer_Frame */}
        <div id="footer_Frame">
          <footer> 최하단 </footer>
        </div>
      </div>
    </div>
  );
  
};

export default ReservationMgmt;