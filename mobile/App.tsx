import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { formatDate } from '@hiram/shared';

// Mock listings matching the web portal for visual elegance
const mockMobileItems = [
  {
    id: '1',
    title: 'HP Prime Graphing Calculator',
    owner: 'Maria Clara (Engineering)',
    category: 'ACADEMICS',
    condition: 'EXCELLENT',
    date: new Date('2026-05-15')
  },
  {
    id: '2',
    title: 'Professional Tripod & Ring Light',
    owner: 'Juan Dela Cruz (Media Studies)',
    category: 'ELECTRONICS',
    condition: 'GOOD',
    date: new Date('2026-05-17'),
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=60'
  }
];

export default function App() {
  const [search, setSearch] = useState('');

  return (
    <View className="flex-1 bg-black pt-16 px-5">
      <StatusBar style="light" />
      
      {/* Premium Header with Custom Brand Mark */}
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row items-center gap-2">
          {/* Custom Overlapping Share Geometric Icon */}
          <View className="relative w-4 h-4">
            <View className="w-2.5 h-2.5 border border-white rounded-[1.5px] absolute top-0 left-0" />
            <View 
              className="w-2.5 h-2.5 border border-blue-light rounded-[1.5px] absolute bottom-0 right-0 bg-black" 
              style={{ borderStyle: 'dashed' }} 
            />
          </View>
          <Text className="text-base font-extrabold uppercase tracking-[0.18em] text-white">
            Hiram
          </Text>
        </View>

        {/* User Account Avatar Outline */}
        <View className="w-8 h-8 rounded-full bg-neutral-950 items-center justify-center border border-neutral-900">
          <Text className="text-white/60 font-bold text-xs">U</Text>
        </View>
      </View>

      {/* Distributed Campus Tag */}
      <View className="bg-[#0a0a0a] border border-white/[0.04] rounded-2xl p-4 mb-6">
        <Text className="text-[10px] text-white/40 font-extrabold uppercase tracking-[0.15em] mb-1">
          📍 Campus Hub Status
        </Text>
        <Text className="text-white/60 text-xs leading-relaxed font-normal">
          Connect securely with student peers on campus to lend, borrow, and trade resources with zero hassle.
        </Text>
      </View>

      {/* Symmetrical Search Input */}
      <View className="bg-neutral-900/60 border border-neutral-800 rounded-xl px-4 py-3 mb-6 flex-row items-center">
        <TextInput
          placeholder="Search engineering calculators, tripods..."
          placeholderTextColor="#555"
          value={search}
          onChangeText={setSearch}
          className="text-white text-sm flex-1 font-normal"
        />
      </View>

      {/* Discover Header */}
      <Text className="text-base font-extrabold text-white uppercase tracking-[0.12em] mb-4">
        Available Near You
      </Text>

      {/* Scrollable Item Stream */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {mockMobileItems.map((item) => (
          <View key={item.id} className="bg-[#0a0a0a] border border-white/[0.04] rounded-2xl overflow-hidden mb-5">
            {/* Condition badge embedded directly */}
            {item.image ? (
              <Image 
                source={{ uri: item.image }} 
                className="w-full h-40 bg-neutral-900"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-40 bg-neutral-950 items-center justify-center border-b border-white/[0.03]">
                {/* Standalone overlapping brand placeholder icon */}
                <View className="relative w-8 h-8">
                  <View className="w-5 h-5 border-[1.5px] border-white/20 rounded-[2px] absolute top-0 left-0" />
                  <View 
                    className="w-5 h-5 border-[1.5px] border-blue-light/30 rounded-[2px] absolute bottom-0 right-0 bg-neutral-950" 
                    style={{ borderStyle: 'dashed' }} 
                  />
                </View>
                <Text className="text-[8px] tracking-[0.15em] font-extrabold text-white/30 uppercase mt-2.5 select-none">No Preview</Text>
              </View>
            )}
            
            <View className="p-5">
              <View className="flex-row items-center justify-between mb-2">
                <View className="bg-neutral-900 border border-neutral-800 px-2.5 py-0.5 rounded-full">
                  <Text className="text-[9px] text-white/40 font-bold uppercase tracking-wider">
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
              
              <Text className="text-white/40 text-xs mb-4 font-normal">
                Lent by {item.owner}
              </Text>

              <View className="flex-row justify-between items-center border-t border-white/[0.04] pt-3.5 mt-2">
                <View className="bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
                  <Text className="text-[9px] text-white/70 font-semibold tracking-wider uppercase">
                    {item.condition}
                  </Text>
                </View>

                <TouchableOpacity className="border border-white/20 px-4 py-2 rounded-full">
                  <Text className="text-white text-xs font-semibold">Request</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
