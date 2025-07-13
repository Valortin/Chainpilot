import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import WalletSidebar from './components/WalletSidebar';
import OnboardingModal from './components/OnboardingModal';
import TransactionDashboard from './components/TransactionDashboard';
import { processMcpQuery, getTokenTransfers, subscribeToTransactions } from './services/noditService';
import { getAccount } from './services/walletService';
import { TokenTransfer, StreamEvent } from './types/noditTypes';

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
  const [transfers, setTransfers] = useState<TokenTransfer[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const checkWallet = async () => {
      const acc = await getAccount();
      setAccount(acc);
      if (acc) {
        const data = await getTokenTransfers(acc);
        setTransfers(data.data.items);
        const unsubscribe = subscribeToTransactions(acc, (event: StreamEvent) => {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              text: `New transaction detected: Hash ${event.data.hash.slice(0, 10)}..., Value: ${event.data.value}`,
              sender: 'ai',
            },
          ]);
        });
        return () => unsubscribe();
      }
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
      {showOnboarding && <OnboardingModal onComplete={() => setShowOnboarding(false)} />}
      <WalletSidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <TransactionDashboard transfers={transfers} />
        <ChatWindow messages={messages} />
        <InputBox onSend={handleSend} />
      </div>
    </div>
  );
};

export default App;