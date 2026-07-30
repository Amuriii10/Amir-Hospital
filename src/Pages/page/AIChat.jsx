import React, { useState } from 'react';
import { Send, Bot, User, ArrowLeft, Loader2 } from 'lucide-react';

export default function AIChat({ onBack }) {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am the Amin Hospital AI Assistant. How can I help you with your health questions today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'model', text: 'Sorry, something went wrong.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'model', text: 'Network error. Make sure the backend server is running.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 h-[85vh] flex flex-col">
      {/* Back Button */}
      {onBack && (
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-600 hover:text-teal-600 font-semibold mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="bg-teal-600 text-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold font-syne">Amin AI Medical Assistant</h2>
            <p className="text-xs text-teal-100">Always here to help you</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-teal-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-teal-600" /> AI is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your health question here..." 
            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-sm"
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}