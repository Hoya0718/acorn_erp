import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { RouterInfo } from './router/RouterInfo';
import { CustomerStatusProvider } from './Components/Customer/settingModal/CustomerStatusSettingContext';

function App() {
  return (
    <CustomerStatusProvider>
      <RouterProvider router={RouterInfo} />
    </CustomerStatusProvider>
  );
}

export default App;