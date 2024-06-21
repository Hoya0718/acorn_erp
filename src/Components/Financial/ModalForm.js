import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPrint } from '@fortawesome/free-solid-svg-icons';

const ModalForm = ({ show, handleClose, handleInputChange, handleSubmit, formData, columns, modalContent }) => {
  const handleExcelDownload = () => {
    console.log('엑셀 다운로드 버튼 클릭');
    // 여기에 엑셀 다운로드 로직 추가
  };

  const handlePrint = () => {
    console.log('인쇄 버튼 클릭');
    // 여기에 인쇄 로직 추가
  };

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

        {modalContent === '거래명세서 작성' && (
          <>
            <Button variant="secondary" onClick={handleExcelDownload}>
              <FontAwesomeIcon icon={faFileExcel} /> 엑셀 다운
            </Button>
            <Button variant="secondary" onClick={handlePrint}>
              <FontAwesomeIcon icon={faPrint} /> 인쇄
            </Button>
          </>
        )}
        {modalContent !== '삭제' && (
          <Button variant="primary" onClick={handleSubmit}>
            저장
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
