import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditRowsSelectAlertModal = ({ show, onHide, }) => {
  return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title> 
            <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16"> </symbol>
            고객 정보 수정
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>수정할 고객정보를 하나만 선택해 주세요.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>확인</Button>
        </Modal.Footer>
      </Modal>
  );
};

export default EditRowsSelectAlertModal;
