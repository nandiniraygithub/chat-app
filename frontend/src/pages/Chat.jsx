// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Make sure to adjust the URL to match your server's URL
const socket = io('http://localhost:8080/chat'); 

const ChatApp = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Set up socket listeners
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(prev => [...prev, message]);
        });

        socket.on('userList', (users) => {
            setOnlineUsers(users);
        });

        // Cleanup on unmount
        return () => {
            socket.off('message');
            socket.off('userList');
        };
    }, []);

    // Handle user login
    const handleLogin = (e) => {
        e.preventDefault();
        if (name.trim()) {
            setIsLoggedIn(true);
            socket.emit('join', name.trim());
        }
    };

    // Handle sending messages
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit('sendMessage', { text: message.trim() });
            setMessage('');
        }
    };

    // Render login form if not logged in
    if (!isLoggedIn) {
        return (
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
                <button type="submit">Join Chat</button>
            </form>
        );
    }

    // Render chat interface
    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.from}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                    required
                />
                <button type="submit">Send</button>
            </form>
            <div>
                <h3>Online Users:</h3>
                <ul>
                    {onlineUsers.map((user, index) => <li key={index}>{user}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default ChatApp;
