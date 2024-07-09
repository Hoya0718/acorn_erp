import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from '../../api/axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Request data:', { email, password });

      // 로그인 요청
      const response = await axios.post('/signin', null, {
        params: {
          email: email,
          password: password
        },
        withCredentials: true // 쿠키를 포함시키기 위해 설정
      });

      console.log('Response data:', response.data);

      if (response.status === 200) {
        // 세션에서 사용자 정보 가져오기
        const userInfoResponse = await axios.get('/userinfo', { withCredentials: true });

        if (userInfoResponse.status === 200) {
          const userInfo = userInfoResponse.data;
          console.log('User Info:', userInfo);

          // sessionStorage에 사용자 정보 저장
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

          // 사용자 정보 확인 후 페이지 이동
          navigate('/layout');
        } else {
          throw new Error('사용자 정보 가져오기 실패');
        }
      }
    } catch (err) {
      console.error("에러 발생: ", err);
      window.alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
    } finally {
      setLoading(false);
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
        <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
        {error && <p className="error-message">{error}</p>}
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