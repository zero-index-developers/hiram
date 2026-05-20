import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, User, ShieldCheck, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { mockItems, formatDate } from '@hiram/shared';
import type { Item } from '@hiram/shared';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/useAuthStore';

interface ItemDetailsPageProps {
  slug: string;
  onBack: () => void;
}

export function ItemDetailsPage({ slug, onBack }: ItemDetailsPageProps) {
  const { isAuthenticated, setAuthModalOpen } = useAuthStore();
  
  const [item, setItem] = useState<Item | null>(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [duration, setDuration] = useState('7');
  const [tradeOffer, setTradeOffer] = useState('');
  const [notes, setNotes] = useState('');
  const [meetupLoc, setMeetupLoc] = useState('PUP Main Campus (CEA Building)');
  const [meetupTime, setMeetupTime] = useState('');

  useEffect(() => {
    if (!slug) return;
    
    // Extract ID from slug (it's the trailing part after the last hyphen)
    const parts = slug.split('-');
    const id = parts[parts.length - 1];
    
    const foundItem = mockItems.find((i) => i.id === id);
    if (foundItem) {
      setItem(foundItem);
    }
  }, [slug]);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-24 text-center">
        <h2 className="text-2xl font-black text-neutral-800">Item Not Found</h2>
        <p className="text-neutral-500 mt-2">The item you are looking for does not exist or has been removed.</p>
        <Button onClick={onBack} className="mt-6" variant="primary">
          Back to Discover
        </Button>
      </div>
    );
  }

  const ownerName = typeof item.owner === 'string' ? item.owner : item.owner?.name || 'Unknown';

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
      setRequestSubmitted(true);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 flex-grow w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-neutral-400 font-bold mb-6 uppercase tracking-wider">
        <button onClick={onBack} className="hover:text-primary transition-colors">Discover</button>
        <ChevronRight size={12} />
        <span className="text-neutral-600 truncate">{item.title}</span>
      </div>

      {/* Back button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-primary transition-all mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Dashboard
      </button>

      {requestSubmitted ? (
        /* Success Screen */
        <div className="bg-white border border-emerald-100 rounded-3xl p-12 text-center shadow-xl shadow-emerald-50 max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 mb-6">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Request Submitted!</h2>
          <p className="text-neutral-500 text-sm mt-3 leading-relaxed max-w-md mx-auto">
            Your request for <span className="font-bold text-neutral-800">"{item.title}"</span> has been sent to <span className="font-bold text-neutral-800">{ownerName}</span>. They will be notified to review and approve your proposal.
          </p>

          <div className="mt-8 border border-neutral-100 rounded-2xl p-6 bg-neutral-50/50 text-left space-y-3.5 max-w-md mx-auto text-xs">
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="font-bold text-neutral-400 uppercase">Transaction Mode</span>
              <span className="font-bold text-primary">{item.preferredTransaction}</span>
            </div>
            {item.preferredTransaction === 'HIRAM' && (
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="font-bold text-neutral-400 uppercase">Requested Duration</span>
                <span className="font-bold text-neutral-700">{duration} Days</span>
              </div>
            )}
            {item.preferredTransaction === 'TRADE' && (
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="font-bold text-neutral-400 uppercase">Offered Items</span>
                <span className="font-bold text-neutral-700">{tradeOffer || 'N/A'}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="font-bold text-neutral-400 uppercase">Meetup Point</span>
              <span className="font-bold text-neutral-700">{meetupLoc}</span>
            </div>
            {meetupTime && (
              <div className="flex justify-between">
                <span className="font-bold text-neutral-400 uppercase">Proposed Time</span>
                <span className="font-bold text-neutral-700">{meetupTime}</span>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Button onClick={onBack} variant="primary">
              Discover More Items
            </Button>
          </div>
        </div>
      ) : (
        /* Details & Request Split Layout */
        <div className="flex flex-col lg:flex-row gap-10 items-start w-full">
          
          {/* Left Column: Media & Product Info */}
          <div className="w-full lg:w-3/5 space-y-8">
            {/* Image display */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-primary/10 bg-neutral-50 flex items-center justify-center shadow-sm">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-neutral-400 py-20">
                  <User size={48} className="opacity-30" />
                  <span className="text-xs font-bold uppercase tracking-wider">No Image Available</span>
                </div>
              )}
              <Badge variant="glass" className="absolute top-4 right-4 z-10">
                {item.condition}
              </Badge>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="outline">{item.category}</Badge>
                {item.preferredTransaction && (
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-sm ${
                    item.preferredTransaction === 'HIRAM'
                      ? 'bg-blue-50 text-blue-600 border-blue-100'
                      : item.preferredTransaction === 'TRADE'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {item.preferredTransaction}
                  </span>
                )}
                <span className="text-[10px] text-neutral-400 font-bold flex items-center gap-1">
                  <Clock size={12} /> Listed {formatDate(item.createdAt)}
                </span>
              </div>
              <h1 className="text-3xl font-black text-neutral-900 tracking-tight leading-tight">{item.title}</h1>
              <p className="text-neutral-600 text-base leading-relaxed font-medium whitespace-pre-wrap">{item.description}</p>
            </div>

            {/* Owner Details Card */}
            <div className="border border-primary/10 rounded-2xl p-5 bg-neutral-50/30 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center font-bold text-sm uppercase border border-primary/10">
                  {ownerName.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Lender</span>
                  <span className="text-base font-bold text-neutral-800">{ownerName}</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider">
                <ShieldCheck size={14} /> Campus Verified
              </div>
            </div>
          </div>

          {/* Right Column: Request Proposal Form */}
          <div className="w-full lg:w-2/5 bg-white border border-primary/10 rounded-3xl p-8 shadow-sm lg:sticky lg:top-24">
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
        </div>
      )}
    </div>
  );
}
