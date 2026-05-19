import { LogoSymbol } from '../ui/Logo';

export function Header() {
  return (
    <header className="w-full bg-background px-8 py-4 border-b border-primary/5">
      <div className="max-w-5xl mx-auto flex justify-between items-center w-full">
        {/* Logo mark: Small primary color geometric icon */}
        <div className="flex-shrink-0 flex items-center mr-18">
          <LogoSymbol size="md" className="text-primary w-8 h-8" />
        </div>

        {/* Nav links: 3 essential items */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm text-neutral-600 font-medium">
          <a href="#discover" className="hover:text-primary transition-colors duration-200">Discover</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors duration-200">How it Works</a>
          <a href="#trust" className="hover:text-primary transition-colors duration-200">About</a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Log in: Pure ghost */}
          <button className="text-neutral-700 font-semibold text-sm hover:text-primary transition-colors duration-200 bg-transparent border-none">
            Log in
          </button>
          {/* Sign up: pill shape */}
          <button className="border border-primary/30 rounded-full px-4 py-1.5 text-sm font-semibold text-primary hover:bg-primary/5 hover:border-primary transition-colors duration-200 bg-transparent">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
