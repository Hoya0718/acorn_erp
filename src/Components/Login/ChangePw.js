import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './LoginForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const ChangePw = () => {
    const [newPw1, setNewPw1] = useState('');
    const [newPw2, setNewPw2] = useState('');
    const [isMismatch, setIsMismatch] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { registrationNum } = location.state; // registrationNum 가져오기

    const handleResetPw = async (e) => {
        e.preventDefault();
        if (newPw1 !== newPw2) {
            setIsMismatch(true);
            return;
        }

        try {
            const response = await axios.patch('/changePw', null, {
                params: {
                    password: newPw1,
                    registrationNum: registrationNum
                }
            });

            if (response.status === 200) {
                alert('비밀번호가 재설정 되었습니다.');
                navigate('/'); // 성공적으로 비밀번호가 재설정되면 루트 경로로 리디렉션
            }
        } catch (err) {
            console.error("재설정 실패: ", err + registrationNum);
        }
    };

    const handleClose = () => {
        navigate('/'); // 이전 페이지로 돌아가기
    };

    return (
        <div className="wrapper">
            <form className="form-signin" onSubmit={handleResetPw}>
                <div className="close-icon" onClick={handleClose}>
                    <FontAwesomeIcon icon={faCircleXmark} size="2xl" />
                </div>
                <div className="form-signin-heading2">비밀번호 재설정</div>
                <div className="form-signin-heading3">새로운 비밀번호를 입력해주세요</div>
                <input type="password" className="form-control" name="newpw1" placeholder="새 비밀번호" required="" autoFocus="" style={{ marginBottom: "1px", marginTop: '65px' }} value={newPw1}
                    onChange={(e) => {
                        setNewPw1(e.target.value);
                        setIsMismatch(false); // 입력 시 불일치 메시지 초기화
                    }} />
                <input type="password" className="form-control" name="newpw2" placeholder="새 비밀번호 확인" required="" value={newPw2}
                    onChange={(e) => {
                        setNewPw2(e.target.value);
                        setIsMismatch(false); // 입력 시 불일치 메시지 초기화
                    }} />
                {isMismatch && <div className='pwError-text'>⚠️ 입력하신 비밀번호가 일치하지 않습니다</div>}
                <button className="btn btn-lg btn-primary btn-block" type="submit" style={{ marginTop: '55px' }}>변경하기</button>
            </form>
        </div>
    );
}

export default ChangePw;