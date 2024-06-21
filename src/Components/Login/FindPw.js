import * as React from 'react'
import { Link } from 'react-router-dom';

const FindPw = () => {
    return(
        <div>
            <h1>비번 찾기 페이지</h1>
            <input type="email" placeholder='이메일' />
            <input type="text" placeholder='사업자번호(11자)' />
            <Link to="/">
                <button>이메일 찾기</button>
            </Link>
        </div>
    )
}

export default FindPw;