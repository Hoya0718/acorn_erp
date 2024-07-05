import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import axios from '../../api/axios';

const FindPw = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [registrationNum, setRegistrationNum] = useState('');
  const [email, setEmail] = useState('');
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleClose = () => {
    navigate('/'); // 이전 페이지로 돌아가기
  };

  const handleFindPw = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/findPw/${registrationNum}/${email}`);
      if (response.data) {
        setRegistrationNum(response.data)
        navigate('/changePw', { state: { registrationNum: response.data } });
      }
      else {
        window.alert("사업자번호 및 이메일이 일치하지 않습니다."+response.data);
      } 
    }catch (error) {
      window.alert("데이터를 불러오는 중 오류가 발생했습니다.")
    }
  }


  return (
    <div className="wrapper">
      <form className="form-signin2" onSubmit={handleFindPw}>
        <div className="close-icon" onClick={handleClose}>
          <FontAwesomeIcon icon={faCircleXmark} size="2xl" />
        </div>
        <div className="form-find-heading">
          <Link
            to="/findEmail"
            className={`link-heading ${activeLink === '/findEmail' ? 'active' : ''}`}
            onClick={() => handleLinkClick('/findEmail')}
          >
            아이디 찾기
          </Link>
          <span className='space'></span>
          <Link
            to="/findPw"
            className={`link-heading ${activeLink === '/findPw' ? 'active' : ''}`}
            onClick={() => handleLinkClick('/findPw')}
          >
            비밀번호 찾기
          </Link>
        </div>
        <input
          type="text"
          className="form-control"
          name="storenum"
          onChange={(e) => setRegistrationNum(e.target.value)}
          placeholder="사업자번호(10자)"
          required
          autoFocus
          style={{ marginTop: '20px' }}
        />
        <input
          type="email" // Change input type to email for better validation
          className="form-control"
          name="username"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="아이디(이메일)"
          required
          style={{ marginTop: '1px', marginBottom: '20px' }}
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          style={{ marginTop: '50px' }}
        >
          비밀번호 찾기
        </button>
      </form>
    </div>
  );
};

export default FindPw;
