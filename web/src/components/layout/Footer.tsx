import { MapPin } from 'lucide-react';
import { LogoSymbol } from '../ui/Logo';

export function Footer() {

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/[0.03] px-8 py-12 text-sm text-white/40 mt-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <LogoSymbol size="sm" className="text-white" />
          <span className="font-semibold text-white/60">Sharing Hub</span>
        </div>

        <p className="text-white/40">© {new Date().getFullYear()} Hiram. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-white/60">
            <MapPin className="w-4 h-4 text-white/60" />
            <span>Sta. Mesa, Manila</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
