import * as React from 'react';
import "../Main/Main.css";
import style from './Customer.css';
import Checkbox from "./Checkbox";

const Customer_mgmt = () => {
  const [service, setService] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);
    return (
    <div>
      <div className="Middle classification">
        <span> 회원 </span>
      </div>

      <hr />

      <div className="subTitle">
        <span>(소분류 버튼) or (등록,수정,삭제 버튼)</span>
      </div>

      <br />

      <div className="searcher">
        <div className="left">
          <label htmlFor="date">날짜를 선택하세요:
            <input type="date" id="date" max="2077-06-20" min="2077-06-05" value="2024-07-18" />
          </label>
        </div>

        <div className="right">
          <input type="text" placeholder='검색' /><button>조회</button>
        </div>
      </div>

      <div className='type'>
        <div className="header-text1">ID</div>
        <div className="header-text2">이름</div>
        <div className="header-text3">성별</div>
        <div className="header-text4">연락처</div>
        <div className="header-text5">생년월일</div>
        <div className="header-text6">가입일</div>
        <div className="header-text7">회원등급</div>
        <div className="header-text8">특이사항</div>
      </div>

      <hr className='divider' />

      <div className='content'>
        <div className='row'>
        <div className='cell checkbox-cell'>
            <Checkbox checked={service} onChange={setService}>
              Sample ID
            </Checkbox>
        </div>
          <div className='cell'>Sample Name</div>
          <div className='cell'>Sample Gender</div>
          <div className='cell'>Sample Contact</div>
          <div className='cell'>Sample DOB</div>
          <div className='cell'>Sample Join Date</div>
          <div className='cell'>Sample Membership</div>
          <div className='cell'>Sample Notes</div>
        </div>

        <div className='row'>
        <div className='cell checkbox-cell'>
            <Checkbox checked={marketing} onChange={setMarketing}>
              Sample ID 2
            </Checkbox>
        </div>
          <div className='cell'>Sample Name 2</div>
          <div className='cell'>Sample Gender 2</div>
          <div className='cell'>Sample Contact 2</div>
          <div className='cell'>더좋은거 발견 react-table 검색할것</div>
          <div className='cell'>div를 사용하지말고</div>
          <div className='cell'>ul이나</div>
          <div className='cell'>table을 사용하는게 더 좋다. 변경할것</div>
        </div>
      </div>
    </div>
  );
}


export default Customer_mgmt;