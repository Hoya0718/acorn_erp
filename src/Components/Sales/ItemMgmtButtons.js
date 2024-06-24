import React from 'react';

const ItemMgmtButtons = ({ isEditing, handleAddClick, handleEditClick, handleDeleteClick, handleSaveClick, handleCancelClick }) => {
  return (
    <div className="items-subTitle">
      {isEditing ? (
        <span>
          <button onClick={handleSaveClick}>저장</button>
          <button onClick={handleCancelClick}>취소</button>
        </span>
      ) : (
        <span>
          <button onClick={handleAddClick}>등록</button>
          <button onClick={handleEditClick}>수정</button>
          <button onClick={handleDeleteClick}>삭제</button>
        </span>
      )}
    </div>
  );
};

export default ItemMgmtButtons;
