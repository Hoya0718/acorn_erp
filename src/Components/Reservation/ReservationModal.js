import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faCreditCard, faComment, faVenusMars, faUsers, faCalendarAlt, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import './ReservationModal.css'; // 새로운 CSS 파일을 import

const ReservationModal = ({ show, onHide, date, reservations }) => {
  return (
    <Modal 
  show={show} 
  onHide={onHide} 
  size="xl" 
  centered 
  dialogClassName="reservation-modal"
  aria-labelledby="reservation-modal-title"
>
  <Modal.Header closeButton>
    <Modal.Title id="reservation-modal-title">
      <FontAwesomeIcon icon={faCalendarAlt} className="me-3" />
      {date} 예약현황
    </Modal.Title>
  </Modal.Header>
      <Modal.Body>
        {reservations.length > 0 ? (
          <Table responsive hover className="reservation-table">
            <thead>
              <tr>
                <th><FontAwesomeIcon icon={faUser} className="me-2" />예약자 이름</th>
                <th><FontAwesomeIcon icon={faPhone} className="me-2" />휴대전화</th>
                <th><FontAwesomeIcon icon={faCreditCard} className="me-2" />결제 방식</th>
                <th><FontAwesomeIcon icon={faComment} className="me-2" />추가 요청사항</th>
                <th><FontAwesomeIcon icon={faVenusMars} className="me-2" />성별</th>
                <th><FontAwesomeIcon icon={faUsers} className="me-2" />인원 수</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr key={index}>
                  <td>{reservation.name}</td>
                  <td>{reservation.phone}</td>
                  <td>{reservation.payment}</td>
                  <td>{reservation.requests || '-'}</td>
                  <td>{reservation.gender}</td>
                  <td>{reservation.rsCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-muted no-reservations">
            <FontAwesomeIcon icon={faCalendarTimes} className="me-2" />
            이 날짜에 예약이 없습니다.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} size="lg">
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReservationModal;