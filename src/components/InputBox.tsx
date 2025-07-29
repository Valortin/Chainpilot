import { useState } from 'react';
import { motion } from 'framer-motion';
import { processMcpQuery } from '../services/noditService';

interface InputBoxProps {
  onSend: (text: string, response: string) => void;
  address: string;
}

const InputBox = ({ onSend, address }: InputBoxProps) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input, 'Processing...');
    try {
      const { response } = await processMcpQuery(input, address);
      onSend(input, response);
    } catch (err) {
      setError('Error processing query');
      onSend(input, 'Error processing query. Try again.');
    }
    setInput('');
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 border-t border-gray-700 relative">
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
          placeholder="Ask Chainpilot (e.g., 'Show my recent transactions')..."
          className="flex-1 p-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          type="submit"
          className="p-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-r-lg hover:from-cyan-600 hover:to-cyan-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send
        </motion.button>
      </div>
      {showSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-14 bg-gray-800 rounded-lg w-full max-w-md shadow-lg border border-cyan-400/30"
        >
          {['Show my recent transactions', 'What’s my ETH balance?', 'Suggest a trade'].map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-700 text-gray-200 cursor-pointer"
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
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default InputBox;