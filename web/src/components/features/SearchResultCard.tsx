import { useState } from 'react';
import { formatDate } from '@hiram/shared';
import { Clock, MapPin } from 'lucide-react';
import { LogoSymbol } from '../ui/Logo';
import { Badge } from '../ui/Badge';
import type { Item } from '@hiram/shared';

interface SearchResultCardProps {
  item: Item;
  onClick?: () => void;
}

export function SearchResultCard({ item, onClick }: SearchResultCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);


  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <div
      className="flex items-start gap-4 p-4 bg-white border border-primary/10 rounded-xl hover:shadow-md cursor-pointer"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="w-32 h-28 flex-shrink-0 relative bg-neutral-50 overflow-hidden rounded">
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
              className={`w-full h-full object-cover transition-transform duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'} ${imgLoaded ? 'scale-105' : ''
                }`}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-2">
            <LogoSymbol size="lg" className="text-neutral-200" />
            <span className="text-[10px] font-bold tracking-wider uppercase opacity-60">
              No Image
            </span>
          </div>
        )}
        <Badge variant="glass" className="absolute top-2 right-2 z-20">
          {item.condition}
        </Badge>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{item.category}</Badge>
          {item.preferredTransaction && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-sm ${item.preferredTransaction === 'HIRAM'
                ? 'bg-blue-50 text-blue-600 border-blue-100'
                : item.preferredTransaction === 'TRADE'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}
            >
              {item.preferredTransaction === 'HIRAM'
                ? 'Hiram'
                : item.preferredTransaction === 'TRADE'
                  ? 'Trade'
                  : 'Request'}
            </span>
          )}
        </div>
        <h4 className="font-extrabold text-lg text-neutral-800 hover:text-primary transition-colors">
          {item.title}
        </h4>
        <p className="text-xs text-neutral-600 line-clamp-1" title={item.description}>
          {item.description}
        </p>
        <div className="flex items-center justify-between text-xs text-neutral-500 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {formatDate(item.createdAt)}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {item.cityCode === '137607000' ? 'Taguig' : 'Manila'}
          </div>
        </div>
      </div>
    </div>
  );
}
