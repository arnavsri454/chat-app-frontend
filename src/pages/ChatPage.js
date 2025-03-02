import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ChatPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  
  // Connect to backend socket (REACT_APP_API_URL from .env)
  const socket = io(process.env.REACT_APP_API_URL);

  useEffect(() => {
    // Fetch existing messages from the backend
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat`);
        setMessages(res.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();

    // Listen for incoming messages
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Clean up socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim()) {
      // Here we use user's token or a placeholder if not set
      const newMessage = { sender: user?.token || 'Anonymous', content: message };
      socket.emit('sendMessage', newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat-page">
      <header>
        <h2>Chat Room</h2>
        <button onClick={logout}>Logout</button>
      </header>
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">
            <strong>{msg.sender}: </strong>{msg.content}
          </div>
        ))}
      </div>
      <div className="send-message">
        <input 
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
