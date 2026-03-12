import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LaxiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Laxi, your AI assistant! 👋 How can I help you today?", sender: 'laxi', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  // Click outside handler to minimize Laxi
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !isMinimized) {
        const clickedOutsideChat = chatBoxRef.current && !chatBoxRef.current.contains(event.target);
        const clickedOutsideButton = buttonRef.current && !buttonRef.current.contains(event.target);
        
        if (clickedOutsideChat && clickedOutsideButton) {
          setIsMinimized(true);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMinimized]);

  const navigationOptions = [
    { name: 'Home', path: '/', icon: '🏠', description: 'Go to homepage' },
    { name: 'Dashboard', path: '/dashboard', icon: '📊', description: 'View your dashboard' },
    { name: 'Submit Complaint', path: '/submit', icon: '📝', description: 'Submit a new complaint' },
    { name: 'Track Complaints', path: '/track', icon: '🔍', description: 'Track your complaints' },
    { name: 'Profile', path: '/profile', icon: '👤', description: 'View your profile' },
    { name: 'Settings', path: '/settings', icon: '⚙️', description: 'Manage settings' },
    { name: 'About', path: '/about', icon: 'ℹ️', description: 'About CampusCare' },
    { name: 'Services', path: '/services', icon: '🛠️', description: 'Our services' },
    { name: 'Contact', path: '/contact', icon: '📞', description: 'Contact us' },
    { name: 'FAQ', path: '/faq', icon: '❓', description: 'Frequently asked questions' },
    { name: 'Help', path: '/help', icon: '🆘', description: 'Get help' },
    { name: 'Support', path: '/support', icon: '💬', description: 'Support center' },
  ];

  const quickActions = [
    { label: '🏠 Home', path: '/' },
    { label: '📊 Dashboard', path: '/dashboard' },
    { label: '📝 New Complaint', path: '/submit' },
    { label: '🔍 Track', path: '/track' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;

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
    }, 500);
  };

  const generateResponse = (userText) => {
    const lowerText = userText.toLowerCase();

    for (const option of navigationOptions) {
      if (lowerText.includes(option.name.toLowerCase()) || 
          lowerText.includes(option.path) ||
          lowerText.includes(option.description.toLowerCase())) {
        navigate(option.path);
        return {
          id: messages.length + 2,
          text: `Sure! Taking you to ${option.name}... ${option.icon}`,
          sender: 'laxi',
          timestamp: new Date()
        };
      }
    }

    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      return {
        id: messages.length + 2,
        text: "Hello! 😊 How can I assist you today? You can ask me to navigate to any page or help you with complaints!",
        sender: 'laxi',
        timestamp: new Date()
      };
    }

    if (lowerText.includes('help')) {
      return {
        id: messages.length + 2,
        text: "I can help you navigate through the app! Just tell me where you want to go, like 'Dashboard', 'Submit Complaint', 'Profile', etc. You can also click on the quick action buttons below! 🎯",
        sender: 'laxi',
        timestamp: new Date()
      };
    }

    if (lowerText.includes('complaint')) {
      if (lowerText.includes('submit') || lowerText.includes('new') || lowerText.includes('create')) {
        navigate('/submit');
        return {
          id: messages.length + 2,
          text: "Taking you to the complaint submission form! 📝",
          sender: 'laxi',
          timestamp: new Date()
        };
      }
      if (lowerText.includes('track') || lowerText.includes('status') || lowerText.includes('check')) {
        navigate('/track');
        return {
          id: messages.length + 2,
          text: "Opening the complaint tracking page! 🔍",
          sender: 'laxi',
          timestamp: new Date()
        };
      }
      return {
        id: messages.length + 2,
        text: "I can help you with complaints! Would you like to 📝 submit a new complaint or 🔍 track existing ones?",
        sender: 'laxi',
        timestamp: new Date()
      };
    }

    if (lowerText.includes('profile') || lowerText.includes('account')) {
      navigate('/profile');
      return {
        id: messages.length + 2,
        text: "Navigating to your profile page! 👤",
        sender: 'laxi',
        timestamp: new Date()
      };
    }

    if (lowerText.includes('setting') || lowerText.includes('preference')) {
      navigate('/settings');
      return {
        id: messages.length + 2,
        text: "Opening settings page! ⚙️",
        sender: 'laxi',
        timestamp: new Date()
      };
    }

    if (lowerText.includes('thank')) {
      return {
        id: messages.length + 2,
        text: "You're welcome! 😊 Is there anything else I can help you with?",
        sender: 'laxi',
        timestamp: new Date()
      };
    }

    if (lowerText.includes('bye') || lowerText.includes('goodbye')) {
      return {
        id: messages.length + 2,
        text: "Goodbye! Have a great day! 👋 Feel free to come back if you need help!",
        sender: 'laxi',
        timestamp: new Date()
      };
    }

    return {
      id: messages.length + 2,
      text: "I'm not sure I understand, but I can help you navigate! Try asking for:\n• Dashboard\n• Submit Complaint\n• Track Complaints\n• Profile\n• Settings\n\nOr use the quick action buttons below! 🎯",
      sender: 'laxi',
      timestamp: new Date()
    };
  };

  const handleQuickAction = (path) => {
    navigate(path);
    const pageName = navigationOptions.find(opt => opt.path === path)?.name || 'page';
    setMessages(prev => [...prev, {
      id: messages.length + 1,
      text: `Navigating to ${pageName}...`,
      sender: 'laxi',
      timestamp: new Date()
    }]);
  };

  const handleDrag = (e, info) => {
    if (chatBoxRef.current) {
      setPosition({
        x: info.point.x - chatBoxRef.current.offsetWidth / 2,
        y: info.point.y - chatBoxRef.current.offsetHeight / 2
      });
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            ref={buttonRef}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white text-3xl hover:shadow-blue-500/50 transition-shadow"
            style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
            }}
          >
            🤖
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatBoxRef}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              x: position.x,
              y: position.y || 0
            }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            drag={!isMinimized}
            dragMomentum={false}
            onDrag={handleDrag}
            className="fixed bottom-24 right-6 z-50 w-96 max-h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              boxShadow: '0 0 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Laxi</h3>
                  <p className="text-blue-100 text-xs">AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  {isMinimized ? '🔽' : '🔼'}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Quick Actions */}
                <div className="bg-gray-50 dark:bg-gray-700 p-3 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.path)}
                        className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full hover:shadow-lg transition-shadow whitespace-nowrap"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-[300px] max-h-[400px]">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-md shadow-md'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Navigation Suggestions */}
                <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick Navigate:</p>
                  <div className="flex flex-wrap gap-2">
                    {navigationOptions.slice(0, 6).map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(option.name)}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {option.icon} {option.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
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
                      placeholder="Ask Laxi to navigate..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-shadow"
                    >
                      📤
                    </button>
                  </form>
                </div>
              </>
            )}

            {/* Minimized State - Show small bar */}
            {isMinimized && (
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setIsMinimized(false)}
              >
                <p className="text-white text-sm text-center font-medium">
                  💬 Laxi is minimized - Click to expand
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LaxiAssistant;
