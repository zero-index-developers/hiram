import { useState } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle
} from 'lucide-react';

import { mockProposalsData } from '@hiram/shared';
import type { MockProposal, MockProposalMessage } from '@hiram/shared';

interface InboxPageProps {
  onBack: () => void;
}

export function InboxPage({ onBack }: InboxPageProps) {
  const [proposals, setProposals] = useState<MockProposal[]>(mockProposalsData);
  const [selectedProposalId, setSelectedProposalId] = useState<string>('prop-1');
  const [newMessageText, setNewMessageText] = useState<string>('');

  const activeProposal = proposals.find(p => p.id === selectedProposalId) || proposals[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    setProposals(prevProposals => 
      prevProposals.map(p => {
        if (p.id === activeProposal.id) {
          const updatedMessages: MockProposalMessage[] = [
            ...p.messages,
            {
              id: `m-${Date.now()}`,
              sender: 'me',
              text: newMessageText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ];
          return {
            ...p,
            messages: updatedMessages,
            lastMessageText: newMessageText,
            lastMessageTime: 'Just now'
          };
        }
        return p;
      })
    );
    setNewMessageText('');
  };

  const handleUpdateStatus = (status: 'accepted' | 'declined' | 'completed') => {
    setProposals(prevProposals =>
      prevProposals.map(p => {
        if (p.id === activeProposal.id) {
          return {
            ...p,
            status
          };
        }
        return p;
      })
    );
  };

  const getStatusBadge = (status: MockProposal['status']) => {
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
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 pt-6 pb-4 w-full flex-grow flex flex-col h-[calc(100vh-120px)] min-h-[650px] max-h-[820px] animate-in fade-in duration-300">
      {/* Floating Back Button Outside the main white container */}
      <div className="mb-4 shrink-0 lg:absolute lg:-left-16 lg:top-6 lg:mb-0">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border border-primary/10 shadow-sm hover:shadow flex items-center justify-center transition-colors text-neutral-600 hover:text-primary hover:border-primary/30 cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 bg-white rounded-3xl border border-primary/10 overflow-hidden shadow-xl">
        {/* Left Side: Proposals List */}
        <div className="md:col-span-4 border-r border-neutral-100 flex flex-col h-full bg-neutral-50/30">
          <div className="p-4 border-b border-neutral-100 bg-white">
            <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Recent Chats</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100/50">
            {proposals.map((prop) => {
              const isActive = prop.id === selectedProposalId;
              const initials = prop.lenderName.trim().charAt(0).toUpperCase();

              return (
                <div
                  key={prop.id}
                  onClick={() => setSelectedProposalId(prop.id)}
                  className={`p-4 transition-all duration-200 cursor-pointer flex gap-3 text-left relative ${
                    isActive 
                      ? 'bg-primary/[0.03] border-l-4 border-primary' 
                      : 'hover:bg-neutral-50 bg-white'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/5 text-primary border border-primary/10 flex items-center justify-center font-bold text-sm shrink-0">
                    {initials}
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
                        <span className={`text-[9px] font-bold uppercase ${
                          prop.status === 'accepted' ? 'text-emerald-500' :
                          prop.status === 'completed' ? 'text-blue-500' : 'text-rose-500'
                        }`}>
                          {prop.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {prop.unread && !isActive && (
                    <span className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat & Proposal Details */}
        <div className="md:col-span-8 flex flex-col h-full bg-white">
          {activeProposal ? (
            <>
              {/* Top Bar of Active Conversation */}
              <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-left shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/5 text-primary border border-primary/10 flex items-center justify-center font-bold text-sm">
                    {activeProposal.lenderName.trim().charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-neutral-800">{activeProposal.lenderName}</h2>
                    <p className="text-xs text-neutral-400 font-medium">Campus Peer</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  {getStatusBadge(activeProposal.status)}
                </div>
              </div>

              {/* Proposal Specific Details Block */}
              <div className="p-4 bg-primary/[0.01] border-b border-neutral-100 text-left shrink-0">
                <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <BookOpen size={13} /> Proposal Details
                </h3>
                
                <div className="bg-white rounded-2xl border border-primary/10 p-4 shadow-sm">
                  <div className="font-extrabold text-neutral-800 text-sm">{activeProposal.itemName}</div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3.5 text-xs">
                    {activeProposal.offerType === 'trade' && activeProposal.offerItems && (
                      <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                        <AlertCircle size={14} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-extrabold text-neutral-500 uppercase text-[9px] tracking-wider">Trading Exchange Offer</p>
                          <p className="font-bold text-neutral-700 mt-0.5">{activeProposal.offerItems}</p>
                        </div>
                      </div>
                    )}

                    {(activeProposal.offerType === 'rent' || activeProposal.offerType === 'borrow') && activeProposal.duration && (
                      <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                        <Clock size={14} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-extrabold text-neutral-500 uppercase text-[9px] tracking-wider">Lending Duration</p>
                          <p className="font-bold text-neutral-700 mt-0.5">{activeProposal.duration}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                      <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-extrabold text-neutral-500 uppercase text-[9px] tracking-wider">Meetup Location</p>
                        <p className="font-bold text-neutral-700 mt-0.5">{activeProposal.meetupLocation}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                      <Calendar size={14} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-extrabold text-neutral-500 uppercase text-[9px] tracking-wider">Preferred Time</p>
                        <p className="font-bold text-neutral-700 mt-0.5">{activeProposal.meetupTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Proposal Actions */}
                  {activeProposal.status === 'pending' && (
                    <div className="flex gap-2.5 mt-4 border-t border-neutral-100 pt-3.5 justify-end">
                      <button
                        onClick={() => handleUpdateStatus('declined')}
                        className="px-4 py-2 rounded-full border border-rose-100 text-rose-600 hover:bg-rose-50 font-bold text-xs transition duration-200 cursor-pointer"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleUpdateStatus('accepted')}
                        className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition shadow-sm duration-200 cursor-pointer"
                      >
                        Accept Proposal
                      </button>
                    </div>
                  )}

                  {activeProposal.status === 'accepted' && (
                    <div className="flex gap-2.5 mt-4 border-t border-neutral-100 pt-3.5 justify-end">
                      <button
                        onClick={() => handleUpdateStatus('completed')}
                        className="px-5 py-2 rounded-full bg-primary hover:bg-primary/95 text-white font-bold text-xs transition shadow-sm duration-200 cursor-pointer"
                      >
                        Mark as Completed Exchange
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Messages Section */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50/20">
                {activeProposal.messages.map((msg) => {
                  const isMe = msg.sender === 'me';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-xs shadow-sm font-medium ${
                        isMe 
                          ? 'bg-primary text-white rounded-br-none text-left' 
                          : 'bg-white border border-neutral-200/60 text-neutral-800 rounded-bl-none text-left'
                      }`}>
                        <p className="leading-relaxed">{msg.text}</p>
                        <p className={`text-[9px] mt-1 text-right ${isMe ? 'text-white/70' : 'text-neutral-400 font-semibold'}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input Bar */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-neutral-100 flex gap-2 items-center bg-white shrink-0">
                <input
                  type="text"
                  placeholder="Type a message to discuss coordinate details..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="flex-grow bg-neutral-50 text-xs px-4 py-3 rounded-full border border-neutral-200/70 focus:outline-none focus:border-primary/40 font-medium"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition shrink-0 cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-neutral-400 text-center">
              <MessageSquare size={48} className="text-neutral-200 mb-3" />
              <p className="text-sm font-bold">Select a proposal conversation to open chat</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
