import React from 'react';
import { View, Text } from 'react-native';

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { container: 'w-4 h-4', box: 'w-2.5 h-2.5', border: 'border' },
  md: { container: 'w-6 h-6', box: 'w-4 h-4', border: 'border-[1.5px]' },
  lg: { container: 'w-8 h-8', box: 'w-5 h-5', border: 'border-[1.5px]' },
};

export function BrandMark({ size = 'sm' }: BrandMarkProps) {
  const s = sizeMap[size];
  return (
    <View className={`relative ${s.container}`}>
      <View className={`${s.box} ${s.border} border-primary rounded-[1.5px] absolute top-0 left-0`} />
      <View
        className={`${s.box} ${s.border} border-accent rounded-[1.5px] absolute bottom-0 right-0 bg-background`}
        style={{ borderStyle: 'dashed' }}
      />
    </View>
  );
}
