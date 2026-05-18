interface LogoSymbolProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LogoSymbol({ size = 'md', className = '' }: LogoSymbolProps) {
  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8'
  }[size];

  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconSize} ${className}`}
    >
      {/* Solid square represents local campus ownership */}
      <rect 
        x="3" 
        y="3" 
        width="11" 
        height="11" 
        rx="2.5" 
        stroke="currentColor" 
        strokeWidth="2.2" 
        className="text-current" 
      />
      {/* Dashed square represents sharing connection */}
      <rect 
        x="10" 
        y="10" 
        width="11" 
        height="11" 
        rx="2.5" 
        stroke="currentColor" 
        strokeWidth="2.2" 
        strokeDasharray="2 2"
        className="text-blue-light" 
      />
    </svg>
  );
}

interface LogoProps {
  size?: 'sm' | 'md';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const symbolSize = size === 'sm' ? 'sm' : 'md';
  const textSize = size === 'sm' ? 'text-sm' : 'text-lg';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoSymbol size={symbolSize} />
      <span className={`font-black tracking-tight text-current ${textSize}`}>
        Hiram
      </span>
    </div>
  );
}
