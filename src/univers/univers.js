import React from 'react';
import Navbar from '../navbar/navbar';
import { Outlet } from 'react-router-dom';

function Univers () {
  return (
    <>
      <div>
        <Navbar/>
          <h1>Voici l'univers</h1>
      </div>
    </>
  )
}


export default Univers