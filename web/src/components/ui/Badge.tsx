interface BadgeProps {
  variant?: 'glass' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ 
  variant = 'outline', 
  children, 
  className = '' 
}: BadgeProps) {
  const baseStyle = 'inline-flex items-center justify-center rounded-full transition-all duration-300';
  
  const variants = {
    glass: 'bg-white/85 backdrop-blur-md border border-primary/10 text-neutral-800 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-sm',
    outline: 'font-extrabold text-neutral-500 border border-primary/10 bg-white px-2.5 py-0.5 text-[10px] uppercase tracking-widest shadow-sm',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
