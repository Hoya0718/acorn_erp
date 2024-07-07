import React, { useState, useEffect } from 'react';
import "./Financial.css"

const FinancialSearch = ({ searchKeyword, onSearch }) => {
    const [keyword, setKeyword] = useState(searchKeyword);

    // searchKeyword props이 변경될 때 keyword state 업데이트
    useEffect(() => {
        setKeyword(searchKeyword);
    }, [searchKeyword]);

    const handleChange = (e) => {
        const { value } = e.target;
        // setKeyword(value); // 이 부분은 제거해도 됩니다.
        onSearch(value);
    };

    return (
        <div className="search-box">
            <input   
                type="text"
                className="search-input"
                placeholder="상품번호로 조회"
                value={keyword}
                onChange={handleChange}
            />
        </div>
    );
};

export default FinancialSearch;
