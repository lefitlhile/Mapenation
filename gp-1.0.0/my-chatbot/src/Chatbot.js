// Chatbot.js
import React, { useState } from 'react';
import './Chatbot.css';  // Import CSS for styling

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState("");

  // Handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    // Simulate bot's reply
    const newMessages = [
      ...messages,
      { text: userInput, sender: "user" },
      { text: `You said: "${userInput}"`, sender: "bot" }
    ];

    setMessages(newMessages);
    setUserInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Chatbot</h3>
      </div>
      <div className="chatbot-body">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chatbot-footer">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
