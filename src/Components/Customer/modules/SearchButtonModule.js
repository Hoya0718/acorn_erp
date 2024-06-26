// 작성자: 박승희
// 고객현황 데이터 페이지 기간선택 및 검색버튼 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"

const CustomerStatusSearchButton = ({ onSearch }) => {

  return (
      <div className="righted searchBox">
        <input type="submit" value="조회" className="btn btn-dark" onClick={ onSearch } />
      </div>
  );
}

export default CustomerStatusSearchButton;