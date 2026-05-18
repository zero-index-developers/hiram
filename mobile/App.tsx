import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { formatDate } from '@hiram/shared';

// Mock listings matching the web portal for visual elegance
const mockMobileItems = [
  {
    id: '1',
    title: 'HP Prime Graphing Calculator',
    owner: 'Maria Clara (CEA)',
    category: 'ACADEMICS',
    condition: 'EXCELLENT',
    date: new Date('2026-05-15'),
    image: 'https://images.unsplash.com/photo-1594818821901-b68a52862c64?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: '2',
    title: 'Professional Tripod & Ring Light',
    owner: 'Juan Dela Cruz (COC)',
    category: 'ELECTRONICS',
    condition: 'GOOD',
    date: new Date('2026-05-17'),
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=60'
  }
];

export default function App() {
  const [search, setSearch] = useState('');

  return (
    <View className="flex-1 bg-neutral-950 pt-12 px-5">
      <StatusBar style="light" />
      
      {/* Premium Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-2xl font-black text-white">
            Hi<Text className="text-red-600">ram</Text>
          </Text>
          <Text className="text-[10px] text-neutral-400 font-semibold tracking-wider uppercase">
            PUP Campus Micro-Economy
          </Text>
        </View>
        <View className="w-10 h-10 rounded-full bg-pup-maroon items-center justify-center border border-neutral-800">
          <Text className="text-white font-bold text-sm">PUP</Text>
        </View>
      </View>

      {/* Campus Map Pin Tag */}
      <View className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-6">
        <Text className="text-xs text-pup-gold font-bold uppercase tracking-wider">
          📍 Campus Hub — Sta. Mesa, Manila
        </Text>
        <Text className="text-neutral-300 text-xs mt-1 leading-relaxed">
          Sharing items locally helps reduce academic expenses for fellow Iskos & Iskas.
        </Text>
      </View>

      {/* Search Input */}
      <View className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3.5 mb-6 flex-row items-center">
        <TextInput
          placeholder="Search engineering calculators, tripods..."
          placeholderTextColor="#666"
          value={search}
          onChangeText={setSearch}
          className="text-white text-sm flex-1"
        />
      </View>

      {/* Discover Header */}
      <Text className="text-lg font-extrabold text-white mb-4">
        Available Near You
      </Text>

      {/* Scrollable Item Stream */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {mockMobileItems.map((item) => (
          <View key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden mb-5">
            <Image 
              source={{ uri: item.image }} 
              className="w-full h-36 bg-neutral-800"
              resizeMode="cover"
            />
            
            <View className="p-4">
              <View className="flex-row items-center justify-between mb-2">
                <View className="bg-neutral-950 border border-neutral-800 px-2.5 py-0.5 rounded">
                  <Text className="text-[9px] text-pup-gold font-bold uppercase tracking-wider">
                    {item.category}
                  </Text>
                </View>
                <Text className="text-[10px] text-neutral-500 font-semibold">
                  {formatDate(item.date)}
                </Text>
              </View>

              <Text className="text-white font-bold text-base mb-1">
                {item.title}
              </Text>
              
              <Text className="text-neutral-400 text-xs mb-4">
                Lent by {item.owner}
              </Text>

              <View className="flex-row justify-between items-center border-t border-neutral-800 pt-3">
                <View className="bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Text className="text-[9px] text-emerald-400 font-bold uppercase">
                    {item.condition}
                  </Text>
                </View>

                <TouchableOpacity className="bg-pup-maroon px-4 py-2 rounded-lg">
                  <Text className="text-white text-xs font-bold">Request Borrow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
