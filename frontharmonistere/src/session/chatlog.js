import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatLog = () => {

    const storedLog = JSON.parse(localStorage.getItem('logMessages'));
    const [logMessages, setLogMessages] = useState(storedLog || []);
    

  useEffect(() => {
    const socket = io.connect("http://localhost:3001");

    const storedCharacter = JSON.parse(localStorage.getItem('pseudoCharacter'));

    socket.on("receive_dice_results", (data) => {
      if (data.results && data.successes !== undefined && data.failures !== undefined) {
        const message = `${storedCharacter} a comme résultat [${data.results.join(', ')}], soit ${data.successes} succès et ${data.failures} échecs.`;

        setLogMessages(prevMessages => {
          const updatedMessages = [...prevMessages, message];
          if (updatedMessages.length > 10) {
            updatedMessages.shift();
          }
          return updatedMessages;
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Effet pour mettre à jour le localStorage lorsque logMessages change
  useEffect(() => {
    localStorage.setItem('logMessages', JSON.stringify(logMessages));
    console.log('voyons voir le log...', localStorage);
  }, [logMessages]);

  return (
    <div>
      <h2>Chat Log</h2>
      <ul id='chatlogResults'>
        {/* Affichage des messages dans des éléments de liste séparés */}
        {logMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatLog;
