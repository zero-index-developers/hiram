import { ArrowRight, Hash, Loader2 } from 'lucide-react';

interface VerifyStudentIdProps {
  verifyId: string;
  setVerifyId: (val: string) => void;
  onVerify: () => void;
  isVerifying: boolean;
}

export function VerifyStudentId({ verifyId, setVerifyId, onVerify, isVerifying }: VerifyStudentIdProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl p-3 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-2 text-orange-700">
        <Hash size={16} className="shrink-0" />
        <span className="text-xs font-bold whitespace-nowrap">Verify Student ID:</span>
      </div>
      <div className="flex w-full sm:w-auto relative">
        <input
          type="text"
          value={verifyId}
          onChange={(e) => setVerifyId(e.target.value)}
          placeholder="e.g. 2021-12345-MN-0"
          className="w-full sm:w-44 bg-white border border-orange-200 rounded-l-lg py-1.5 px-3 text-xs font-medium focus:outline-none focus:border-orange-400 transition-colors"
        />
        <button
          onClick={onVerify}
          disabled={isVerifying || !verifyId.trim()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-r-lg flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isVerifying ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
        </button>
      </div>
    </div>
  );
}
