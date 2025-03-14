// filepath: /Users/mayijia/NEU/Nova-Your Tarot Guide/frontend/src/components/ChatComponent.jsx
import React, { useState } from 'react';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSendMessage = async () => {
        try {
            const res = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
            />
            <button onClick={handleSendMessage}>Send</button>
            <div>
                <h3>Response:</h3>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default Chat;