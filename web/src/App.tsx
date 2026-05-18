import { useState } from 'react';
import { Search, Grid, BookOpen, Camera, Paintbrush, FolderClosed, Package } from 'lucide-react';
import { Header } from './components/layout/Header';
import { Hero } from './components/features/Hero';
import { CategoryFilters } from './components/features/CategoryFilters';
import { ItemCard } from './components/features/ItemCard';
import { Footer } from './components/layout/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Premium, rebranded mock items
  const mockItems = [
    {
      id: '1',
      title: 'HP Prime Graphing Calculator',
      description: 'Perfect for engineering students taking advanced math or engineering subjects. Lending for up to 2 weeks.',
      category: 'ACADEMICS',
      condition: 'EXCELLENT',
      isAvailable: true,
      owner: 'Maria Clara',
      createdAt: new Date('2026-05-15'),
      image: 'https://images.unsplash.com/photo-1594818821901-b68a52862c64?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: '2',
      title: 'Professional Tripod & Ring Light',
      description: 'Used for journalism or broadcasting projects. Complete set with carrying bag.',
      category: 'ELECTRONICS',
      condition: 'GOOD',
      isAvailable: true,
      owner: 'Juan Dela Cruz',
      createdAt: new Date('2026-05-17'),
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: '3',
      title: 'Rotring Drafting Board (A3)',
      description: 'Heavy duty drawing board for architecture plates. Well-maintained T-square included.',
      category: 'CREATIVE',
      condition: 'EXCELLENT',
      isAvailable: true,
      owner: 'Isagani Santos',
      createdAt: new Date('2026-05-18'),
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: '4',
      title: 'Chemistry Laboratory Manual',
      description: 'Clean lab manual with no markings. Essential study guide for general chemistry courses.',
      category: 'ACADEMICS',
      condition: 'EXCELLENT',
      isAvailable: true,
      owner: 'Ariel Roxas',
      createdAt: new Date('2026-05-18'),
      image: undefined
    }
  ];

  const categories = [
    { value: 'ALL', label: 'All Resources', icon: Grid },
    { value: 'ACADEMICS', label: 'Academics', icon: BookOpen },
    { value: 'ELECTRONICS', label: 'Electronics', icon: Camera },
    { value: 'CREATIVE', label: 'Creative & Art', icon: Paintbrush },
    { value: 'ORGANIZATION', label: 'Organization', icon: FolderClosed }
  ];

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans w-full transition-colors duration-300">
      {/* Structural layout: Header */}
      <Header />

      {/* Hero Intro */}
      <Hero />

      {/* Discover Hub */}
      <main id="discover" className="max-w-6xl mx-auto px-8 py-20 flex-grow w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="text-3xl font-black tracking-tight text-white">Discover Shared Resources</h3>
            <p className="text-white/60 text-sm mt-1.5 font-medium">Filter items available right now across the campus network.</p>
          </div>

          {/* Dynamic Search */}
          <div className="relative max-w-md w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search tools, books, gears..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-white/20 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-white/40"
            />
          </div>
        </div>

        {/* Categories Tabbar */}
        <CategoryFilters 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Display Item Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-transparent border border-white/10 rounded-2xl p-16 text-center max-w-xl mx-auto">
            <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h4 className="font-extrabold text-xl text-white">No resources found</h4>
            <p className="text-white/60 text-sm mt-1.5 font-medium">Try refining your filter categories or checking spelling.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
