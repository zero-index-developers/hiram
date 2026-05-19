import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary shadow-sm',
  outline: 'border border-primary/20 bg-white shadow-sm',
  ghost: 'bg-transparent',
};

const textVariantStyles: Record<ButtonVariant, string> = {
  primary: 'text-white',
  outline: 'text-neutral-700',
  ghost: 'text-neutral-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
};

const textSizeStyles: Record<ButtonSize, string> = {
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
};

export function Button({
  label,
  variant = 'outline',
  size = 'md',
  onPress,
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-full ${disabled ? 'opacity-40' : ''} ${className}`}
      activeOpacity={0.7}
    >
      <Text className={`${textVariantStyles[variant]} ${textSizeStyles[size]} font-semibold text-center`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
