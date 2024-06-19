import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalForm = ({ show, handleClose, handleInputChange, handleSubmit, formData, columns, modalContent }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalContent}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {columns.map((col, index) => (
            col !== 'checked' && (
              <Form.Group key={index} controlId={col}>
                <Form.Label>{col}</Form.Label>
                <Form.Control
                  type="text"
                  name={col}
                  value={formData[col]}
                  onChange={handleInputChange}
                  disabled={modalContent === '삭제'}
                />
              </Form.Group>
            )
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        {modalContent !== '삭제' && (
          <Button variant="primary" onClick={handleSubmit}>
            저장
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
