// src/App.js
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { RouterInfo } from './router/RouterInfo';
import { createBrowserRouter } from 'react-router-dom';


const RouterObject = createBrowserRouter(RouterInfo);

const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={RouterObject} />
    </React.StrictMode>
  );
}

export default App;