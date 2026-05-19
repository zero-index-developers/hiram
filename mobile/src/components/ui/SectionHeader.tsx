import React from 'react';
import { View, Text } from 'react-native';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <View className={className}>
      <Text className="text-base font-extrabold text-neutral-800 uppercase tracking-[0.12em]">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-neutral-500 text-xs mt-1 font-normal">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
