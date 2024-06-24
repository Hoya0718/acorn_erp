import React from 'react';

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <>
      {/* 모달을 열기 위한 버튼 */}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        모달 열기
      </button>

      {/* 모달 */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">삭제 확인</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onCancel}>취소</button>
              <button type="button" className="btn btn-primary" onClick={onConfirm}>확인</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
