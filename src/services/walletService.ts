import detectEthereumProvider from '@metamask/detect-provider';

export const connectWallet = async (): Promise<string | null> => {
  const provider: any = await detectEthereumProvider();
  if (provider) {
    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error('Wallet connection failed:', error);
      return null;
    }
  }
  alert('Please install MetaMask!');
  return null;
};

export const getAccount = async (): Promise<string | null> => {
  const provider: any = await detectEthereumProvider();
  if (provider) {
    const accounts = await provider.request({ method: 'eth_accounts' });
    return accounts[0] || null;
  }
  return null;
};