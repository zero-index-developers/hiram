import React from 'react';
import { View, TextInput } from 'react-native';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = 'Search...',
  className = '',
}: SearchInputProps) {
  return (
    <View className={`bg-white border border-primary/10 rounded-xl px-4 py-3 flex-row items-center shadow-sm ${className}`}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        className="text-neutral-800 text-sm flex-1 font-normal"
      />
    </View>
  );
}
