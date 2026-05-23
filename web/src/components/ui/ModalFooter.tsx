interface ModalFooterProps {
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  loadingLabel?: string;
  destructive?: boolean;
  className?: string;
}

export function ModalFooter({
  cancelLabel = 'Cancel',
  confirmLabel = 'Save',
  onCancel,
  onConfirm,
  isLoading,
  loadingLabel = 'Saving...',
  destructive,
  className = '',
}: ModalFooterProps) {
  return (
    <div className={`flex items-center justify-end gap-3 mt-8 ${className}`}>
      <button
        onClick={onCancel}
        className="px-5 py-2.5 text-sm font-bold rounded-full border border-primary/10 bg-white text-neutral-700 hover:bg-primary/5 hover:text-primary transition-all cursor-pointer"
      >
        {cancelLabel}
      </button>
      <button
        onClick={onConfirm}
        disabled={isLoading}
        className={`px-6 py-2.5 text-sm font-bold rounded-full text-white shadow-sm transition-all cursor-pointer disabled:opacity-50 ${destructive
          ? 'bg-rose-500 hover:bg-rose-600'
          : 'bg-primary hover:bg-primary/95'
          }`}
      >
        {isLoading ? loadingLabel : confirmLabel}
      </button>
    </div>
  );
}
