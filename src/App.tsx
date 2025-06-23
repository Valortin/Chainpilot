import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import WalletSidebar from './components/WalletSidebar';
import { processMcpQuery } from './services/noditService';
import { getAccount } from './services/walletService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  loading?: boolean;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Welcome to Chainpilot! Connect your wallet to start.', sender: 'ai' },
  ]);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const checkWallet = async () => {
      const acc = await getAccount();
      setAccount(acc);
    };
    checkWallet();
  }, []);

  const handleSend = async (text: string) => {
    const newUserMessage: Message = { id: messages.length + 1, text, sender: 'user' };
    const loadingMessage: Message = {
      id: messages.length + 2,
      text: 'Processing...',
      sender: 'ai',
      loading: true,
    };
    setMessages([...messages, newUserMessage, loadingMessage]);

    if (!account) {
      setMessages([
        ...messages,
        newUserMessage,
        { id: messages.length + 3, text: 'Please connect your wallet first.', sender: 'ai' },
      ]);
      return;
    }

    const aiResponseText = await processMcpQuery(text, account);
    setMessages([
      ...messages,
      newUserMessage,
      { id: messages.length + 3, text: aiResponseText, sender: 'ai' },
    ]);
  };

  return (
    <div className="flex h-screen">
      <WalletSidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <ChatWindow messages={messages} />
        <InputBox onSend={handleSend} />
      </div>
    </div>
  );
};

export default App;