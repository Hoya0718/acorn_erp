import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPrint } from '@fortawesome/free-solid-svg-icons';

const ModalForm = ({ show, handleClose, handleInputChange, handleSubmit, formData, columns, modalContent, handleExcelDownload, handlePrint }) => {
  if (!show) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalContent}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {columns.map((col, index) => (
            col.key !== 'checked' && (
              <Form.Group key={index} controlId={col.key}>
                <Form.Label>{col.header}</Form.Label>
                {col.key === 'paySts' ? (
                  <Form.Control
                    as="select"
                    name={col.key}
                    value={formData[col.key]}
                    onChange={handleInputChange}
                  >
                    <option value="">선택하세요</option>
                    <option value="결제 완료" selected={formData[col.key] === '완료'}>결제 완료</option>
                    <option value="결제 대기중" selected={formData[col.key] === '대기'}>결제 대기중</option>
                    <option value="결제 취소" selected={formData[col.key] === '취소'}>결제 취소</option>
                  </Form.Control>
                ) : (
                  <Form.Control
                    type={col.key === 'proDtm' ? 'datetime-local' : 'text'}
                    name={col.key}
                    value={formData[col.key]}
                    onChange={handleInputChange}
                  />
                )}
              </Form.Group>
            )
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleExcelDownload}>
          <FontAwesomeIcon icon={faFileExcel} /> 엑셀 다운
        </Button>
        <Button variant="secondary" onClick={handlePrint}>
          <FontAwesomeIcon icon={faPrint} /> 인쇄
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          저장
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
