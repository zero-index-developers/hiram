import React from 'react';
import { Text } from 'react-native';
import { Card, CardHeader } from '../ui/Card';

interface InfoCardProps {
  label: string;
  message: string;
  emoji?: string;
  className?: string;
}

export function InfoCard({ label, message, emoji = '📍', className = '' }: InfoCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <Text className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-[0.15em] mb-1">
          {emoji} {label}
        </Text>
        <Text className="text-neutral-600 text-xs leading-relaxed font-normal">
          {message}
        </Text>
      </CardHeader>
    </Card>
  );
}
