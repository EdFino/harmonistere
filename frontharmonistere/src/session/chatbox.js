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
    const storedBoxMessages = JSON.parse(localStorage.getItem('chatboxMessages'));

    const [pseudoChat, setPseudoChat] = useState(storedPseudo || '');
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState(storedBoxMessages || []);
    const [visibleCB, setVisibleCB] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setPseudoChat(storedPseudo || pseudoCharacter);
    }, [pseudoCharacter]);

    useEffect(() => {
        localStorage.setItem('pseudoCharacter', JSON.stringify(pseudoChat));
        console.log ('je suis vivant ! ', pseudoCharacter);
    }, [pseudoChat]);

    useEffect(() => {
        const receiveMessageHandler = (data) => {
            setMessageHistory(prevMessages => [...prevMessages, { sender: data.sender, message: data.message }]);
            if (messageHistory.length > 30) {
                messageHistory.shift();
            }
            scrollToBottom(inputRef.current);
        };
    
        socket.on("receive_message", receiveMessageHandler);
    
    
        return () => {
            socket.off("receive_message", receiveMessageHandler);
        };
    }, []);

    const sendMessage = () => {
        if (!message.trim()) return;
        socket.emit("send_message", { message, sender: pseudoChat });
        setMessageHistory(prevMessages => [...prevMessages, { sender: pseudoChat, message }]);
        if (messageHistory.length > 30) {
            messageHistory.shift();
          }
        setMessage('');
        scrollToBottom(inputRef.current);
    };

    useEffect(() => {
        localStorage.setItem('chatboxMessages', JSON.stringify(messageHistory));
        console.log('voyons voir lhistorique des messages...', localStorage);
      }, [messageHistory]);

    const handleSendButtonClick = () => {
        sendMessage();
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    function handleVisibleCB () {
        setVisibleCB(!visibleCB);
    }

    console.log ('tu las oui ou merde ?! ', localStorage);

    return (
        <div id='chatBoxSession'>
            <button onClick={handleVisibleCB}>ChatBox</button>
            {visibleCB && (
                <div>
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
                </div>
            )}
        </div>
    );
    
    
};

export default ChatBox;
