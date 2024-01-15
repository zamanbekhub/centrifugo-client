// src/Chat.js
import React, { useState, useEffect } from 'react';
import { Centrifuge } from 'centrifuge';

function Chat({ centrifugoUrl, token }) {
    const apiUrl = "http://localhost:8001/chat"
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');


    useEffect(() => {
        const centrifuge = new Centrifuge(centrifugoUrl);
        centrifuge.setToken(token);

        // Allocate Subscription to a channel.
        const sub = centrifuge.newSubscription('news');

        // React on `news` channel real-time publications.
        sub.on('publication', function(ctx) {
            setMessages(prevMessages => [...prevMessages, ctx.data.value])
        });

        // Trigger subscribe process.
        sub.subscribe();

        // Trigger actual connection establishement.
        centrifuge.connect();
    }, [centrifugoUrl, token]);

    const sendMessage = async() => {
        if (newMessage.trim() === '') {
            return; // Don't send empty messages
        }

        const messageData = {
            // Assuming the required structure of your message data
            content: newMessage,
            // Add other required fields here
        };

        try {
            const response = await fetch(`${apiUrl}/api/v1/message/push`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include other headers as required, like authentication tokens
                },
                body: JSON.stringify({ channel: "news", message: messageData }),
            });

            if (response.ok) {
                console.log('Pushed new message:', response.statusText)
            } else {
                // Handle HTTP errors here
                console.error('Failed to send message:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <div className="chat-container">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">{msg}</div>
                ))}
            </div>
            <div className="message-input">
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
