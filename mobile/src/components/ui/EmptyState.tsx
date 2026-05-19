import React from 'react';
import { View, Text } from 'react-native';

interface EmptyStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export function EmptyState({
  title = 'Nothing here yet',
  message = 'Check back later for new items.',
  className = '',
}: EmptyStateProps) {
  return (
    <View className={`items-center justify-center py-16 ${className}`}>
      <View className="relative w-8 h-8 mb-4">
        <View className="w-5 h-5 border-[1.5px] border-primary/20 rounded-[2px] absolute top-0 left-0" />
        <View
          className="w-5 h-5 border-[1.5px] border-primary/30 rounded-[2px] absolute bottom-0 right-0 bg-background"
          style={{ borderStyle: 'dashed' }}
        />
      </View>
      <Text className="text-neutral-800 font-extrabold text-base mb-1">{title}</Text>
      <Text className="text-neutral-400 text-xs font-normal text-center max-w-[240px]">{message}</Text>
    </View>
  );
}
