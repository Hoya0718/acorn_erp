import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import './Reservation.css';

const ResTable = () => {
  const { reservations, deleteReservations, updateReservation } = useOutletContext();
  const navigate = useNavigate();
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editReservation, setEditReservation] = useState({});

  const handleSelect = (id) => {
    setSelectedReservations((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedReservations(reservations.map((res) => res.id));
    } else {
      setSelectedReservations([]);
    }
  };

  const handleDelete = () => {
    if (selectedReservations.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
    } else {
      deleteReservations(selectedReservations);
      setSelectedReservations([]);
    }
  };

  const handleEdit = () => {
    if (selectedReservations.length === 1) {
      const reservationToEdit = reservations.find(
        (reservation) => reservation.id === selectedReservations[0]
      );
      setEditReservation(reservationToEdit);
      setShowModal(true);
    } else {
      alert('수정할 항목을 하나만 선택해주세요.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditReservation({});
  };

  const handleSaveChanges = async () => {
    try {
      await updateReservation(editReservation);
      setShowModal(false);
      setSelectedReservations([]);
      // 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error('Error updating reservation:', error);
      alert('예약 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <div className="items-subTitle" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={handleDelete} className="btn btn-danger m-2">삭제</button>
        <button onClick={handleEdit} className="btn btn-primary m-2">수정</button>
      </div>
      <table 
        className="table table-hover table-bordered"
        style={{
          wordBreak: 'break-all',
          width: '100%',
          maxWidth: '800px',
          margin: 'auto',
          borderCollapse: 'separate',
          borderSpacing: '0',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <thead className="thead-light">
          <tr>
            <th scope="col">
              <input
                className="form-check-input"
                type="checkbox"
                id="selectAll"
                onChange={handleSelectAll}
                checked={selectedReservations.length === reservations.length && reservations.length > 0}
              />
            </th>
            <th scope="col">예약번호</th>
            <th scope="col">예약자이름</th>
            <th scope="col">예약일시</th>
            <th scope="col">추가요청사항</th>
            <th scope="col">결제방식</th>
            <th scope="col">성별</th>
            <th scope="col">인원</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`flexCheckDefault-${reservation.id}`}
                  checked={selectedReservations.includes(reservation.id)}
                  onChange={() => handleSelect(reservation.id)}
                />
              </td>
              <td>{reservation.id}</td>
              <td>{reservation.name}</td>
              <td>{reservation.reservationDate}</td>
              <td>{reservation.requests}</td>
              <td>{reservation.payment}</td>
              <td>{reservation.gender}</td>
              <td>{reservation.rsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        show={showModal}
        onHide={handleModalClose}
        centered
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: '2em', fontWeight: 'bold' }}>
            예약 내역
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formReservationName">
              <Form.Label style={{ fontSize: '1.5em', fontWeight: 'bold' }}>예약자 이름</Form.Label>
              <Form.Control
                type="text"
                value={editReservation.name}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, name: e.target.value })
                }
                style={{ fontSize: '1.2em' }}
              />
            </Form.Group>
            <Form.Group controlId="formReservationPhone">
              <Form.Label style={{ fontSize: '1.5em', fontWeight: 'bold' }}>휴대 전화</Form.Label>
              <Form.Control
                type="text"
                value={editReservation.phone}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, phone: e.target.value })
                }
                style={{ fontSize: '1.2em' }}
              />
            </Form.Group>
            <Form.Group controlId="formReservationDate">
              <Form.Label style={{ fontSize: '1.5em', fontWeight: 'bold' }}>예약 일시</Form.Label>
              <Form.Control
                type="text"
                value={editReservation.reservationDate}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, reservationDate: e.target.value })
                }
                style={{ fontSize: '1.2em' }}
              />
            </Form.Group>
            <Form.Group controlId="formReservationRequests">
              <Form.Label style={{ fontSize: '1.5em', fontWeight: 'bold' }}>추가 요청 사항</Form.Label>
              <Form.Control
                type="text"
                value={editReservation.requests}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, requests: e.target.value })
                }
                style={{ fontSize: '1.2em' }}
              />
            </Form.Group>
            <Form.Group controlId="formReservationPayment">
              <Form.Label style={{ fontSize: '1.5em', fontWeight: 'bold' }}>결제 방식</Form.Label>
              <Form.Control
                type="text"
                value={editReservation.payment}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, payment: e.target.value })
                }
                style={{ fontSize: '1.2em' }}
              />
            </Form.Group>
            <Form.Group controlId="formReservationGender">
              <Form.Label style={{ fontSize: '1.5em', fontWeight: 'bold' }}>성별</Form.Label>
              <Form.Control
                type="text"
                value={editReservation.gender}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, gender: e.target.value })
                }
                style={{ fontSize: '1.2em' }}
              />
            </Form.Group>
            <Form.Group controlId="formReservationRsCount">
              <Form.Label style={{ fontSize: '1.5em', fontWeight: 'bold' }}>인원</Form.Label>
              <Form.Control
                type="text"
                value={editReservation.rsCount}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, rsCount: e.target.value })
                }
                style={{ fontSize: '1.2em' }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleModalClose}>
            닫기
          </Button> */}
          <Button variant="primary" onClick={handleSaveChanges} style={{ fontSize:'13px', padding:'6px 12px'}}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResTable;
