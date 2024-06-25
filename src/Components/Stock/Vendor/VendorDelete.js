import React from 'react';

const VendorDelete = ({ onDelete }) => {
    return (
        <div>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default VendorDelete;
