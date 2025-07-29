import React, { useState } from 'react';
import './Messages.css';

const mockUsers = [
  { id: 1, name: 'Ahmad Khan (Customer)' },
  { id: 2, name: 'Bilal Ahmed (Driver)' },
  { id: 3, name: 'Support Team' }
];

const mockMessages = {
  1: [
    { sender: 'Ahmad Khan', text: 'Hi, is the Civic available tomorrow?', time: '10:30 AM' },
    { sender: 'Admin', text: 'Yes, it is available from 9 AM.', time: '10:32 AM' }
  ],
  2: [
    { sender: 'Bilal Ahmed', text: 'I’m stuck in traffic.', time: '9:00 AM' },
    { sender: 'Admin', text: 'Okay, keep us updated.', time: '9:01 AM' }
  ],
  3: [
    { sender: 'Admin', text: 'Issue with login fixed. Try now.', time: '8:45 AM' }
  ]
};

const MessagesPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const messages = mockMessages[selectedUserId] || [];

  const handleSend = () => {
    if (newMessage.trim()) {
      mockMessages[selectedUserId].push({
        sender: 'Admin',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setNewMessage('');
    }
  };

  return (
    <div className="messages-container">
      <div className="user-list">
        <h3>Conversations</h3>
        <ul>
          {mockUsers.map(user => (
            <li key={user.id} className={selectedUserId === user.id ? 'active' : ''} onClick={() => setSelectedUserId(user.id)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-section">
        <h3>Chat with {mockUsers.find(u => u.id === selectedUserId)?.name}</h3>
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender === 'Admin' ? 'sent' : 'received'}`}>
              <div className="msg-text">{msg.text}</div>
              <div className="msg-time">{msg.time}</div>
            </div>
          ))}
        </div>
        <div className="send-box">
          <input
            type="text"
            value={newMessage}
            placeholder="Type your message..."
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
