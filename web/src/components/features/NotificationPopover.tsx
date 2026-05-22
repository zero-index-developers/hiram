import { Bell, CheckCircle, BookOpen } from 'lucide-react';

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  btnSizeClass: string;
  iconSize: number;
  onToggle: () => void;
}

export function NotificationPopover({ isOpen, onClose, btnSizeClass, iconSize, onToggle }: NotificationPopoverProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`${btnSizeClass} rounded-full border border-primary/10 bg-primary/5 text-neutral-600 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all shadow-sm relative`}
      >
        <Bell size={iconSize} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white animate-pulse" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-80 bg-white border border-primary/10 rounded-2xl shadow-xl py-3.5 z-40 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
          <div className="px-4 pb-2 border-b border-neutral-100 mb-2 flex justify-between items-center">
            <span className="font-extrabold text-neutral-800 text-xs uppercase tracking-wider">Alerts</span>
            <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full">New Updates</span>
          </div>

          <div className="max-h-64 overflow-y-auto scrollbar-minimal divide-y divide-neutral-100">
            <div 
              onClick={() => {
                onClose();
                window.history.pushState(null, '', '/inbox?proposal=prop-2');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="p-3.5 hover:bg-neutral-50/50 transition-colors cursor-pointer flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center shrink-0">
                <CheckCircle size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-neutral-700 leading-snug">
                  Your request for <span className="font-bold">"T-Square 36"</span> has been approved!
                </p>
                <p className="text-[10px] text-neutral-400 mt-1">10 minutes ago</p>
              </div>
            </div>

            <div className="p-3.5 hover:bg-neutral-50/50 transition-colors cursor-pointer flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/5 text-primary border border-primary/10 flex items-center justify-center shrink-0">
                <BookOpen size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-neutral-700 leading-snug">
                  Verify your campus email to unlock unlimited listings.
                </p>
                <p className="text-[10px] text-neutral-400 mt-1">2 hours ago</p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-2.5 px-4 flex justify-center">
            <button
              onClick={() => {
                onClose();
                window.history.pushState(null, '', '/alerts');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-xs font-black text-primary hover:text-primary/80 transition-colors w-full text-center py-1 cursor-pointer"
            >
              See All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
