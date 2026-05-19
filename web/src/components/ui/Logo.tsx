interface LogoSymbolProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function LogoSymbol({ size = 'md', className = '' }: LogoSymbolProps) {
  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16',
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
        className="text-primary"
      />
    </svg>
  );
}
