// App.js
import React from 'react';
import './App.css';
import Chatbot from './Chatbot'; // Import Chatbot component

function App() {
  return (
    <div className="App">
      <h1>Welcome to My Website</h1>
      <p>This is a website with a simple chatbot.</p>

      {/* Add the Chatbot component */}
      <Chatbot />
    </div>
  );
}

export default App;
