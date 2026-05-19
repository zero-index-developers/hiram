import React from 'react';
import { View, Text, Image } from 'react-native';
import { formatDate } from '@hiram/shared';
import { Card, CardBody } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { BrandMark } from '../ui/BrandMark';
import type { Item } from '@hiram/shared';

interface ItemCardProps {
  item: Item;
  onRequest?: (item: Item) => void;
}

export function ItemCard({ item, onRequest }: ItemCardProps) {
  return (
    <Card className="mb-5">
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          className="w-full h-40 bg-neutral-50"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-40 bg-neutral-50 items-center justify-center border-b border-primary/5">
          <BrandMark size="lg" />
          <Text className="text-[8px] tracking-[0.15em] font-extrabold text-neutral-400 uppercase mt-2.5">
            No Preview
          </Text>
        </View>
      )}

      <CardBody>
        <View className="flex-row items-center justify-between mb-2">
          <Badge label={item.category} variant="outline" />
          <Text className="text-[10px] text-neutral-400 font-semibold">
            {item.date ? formatDate(item.date) : item.createdAt ? formatDate(item.createdAt) : 'Recently'}
          </Text>
        </View>

        <Text className="text-neutral-800 font-bold text-base mb-1">
          {item.title}
        </Text>

        <Text className="text-neutral-500 text-xs mb-4 font-normal">
          Lent by {typeof item.owner === 'string' ? item.owner : item.owner?.name || 'Unknown'}
        </Text>

        <View className="flex-row justify-between items-center border-t border-primary/5 pt-3.5 mt-2">
          <Badge label={item.condition} variant="subtle" />
          <Button label="Request" variant="outline" size="md" onPress={() => onRequest?.(item)} />
        </View>
      </CardBody>
    </Card>
  );
}
