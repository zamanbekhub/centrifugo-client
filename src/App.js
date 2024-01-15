// src/App.js
import React from 'react';
import Chat from './components/chat';
import './App.css';

function App() {
  const centrifugoUrl = 'ws://localhost:8000/connection/websocket'; // Replace with your Centrifugo server URL
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE3MDU4NjY1ODIsImlhdCI6MTcwNTI2MTc4Mn0.tUbUbKxY0m3j_gEdRtjHAbBrv6RiyyaIU92miCNWwac'; // Replace with your token
  
  return (
      <div className="App">
        <header className="App-header">Centrifugo Chat</header>
        <Chat centrifugoUrl={centrifugoUrl} token={token} />
      </div>
  );
}

export default App;
