import React from 'react';

const SearchModule = ({ value, onChange }) => {
    return (
        <span>
            <input
                type="text"
                className="righted search-input"
                placeholder='🔍 검색어를 입력하세요'
                value={value}
                onChange={onChange}
                style={{ minWidth: '90px',fontSize: '14px', textAlign: 'center', padding: '5px' }}
            />
        </span>
    );
};

export default SearchModule;
