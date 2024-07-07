import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModalModule = ({ show, onHide, handleDeleteClick }) => {

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>고객 정보 삭제</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>선택하신 행을 삭제하시겠습니까?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary-outline" onClick={onHide}>취소</Button>
        <Button variant="secondary" onClick={handleDeleteClick}>저장</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModalModule;
