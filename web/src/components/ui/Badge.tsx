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
    glass: 'bg-black/80 border border-white/20 text-white px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider',
    outline: 'font-extrabold text-white/60 border border-white/10 bg-transparent px-2.5 py-0.5 text-[10px] uppercase tracking-widest',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
