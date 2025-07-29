import { useState } from 'react';
import { motion } from 'framer-motion';
import { getEthBalance } from '../services/noditService';

const WalletSidebar = ({ onBalanceUpdate }: { onBalanceUpdate: (balance: string) => void }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [chain, setChain] = useState('Ethereum');
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    const mockAddress = '0x1234...abcd'; // Replace with actual wallet connection logic
    setAccount(mockAddress);
    try {
      const { balance: ethBalance } = await getEthBalance(mockAddress);
      const etherBalance = (parseInt(ethBalance, 16) / 10 ** 18).toFixed(4);
      setBalance(etherBalance);
      onBalanceUpdate(etherBalance);
    } catch (err) {
      setError('Failed to fetch balance');
    }
  };

  return (
    <motion.div
      animate={{ width: isOpen ? 240 : 60 }}
      className="bg-gray-900 text-white h-screen p-4 transition-all duration-300 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center mb-4 hover:bg-cyan-600"
      >
        <span className="text-2xl">☰</span>
      </button>
      {isOpen && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-cyan-400">Wallet</h2>
          {account ? (
            <div>
              <p className="text-sm text-gray-300 truncate">{account}</p>
              <p className="text-sm text-gray-400">Balance: {balance || 'Loading...'} ETH</p>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConnect}
              className="w-full p-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-cyan-700"
            >
              Connect Wallet
            </motion.button>
          )}
          <div>
            <label className="text-sm text-gray-400">Chain</label>
            <select
              value={chain}
              onChange={(e) => setChain(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>Ethereum</option>
              <option>Aptos</option>
              <option>XRPL</option>
            </select>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WalletSidebar;