import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from '../../api/axios'


const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/changePw');
      navigate('layout');
    }
    catch (err) {
      console.error("에러 발생" + err);
      navigate('layout');
    }
  };


return (
  <div className="wrapper">
    <form className="form-signin" onSubmit={handleLogin}>
      <div className="form-signin-heading">Acorn ERP🐿️</div>
      <input type="email" className="form-control" name="username" placeholder="아이디(이메일)" required="" autoFocus="" />
      <input type="password" className="form-control" name="password" placeholder="비밀번호" required="" />
      <button className="btn btn-lg btn-primary btn-block" type="submit">로그인</button>
    </form>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      <Link to="/findEmail" style={{ textDecoration: 'none', color: 'black' }}>
        아이디 • 비밀번호 찾기
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/signUp" style={{ textDecoration: 'none', color: 'black' }}>
        회원가입
      </Link>
    </div>
  </div>
);
}

export default LoginForm;