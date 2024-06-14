import React from 'react';
import { Outlet } from 'react-router-dom';

const CustomerMgmt = () => {
  return (
    <div>
      <Outlet /> {/* 하위 라우트가 렌더링될 위치 */}
    </div>
  );
};

export default CustomerMgmt;