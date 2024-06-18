import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { RouterInfo } from './router/RouterInfo';
import { CustomerStatusProvider } from './Components/Customer/settingModal/CustomerStatusSettingContext';

function App() {
  return (

    <div>

    <CustomerStatusProvider>
      <RouterProvider router={RouterInfo} />
    </CustomerStatusProvider>
    </div>

  );
}

export default App;