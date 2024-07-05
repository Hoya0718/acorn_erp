import React from 'react';

const DeleteModalModule = ({ isOpen = false, onClose = () => {}, onConfirm = () => {} }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {/* <h5 className="modal-title" id="exampleModalLabel">삭제</h5> */}
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>선택하신 행을 삭제하시겠습니까?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>아니오</button>
            <button type="button" className="btn btn-primary" onClick={onConfirm}>네</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalModule;
