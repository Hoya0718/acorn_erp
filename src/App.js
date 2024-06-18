import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { RouterInfo } from './router/RouterInfo';

function App() {
  return (
    <div>
    <RouterProvider router={RouterInfo} />
    </div>
  );
}

export default App;