import { useState } from 'react';
import { LogoSymbol } from '../ui/Logo';

interface CompactItemImageProps {
  src?: string;
  title: string;
}

export function CompactItemImage({ src, title }: CompactItemImageProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-primary/5 flex items-center justify-center relative">
      {src && !imgError ? (
        <>
          {!imgLoaded && (
            <div className="absolute inset-0 bg-neutral-100 animate-pulse flex items-center justify-center z-10">
              <LogoSymbol size="sm" className="text-primary/10" />
            </div>
          )}
          <img
            src={src}
            alt={title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-neutral-400 gap-1 w-full h-full bg-neutral-50">
          <LogoSymbol size="sm" className="text-neutral-300" />
        </div>
      )}
    </div>
  );
}

interface DetailItemImageProps {
  src?: string;
  title: string;
}

export function DetailItemImage({ src, title }: DetailItemImageProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-neutral-50">
      {src && !imgError ? (
        <>
          {!imgLoaded && (
            <div className="absolute inset-0 bg-neutral-100 animate-pulse flex items-center justify-center z-10">
              <LogoSymbol size="lg" className="text-primary/10" />
            </div>
          )}
          <img
            src={src}
            alt={title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-neutral-400 gap-2 w-full h-full bg-neutral-50">
          <LogoSymbol size="lg" className="text-neutral-200" />
          <span className="text-[10px] font-bold tracking-wider uppercase opacity-60">No Image Available</span>
        </div>
      )}
    </div>
  );
}
