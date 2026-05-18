export type RequestType = 'BORROW' | 'TRADE';
export type TransactionStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'COMPLETED';

export interface BorrowRequest {
  id: string;
  type: 'BORROW';
  status: TransactionStatus;
  message?: string | null;
  returnDate?: Date | null;
  requesterId: string;
  ownerId: string;
  itemId: string;
  createdAt: Date;
}

export interface TradeRequest {
  id: string;
  type: 'TRADE';
  status: TransactionStatus;
  message?: string | null;
  returnDate?: Date | null;
  requesterId: string;
  ownerId: string;
  itemId: string;
  createdAt: Date;
}

export type TransactionRequest = BorrowRequest | TradeRequest;
