import { Send } from 'lucide-react';
import type { MockProposal } from '@hiram/shared';

interface InboxChatViewProps {
  proposal: MockProposal;
  newMessageText: string;
  onChangeMessageText: (text: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

export function InboxChatView({
  proposal,
  newMessageText,
  onChangeMessageText,
  onSendMessage,
}: InboxChatViewProps) {
  return (
    <>
      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50/20">
        {proposal.messages.map((msg) => {
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
      <form onSubmit={onSendMessage} className="p-3 border-t border-neutral-100 flex gap-2 items-center bg-white shrink-0">
        <input
          type="text"
          placeholder="Type a message to discuss coordinate details..."
          value={newMessageText}
          onChange={(e) => onChangeMessageText(e.target.value)}
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
  );
}
