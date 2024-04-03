import React from 'react';
import Navbar from '../navbar/navbar';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Session () {


    const [user] = useAuthState(auth);
  return (
    <>
    <Navbar/>
    <h1>Session</h1>
    <h2>{user.email}</h2>
    </>
  )
}

export default Session;