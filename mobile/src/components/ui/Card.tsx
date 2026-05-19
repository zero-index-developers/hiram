import React from 'react';
import { View, Text } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <View className={`bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm ${className}`}>
      {children}
    </View>
  );
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <View className={`p-4 ${className}`}>
      {children}
    </View>
  );
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <View className={`p-5 ${className}`}>
      {children}
    </View>
  );
}
