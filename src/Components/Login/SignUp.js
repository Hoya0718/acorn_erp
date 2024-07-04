import axios from "../../api/axios";
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shopName, setShopName] = useState('');
    const [registrationNum, setRegistrationNum] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/Login', { email, password, shopName, registrationNum });
            setEmail('');
            setPassword('');
            setShopName('');
            setRegistrationNum('');
            alert('회원가입이 성공적으로 완료되었습니다.');
            navigate('/'); // 성공적으로 회원가입이 완료되면 루트 경로로 리디렉션
        } catch (err) {
            console.error("너 회원가입 못해 왜냐면 : ", err);
            alert('회원가입에 실패했습니다.');
        }
    };

    const handleClose = () => {
        navigate('/'); // 이전 페이지로 돌아가기
    };

    return (
        <div className="wrapper">
            <form className="form-signin" onSubmit={handleSignUp}>
                <div className="close-icon" onClick={handleClose}>
                    <FontAwesomeIcon icon={faCircleXmark} size="2xl" />
                </div>
                <div className="form-signin-heading2">회원가입</div>
                <div className="form-signin-heading3">회원가입을 위해 정보를 입력해주세요</div>
                <input type="text" className="form-control" name="registrationNum" value={registrationNum} onChange={(e) => setRegistrationNum(e.target.value)} placeholder="사업자번호(10자)" required="" autofocus="" />
                <input type="text" className="form-control" name="shopName" onChange={(e) => setShopName(e.target.value)} value={shopName} placeholder="상호명" required="" />
                <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="아이디(이메일)" required="" />
                <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required="" />
                <button className="btn btn-lg btn-primary btn-block" type="submit">가입하기</button>
            </form>
        </div>
    );
}

export default SignUp;