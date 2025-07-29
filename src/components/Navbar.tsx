import { motion } from 'framer-motion';

const Navbar = () => (
  <motion.nav
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex justify-center items-center shadow-lg"
  >
    <div className="text-2xl font-bold text-cyan-400 flex items-center space-x-2">
      <span className="relative">
        Chainpilot
        <span className="absolute -bottom-1 left-0 w-full h-1 bg-cyan-400 rounded-full opacity-75 animate-pulse"></span>
      </span>
    </div>
  </motion.nav>
);

export default Navbar;