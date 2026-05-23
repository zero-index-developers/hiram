import { MessageSquare, BookOpen, Inbox } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { Popover } from '../ui/Popover';

interface InboxPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  btnSizeClass: string;
  onToggle: () => void;
}

export function InboxPopover({ isOpen, onClose, btnSizeClass, onToggle }: InboxPopoverProps) {
  const navigateToInbox = () => {
    onClose();
    window.history.pushState(null, '', '/inbox');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="relative">
      <IconButton icon={Inbox} onClick={onToggle} className={btnSizeClass} badge badgePulse />

      <Popover isOpen={isOpen} onClose={onClose}>
        <div className="px-4 pb-4 border-b border-neutral-100 flex justify-between items-center">
          <span className="font-extrabold text-neutral-800 text-xs uppercase tracking-wider">Inbox Proposals</span>
          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">2 New</span>
        </div>

        <div className="max-h-64 overflow-y-auto scrollbar-minimal divide-y divide-neutral-100">
          <div onClick={navigateToInbox} className="p-3.5 bg-white hover:bg-neutral-50/50 transition-colors cursor-pointer flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center shrink-0">
              <MessageSquare size={14} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-neutral-700 truncate">Julius Cesar</p>
              <p className="text-[11px] text-neutral-400 truncate mt-0.5">Is the Chemistry Book still available for rent?</p>
            </div>
          </div>

          <div onClick={navigateToInbox} className="p-3.5 bg-white hover:bg-neutral-50/50 transition-colors cursor-pointer flex gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center shrink-0">
              <BookOpen size={14} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-neutral-700 truncate">Marcus Aurelius</p>
              <p className="text-[11px] text-neutral-400 truncate mt-0.5">Offered Calculus Guide in exchange for your board...</p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-2.5 px-4 flex justify-center">
          <button
            onClick={navigateToInbox}
            className="text-xs font-black text-primary hover:text-primary/80 transition-colors w-full text-center py-1 cursor-pointer"
          >
            See All
          </button>
        </div>
      </Popover>
    </div>
  );
}
