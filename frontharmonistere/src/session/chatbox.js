import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

function ChatBox ({pseudoCharacter}) {
    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);
    console.log("Il est là le pseudo bitch !", pseudoCharacter);

    const sendMessage = () => {
        console.log('jenvoie le message');
        socket.emit("send_message", { message, sender: pseudoCharacter });
        setMessageHistory(prevMessages => [...prevMessages, { sender: pseudoCharacter, message }]);
    }
    
    useEffect (() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
            setMessageHistory(prevMessages => [...prevMessages, { sender: data.sender, message: data.message }]);
        });

        // Nettoyage de l'écouteur d'événement lors du démontage du composant
        return () => {
            socket.off("receive_message");
        };
    }, [])

    return (
        <div style={{ position:"relative", height: "300px" }}>
            <div>
                    <h3>{pseudoCharacter}</h3>
                    {messageHistory.map((msg, index) => (
                    <div key={index}>
                        <p>{msg.sender}: {msg.message}</p>
                    </div>
                ))}
            </div>
            <input placeholder='Message...' onChange={(event) => {setMessage(event.target.value)}}/>
            <button type='button' onClick={sendMessage}>Envoyer le message</button>
        </div>
    );
}

export default ChatBox;
