import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from '../../api/axios';

// 쿠키를 포함하도록 설정
axios.defaults.withCredentials = true;

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Request data:', { email, password });
      const response = await axios.post('/signin', null, {
        params: {
        email: email,
        password: password
        }
      });
      
      if (response.status === 200) {
        navigate('/layout');
      }
    } catch (err) {
      console.error("에러 발생: " + err);
      alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className="wrapper">
      <form className="form-signin" onSubmit={handleLogin}>
        <div className="form-signin-heading">Acorn ERP🐿️</div>
        <input 
          type="email" 
          className="form-control" 
          name="username" 
          placeholder="아이디(이메일)" 
          required 
          autoFocus 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          className="form-control" 
          name="password" 
          placeholder="비밀번호" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
};

export default LoginForm;