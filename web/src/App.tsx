import { useState } from 'react';
import { formatDate } from '@unishare/shared';
import { 
  Package, 
  ArrowRightLeft, 
  MessageSquare, 
  ShieldCheck, 
  Search, 
  Grid, 
  BookOpen, 
  Camera, 
  Paintbrush, 
  FolderClosed, 
  Share2, 
  ArrowRight,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Dummy mock items for visual richness matching PUP student needs
  const mockItems = [
    {
      id: '1',
      title: 'HP Prime Graphing Calculator',
      description: 'Perfect for CEA students taking advanced math or engineering subjects. Lending for up to 2 weeks.',
      category: 'ACADEMICS',
      condition: 'EXCELLENT',
      isAvailable: true,
      owner: 'Maria Clara (CEA)',
      createdAt: new Date('2026-05-15'),
      image: 'https://images.unsplash.com/photo-1594818821901-b68a52862c64?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: '2',
      title: 'Professional Tripod & Ring Light',
      description: 'Used for COC journalism or broadcasting projects. Complete set with carrying bag.',
      category: 'ELECTRONICS',
      condition: 'GOOD',
      isAvailable: true,
      owner: 'Juan Dela Cruz (COC)',
      createdAt: new Date('2026-05-17'),
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: '3',
      title: 'Rotring Drafting Board (A3)',
      description: 'Heavy duty drawing board for CADBE architecture plates. Well-maintained T-square included.',
      category: 'CREATIVE',
      condition: 'EXCELLENT',
      isAvailable: true,
      owner: 'Isagani Santos (CADBE)',
      createdAt: new Date('2026-05-18'),
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60'
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans w-full">
      {/* Premium Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800 px-6 py-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-pup-maroon to-red-600 p-2.5 rounded-xl shadow-lg shadow-red-900/30">
            <Share2 className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
              Uni<span className="text-red-500">Share</span>
            </h1>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-pup-gold fill-pup-gold" /> PUP Student Micro-Economy
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a href="#discover" className="hover:text-pup-gold transition">Discover Items</a>
          <a href="#how-it-works" className="hover:text-pup-gold transition">How It Works</a>
          <a href="#security" className="hover:text-pup-gold transition">PUP Trust Protocol</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="text-sm font-semibold hover:text-white transition px-4 py-2 text-neutral-400">
            Log In
          </button>
          <button className="bg-pup-maroon hover:bg-pup-darkMaroon text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-red-950/50 flex items-center gap-1">
            Join Platform <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6 border-b border-neutral-900 w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 px-4 py-1.5 rounded-full text-xs font-semibold text-neutral-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Lending, borrowing, and trading exclusively for verified PUP Iskos and Iskas
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mb-6">
            Share Academic Tools,<br />
            <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
              Empower Every Isko.
            </span>
          </h2>
          
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Need a graphing calculator for a major exam? Got an unused T-square or textbook? 
            Join our secure campus-based network of shared academic and creative resources.
          </p>

          {/* Core App Feature Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left mt-8">
            <div className="bg-neutral-900/40 border border-neutral-900 p-5 rounded-2xl">
              <div className="bg-red-950/30 text-red-400 p-2.5 rounded-xl w-fit mb-3">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm">Item Listings</h3>
              <p className="text-xs text-neutral-400 mt-1">Upload review books, drafting tools, and more.</p>
            </div>
            <div className="bg-neutral-900/40 border border-neutral-900 p-5 rounded-2xl">
              <div className="bg-amber-950/30 text-amber-400 p-2.5 rounded-xl w-fit mb-3">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm">Borrow & Trade</h3>
              <p className="text-xs text-neutral-400 mt-1">Secure student-to-student transactions.</p>
            </div>
            <div className="bg-neutral-900/40 border border-neutral-900 p-5 rounded-2xl">
              <div className="bg-blue-950/30 text-blue-400 p-2.5 rounded-xl w-fit mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm">Real-time Chat</h3>
              <p className="text-xs text-neutral-400 mt-1">Chat securely with peer owners inside the app.</p>
            </div>
            <div className="bg-neutral-900/40 border border-neutral-900 p-5 rounded-2xl">
              <div className="bg-emerald-950/30 text-emerald-400 p-2.5 rounded-xl w-fit mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm">Verified Auth</h3>
              <p className="text-xs text-neutral-400 mt-1">Locked entirely behind @iskolar.pup.edu.ph.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Discover Hub */}
      <main id="discover" className="max-w-6xl mx-auto px-6 py-16 flex-grow w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight">Discover Shared Resources</h3>
            <p className="text-neutral-400 text-sm mt-1">Filter items available right now across the PUP campus.</p>
          </div>
          
          {/* Dynamic Search */}
          <div className="relative max-w-md w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search tools, books, gears..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-red-500 transition placeholder-neutral-500"
            />
          </div>
        </div>

        {/* Categories Tabbar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-neutral-900 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-semibold transition shrink-0 ${
                  isSelected 
                    ? 'bg-pup-maroon text-white shadow-lg shadow-red-950/30' 
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Display Item Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition flex flex-col group">
                <div className="relative h-48 overflow-hidden bg-neutral-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent z-10"></div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow ${
                    item.condition === 'EXCELLENT' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' : 'bg-amber-500/20 border border-amber-500/30 text-amber-400'
                  }`}>
                    {item.condition}
                  </span>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-pup-gold uppercase tracking-wider bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <h4 className="font-bold text-lg text-white group-hover:text-red-400 transition">
                    {item.title}
                  </h4>
                  
                  <p className="text-neutral-400 text-xs mt-2 leading-relaxed flex-grow">
                    {item.description}
                  </p>

                  <div className="border-t border-neutral-800 pt-4 mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-300 text-xs uppercase border border-neutral-700">
                        {item.owner.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-neutral-400">
                        By {item.owner}
                      </span>
                    </div>

                    <button className="bg-neutral-800 hover:bg-pup-maroon hover:text-white transition text-xs font-bold px-3.5 py-2 rounded-lg text-neutral-300 flex items-center gap-1">
                      Request Item <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-16 text-center max-w-xl mx-auto">
            <Package className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h4 className="font-extrabold text-xl">No resources found</h4>
            <p className="text-neutral-400 text-sm mt-1">Try refining your filter categories or checking spelling.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 px-6 py-12 text-center text-sm text-neutral-500 mt-20 w-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-pup-maroon p-1.5 rounded-lg text-white font-bold text-xs">US</div>
            <span className="font-semibold text-neutral-300">UniShare Monorepo</span>
          </div>
          <p>© {new Date().getFullYear()} UniShare. Polytechnic University of the Philippines. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-pup-gold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Sta. Mesa, Manila
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
