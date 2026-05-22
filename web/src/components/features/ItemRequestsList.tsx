import type { MockProposal } from "@hiram/shared";
import { mockProposalsData } from "@hiram/shared";
import {
  CheckCircle2,
  Clock,
  MessageSquare,
  Minus,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface ItemRequestsListProps {
  itemName: string;
}

export function ItemRequestsList({ itemName }: ItemRequestsListProps) {
  const [selectedProposal, setSelectedProposal] = useState<MockProposal | null>(
    null,
  );

  // Filter proposals that match this item
  const itemProposals = mockProposalsData.filter(
    (p) => p.itemName.toLowerCase() === itemName.toLowerCase(),
  );

  if (itemProposals.length === 0) {
    return (
      <div className="border border-neutral-200 rounded-2xl p-8 text-center bg-neutral-50/30">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 mb-4">
          <MessageSquare size={24} />
        </div>
        <h3 className="text-lg font-bold text-neutral-800 mb-2">
          No Requests Yet
        </h3>
        <p className="text-sm text-neutral-500">
          When someone requests to borrow or trade your item, it will appear
          here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-900">
          Requests ({itemProposals.length})
        </h3>
      </div>

      {!selectedProposal ? (
        /* Requests List View */
        <div className="space-y-3">
          {itemProposals.map((proposal) => (
            <button
              key={proposal.id}
              onClick={() => setSelectedProposal(proposal)}
              className="w-full border border-neutral-200 rounded-2xl p-4 hover:border-primary/30 hover:bg-primary/3 transition-all text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <Avatar
                    name={proposal.lenderName}
                    size="md"
                    src={proposal.lenderAvatar}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-neutral-900 truncate">
                      {proposal.lenderName}
                    </p>
                    <p className="text-sm text-neutral-500 truncate">
                      {proposal.offerType === "borrow" && "Wants to borrow"}
                      {proposal.offerType === "trade" && "Wants to trade"}
                      {proposal.offerType === "rent" && "Wants to rent"}
                    </p>
                    {proposal.duration && (
                      <p className="text-xs text-neutral-400 mt-1">
                        {proposal.duration}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={proposal.status} />
                  <span className="text-xs text-neutral-400">
                    {proposal.lastMessageTime}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Proposal Detail View */
        <div className="border border-primary/20 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
          <div className="p-6 border-b border-primary/10 flex items-center justify-between">
            <button
              onClick={() => setSelectedProposal(null)}
              className="text-primary hover:text-primary/70 font-bold transition-colors"
            >
              ← Back to Requests
            </button>
            <StatusBadge status={selectedProposal.status} />
          </div>

          <div className="p-6 space-y-6">
            {/* Requester Info */}
            <div className="flex items-center gap-4">
              <Avatar
                name={selectedProposal.lenderName}
                size="lg"
                src={selectedProposal.lenderAvatar}
              />
              <div>
                <p className="font-bold text-neutral-900">
                  {selectedProposal.lenderName}
                </p>
                <p className="text-sm text-neutral-500">
                  Requested {selectedProposal.offerType}
                </p>
              </div>
            </div>

            {/* Request Details */}
            <div className="space-y-3 bg-white rounded-xl p-4 border border-neutral-100">
              <div className="flex justify-between">
                <span className="text-xs font-bold text-neutral-400 uppercase">
                  Type
                </span>
                <span className="text-sm font-bold text-neutral-700 capitalize">
                  {selectedProposal.offerType}
                </span>
              </div>

              {selectedProposal.duration && (
                <div className="flex justify-between border-t border-neutral-100 pt-3">
                  <span className="text-xs font-bold text-neutral-400 uppercase">
                    Duration
                  </span>
                  <span className="text-sm font-bold text-neutral-700">
                    {selectedProposal.duration}
                  </span>
                </div>
              )}

              {selectedProposal.offerItems && (
                <div className="flex justify-between border-t border-neutral-100 pt-3">
                  <span className="text-xs font-bold text-neutral-400 uppercase">
                    Offered Items
                  </span>
                  <span className="text-sm font-bold text-neutral-700">
                    {selectedProposal.offerItems}
                  </span>
                </div>
              )}

              <div className="flex justify-between border-t border-neutral-100 pt-3">
                <span className="text-xs font-bold text-neutral-400 uppercase">
                  Meetup Point
                </span>
                <span className="text-sm font-bold text-neutral-700">
                  {selectedProposal.meetupLocation}
                </span>
              </div>

              <div className="flex justify-between border-t border-neutral-100 pt-3">
                <span className="text-xs font-bold text-neutral-400 uppercase">
                  Proposed Time
                </span>
                <span className="text-sm font-bold text-neutral-700">
                  {selectedProposal.meetupTime}
                </span>
              </div>
            </div>

            {/* Recent Messages Preview */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-neutral-400 uppercase">
                Recent Messages
              </p>
              <div className="bg-neutral-50 rounded-xl p-3 space-y-2 max-h-48 overflow-y-auto">
                {selectedProposal.messages.slice(-3).map((msg) => (
                  <div
                    key={msg.id}
                    className={`text-xs leading-relaxed rounded-lg px-3 py-2 ${
                      msg.sender === "me"
                        ? "bg-primary/10 text-primary font-medium"
                        : "bg-white border border-neutral-200 text-neutral-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {selectedProposal.status === "pending" && (
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setSelectedProposal(null)}
                  variant="secondary"
                  className="flex-1"
                >
                  <ThumbsUp size={16} className="mr-2" /> Accept
                </Button>
                <Button
                  onClick={() => setSelectedProposal(null)}
                  variant="secondary"
                  className="flex-1"
                >
                  <Minus size={16} className="mr-2" /> Decline
                </Button>
              </div>
            )}

            {selectedProposal.status === "accepted" && (
              <div className="flex gap-3 pt-4">
                <Button variant="primary" className="flex-1">
                  <MessageSquare size={16} className="mr-2" /> View Chat
                </Button>
                <Button
                  onClick={() => setSelectedProposal(null)}
                  variant="secondary"
                  className="flex-1"
                >
                  <CheckCircle2 size={16} className="mr-2" /> Mark Complete
                </Button>
              </div>
            )}

            {selectedProposal.status === "completed" && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                <p className="text-sm font-bold text-emerald-700">
                  ✓ Transaction Completed
                </p>
              </div>
            )}

            {selectedProposal.status === "declined" && (
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
                <p className="text-sm font-bold text-neutral-700">
                  This request was declined
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<
    string,
    { variant: "outline" | "glass"; icon: React.ReactNode; label: string }
  > = {
    pending: {
      variant: "outline",
      icon: <Clock size={14} />,
      label: "Pending",
    },
    accepted: {
      variant: "glass",
      icon: <ThumbsUp size={14} />,
      label: "Accepted",
    },
    completed: {
      variant: "glass",
      icon: <CheckCircle2 size={14} />,
      label: "Completed",
    },
    declined: {
      variant: "outline",
      icon: <Minus size={14} />,
      label: "Declined",
    },
  };

  const cfg = config[status] || config.pending;

  return (
    <Badge variant={cfg.variant} className="inline-flex items-center gap-1.5">
      {cfg.icon}
      {cfg.label}
    </Badge>
  );
}
