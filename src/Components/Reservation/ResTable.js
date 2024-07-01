import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reservation.css';
import { useOutletContext, useNavigate } from 'react-router-dom';

const ResTable = () => {
  const { reservations, deleteReservations } = useOutletContext();
  const navigate = useNavigate();
  const [selectedReservations, setSelectedReservations] = useState([]);

  const handleSelect = (id) => {
    setSelectedReservations((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = () => {
    deleteReservations(selectedReservations);
    setSelectedReservations([]);
  };

  const handleEdit = (id) => {
    navigate(`/layout/reservationMgmt/editReservation/${id}`);
  };

  return (
    <div>
      <div className="items-subTitle">
        <button onClick={handleDelete}>삭제</button>
        <button onClick={() => {
          if (selectedReservations.length === 1) {
            handleEdit(selectedReservations[0]);
          } else {
            alert('수정할 항목을 하나만 선택해주세요.');
          }
        }}>수정</button>
      </div>
      <table className="table table-hover" style={{ wordBreak: 'break-all' }}>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">예약번호</th>
            <th scope="col">예약자이름</th>
            <th scope="col">예약일시</th>
            <th scope="col">추가요청사항</th>
            <th scope="col">결제방식</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <th scope="row">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`flexCheckDefault-${reservation.id}`}
                  checked={selectedReservations.includes(reservation.id)}
                  onChange={() => handleSelect(reservation.id)}
                />
              </th>
              <th scope="row">{reservation.id}</th>
              <td>{reservation.name}</td>
              <td>{reservation.reservationDate}</td>
              <td>{reservation.requests}</td>
              <td>{reservation.payment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResTable;
