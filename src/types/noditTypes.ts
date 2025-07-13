export interface TokenTransfer {
  hash: string;
  from: string;
  to: string;
  value: string;
  tokenAddress: string;
  timestamp: string;
}

export interface TokenTransfersResponse {
  data: {
    items: TokenTransfer[];
    totalCount: number;
  };
}

export interface BalanceResponse {
  balance: string;
}

export interface StreamEvent {
  eventType: string;
  data: {
    hash: string;
    value: string;
    timestamp: string;
  };
}