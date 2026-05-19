import React from 'react';
import { View, Text } from 'react-native';

type BadgeVariant = 'default' | 'outline' | 'subtle';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-primary border border-primary',
  outline: 'border border-primary/10 bg-white',
  subtle: 'bg-primary/5',
};

const textStyles: Record<BadgeVariant, string> = {
  default: 'text-white',
  outline: 'text-neutral-500',
  subtle: 'text-primary',
};

export function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  return (
    <View className={`${variantStyles[variant]} px-2.5 py-0.5 rounded-full ${className}`}>
      <Text className={`text-[9px] ${textStyles[variant]} font-bold uppercase tracking-wider`}>
        {label}
      </Text>
    </View>
  );
}
