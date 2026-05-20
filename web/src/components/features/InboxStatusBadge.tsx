import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import type { MockProposal } from '@hiram/shared';

interface InboxStatusBadgeProps {
  status: MockProposal['status'];
}

export function InboxStatusBadge({ status }: InboxStatusBadgeProps) {
  switch (status) {
    case 'accepted':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
          <CheckCircle2 size={12} /> Accepted
        </span>
      );
    case 'declined':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
          <XCircle size={12} /> Declined
        </span>
      );
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
          <CheckCircle2 size={12} /> Completed
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
          <Clock size={12} /> Pending Approval
        </span>
      );
  }
}
