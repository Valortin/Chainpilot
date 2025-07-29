import { motion } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  loading?: boolean;
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => (
  <div className="flex-1 p-4 bg-gray-800 overflow-y-auto">
    {messages.map((message) => (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-md p-3 rounded-lg ${
            message.sender === 'user'
              ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white'
              : message.loading
              ? 'bg-gray-700 text-gray-400 animate-pulse'
              : 'bg-gray-700 text-gray-200'
          } border-2 border-cyan-400/30`}
        >
          {message.text}
        </div>
      </motion.div>
    ))}
  </div>
);

export default ChatWindow;