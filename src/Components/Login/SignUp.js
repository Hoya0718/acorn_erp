import * as React from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
    return(
        <div>
            <h1> 회원가입 페이지</h1>
            <input type="text" placeholder='이메일' />
            <input type="text" placeholder='비밀번호' />
            <input type="text" placeholder='상호명' />
            <input type="text" placeholder='사업자번호(11자)' />
            <Link to="/">
                <button>회원가입</button>
            </Link>
        </div>
    )
}

export default SignUp;