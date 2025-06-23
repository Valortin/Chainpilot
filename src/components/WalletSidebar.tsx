import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { connectWallet, getAccount } from '../services/walletService';

const WalletSidebar = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [chain, setChain] = useState('Ethereum');

  useEffect(() => {
    const checkWallet = async () => {
      const acc = await getAccount();
      setAccount(acc);
    };
    checkWallet();
  }, []);

  const handleConnect = async () => {
    const acc = await connectWallet();
    setAccount(acc);
  };

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-gray-900 p-4 flex flex-col gap-4"
    >
      <h2 className="text-lg font-bold text-cyan-400">Wallet</h2>
      {account ? (
        <p className="text-sm text-gray-300 truncate">{account}</p>
      ) : (
        <button
          onClick={handleConnect}
          className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
        >
          Connect Wallet
        </button>
      )}
      <div>
        <label className="text-sm text-gray-400">Chain</label>
        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="w-full p-2 mt-1 bg-gray-700 text-white rounded-lg"
        >
          <option>Ethereum</option>
          <option>Aptos</option>
          <option>XRPL</option>
        </select>
      </div>
    </motion.div>
  );
};

export default WalletSidebar;