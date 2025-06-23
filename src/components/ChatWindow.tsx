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

const ChatWindow = ({ messages }: ChatWindowProps) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-800">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-md rounded-lg p-3 ${
              message.sender === 'user'
                ? 'bg-cyan-500 text-white'
                : message.loading
                ? 'bg-gray-600 text-gray-300 animate-pulse'
                : 'bg-gray-700 text-gray-200'
            } whitespace-pre-wrap`}
          >
            {message.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChatWindow;