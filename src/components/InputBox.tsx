import { useState } from 'react';
import { motion } from 'framer-motion';

interface InputBoxProps {
  onSend: (text: string) => void;
}

const InputBox = ({ onSend }: InputBoxProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="flex items-center">
        <motion.input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Chainpilot about your wallet..."
          className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          whileFocus={{ scale: 1.02 }}
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
    </form>
  );
};

export default InputBox;