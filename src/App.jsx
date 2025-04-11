import React, { useState } from 'react';
import './index.css';

function App() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello, thanks for asking' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { from: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      let reply = '';

      const lower = userText.toLowerCase();

      if (lower.includes('name')) {
        reply = "I'm your AI assistant. You can call me Chatbot!";
      } else if (lower.includes('order status')) {
        reply = 'Please provide your order ID so I can check the status.';
      } else if (lower.includes('refund')) {
        reply = 'Refunds are processed within 5-7 business days.';
      } else if (lower.includes('bye')) {
        reply = 'See you!';
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hlo')) {
        reply = 'Hi there! How can I help you today?';
      } else {
        reply = "I'm here to assist you with products, orders, or store policies!";
      }

      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    }, 500);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.from}>
            {msg.from === 'user' ? `You: ${msg.text}` : `Bot: ${msg.text}`}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type here..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
