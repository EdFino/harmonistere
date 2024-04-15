import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import './chatbox.css';
const socket = io.connect("http://localhost:3001");

const scrollToBottom = (element) => {
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const ChatBox = ({ pseudoCharacter }) => {

    const storedPseudo = JSON.parse(localStorage.getItem('pseudoCharacter'));

    const [pseudoChat, setPseudoChat] = useState(storedPseudo);
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        setPseudoChat(storedPseudo || pseudoCharacter);
    }, [pseudoCharacter]);

    useEffect(() => {
        localStorage.setItem('pseudoCharacter', JSON.stringify(pseudoChat));
        console.log ('je suis vivant ! ', pseudoCharacter);
    }, [pseudoChat]);

    useEffect(() => {
        console.log ('je suis encore et toujours là ! ', storedPseudo);
        console.log('tu as sauvegardé le pseudo ?', localStorage);
        const receiveMessageHandler = (data) => {
            setMessageHistory(prevMessages => [...prevMessages, { sender: data.sender, message: data.message }]);
            scrollToBottom(inputRef.current);
        };
    
        socket.on("receive_message", receiveMessageHandler);
    
    
        return () => {
            socket.off("receive_message", receiveMessageHandler);
        };
    }, []);

    const sendMessage = () => {
        if (!message.trim()) return; // Ne pas envoyer de message vide
        socket.emit("send_message", { message, sender: pseudoChat });
        setMessageHistory(prevMessages => [...prevMessages, { sender: pseudoChat, message }]);
        setMessage('');
        scrollToBottom(inputRef.current);
    };

    const handleSendButtonClick = () => {
        sendMessage();
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    console.log ('tu las oui ou merde ?! ', localStorage);

    return (
        <>
            <div className="chatbox-container">
                <div className="allMessages">
                    {messageHistory.map((msg, index) => (
                        <div key={index} className="oneMessage">
                            <p>{msg.sender}: {msg.message}</p>
                        </div>
                    ))}
                    <div ref={inputRef}></div>
                </div>
            </div>
            <div className="input-area">
                <input
                    className="message-input"
                    placeholder='Message...'
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={handleInputKeyPress}
                />
                <button type='button' className="send-button" onClick={handleSendButtonClick}>Envoyer le message</button>
            </div>
        </>
    );
};

export default ChatBox;
