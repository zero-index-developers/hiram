import { TransactionStatus } from '../types/transaction';

export const TRANSACTION_STATUSES: Record<TransactionStatus, { label: string; color: string }> = {
  PENDING: {
    label: 'Pending Approval',
    color: 'yellow'
  },
  ACCEPTED: {
    label: 'Accepted / Ongoing',
    color: 'blue'
  },
  DECLINED: {
    label: 'Declined',
    color: 'red'
  },
  COMPLETED: {
    label: 'Completed',
    color: 'green'
  }
};
