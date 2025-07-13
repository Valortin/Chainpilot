import { useState } from 'react';
import { motion } from 'framer-motion';

interface InputBoxProps {
  onSend: (text: string) => void;
}

const suggestions = [
  'Show my token transfers',
  'What’s my ETH balance?',
  'Which token is most profitable?',
];

const InputBox = ({ onSend }: InputBoxProps) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
      setShowSuggestions(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700 relative">
      <div className="flex items-center">
        <motion.input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => setShowSuggestions(input.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Ask Chainpilot about your wallet..."
          className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          whileFocus={{ scale: 1.02 }}
          aria-autocomplete="list"
        />
        <motion.button
          type="submit"
          className="p-2 bg-cyan-500 text-white rounded-r-lg hover:bg-cyan-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send
        </motion.button>
      </div>
      {showSuggestions && (
        <div className="absolute bottom-14 bg-gray-700 rounded-lg w-full max-w-md">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-600 cursor-pointer text-gray-200"
              onClick={() => {
                setInput(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default InputBox;