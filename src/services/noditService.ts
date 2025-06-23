import axios from 'axios';
import { TransactionHistoryResponse, BalanceResponse } from '../types/noditTypes';

const NODIT_API_KEY = 'YOUR_NODIT_API_KEY'; // Replace with your actual key
const WEB3_API_BASE = 'https://web3.nodit.io/v1/ethereum/mainnet';
const MCP_SERVER_URL = 'http://localhost:3001'; // Local MCP server

// Web3 Data API: Fetch transaction history
export const getTransactionHistory = async (address: string): Promise<TransactionHistoryResponse> => {
  try {
    const response = await axios.post(
      `${WEB3_API_BASE}/transactions/getTransactionHistoryByAccount`,
      {
        accountAddress: address,
        fromDate: '2025-01-01T00:00:00+00:00',
        toDate: '2025-06-22T00:00:00+00:00',
      },
      {
        headers: {
          'X-API-KEY': NODIT_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw error;
  }
};

// Node API: Fetch ETH balance
export const getEthBalance = async (address: string): Promise<BalanceResponse> => {
  try {
    const response = await axios.post(
      `${WEB3_API_BASE}/node`,
      {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1,
      },
      {
        headers: {
          'X-API-KEY': NODIT_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return { balance: response.data.result };
  } catch (error) {
    console.error('Error fetching ETH balance:', error);
    throw error;
  }
};

// MCP: Mock AI query processing
export const processMcpQuery = async (query: string, address: string): Promise<string> => {
  try {
    // Mock MCP interaction (replace with actual MCP server call)
    if (query.toLowerCase().includes('transaction history') || query.toLowerCase().includes('recent transactions')) {
      const history = await getTransactionHistory(address);
      const txSummary = history.data.transactions
        .slice(0, 3)
        .map((tx) => `Hash: ${tx.hash.slice(0, 10)}..., Value: ${tx.value} ETH, Time: ${tx.timestamp}`)
        .join('\n');
      return `Recent transactions:\n${txSummary}`;
    } else if (query.toLowerCase().includes('balance') || query.toLowerCase().includes('eth balance')) {
      const balance = await getEthBalance(address);
      return `Your ETH balance: ${parseInt(balance.balance, 16) / 1e18} ETH`;
    } else {
      return 'Sorry, I can only handle transaction history or balance queries for now!';
    }
  } catch (error) {
    console.error('MCP query error:', error);
    return 'Error processing your query. Please try again.';
  }
};