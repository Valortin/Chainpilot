export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  timestamp: string;
}

export interface TransactionHistoryResponse {
  data: {
    transactions: Transaction[];
  };
}

export interface BalanceResponse {
  balance: string;
}