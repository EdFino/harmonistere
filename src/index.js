import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './home/home';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './errorPage/errorPage';
import Univers from './univers/univers';
import Navbar from './navbar/navbar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
    {
      path: 'univers',
      element: <Univers />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
