import React from 'react';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Login.css';

const Login = () => {

  return (
    <section className="login_section">
      <div className="container outer_container accounts_container">
        <div className="row h-100">
          {/* 이미지 처리 */}
          <div className="col-lg-8 col-70 m-0 p-0">
            <div className="accounts_image w-100 h-100">
              <img src="/소상공인2.jpg" alt="accounts_image" className="img-fluid w-100 h-100" />
            </div>
          </div>
          <div className="col-lg-4 col-30 m-0 p-0">
            <main className="main-login w-100 h-100 d-flex align-items-center justify-content-center">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;