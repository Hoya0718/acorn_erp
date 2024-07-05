import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LoginForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const ShowEmail = () => {
    const location = useLocation();
    const { email } = location.state; // location.state에서 email 값을 가져옵니다.

    return (
        <div className="wrapper">
            <form className="form-signin">
                <div className="close-icon">
                    <FontAwesomeIcon icon={faCircleXmark} size="2xl" />
                </div>
                <div className="form-signin-heading2">이메일 여기: {email}</div> {/* 이메일 값을 출력합니다. */}

                <Link to='/'>
                    <button className="btn btn-lg btn-primary btn-block">로그인 화면으로</button>
                </Link>
            </form>
        </div>
    );
};

export default ShowEmail;