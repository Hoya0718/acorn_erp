// 작성자: 박승희
// 고객현황 데이터 페이지 기간선택 및 검색버튼 컴포넌트
import * as React from 'react'
import { Dropdown } from 'react-bootstrap';
import "../../Main/Main.css"

const DropdownModule = ({ selectedOption, handleSelect, options }) => {
  return (
    <Dropdown style={{fontSize: '14px'}}>
      <Dropdown.Toggle variant="outline-secondary" style={{fontSize: '14px'}}>
        {selectedOption}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option, index) => (
          <Dropdown.Item key={index} onClick={() => handleSelect(option)}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    
  );
}

export default DropdownModule;