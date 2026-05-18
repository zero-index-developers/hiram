import { LogoSymbol } from '../ui/Logo';

export function Header() {
  return (
    <header className="w-full bg-black px-8 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center w-full">
        {/* Logo mark: Small white geometric icon */}
        <div className="flex-shrink-0 flex items-center mr-28">
          <LogoSymbol size="md" className="text-white w-8 h-8" />
        </div>

        {/* Nav links: 3 essential items */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm text-white/60">
          <a href="#discover" className="hover:text-white transition-colors duration-200">Discover</a>
          <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How it Works</a>
          <a href="#trust" className="hover:text-white transition-colors duration-200">Campus Trust</a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Log in: Pure ghost */}
          <button className="text-white text-sm hover:text-white/80 transition-colors duration-200 bg-transparent border-none">
            Log in
          </button>
          {/* Sign up: pill shape */}
          <button className="border border-white/50 rounded-full px-4 py-1.5 text-sm text-white hover:border-white transition-colors duration-200 bg-transparent">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
