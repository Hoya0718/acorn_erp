


import React from 'react'; //React 호출
import { Outlet } from 'react-router-dom'; //react-router-dom에서 Outlet을 호출.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Login.css';

const Login = () => {

  return (
    <section className="login_section"> {/* 로그인 섹션을 나타냅니다. */}
      <div className="container outer_container accounts_container"> {/* 컨테이너를 나타내고, 외부 컨테이너 및 계정 컨테이너 클래스를 가집니다. */}
        <div className="row h-100"> {/* 높이가 100%인 로우를 나타냅니다. */}
          {/* 왼쪽 이미지 컬럼을 나타냅니다. */}
          <div className="col-lg-8 col-70 m-0 p-0"> {/* 큰 화면일 때 8칸, 작은 화면일 때 70%를 차지합니다. */}
            <div className="accounts_image w-100 h-100"> {/* 계정 이미지를 나타내며, 너비와 높이를 100%로 설정합니다. */}
              <img src="/소상공인2.jpg" alt="accounts_image" className="img-fluid w-100 h-100" /> {/* 계정 이미지를 나타냅니다. */}
            </div>
          </div>
          {/* 오른쪽 로그인 폼 컬럼을 나타냅니다. */}
          <div className="col-lg-4 col-30 m-0 p-0"> {/* 큰 화면일 때 4칸, 작은 화면일 때 30%를 차지합니다. */}
            <main className="main-login w-100 h-100 d-flex align-items-center justify-content-center"> {/* 로그인 메인을 나타내며, 너비와 높이를 100%로 설정하고, 요소들을 가운데 정렬합니다. */}
              <Outlet /> {/* react-router-dom의 Outlet을 렌더링합니다. */}
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login; // Login 컴포넌트를 내보냅니다.