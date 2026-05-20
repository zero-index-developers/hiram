import { LogoSymbol } from '../ui/Logo';
import { ProfileDropdown } from '../features/ProfileDropdown';

export function Header() {
  return (
    <header className="relative z-50 w-full bg-background px-8 py-4 border-b border-primary/5 backdrop-blur-md bg-background/80">
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

        {/* Auth Buttons / Profile Dropdown */}
        <div className="flex items-center gap-4 flex-shrink-0 relative">
          <ProfileDropdown variant="header" />
        </div>
      </div>
    </header>
  );
}
