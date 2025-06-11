import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './home/home';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './errorPage/errorPage';
import Univers from './univers/univers';
import CharacterSpaceTwo from './characterSpace/characterSpaceTwo';
import DiceLauncherMini from './diceLauncher/diceLauncherMini';
import CreationSheet from './creationSheet/creationSheet';
import PlayerSpace from './playerSpace/playerSpace';
import Session from './session/session';
import TestCo from './testco';
import Reset from './reset/reset';
import DiceLauncherPage from './diceLauncher/diceLauncherPage';

const router = createBrowserRouter([
    {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
      path: 'univers',
      element: <Univers />
  },
  {
    path: 'espacefiche/:id',
    element: <CharacterSpaceTwo/>
  },
  {
    path: 'lanceur',
    element: <DiceLauncherPage/>
  },
  {
    path: 'creationfiche',
    element: <CreationSheet/>
  },
  {
    path: 'espacejoueur',
    element: <PlayerSpace/>
  },
  {
    path: 'session/:id',
    element: <Session/>
  },
  {
  path: 'testco',
  element: <TestCo/>
  },
  {
    path: 'resetPassword',
    element: <Reset/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
