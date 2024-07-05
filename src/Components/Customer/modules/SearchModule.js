import React from 'react';

const SearchModule = ({ searchKeyword, onSearch }) => {
    return (
        <span>
            <input
                type="text"
                className="righted search-input  "
                placeholder="검색"
                value={searchKeyword}
                onChange={(e) => onSearch(e.target.value)}
            />
        </span>
    );
};

export default SearchModule;
