import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { RouterInfo } from './router/RouterInfo';

function App() {
  return (
    <RouterProvider router={RouterInfo} />
  );
}

export default App;