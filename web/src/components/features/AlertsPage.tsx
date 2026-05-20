import { useState } from 'react';
import { ArrowLeft, Bell, CheckCircle, BookOpen, Clock, AlertTriangle } from 'lucide-react';


interface AlertsPageProps {
  onBack: () => void;
}

interface AlertItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Generate some mock alerts for pagination
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
      actionUrl: '/inbox?proposal=prop-2'
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
  
  if (i % 5 === 0) {
    return {
      id: `alert-${i}`,
      type: 'warning',
      title: 'Return Reminder',
      description: 'Your borrowed "Scientific Calculator" is due tomorrow.',
      timestamp: `${i} days ago`,
      read: isRead
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

const ITEMS_PER_PAGE = 8;

export function AlertsPage({ onBack }: AlertsPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockAlerts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAlerts = mockAlerts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} />;
      case 'info':
        return <BookOpen size={18} />;
      case 'warning':
        return <Clock size={18} />;
      case 'error':
        return <AlertTriangle size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  const getColorClassForType = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 text-emerald-500 border-emerald-100';
      case 'warning':
        return 'bg-amber-50 text-amber-500 border-amber-100';
      case 'error':
        return 'bg-red-50 text-red-500 border-red-100';
      default:
        return 'bg-primary/5 text-primary border-primary/10';
    }
  };

  const handleAlertClick = (alert: AlertItem) => {
    if (alert.actionUrl) {
      window.history.pushState(null, '', alert.actionUrl);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 pt-6 pb-20 w-full flex-grow flex flex-col min-h-[650px] animate-in fade-in duration-300">
      {/* Floating Back Button */}
      <div className="mb-6 shrink-0 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border border-primary/10 shadow-sm hover:shadow flex items-center justify-center transition-colors text-neutral-600 hover:text-primary hover:border-primary/30 cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-neutral-800">Notifications</h1>
          <p className="text-xs text-neutral-400 font-medium tracking-wide uppercase">All campus updates</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-primary/10 shadow-xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-100">
          {currentAlerts.map((alert) => (
            <div 
              key={alert.id}
              onClick={() => handleAlertClick(alert)}
              className={`p-5 flex gap-4 transition-colors ${alert.actionUrl ? 'cursor-pointer hover:bg-neutral-50' : ''} ${!alert.read ? 'bg-primary/5 hover:bg-primary/10' : ''}`}
            >
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 shadow-sm ${getColorClassForType(alert.type)}`}>
                {getIconForType(alert.type)}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className={`text-sm leading-snug ${!alert.read ? 'font-bold text-neutral-900' : 'font-semibold text-neutral-700'}`}>
                    {alert.title}
                  </h3>
                  <span className="text-[11px] font-medium text-neutral-400 shrink-0 whitespace-nowrap mt-0.5">
                    {alert.timestamp}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${!alert.read ? 'text-neutral-700' : 'text-neutral-500'}`}>
                  {alert.description}
                </p>
              </div>
              {!alert.read && (
                <div className="shrink-0 flex items-center justify-center w-6">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--color-primary),0.5)]"></span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-primary/10 bg-neutral-50/50 flex items-center justify-between px-6">
          <p className="text-xs text-neutral-500 font-medium">
            Showing <span className="font-bold text-neutral-800">{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, mockAlerts.length)}</span> of <span className="font-bold text-neutral-800">{mockAlerts.length}</span> updates
          </p>
          
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 text-xs font-bold rounded-full border border-primary/10 bg-white text-neutral-600 hover:text-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                // Simple pagination logic for demo (show max 5 pages)
                if (totalPages > 5 && pageNum !== 1 && pageNum !== totalPages && Math.abs(pageNum - currentPage) > 1) {
                  if (pageNum === 2 || pageNum === totalPages - 1) {
                    return <span key={pageNum} className="text-neutral-400 px-1">...</span>;
                  }
                  return null;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                      currentPage === pageNum
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-transparent text-neutral-500 hover:bg-neutral-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 text-xs font-bold rounded-full border border-primary/10 bg-white text-neutral-600 hover:text-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
