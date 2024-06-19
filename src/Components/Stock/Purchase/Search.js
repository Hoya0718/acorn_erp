import React, { useState, useEffect } from 'react';
import '../../Main/Main.css';
import './Purchase.css';

// 검색창
const Search = ({onSearch}) => {
    const [userInput, setUserInput] = useState(''); // 사용자가 input에 실시간으로 입력하는 값
    const [keyword, setKeyword] = useState(''); // 사용자가 입력한 키워드
  
    // 사용자가 검색한 데이터 저장
    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    // 검색어를 부모 컴포넌트로 전달
    const handleSearch = () => {
        onSearch(userInput);
    }


    return (
    
    <div className="searcher">
      <div className="right">
            <input type="text" placeholder='검색' value={userInput} onChange={handleInputChange}/>&nbsp;
            <button>조회 &gt;</button>
      </div>
    </div>
    )
}

export default Search;
      
      