import React from 'react';

const MaterialsDelete = ({ handleDeleteClick, selectedItems }) => {
    return (
        <button onClick={handleDeleteClick} disabled={selectedItems.length === 0}>
            삭제
        </button>
    );
};

export default MaterialsDelete;
