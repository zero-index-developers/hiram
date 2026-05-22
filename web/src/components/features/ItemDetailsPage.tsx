import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import { mockItems, formatDate } from '@hiram/shared';
import type { Item } from '@hiram/shared';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { VerifiedBadge } from '../ui/VerifiedBadge';
import { RequestProposalForm } from './RequestProposalForm';
import { LogoSymbol } from '../ui/Logo';

interface ItemDetailsPageProps {
  slug: string;
  onBack: () => void;
}

export function ItemDetailsPage({ slug, onBack }: ItemDetailsPageProps) {
  const [item, setItem] = useState<Item | null>(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [proposalDetails, setProposalDetails] = useState<{
    duration: string;
    tradeOffer: string;
    meetupLoc: string;
    meetupTime: string;
  } | null>(null);

  useEffect(() => {
    if (!slug) return;

    // Extract ID from slug (it's the trailing part after the last hyphen)
    const parts = slug.split('-');
    const id = parts[parts.length - 1];

    const foundItem = mockItems.find((i) => i.id === id);
    if (foundItem) {
      setItem(foundItem);
      setImgError(false);
      setImgLoaded(false);
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
  const ownerIsVerified = typeof item.owner !== 'string' && !!item.owner?.studentId;

  const handleProposalSubmitSuccess = (details: {
    duration: string;
    tradeOffer: string;
    meetupLoc: string;
    meetupTime: string;
  }) => {
    setProposalDetails(details);
    setRequestSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 flex-grow w-full text-left">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-neutral-400 font-bold mb-6 tracking-wider">
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
        Back to Discover
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
                <span className="font-bold text-neutral-700">{proposalDetails?.duration} Days</span>
              </div>
            )}
            {item.preferredTransaction === 'TRADE' && (
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="font-bold text-neutral-400 uppercase">Offered Items</span>
                <span className="font-bold text-neutral-700">{proposalDetails?.tradeOffer || 'N/A'}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="font-bold text-neutral-400 uppercase">Meetup Point</span>
              <span className="font-bold text-neutral-700">{proposalDetails?.meetupLoc}</span>
            </div>
            {proposalDetails?.meetupTime && (
              <div className="flex justify-between">
                <span className="font-bold text-neutral-400 uppercase">Proposed Time</span>
                <span className="font-bold text-neutral-700">{proposalDetails?.meetupTime}</span>
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
              {item.image && !imgError ? (
                <>
                  {!imgLoaded && (
                    <div className="absolute inset-0 bg-neutral-100 animate-pulse flex items-center justify-center z-10">
                      <LogoSymbol size="xl" className="text-primary/10" />
                    </div>
                  )}
                  <img
                    src={item.image}
                    alt={item.title}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgError(true)}
                    className={`w-full h-full object-cover transition duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-neutral-400 gap-2 w-full h-full py-20 bg-neutral-50/50">
                  <LogoSymbol size="xl" className="text-neutral-200" />
                  <span className="text-xs font-bold tracking-wider uppercase opacity-60">No Image Available</span>
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
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-sm ${item.preferredTransaction === 'HIRAM'
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
                <span className="text-[10px] text-neutral-400 font-bold flex items-center gap-1">
                  <MapPin size={12} /> {item.cityCode === '137607000' ? 'Taguig' : 'Manila'}
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
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-bold text-neutral-800">{ownerName}</span>
                    {ownerIsVerified && <VerifiedBadge iconSize={16} />}
                  </div>
                </div>
              </div>
              {ownerIsVerified && (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider">
                  <ShieldCheck size={14} /> Campus Verified
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Request Proposal Form Component */}
          <div className="w-full lg:w-2/5">
            <RequestProposalForm item={item} onSubmitSuccess={handleProposalSubmitSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}
