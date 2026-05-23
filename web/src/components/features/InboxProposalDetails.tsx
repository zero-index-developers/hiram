import { useState } from 'react';
import { BookOpen, AlertCircle, Clock, MapPin, Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockItems, generateItemSlug } from '@hiram/shared';
import type { MockProposal } from '@hiram/shared';
import { InboxStatusBadge } from './InboxStatusBadge';
import { Avatar } from '../ui/Avatar';

interface InboxProposalDetailsProps {
  proposal: MockProposal;
  onUpdateStatus: (status: 'accepted' | 'declined' | 'completed') => void;
}

export function InboxProposalDetails({
  proposal,
  onUpdateStatus,
}: InboxProposalDetailsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const item = mockItems.find((i) => i.id === proposal.itemId);
  const slug = item
    ? generateItemSlug(item.title, item.id)
    : proposal.itemId
    ? generateItemSlug(proposal.itemName, proposal.itemId)
    : '';
  const itemLink = slug ? `/items/${slug}` : '#';

  return (
    <>
      {/* Top Bar of Active Conversation */}
      <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-left shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <Avatar name={proposal.lenderName} size="lg" />
          <div>
            <h2 className="text-sm font-black text-neutral-800">{proposal.lenderName}</h2>
            <p className="text-xs text-neutral-400 font-medium">Campus Peer</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <InboxStatusBadge status={proposal.status} />
        </div>
      </div>

      {/* Proposal Specific Details Block */}
      <div className="p-4 bg-primary/[0.01] border-b border-neutral-100 text-left shrink-0">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between text-xs font-black text-primary uppercase tracking-widest focus:outline-none group cursor-pointer"
        >
          <span className="flex items-center gap-1.5 group-hover:text-primary/80 transition-colors">
            <BookOpen size={13} /> Proposal Details
          </span>
          <span className="p-1 rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </span>
        </button>
        
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0 mt-0' : 'max-h-[600px] opacity-100 mt-3.5'}`}>
          <div className="bg-white rounded-2xl border border-primary/10 p-4 shadow-sm">
            {/* Linked Item Preview Card */}
            <Link
              to={itemLink}
              className="flex items-center gap-3.5 p-3 rounded-xl border border-neutral-100 hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-300 group text-left block"
            >
              {item?.image ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-neutral-100 shrink-0 bg-neutral-50">
                  <img
                    src={item.image}
                    alt={proposal.itemName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-neutral-50 border border-neutral-100 shrink-0 flex items-center justify-center text-neutral-400 group-hover:text-primary transition-colors">
                  <BookOpen size={16} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest block mb-0.5">
                  {item?.category || 'CAMPUS ITEM'}
                </span>
                <div className="font-extrabold text-neutral-800 text-sm truncate group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {proposal.itemName}
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 text-primary shrink-0 transition-all duration-300 transform translate-x-[-4px] group-hover:translate-x-0" />
                </div>
              </div>
              <div className="text-xs font-bold text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                View Post
              </div>
            </Link>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3.5 text-xs">
              {proposal.offerType === 'trade' && proposal.offerItems && (
                <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                  <AlertCircle size={14} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-neutral-500 uppercase text-[9px] tracking-wider">Trading Exchange Offer</p>
                    <p className="font-bold text-neutral-700 mt-0.5">{proposal.offerItems}</p>
                  </div>
                </div>
              )}

              {(proposal.offerType === 'rent' || proposal.offerType === 'borrow') && proposal.duration && (
                <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                  <Clock size={14} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-neutral-500 uppercase text-[9px] tracking-wider">Lending Duration</p>
                    <p className="font-bold text-neutral-700 mt-0.5">{proposal.duration}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-neutral-500 uppercase text-[9px] tracking-wider">Meetup Location</p>
                  <p className="font-bold text-neutral-700 mt-0.5">{proposal.meetupLocation}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <Calendar size={14} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-neutral-500 uppercase text-[9px] tracking-wider">Preferred Time</p>
                  <p className="font-bold text-neutral-700 mt-0.5">{proposal.meetupTime}</p>
                </div>
              </div>
            </div>

            {/* Proposal Actions */}
            {proposal.status === 'pending' && (
              <div className="flex gap-2.5 mt-4 border-t border-neutral-100 pt-3.5 justify-end">
                <button
                  onClick={() => onUpdateStatus('declined')}
                  className="px-4 py-2 rounded-full border border-rose-100 text-rose-600 hover:bg-rose-50 font-bold text-xs transition duration-200 cursor-pointer"
                >
                  Decline
                </button>
                <button
                  onClick={() => onUpdateStatus('accepted')}
                  className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition shadow-sm duration-200 cursor-pointer"
                >
                  Accept Proposal
                </button>
              </div>
            )}

            {proposal.status === 'accepted' && (
              <div className="flex gap-2.5 mt-4 border-t border-neutral-100 pt-3.5 justify-end">
                <button
                  onClick={() => onUpdateStatus('completed')}
                  className="px-5 py-2 rounded-full bg-primary hover:bg-primary/95 text-white font-bold text-xs transition shadow-sm duration-200 cursor-pointer"
                >
                  Mark as Completed Exchange
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
