import { Request, Response } from 'express';
import { NoditService, TokenTransfer, BalanceResponse, MCPResponse } from '../services/noditService';

export class NoditController {
  static async getBalance(req: Request, res: Response): Promise<void> {
    const { address } = req.params;
    try {
      const balance: BalanceResponse = await NoditService.getEthBalance(address);
      const etherBalance = (parseInt(balance.balance, 16) / 10 ** 18).toFixed(4);
      res.json({ success: true, balance: etherBalance });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  }

  static async getTokenTransfers(req: Request, res: Response): Promise<void> {
    const { address } = req.params;
    try {
      const transfers: TokenTransfer[] = await NoditService.getTokenTransfers(address);
      res.json({ success: true, transfers });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  }

  static async processQuery(req: Request, res: Response): Promise<void> {
    const { query, address } = req.body;
    if (!query || !address) {
      res.status(400).json({ success: false, error: 'Query and address are required' });
      return;
    }
    try {
      const response: MCPResponse = await NoditService.processMcpQuery(query, address);
      res.json({ success: true, ...response });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  }
}