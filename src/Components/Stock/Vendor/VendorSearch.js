import React from 'react';

const VendorSearch = ({ searchKeyword, onSearch }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search Vendor"
                value={searchKeyword}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default VendorSearch;
