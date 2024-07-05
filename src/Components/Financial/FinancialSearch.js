import React from 'react';

const FinancialSearch = ({ searchKeyword, onSearch }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="상품구분, 상품명으로 조회"
                value={searchKeyword}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default FinancialSearch;
