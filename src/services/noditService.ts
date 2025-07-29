import axios from 'axios';
import { io } from 'socket.io-client';
import { TokenTransfer, BalanceResponse, StreamEvent, MCPResponse } from '../types/noditTypes';

const NODIT_API_KEY = 'YOUR_NODIT_API_KEY'; // Replace with your Nodit API key
const NODE_API_URL = 'https://web3.nodit.io/v1/ethereum/mainnet/node';
const WEB3_API_URL = 'https://web3.nodit.io/v1/ethereum/mainnet';
const STREAM_URL = 'wss://web3.nodit.io/v1/websocket';
const MCP_URL = 'https://mcp.nodit.io/sse'; // Mock MCP endpoint for now

export const getEthBalance = async (address: string): Promise<BalanceResponse> => {
  try {
    const response = await axios.post(
      `${NODE_API_URL}`,
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
    throw new Error('Failed to fetch balance');
  }
};

export const getTokenTransfers = async (address: string): Promise<TokenTransfer[]> => {
  try {
    const response = await axios.post(
      `${WEB3_API_URL}/token/getTokenTransfersByAccount`,
      {
        accountAddress: address,
        fromDate: '2025-01-01T00:00:00+00:00',
        toDate: '2025-07-29T00:00:00+00:00',
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
    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching token transfers:', error);
    throw new Error('Failed to fetch token transfers');
  }
};

export const subscribeToTransactions = (address: string, callback: (event: StreamEvent) => void): (() => void) => {
  const socket = io(STREAM_URL, {
    transports: ['websocket'],
    auth: { apiKey: NODIT_API_KEY },
    query: { protocol: 'ethereum', network: 'mainnet' },
  });

  socket.on('connect', () => {
    socket.emit('subscribe', {
      messageId: 'chainpilot-tx-stream',
      eventType: 'TRANSACTION',
      params: { condition: { address } },
    });
  });

  socket.on('event', (event: StreamEvent) => callback(event));
  socket.on('error', (error: Error) => console.error('Stream error:', error));

  return () => socket.disconnect();
};

export const processMcpQuery = async (query: string, address: string): Promise<MCPResponse> => {
  try {
    const response = await axios.post(
      MCP_URL,
      { query, address },
      { headers: { 'X-API-KEY': NODIT_API_KEY } }
    );
    return response.data;
  } catch (error) {
    console.error('MCP query error:', error);
    return { response: 'Error processing query. Try again later.' };
  }
};