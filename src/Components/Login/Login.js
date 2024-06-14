import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Login = () => {


    return (
        <div>
            <div>
                <label name="userid">userid : 
                    <input type="text" placeholder='아이디' required/>
                </label>
            </div>
            
            <div>
                <label name="userpw">userpw : 
                    <input type="password" placeholder='비밀번호' required />
                </label>
                <button>로그인</button>
            </div>

            <div>
                <Link to="/customer_mgmt">아이디 찾기</Link>
                <Link to="/customer_mgmt">비밀번호 찾기</Link>
                <Link to="/customer_mgmt">회원가입</Link>
             </div>
        </div>

        
    )
}
export default Login;