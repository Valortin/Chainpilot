import axios from 'axios';

const NODIT_API_KEY = 'YOUR_NODIT_API_KEY'; // Replace with your Nodit API key
const NODE_API_URL = 'https://web3.nodit.io/v1/ethereum/mainnet/node';
const WEB3_API_URL = 'https://web3.nodit.io/v1/ethereum/mainnet';
const MCP_URL = 'https://mcp.nodit.io/sse'; // Mock MCP endpoint for now

export class NoditService {
  static async getEthBalance(address: string): Promise<BalanceResponse> {
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
  }

  static async getTokenTransfers(address: string): Promise<TokenTransfer[]> {
    try {
      const response = await axios.post(
        `${WEB3_API_URL}/token/getTokenTransfersByAccount`,
        {
          accountAddress: address,
          fromDate: '2025-01-01T00:00:00+00:00',
          toDate: '2025-07-29T14:00:00+01:00', // Current date/time
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
  }

  static async processMcpQuery(query: string, address: string): Promise<MCPResponse> {
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
  }
}