import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 로직을 추가할 수 있습니다.
    navigate('/layout'); // 로그인 버튼 클릭 시 /layout 경로로 이동합니다.
  };

  return (
    <div>
      <div className="col-lg-4 m-0 p-0 accounts_col">
        <h1>ACORN's EPR</h1>
        <div>
          <input type='email' placeholder='이메일' />
          <input type='password' placeholder='비밀번호' />
          <button onClick={handleLogin}>로그인</button>
        </div>
        <div style={{ display: 'flex' }}>
          <Link to="/findEmail">
            <button style={{ width: '100px' }}>이메일 찾기</button>
          </Link>&nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to="/findPw">
            <button style={{ width: '100px' }}>비밀번호 찾기</button>
          </Link>&nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to="/signUp">
            <button style={{ width: '100px' }}>회원가입</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;