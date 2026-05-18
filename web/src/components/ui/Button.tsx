import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'contrast-primary' | 'contrast-secondary';
  children: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyle = 'inline-flex items-center justify-center font-bold text-sm rounded-full transition-all duration-300 focus:outline-none';
  
  const variants = {
    primary: 'bg-white text-black px-6 py-2.5 hover:bg-white/90',
    secondary: 'bg-transparent text-white border border-white/20 px-6 py-2.5 hover:border-white/50 hover:bg-white/5',
    outline: 'bg-transparent border border-white/10 text-white/80 px-6 py-2.5 hover:border-white/30 hover:text-white',
    ghost: 'bg-transparent text-white/60 px-4 py-2 hover:text-white hover:bg-white/5',
    
    // Premium SaaS High-Contrast Button Pair
    'contrast-primary': 'bg-white text-black hover:bg-white/90',
    'contrast-secondary': 'bg-[#1a1a1a] text-white border border-white/20 hover:border-white/50 hover:bg-[#222]',
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}
