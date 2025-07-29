export interface TokenTransfer {
  from: string;
  to: string;
  value: string;
  timestamp: number;
  blockNumber: number;
  transactionHash: string;
  contract: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface BalanceResponse {
  balance: string; // in wei
}

export interface StreamEvent {
  eventType: string;
  data: any;
}

export interface MCPResponse {
  response: string;
  context?: any;
}