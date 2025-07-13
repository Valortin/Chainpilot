import { useState } from 'react';
import { motion } from 'framer-motion';

interface OnboardingModalProps {
  onComplete: () => void;
}

const steps = [
  { id: 1, title: 'Connect Wallet', description: 'Link your MetaMask wallet to start.' },
  { id: 2, title: 'Ask a Query', description: 'Try "Show my token transfers" or "What’s my ETH balance?".' },
  { id: 3, title: 'Explore Dashboard', description: 'View your transaction history.' },
];

const OnboardingModal = ({ onComplete }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      role="dialog"
      aria-labelledby="onboarding-title"
    >
      <div className="bg-gray-800 p-6 rounded-lg max-w-md">
        <h2 id="onboarding-title" className="text-xl font-bold text-cyan-400">
          Welcome to Chainpilot
        </h2>
        <p className="text-gray-300 mt-2">{steps[step - 1].description}</p>
        <div className="mt-4 flex justify-between">
          <span className="text-gray-400">Step {step} of {steps.length}</span>
          <button
            onClick={handleNext}
            className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
            aria-label={step === steps.length ? 'Complete onboarding' : 'Next step'}
          >
            {step === steps.length ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingModal;