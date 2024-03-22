import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './home/home';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './errorPage/errorPage';
import Univers from './univers/univers';
import AccountCreation from './accountCreation/accountCreation';
import CharacterSpace from './characterSpace/characterSpace';
import DiceLauncher from './diceLauncher/diceLauncher';
import CreationSheet from './creationSheet/creationSheet';
import PlayerSpace from './playerSpace/playerSpace';
import Session from './session/session';

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
    path: 'creationdecompte',
    element: <AccountCreation />
  },
  {
    path: 'espacefiche',
    element: <CharacterSpace/>
  },
  {
    path: 'lanceur',
    element: <DiceLauncher/>
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
    path: 'session',
    element: <Session/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
