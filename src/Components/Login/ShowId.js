import React, { useState } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import './LoginForm.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const ShowId = () => {


    const navigate = useNavigate();

      const handleClose = () => {
      navigate('/'); // 이전 페이지로 돌아가기
  };


    return (

      <div className="wrapper">
      <form className="form-signin2">       
      <div className="close-icon" onClick={handleClose}>
        <FontAwesomeIcon icon={faCircleXmark} size="2xl" />
      </div>     
            
        <h2>아이디 찾기가 완료되었습니다.</h2>
        <input type="text" className="form-control" name="username" placeholder="새 비밀번호 확인" required=""  style={{ marginTop: '1px', marginBottom: '20px' }}/>
        <button className="btn btn-lg btn-primary btn-block" type="submit" style={{ marginTop: '50px'}}>비밀번호 변경</button>   
      </form>
      </div>
  
  );
  };
  export default ShowId;
