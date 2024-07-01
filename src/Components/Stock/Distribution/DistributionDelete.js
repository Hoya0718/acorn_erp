import React from 'react';

const DistributionDelete = ({ handleDeleteClick, selectedItems }) => {
    return (
        <button onClick={handleDeleteClick} disabled={selectedItems.length === 0}>
            삭제
        </button>
    );
};

export default DistributionDelete;
