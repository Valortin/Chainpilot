import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-4 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-cyan-400">Chainpilot</div>
        <div className="text-sm text-gray-400">AI-Powered Wallet Assistant</div>
      </div>
    </motion.nav>
  );
};

export default Navbar;