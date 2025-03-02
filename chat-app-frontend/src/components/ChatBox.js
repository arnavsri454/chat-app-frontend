import React from 'react';

const ChatBox = ({ messages, sendMessage, message, setMessage }) => {
  return (
    <div className="chat-box">
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
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
