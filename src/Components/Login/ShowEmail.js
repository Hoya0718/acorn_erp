import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LoginForm.css';


const ShowEmail = () => {
    const location = useLocation();
    const { email } = location.state; // location.state에서 email 값을 가져옵니다.

    return (
        <div className="wrapper">
            <form className="form-signin">

                 <div className="form-signin-heading4">입력한 정보와 일치하는 아이디<div className='emailBox'>아이디 : {email}</div></div> {/* 이메일 값을 출력합니다. */}
                
                <Link to='/'>
                    <button className="btn btn-lg btn-primary btn-block" style={{ marginTop: '55px' }}>로그인 화면으로</button>
                </Link>
            </form>
        </div>
    );
};

export default ShowEmail;