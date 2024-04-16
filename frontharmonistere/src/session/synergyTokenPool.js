import React, { useState } from 'react';
import './synergyTokenPool.css';

function SynergyTokenPool () {

    const [tokenPool, setTokenPool] = useState(0);

    function minusSynergyToken () {
        setTokenPool(tokenPool -1);
    }

    function plusSynergyToken () {
        setTokenPool(tokenPool +1);
    }

  return (
    <div id='synergyTokenPool'>
        <h4>Jetons de synergie</h4>
        <h2>{tokenPool}</h2>
        <div buttonSynergyTokens>
            <button className='synergyTokenModifier' onClick={minusSynergyToken}>-1</button>
            <button className='synergyTokenModifier' onClick={plusSynergyToken}>+1</button>
        </div>
    </div>
  )
}

export default SynergyTokenPool;