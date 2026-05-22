interface AvatarProps {
  name: string;
  src?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-10 h-10 text-sm',
  xl: 'w-28 h-28 text-3xl',
  xxl: 'w-40 w-40 text-4xl',
};

const initialsSize: Record<string, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
  xl: 'text-3xl',
  xxl: 'text-4xl',
};

export function Avatar({ name, src, size = 'md', className = '' }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase();
  const cls = sizeClasses[size] || sizeClasses.md;
  const initCls = initialsSize[size] || initialsSize.md;

  if (src) {
    return (
      <div className={`${cls} rounded-full overflow-hidden border border-primary/10 shrink-0 ${className}`}>
        <img src={src} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${cls} rounded-full bg-primary/5 text-primary border border-primary/10 flex items-center justify-center font-bold shrink-0 ${initCls} ${className}`}
    >
      {initial}
    </div>
  );
}
