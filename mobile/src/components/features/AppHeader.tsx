import React from 'react';
import { View, Text } from 'react-native';
import { BrandMark } from '../ui/BrandMark';
import { Avatar } from '../ui/Avatar';

interface AppHeaderProps {
  userInitials?: string;
  onAvatarPress?: () => void;
}

export function AppHeader({ userInitials = 'U', onAvatarPress }: AppHeaderProps) {
  return (
    <View className="flex-row justify-between items-center mb-8">
      <View className="flex-row items-center gap-2">
        <BrandMark size="sm" />
        <Text className="text-base font-extrabold uppercase tracking-[0.18em] text-neutral-800">
          Hir<Text className="text-accent">am</Text>
        </Text>
      </View>
      <Avatar initials={userInitials} onPress={onAvatarPress} />
    </View>
  );
}
