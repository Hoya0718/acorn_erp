import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 import
import "./Board.css"; // 스타일 파일 import

const Board = () => {
  const [selectedRows, setSelectedRows] = useState([]); // 선택된 행을 관리할 상태

  // 체크박스 선택 시 상태 업데이트
  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // 예시 데이터 배열 (실제 데이터로 대체 필요)
  const data = [
    { id: 1, column1: "데이터 1-1", column2: "데이터 1-2", column3: "데이터 1-3" },
    { id: 2, column1: "데이터 2-1", column2: "데이터 2-2", column3: "데이터 2-3" }
  ];

  return (
    <div>
      <div className="Middle classification">
        <h3>게시판</h3>
      </div>

      <hr />

      <div className="subTitle">
        {/* 필요한 내용 추가 */}
      </div>

      <br />

      <div className="searcher">
        <div className="left">
          <label htmlFor="date">날짜를 선택하세요:</label>
          <input type="date" id="date" max="2077-06-20" min="2077-06-05" defaultValue="2024-07-18" />
        </div>

        <div className="right">
          <input type="text" placeholder="검색" />
          <button>조회</button>
        </div>
      </div>

      <div>
        <section>
          <table className='table'>
            <thead>
              <tr>
                <th></th> {/* 체크박스를 위한 빈 th */}
                <th>컬럼 1</th>
                <th>컬럼 2</th>
                <th>컬럼 3</th>
                {/* 필요한 만큼 컬럼을 추가 */}
              </tr>
            </thead>
            <tbody>
              {/* 데이터를 표시하는 부분 */}
              {data.map(row => (
                <tr key={row.id}>
                  <td><input type="checkbox" onChange={() => handleCheckboxChange(row.id)} checked={selectedRows.includes(row.id)} /></td>
                  <td>{row.column1}</td>
                  <td>{row.column2}</td>
                  <td>{row.column3}</td>
                  {/* 필요한 만큼 데이터 행을 추가 */}
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/board/update"><button>수정</button></Link>
          <Link to="/board/detail"><button>상세 보기</button></Link>
          <button>글쓰기</button>
        </section>
      </div>
    </div>
  );
}

export default Board;
