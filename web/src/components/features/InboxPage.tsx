import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { mockProposalsData } from '@hiram/shared';
import type { MockProposal, MockProposalMessage } from '@hiram/shared';
import { InboxProposalsList } from './InboxProposalsList';
import { InboxProposalDetails } from './InboxProposalDetails';
import { InboxChatView } from './InboxChatView';
import { PageLayout } from '../layout/PageLayout';

export function InboxPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPropId = searchParams.get('proposal') || 'prop-1';

  const [proposals, setProposals] = useState<MockProposal[]>(mockProposalsData);
  const [selectedProposalId, setSelectedProposalId] = useState<string>(initialPropId);
  const [newMessageText, setNewMessageText] = useState<string>('');

  useEffect(() => {
    const propId = new URLSearchParams(location.search).get('proposal');
    if (propId) {
      setSelectedProposalId(propId);
    }
  }, [location.search]);

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

  return (
    <PageLayout backTo="/">

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 bg-white rounded-xl border border-primary/10 overflow-hidden shadow-xl">
        {/* Left Side: Proposals List */}
        <InboxProposalsList
          proposals={proposals}
          selectedProposalId={selectedProposalId}
          onSelectProposal={setSelectedProposalId}
        />

        {/* Right Side: Active Chat & Proposal Details */}
        <div className="md:col-span-8 flex flex-col h-full bg-white">
          {activeProposal ? (
            <>
              <InboxProposalDetails
                proposal={activeProposal}
                onUpdateStatus={handleUpdateStatus}
              />
              <InboxChatView
                proposal={activeProposal}
                newMessageText={newMessageText}
                onChangeMessageText={setNewMessageText}
                onSendMessage={handleSendMessage}
              />
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-neutral-400 text-center">
              <MessageSquare size={48} className="text-neutral-200 mb-3" />
              <p className="text-sm font-bold">Select a proposal conversation to open chat</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
