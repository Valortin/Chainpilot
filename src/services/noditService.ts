import axios from 'axios';
import { io } from 'socket.io-client';
import { TokenTransfersResponse, BalanceResponse, StreamEvent } from '../types/noditTypes';

const NODIT_API_KEY = 'YOUR_NODIT_API_KEY'; // Replace with your actual key
const WEB3_API_BASE = 'https://web3.nodit.io/v1/ethereum/mainnet';
const STREAM_URL = 'wss://web3.nodit.io/v1/websocket';

// Web3 Data API: Fetch token transfers
export const getTokenTransfers = async (address: string): Promise<TokenTransfersResponse> => {
  try {
    const response = await axios.post(
      `${WEB3_API_BASE}/token/getTokenTransfersByAccount`,
      {
        accountAddress: address,
        fromDate: '2025-01-01T00:00:00+00:00',
        toDate: '2025-07-13T00:00:00+00:00',
        rpp: 10,
        page: 1,
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
    console.error('Error fetching token transfers:', error);
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

// Stream API: Subscribe to transaction events
export const subscribeToTransactions = (
  address: string,
  callback: (event: StreamEvent) => void
): (() => void) => {
  const socket = io(STREAM_URL, {
    transports: ['websocket'],
    path: '/v1/websocket/',
    auth: { apiKey: NODIT_API_KEY },
    query: { protocol: 'ethereum', network: 'mainnet' },
  });

  socket.on('connect', () => {
    socket.emit('subscribe', {
      messageId: 'chainpilot-tx-stream',
      eventType: 'TRANSACTION',
      params: { description: 'Monitor wallet transactions', condition: { address } },
    });
  });

  socket.on('subscription_connected', (message) => {
    console.log('Stream connected:', message);
  });

  socket.on('event', (event: StreamEvent) => {
    callback(event);
  });

  socket.on('error', (error) => {
    console.error('Stream error:', error);
  });

  return () => socket.disconnect();
};

// MCP: Process queries with mock LLM
export const processMcpQuery = async (query: string, address: string): Promise<string> => {
  try {
    // Mock LLM logic (replace with Claude integration via @anthropic-ai/sdk)
    if (query.toLowerCase().includes('token transfers') || query.toLowerCase().includes('transactions')) {
      const transfers = await getTokenTransfers(address);
      const txSummary = transfers.data.items
        .slice(0, 3)
        .map((tx) => `Hash: ${tx.hash.slice(0, 10)}..., Token: ${tx.tokenAddress.slice(0, 10)}..., Value: ${tx.value}`)
        .join('\n');
      return `Recent token transfers:\n${txSummary}`;
    } else if (query.toLowerCase().includes('balance') || query.toLowerCase().includes('eth balance')) {
      const balance = await getEthBalance(address);
      return `Your ETH balance: ${parseInt(balance.balance, 16) / 1e18} ETH`;
    } else if (query.toLowerCase().includes('profitable token')) {
      const transfers = await getTokenTransfers(address);
      // Mock profitability calculation (future: integrate price data)
      const token = transfers.data.items[0]?.tokenAddress || 'None';
      return `Most traded token: ${token.slice(0, 10)}... (Profitability analysis coming soon!)`;
    } else {
      return 'Supported queries: "Show token transfers", "What’s my ETH balance?", "Most profitable token".';
    }
  } catch (error) {
    console.error('MCP query error:', error);
    return 'Error processing your query. Please try again.';
  }
};