import { MapPin, ChevronDown, Search, Flame } from 'lucide-react';

export function Hero() {
  return (
    <section className="w-full bg-black pt-20 pb-14 px-6 flex flex-col items-center relative overflow-hidden">
      <div className="max-w-[800px] w-full mx-auto flex flex-col items-center">

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl font-black text-white text-center leading-none tracking-tight mt-4">
          <span className="text-primary">Hiram.</span> Trade. This is the platform.
        </h1>

        {/* <p className="text-xs font-bold text-white/60 text-center tracking-widest uppercase cursor-pointer hover:text-white/80 transition duration-200">
          <span className="text-primary">Join</span> the campus network
        </p> */}

        {/* Unified Search Bar */}
        <div className="flex flex-col sm:flex-row items-center bg-[#111] border border-white/10 rounded-3xl sm:rounded-full mt-10 w-full max-w-3xl mx-auto p-2 gap-2 relative z-20 focus-within:border-primary/50 transition-colors duration-300">

          <div className="flex items-center justify-center gap-2 text-sm text-white/60 sm:border-r border-white/10 pl-4 pr-4 py-2 w-full sm:w-auto shrink-0 cursor-pointer hover:text-white transition">
            <MapPin className="w-4 h-4" />
            <span className="font-semibold whitespace-nowrap">PUP Manila</span>
            <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
          </div>

          <div className="flex-1 flex items-center gap-2 w-full px-4 sm:px-2 py-2 sm:py-0 rounded-full sm:rounded-none">
            <Search className="w-4 h-4 text-white/40 hidden sm:block" />
            <input
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30 font-medium"
              placeholder="Item name, category, or lender..."
            />
          </div>

          <button className="bg-primary text-black rounded-full px-8 py-3 sm:py-2.5 text-sm font-black hover:bg-primary/90 transition w-full sm:w-auto shrink-0">
            Search
          </button>
        </div>

        {/* Hot Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 text-xs max-w-2xl">
          <span className="text-white/40 font-bold uppercase tracking-wider text-[10px] mr-1 flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-500" /> Hot:
          </span>
          {['Graphing Calculator', 'Drafting Board', 'Camera', 'Tripod', 'Lab Manual'].map(tag => (
            <button key={tag} className="border border-white/10 bg-white/5 rounded-full px-3.5 py-1.5 text-white/60 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition font-semibold">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
