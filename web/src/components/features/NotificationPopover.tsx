import { Bell, CheckCircle, BookOpen } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { Popover } from '../ui/Popover';

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
      <IconButton icon={Bell} onClick={onToggle} className={btnSizeClass} size={iconSize} badge badgeColor="bg-amber-500" />

      <Popover isOpen={isOpen} onClose={onClose}>
        <div className="px-4 pb-4 border-b border-neutral-100 flex justify-between items-center">
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
            className="p-3.5 bg-white hover:bg-neutral-50/50 transition-colors cursor-pointer flex gap-3"
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

          <div className="p-3.5 bg-white hover:bg-neutral-50/50 transition-colors cursor-pointer flex gap-3">
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
      </Popover>
    </div>
  );
}
