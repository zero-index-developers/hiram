import { useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import type { Item } from '@hiram/shared';
import { useAuthStore } from '../../store/useAuthStore';

interface RequestProposalFormProps {
  item: Item;
  onSubmitSuccess: (data: {
    duration: string;
    tradeOffer: string;
    meetupLoc: string;
    meetupTime: string;
  }) => void;
}

export function RequestProposalForm({ item, onSubmitSuccess }: RequestProposalFormProps) {
  const { isAuthenticated, setAuthModalOpen } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // Form states
  const [duration, setDuration] = useState('7');
  const [tradeOffer, setTradeOffer] = useState('');
  const [notes, setNotes] = useState('');
  const [meetupLoc, setMeetupLoc] = useState('PUP Main Campus (CEA Building)');
  const [meetupTime, setMeetupTime] = useState('');

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAuthModalOpen(true, 'login');
      return;
    }

    setLoading(true);
    // Simulate API request submission
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess({
        duration,
        tradeOffer,
        meetupLoc,
        meetupTime
      });
    }, 1200);
  };

  return (
    <div className="w-full bg-white border border-primary/10 rounded-3xl p-8 shadow-sm lg:sticky lg:top-24">
      <h3 className="text-lg font-black text-neutral-800 mb-6 flex items-center gap-2">
        Submit Request Proposal
      </h3>

      <form onSubmit={handleRequestSubmit} className="space-y-5">
        {item.preferredTransaction === 'HIRAM' && (
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Lending Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none"
            >
              <option value="3">3 Days (Short-term)</option>
              <option value="7">7 Days (1 Week)</option>
              <option value="14">14 Days (2 Weeks)</option>
              <option value="30">30 Days (Long-term)</option>
            </select>
          </div>
        )}

        {item.preferredTransaction === 'TRADE' && (
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Items to Trade / Exchange
            </label>
            <textarea
              required
              value={tradeOffer}
              onChange={(e) => setTradeOffer(e.target.value)}
              placeholder="Describe what academic items or tools you are offering in exchange..."
              rows={3}
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400 resize-none"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            Purpose / Message to Lender
          </label>
          <textarea
            required
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Explain why you need this item or any special requests..."
            rows={4}
            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            Proposed Meetup Point
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
              <MapPin size={16} />
            </span>
            <input
              type="text"
              required
              value={meetupLoc}
              onChange={(e) => setMeetupLoc(e.target.value)}
              placeholder="e.g. PUP Main Library, CEA Lobby"
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            Proposed Date & Time (Optional)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
              <Calendar size={16} />
            </span>
            <input
              type="text"
              value={meetupTime}
              onChange={(e) => setMeetupTime(e.target.value)}
              placeholder="e.g. Friday, 2:00 PM"
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-bold py-3.5 rounded-full shadow-md shadow-primary/10 hover:shadow-lg transition-all hover:bg-primary/95 flex justify-center items-center gap-2 text-sm disabled:opacity-50"
        >
          {loading ? 'Submitting proposal...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}
