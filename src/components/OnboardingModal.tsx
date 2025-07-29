import { useState } from 'react';
import { motion } from 'framer-motion';

interface OnboardingModalProps {
  onComplete: () => void;
}

const steps = [
  { id: 1, title: 'Connect Wallet', description: 'Link your wallet to begin.' },
  { id: 2, title: 'Ask a Query', description: 'Try asking about your balance.' },
  { id: 3, title: 'Explore', description: 'Check your dashboard!' },
];

const OnboardingModal = ({ onComplete }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < steps.length) setStep(step + 1);
    else onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
    >
      <div className="bg-gray-900 p-6 rounded-lg max-w-md text-white">
        <h2 className="text-xl font-bold text-cyan-400">Welcome to Chainpilot</h2>
        <div className="mt-4">
          <p>{steps[step - 1].description}</p>
          <div className="w-full bg-gray-700 h-2 mt-2 rounded-full">
            <motion.div
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="mt-4 w-full p-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg hover:from-cyan-600 hover:to-cyan-700"
        >
          {step === steps.length ? 'Finish' : 'Next'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default OnboardingModal;