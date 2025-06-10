import { motion } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs rounded-lg p-3 ${
              message.sender === 'user'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-700 text-gray-200'
            }`}
          >
            {message.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChatWindow;