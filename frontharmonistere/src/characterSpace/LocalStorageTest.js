import React, { useState, useEffect } from 'react';

function LocalStorageTest() {
  const [counter, setCounter] = useState(() => {
    const saved = localStorage.getItem('counter');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('counter', counter);
  }, [counter]);

  return (
    <div style={{ padding: '2em' }}>
      <h2>Compteur : {counter}</h2>
      <button onClick={() => setCounter(prev => prev + 1)}>+</button>
      <button onClick={() => setCounter(prev => Math.max(0, prev - 1))}>−</button>
    </div>
  );
}

export default LocalStorageTest;
