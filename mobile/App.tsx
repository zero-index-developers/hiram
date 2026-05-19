import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';
import { SearchInput, SectionHeader, EmptyState } from './src/components/ui';
import { AppHeader, ItemCard, InfoCard } from './src/components/features';
import type { Item } from '@hiram/shared';

const mockMobileItems: Item[] = [
  {
    id: '1',
    title: 'HP Prime Graphing Calculator',
    owner: 'Maria Clara (Engineering)',
    category: 'ACADEMICS',
    condition: 'EXCELLENT',
    date: new Date('2026-05-15'),
  },
  {
    id: '2',
    title: 'Professional Tripod & Ring Light',
    owner: 'Juan Dela Cruz (Media Studies)',
    category: 'ELECTRONICS',
    condition: 'GOOD',
    date: new Date('2026-05-17'),
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=60',
  },
];

export default function App() {
  const [search, setSearch] = useState('');

  const filtered = mockMobileItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (typeof item.owner === 'string' ? item.owner : item.owner?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-background pt-16 px-5">
      <StatusBar style="dark" />

      <AppHeader />

      <InfoCard
        label="Campus Hub Status"
        message="Connect securely with student peers on campus to lend, borrow, and trade resources with zero hassle."
        className="mb-6"
      />

      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search engineering calculators, tripods..."
        className="mb-6"
      />

      <SectionHeader title="Available Near You" className="mb-4" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <ItemCard key={item.id} item={item} onRequest={(i) => console.log('Request:', i.title)} />
          ))
        ) : (
          <EmptyState
            title="No results found"
            message="Try a different search term."
          />
        )}
      </ScrollView>
    </View>
  );
}
