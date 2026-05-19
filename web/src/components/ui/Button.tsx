import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
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
    primary: 'bg-primary text-white px-6 py-2.5 hover:bg-primary/95 shadow-sm hover:shadow transition-all duration-300',
    secondary: 'bg-white text-neutral-700 border border-primary/10 px-6 py-2.5 hover:bg-primary/5 hover:text-primary transition-all duration-300 shadow-sm',
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
