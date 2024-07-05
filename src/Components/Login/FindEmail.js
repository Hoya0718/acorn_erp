import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios'; // Ensure axios is imported correctly
import './LoginForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";


const FindEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [registrationNum, setRegistrationNum] = useState('');
  const [email,setEmail] = useState('');
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleFindEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/findEmail/${registrationNum}`);
      if (response.data) {
        // email 값을 문자열로 설정합니다.
        setEmail(response.data);
        navigate('/showEmail', { state: { email: response.data } });
      } else {
        window.alert('이메일을 찾을 수 없습니다.');
      }
    } catch (error) {
      window.alert('이메일 조회 중 오류가 발생했습니다.');
    }
  }

  return (
    <div className="wrapper">
      <form className="form-signin2" style={{ width: '303px', height: '366.5px' }} onSubmit={handleFindEmail}>
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
          <span className="space"></span>
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
          placeholder="사업자번호(10자)"
          maxLength="10"
          pattern="\d{10}"
          required
          autoFocus
          style={{ marginBottom: '70px' }}
          value={registrationNum}
          onChange={(e) => setRegistrationNum(e.target.value)}
        />
  
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          아이디 찾기
        </button>
      </form>
    </div>
  );
};

export default FindEmail;