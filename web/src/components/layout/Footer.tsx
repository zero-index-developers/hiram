import { MapPin } from 'lucide-react';
import { LogoSymbol } from '../ui/Logo';

export function Footer() {

  return (
    <footer className="w-full bg-white border-t border-primary/5 px-8 py-12 text-sm text-neutral-400 mt-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <LogoSymbol size="sm" className="text-primary" />
          <span className="font-semibold text-neutral-600">Sharing Hub</span>
        </div>

        <p className="text-neutral-400">© {new Date().getFullYear()} Hiram. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-neutral-500">
            <MapPin className="w-4 h-4 text-primary/70" />
            <span>Sta. Mesa, Manila</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
