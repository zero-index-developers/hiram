import { formatDate } from '@hiram/shared';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { LogoSymbol } from '../ui/Logo';
import { VerifiedBadge } from '../ui/VerifiedBadge';
import { useAuthStore } from '../../store/useAuthStore';

import type { Item } from '@hiram/shared';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { isAuthenticated, setAuthModalOpen } = useAuthStore();

  const ownerName = typeof item.owner === 'string' ? item.owner : item.owner?.name || 'Unknown';
  const ownerIsVerified = typeof item.owner !== 'string' && !!item.owner?.studentId;

  const handleRequestClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setAuthModalOpen(true, 'login');
    } else {
      const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + item.id;
      window.history.pushState(null, '', `/items/${slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="bg-white border border-primary/20 rounded-xl overflow-hidden transition-all duration-300 flex flex-col group hover:shadow-md">
      <div className="relative h-48 overflow-hidden bg-neutral-50 flex items-center justify-center border-b border-primary/5">
        {item.image && !imgError ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 bg-neutral-100 animate-pulse flex items-center justify-center z-10">
                <LogoSymbol size="lg" className="text-primary/10" />
              </div>
            )}
            <img
              src={item.image}
              alt={item.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-neutral-400 gap-2 w-full h-full">
            <LogoSymbol size="lg" className="text-neutral-200" />
            <span className="text-[10px] font-bold tracking-wider uppercase opacity-60">No Image Available</span>
          </div>
        )}

        <Badge variant="glass" className="absolute top-4 right-4 z-20">
          {item.condition}
        </Badge>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline">
            {item.category}
          </Badge>
          {item.preferredTransaction && (
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-sm ${item.preferredTransaction === 'HIRAM'
                ? 'bg-blue-50 text-blue-600 border-blue-100'
                : item.preferredTransaction === 'TRADE'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  : 'bg-amber-50 text-amber-600 border-amber-100'
              }`}>
              {item.preferredTransaction === 'HIRAM' ? 'Hiram' : item.preferredTransaction === 'TRADE' ? 'Trade' : 'Request'}
            </span>
          )}
          <span className="text-[10px] text-neutral-400 font-bold flex items-center gap-1">
            <Clock className="w-3 h-3 text-neutral-400" /> {formatDate(item.createdAt)}
          </span>
          <span className="text-[10px] text-neutral-400 font-bold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-neutral-400" /> {item.cityCode === '137607000' ? 'Taguig' : 'Manila'}
          </span>
        </div>

        <h4 className="font-extrabold text-lg text-neutral-800 group-hover:text-primary transition-colors duration-200">
          {item.title}
        </h4>

        <p className="text-neutral-600 text-xs mt-2 leading-relaxed flex-grow font-medium">
          {item.description}
        </p>

        <div className="pt-0 mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/5 text-primary flex items-center justify-center font-bold text-xs uppercase border border-primary/10">
              {ownerName.charAt(0)}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-neutral-500">
                By {ownerName}
              </span>
              {ownerIsVerified && <VerifiedBadge iconSize={12} />}
            </div>
          </div>

          <Button 
            onClick={handleRequestClick}
            variant="secondary" 
            className="px-3.5 py-1.5 text-xs flex items-center gap-1 font-bold"
          >
            Request <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
