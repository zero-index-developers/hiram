import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface AvatarProps {
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
}

const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

const textSizeMap = {
  sm: 'text-[9px]',
  md: 'text-xs',
  lg: 'text-sm',
};

export function Avatar({ initials = 'U', size = 'md', onPress }: AvatarProps) {
  const content = (
    <View className={`${sizeMap[size]} rounded-full bg-primary/5 items-center justify-center border border-primary/10`}>
      <Text className={`text-primary font-bold ${textSizeMap[size]}`}>{initials}</Text>
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }
  return content;
}
