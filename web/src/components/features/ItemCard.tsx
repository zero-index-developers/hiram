import { useState } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '@hiram/shared';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { LogoSymbol } from '../ui/Logo';

interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  isAvailable: boolean;
  owner: string;
  createdAt: Date;
  image?: string;
}

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="bg-transparent border border-white/10 rounded-xl overflow-hidden transition-all duration-300 flex flex-col group hover:border-white/40">
      <div className="relative h-48 overflow-hidden bg-[#111] flex items-center justify-center border-b border-white/10">
        {item.image && !imgError ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center z-10">
                <LogoSymbol size="lg" className="text-white/5" />
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
          <div className="flex flex-col items-center justify-center text-white/40 gap-2 w-full h-full">
            <LogoSymbol size="lg" className="text-white/20" />
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
          <span className="text-[10px] text-white/40 font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" /> {formatDate(item.createdAt)}
          </span>
        </div>

        <h4 className="font-extrabold text-lg text-white group-hover:text-white/80 transition-colors duration-200">
          {item.title}
        </h4>

        <p className="text-white/60 text-xs mt-2 leading-relaxed flex-grow font-medium">
          {item.description}
        </p>

        <div className="pt-0 mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/10 text-white/60 flex items-center justify-center font-bold text-xs uppercase">
              {item.owner.charAt(0)}
            </div>
            <span className="text-xs font-bold text-white/60">
              By {item.owner}
            </span>
          </div>

          <Button variant="secondary" className="px-3.5 py-1.5 text-xs flex items-center gap-1 font-bold">
            Request <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
