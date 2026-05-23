import type { MockProposal } from '@hiram/shared';
import { Avatar } from '../ui/Avatar';

interface InboxProposalsListProps {
  proposals: MockProposal[];
  selectedProposalId: string;
  onSelectProposal: (id: string) => void;
}

export function InboxProposalsList({
  proposals,
  selectedProposalId,
  onSelectProposal,
}: InboxProposalsListProps) {
  return (
    <div className="md:col-span-4 border-r border-neutral-100 flex flex-col h-full min-h-0 bg-neutral-50/30">
      <div className="p-4 border-b border-neutral-100 bg-white">
        <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Inbox</span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-minimal divide-y divide-neutral-100/50">
        {proposals.map((prop) => {
          const isActive = prop.id === selectedProposalId;

          return (
            <div
              key={prop.id}
              onClick={() => onSelectProposal(prop.id)}
              className={`p-4 transition-all duration-200 cursor-pointer flex gap-3 text-left relative ${isActive
                  ? 'bg-primary/[0.03] border-l-4 border-primary'
                  : 'hover:bg-neutral-50 bg-white'
                }`}
            >
              <div className="relative shrink-0">
                <Avatar name={prop.lenderName} size="lg" />
                {prop.unread && !isActive && (
                  <span className="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-black text-neutral-700 truncate pr-2">{prop.lenderName}</span>
                  <span className="text-[10px] text-neutral-400 font-semibold shrink-0">{prop.lastMessageTime}</span>
                </div>

                <p className="text-xs font-extrabold text-neutral-600 truncate mt-1">{prop.itemName}</p>
                <p className="text-[11px] text-neutral-400 truncate mt-0.5">{prop.lastMessageText}</p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full uppercase">
                    {prop.offerType}
                  </span>
                  {prop.status !== 'pending' && (
                    <span className={`text-[9px] font-bold uppercase ${prop.status === 'accepted' ? 'text-emerald-500' :
                        prop.status === 'completed' ? 'text-blue-500' : 'text-rose-500'
                      }`}>
                      {prop.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
