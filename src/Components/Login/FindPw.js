import React, { useState } from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import './LoginForm.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const FindPw = () => {


    const navigate = useNavigate();

    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
  
    const handleLinkClick = (path) => {
      setActiveLink(path);
    };
  
    const handleClose = () => {
      navigate('/'); // 이전 페이지로 돌아가기
  };


    return (

      <div className="wrapper">
      <form className="form-signin2">       
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
        <input type="text" className="form-control" name="storenum" placeholder="사업자번호(10자)" required="" autoFocus="" style={{ marginTop: '20px' }}/>
        <input type="text" className="form-control" name="username" placeholder="아이디(이메일)" required=""  style={{ marginTop: '1px', marginBottom: '20px' }}/>
        <button className="btn btn-lg btn-primary btn-block" type="submit" style={{ marginTop: '50px'}}>비밀번호 찾기</button>   
      </form>
      </div>
  
  );
  };
  export default FindPw;
