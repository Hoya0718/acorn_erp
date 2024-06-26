import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";


const FindEmail = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleClose = () => {
    navigate('/'); // 이전 페이지로 돌아가기
  };

  return (
    <div className="wrapper">
      <form className="form-signin2" style={{ width: '303px', height: '366.5px' }}>
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

        <input type="text" className="form-control" name="storenum" placeholder="사업자번호(10자)" required="" autoFocus="" style={{ marginBottom: '70px' }} />
        <button className="btn btn-lg btn-primary btn-block" type="submit">아이디 찾기</button>
      </form>
    </div>
  );
};

export default FindEmail;