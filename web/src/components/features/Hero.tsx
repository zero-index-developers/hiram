export function Hero() {
  return (
    <section className="w-full bg-black pt-20 pb-14 px-6 flex flex-col items-center">
      <div className="max-w-[700px] w-full mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <p className="text-xs font-bold text-white/60 text-center tracking-widest uppercase cursor-pointer hover:text-white/80 transition duration-200">
          <span className="text-primary">Join</span> the campus network
        </p>

        {/* Headline */}
        <h1 className="text-7xl sm:text-8xl font-black text-white text-center leading-none tracking-tight mt-4">
          Borrow better gear, faster
        </h1>

        {/* Subtext */}
        <p className="text-lg text-white/60 text-center max-w-[500px] mx-auto mt-6 font-normal leading-relaxed">
          The smart way for students to access essential academic gear. Borrow and lend resources safely across your campus network.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button className="bg-white text-black font-semibold rounded-full px-6 py-2.5 hover:bg-white/90 transition text-[14px] sm:text-[15px]">
            Start borrowing
          </button>
          <button className="bg-[#1a1a1a] text-white font-semibold rounded-full px-6 py-2.5 border border-white/20 hover:border-white/50 transition text-[14px] sm:text-[15px]">
            Lend an item
          </button>
        </div>
      </div>
    </section>
  );
}
