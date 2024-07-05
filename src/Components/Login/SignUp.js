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
                {/* 사업자번호 10자리를 꼭 채우되 숫자만 받기 */}
                <input 
                    type="text" 
                    className="form-control" 
                    name="storenum" 
                    value={registrationNum} 
                    onChange={(e) => setRegistrationNum(e.target.value)} 
                    placeholder="사업자번호(10자)" 
                    required 
                    maxLength="10"
                    pattern="\d{10}" // 숫자만 10자리 받도록 설정
                    autoFocus 
                />
                {/* 상호명은 최대 30글자 */}
                <input 
                    type="text" 
                    className="form-control" 
                    name="storename" 
                    onChange={(e) => setShopName(e.target.value)} 
                    value={shopName} 
                    placeholder="상호명" 
                    required 
                    maxLength="30" // 최대 30글자 설정
                />
                {/* 아이디는 최소 3글자부터 16글자 */}
                <input 
                    type="email" 
                    className="form-control" 
                    name="username" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="아이디(이메일)" 
                    required 
                    minLength="3" // 최소 3글자 설정
                    maxLength="30" // 최대 16글자 설정
                />
                {/* 비밀번호는 최소 3글자부터 16글자, 영문과 숫자가 필수로 들어가야 됨 */}
                <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="비밀번호(영문+숫자 3~16글자)" 
                    required 
                    minLength="3" // 최소 3글자 설정
                    maxLength="16" // 최대 16글자 설정
                    pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,16}" // 영문과 숫자 필수로 포함
                />
                <button className="btn btn-lg btn-primary btn-block" type="submit">가입하기</button>
            </form>
        </div>
    );
}

export default SignUp;