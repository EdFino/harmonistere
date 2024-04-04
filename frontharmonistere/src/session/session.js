import React from 'react';
import Navbar from '../navbar/navbar';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import DashboardMJ from './dashboardMJ';

function Session () {


    const [user] = useAuthState(auth);

  return (
    <>
    <Navbar/>
    <h1>Session</h1>
    {user ? <h2>{user.email}</h2> : <h2>Loading...</h2>}
    <DashboardMJ/>
    </>
  )
}

export default Session;