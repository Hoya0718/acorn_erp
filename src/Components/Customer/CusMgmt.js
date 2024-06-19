import * as React from 'react';
import { useTable } from 'react-table';
import "../Main/Main.css";
import './Customer.css';
import Checkbox from "./Checkbox";

const CusMgmt = () => {
  const [checkedState, setCheckedState] = React.useState(
    new Array(4).fill(false)
  );

  const handleCheckboxChange = (index) => {
    const updatedCheckedState = checkedState.map((item, pos) =>
      pos === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const data = React.useMemo(
    () => [
      {
        id: 'Sample ID 1',
        name: 'Sample Name 1',
        gender: '여성',
        contact: '123-456-7890',
        dob: '2000-01-01',
        joinDate: '2023-01-01',
        membership: "우수회원",
        notes: 'Sample Notes 1',
        checked: checkedState[0],
        index: 0
      },
      {
        id: 'Sample ID 2',
        name: 'Sample Name 2',
        gender: '여성',
        contact: '987-654-3210',
        dob: '1995-05-15',
        joinDate: '2023-02-07',
        membership: "일반회원",
        notes: 'Sample Notes 2',
        checked: checkedState[1],
        index: 1
      },
      {
        id: 'Sample ID 3',
        name: 'Sample Name 3',
        gender: '남성',
        contact: '456-789-0123',
        dob: '1988-07-07',
        joinDate: '2023-03-21',
        membership: "일반회원",
        notes: 'Sample Notes 3',
        checked: checkedState[2],
        index: 2
      },
      {
        id: 'Sample ID 4',
        name: 'Sample Name 4',
        gender: '남성',
        contact: '789-012-3456',
        dob: '1970-08-08',
        joinDate: '2023-04-11',
        membership: "일반회원",
        notes: 'Sample Notes 4',
        checked: checkedState[3],
        index: 3
      }
    ],
    [checkedState]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: '선택',
        accessor: 'index',
        Cell: ({ row }) => (
          <Checkbox
            checked={row.original.checked}
            onChange={() => handleCheckboxChange(row.original.index)}
          />
        )
      },
      { Header: 'ID', accessor: 'id' },
      { Header: '이름', accessor: 'name' },
      { Header: '성별', accessor: 'gender' },
      { Header: '연락처', accessor: 'contact' },
      { Header: '생년월일', accessor: 'dob' },
      { Header: '가입일', accessor: 'joinDate' },
      { Header: '회원등급', accessor: 'membership' },
      { Header: '특이사항', accessor: 'notes' }
    ],
    [checkedState]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <div>
      <div className="Middle classification">
        <span>회원 관리</span>
      </div>

      <hr />

      <div className="subTitle">
        <span>(소분류 버튼) </span>
        <button className="edit-button">수정</button>
        <button className="add-button">추가</button>
        <button className="delete-button">삭제</button>
      </div>

      <br />

      <div className="searcher">
        <div className="left">
          <label htmlFor="date">날짜를 선택하세요:
            <input type="date" id="date" max="2077-06-20" min="2077-06-05" value="2024-06-18" />
          </label>
        </div>

        <div className="right">
          <input type="text" placeholder='검색' /><button>조회</button>
        </div>
      </div>
    <hr/>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="table-row">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CusMgmt;