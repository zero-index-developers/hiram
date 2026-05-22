import { useState } from 'react';
import { Bell, CheckCircle, BookOpen, Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../layout/PageLayout';


interface AlertItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

const mockAlerts: AlertItem[] = Array.from({ length: 24 }).map((_, i) => {
  const isRead = i > 3;

  if (i === 0) {
    return {
      id: `alert-${i}`,
      type: 'success',
      title: 'Request Approved!',
      description: 'Your request for "T-Square 36" has been approved by the lender.',
      timestamp: '10 minutes ago',
      read: false,
      actionUrl: '/inbox?proposal=prop-2',
      actionLabel: 'View in Inbox'
    };
  }

  if (i === 1) {
    return {
      id: `alert-${i}`,
      type: 'info',
      title: 'System Update',
      description: 'Verify your campus email to unlock unlimited listings.',
      timestamp: '2 hours ago',
      read: false
    };
  }

  if (i === 2) {
    return {
      id: `alert-${i}`,
      type: 'warning',
      title: 'New Proposal Received',
      description: 'Someone wants to borrow your "HP Prime Graphing Calculator".',
      timestamp: '3 hours ago',
      read: false,
      actionUrl: '/inbox',
      actionLabel: 'View Proposal'
    };
  }

  if (i === 3) {
    return {
      id: `alert-${i}`,
      type: 'info',
      title: 'Profile Incomplete',
      description: 'Add a profile photo to build trust with other lenders.',
      timestamp: '1 day ago',
      read: false
    };
  }

  if (i % 5 === 0) {
    return {
      id: `alert-${i}`,
      type: 'warning',
      title: 'Return Reminder',
      description: 'Your borrowed "Scientific Calculator" is due tomorrow.',
      timestamp: `${i} days ago`,
      read: isRead,
      actionUrl: '/inbox',
      actionLabel: 'View Loan'
    };
  }

  return {
    id: `alert-${i}`,
    type: 'success',
    title: 'Listing Live',
    description: `Your item "Engineering Book Vol ${i}" is now live and visible to the campus.`,
    timestamp: `${i} days ago`,
    read: isRead
  };
});

const ITEMS_PER_PAGE = 10;

export function AlertsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const totalPages = Math.ceil(mockAlerts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAlerts = mockAlerts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const unreadCount = mockAlerts.filter((a) => !a.read).length;

  const getIconForType = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} />;
      case 'info': return <BookOpen size={18} />;
      case 'warning': return <Clock size={18} />;
      case 'error': return <AlertTriangle size={18} />;
      default: return <Bell size={18} />;
    }
  };

  const getColorClassForType = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-50 text-emerald-500 border-emerald-100';
      case 'warning': return 'bg-amber-50 text-amber-500 border-amber-100';
      case 'error': return 'bg-red-50 text-red-500 border-red-100';
      default: return 'bg-primary/5 text-primary border-primary/10';
    }
  };

  const handleAlertClick = (alert: AlertItem) => {
    if (alert.actionUrl) {
      navigate(alert.actionUrl);
    }
  };

  return (
    <PageLayout backTo="/">

      <div className="flex-1 min-h-0 bg-white rounded-xl border border-primary/10 overflow-hidden shadow-xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 bg-white shrink-0 flex items-center gap-3">
          <h2 className="text-base font-black text-neutral-900">Notifications</h2>
          {unreadCount > 0 && (
            <span className="text-xs font-black bg-primary text-white rounded-full px-2.5 py-0.5">
              {unreadCount} new
            </span>
          )}
        </div>

        {/* Alert List */}
        <div className="flex-1 overflow-y-auto scrollbar-minimal divide-y divide-neutral-100/70 bg-neutral-50/30">
          {currentAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => handleAlertClick(alert)}
              className={`flex items-start gap-4 p-5 transition-all duration-200 relative ${alert.actionUrl ? 'cursor-pointer hover:bg-neutral-50' : 'cursor-default'
                } ${!alert.read ? 'bg-primary/[0.02]' : 'bg-white'}`}
            >
              {/* Icon with Top-Left Unread dot */}
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-sm ${getColorClassForType(alert.type)}`}>
                  {getIconForType(alert.type)}
                </div>
                {!alert.read && (
                  <span className="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className={`text-sm ${!alert.read ? 'font-black text-neutral-900' : 'font-bold text-neutral-700'}`}>
                    {alert.title}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-semibold shrink-0">{alert.timestamp}</span>
                </div>
                <p className={`text-xs mt-0.5 leading-relaxed ${!alert.read ? 'text-neutral-600 font-medium' : 'text-neutral-400'}`}>
                  {alert.description}
                </p>
                {/* Redirect indicator */}
                {alert.actionUrl && (
                  <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-primary">
                    <ExternalLink size={11} />
                    {alert.actionLabel ?? 'View Details'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-primary/10 bg-neutral-50/50 shrink-0">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1.5 text-[10px] font-bold rounded-full border border-primary/10 bg-white text-neutral-600 hover:text-primary hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              Prev
            </button>
            <span className="text-[10px] font-bold text-neutral-500">Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1.5 text-[10px] font-bold rounded-full border border-primary/10 bg-white text-neutral-600 hover:text-primary hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
