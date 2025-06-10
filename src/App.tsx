import { useState } from 'react';
import Navbar from './components/Navbar';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Welcome to Chainpilot! Ask me about your wallet activity.', sender: 'ai' },
  ]);

  const handleSend = (text: string) => {
    const newUserMessage: Message = { id: messages.length + 1, text, sender: 'user' };
    const aiResponse: Message = {
      id: messages.length + 2,
      text: `Processing your request: "${text}" (AI integration coming soon!)`,
      sender: 'ai',
    };
    setMessages([...messages, newUserMessage, aiResponse]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <ChatWindow messages={messages} />
      <InputBox onSend={handleSend} />
    </div>
  );
};

export default App;