import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LaxiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Laxi 👋 How can I help?", sender: 'laxi', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const quickActions = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Submit', path: '/submit', icon: '📝' },
    { label: 'Track', path: '/track', icon: '🔍' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) {
      return;
    }

    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const response = generateResponse(text);
      setMessages(prev => [...prev, response]);
    }, 300);
  };

  const generateResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    const navOptions = [
      { name: 'Home', path: '/' },
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Submit Complaint', path: '/submit' },
      { name: 'Track Complaints', path: '/track' },
      { name: 'Profile', path: '/profile' },
      { name: 'Settings', path: '/settings' },
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Contact', path: '/contact' },
    ];

    for (const option of navOptions) {
      if (lowerText.includes(option.name.toLowerCase()) || lowerText.includes(option.path)) {
        navigate(option.path);
        return {
          id: messages.length + 2,
          text: `Taking you to ${option.name}...`,
          sender: 'laxi',
          timestamp: new Date()
        };
      }
    }

    if (lowerText.includes('hello') || lowerText.includes('hi')) {
      return {
        id: messages.length + 2,
        text: "Hello! 😊 How can I help you today?",
        sender: 'laxi',
        timestamp: new Date()
      };
    }

    if (lowerText.includes('thank')) {
      return {
        id: messages.length + 2,
        text: "You're welcome! 😊",
        sender: 'laxi',
        timestamp: new Date()
      };
    }

    if (lowerText.includes('bye')) {
      return {
        id: messages.length + 2,
        text: "Goodbye! 👋",
        sender: 'laxi',
        timestamp: new Date()
      };
    }

    return {
      id: messages.length + 2,
      text: "Try: Dashboard, Submit Complaint, Track, Profile, or Settings",
      sender: 'laxi',
      timestamp: new Date()
    };
  };

  const handleQuickAction = (path) => {
    navigate(path);
  };

  return (
    <div className="relative">
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:shadow-xl transition-shadow ${
          isOpen ? 'bg-gray-800 dark:bg-gray-200' : 'bg-black dark:bg-white'
        }`}
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-50 w-80 bg-white dark:bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            {/* Header */}
            <div className="bg-black dark:bg-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="text-white dark:text-black font-semibold text-sm">Laxi</h3>
                  <p className="text-gray-400 dark:text-gray-600 text-xs">AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-800 rounded-full p-1.5 transition-colors"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <div className="flex gap-2 overflow-x-auto">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.path)}
                    className="flex-shrink-0 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full hover:opacity-80 transition-opacity whitespace-nowrap"
                  >
                    {action.icon} {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-3 bg-white dark:bg-black">
              <div className="space-y-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-3 py-2 ${
                        message.sender === 'user'
                          ? 'bg-black dark:bg-white text-white dark:text-black rounded-br-sm'
                          : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-xs">{message.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:border-black dark:focus:border-white bg-white dark:bg-black text-gray-800 dark:text-white text-xs"
                />
                <button
                  type="submit"
                  disabled={inputValue.trim() === ''}
                  className="px-3 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-xs"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LaxiAssistant;
