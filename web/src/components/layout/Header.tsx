import { LogoSymbol } from '../ui/Logo';
import { UserActionsBar } from '../features/UserActionsBar';
import { useAuthStore } from '../../store/useAuthStore';

export function Header() {
  const { isAuthenticated } = useAuthStore();

  const handleLogoClick = () => {
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header className="relative z-50 w-full bg-background px-8 py-4 border-b border-primary/5 backdrop-blur-md bg-background/80 snap-start">
      <div className="max-w-5xl mx-auto flex justify-between items-center w-full relative">
        {/* Logo mark: Small primary color geometric icon */}
        <div
          onClick={handleLogoClick}
          className="flex-shrink-0 flex items-center cursor-pointer"
        >
          <LogoSymbol size="md" className="text-primary w-8 h-8" />
        </div>

        {/* Nav links: Centered absolute container to avoid layout shifts */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-8 text-sm text-neutral-600 font-medium">
          {isAuthenticated ? (
            <>
              <a href="#discover" className="hover:text-primary transition-colors duration-200 flex items-center gap-1.5 relative">
                <span>Trending</span>
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              </a>
              <button
                onClick={() => {
                  window.history.pushState(null, '', '/inbox');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="hover:text-primary transition-colors duration-200 cursor-pointer text-sm text-neutral-600 font-medium bg-transparent border-none p-0 outline-none flex items-center gap-1.5 relative"
              >
                <span>Inbox</span>
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              </button>
              <a href="#how-it-works" className="hover:text-primary transition-colors duration-200">How it Works</a>
            </>
          ) : (
            <>
              <a href="#discover" className="hover:text-primary transition-colors duration-200">Discover</a>
              <a href="#how-it-works" className="hover:text-primary transition-colors duration-200">How it Works</a>
              <a href="#trust" className="hover:text-primary transition-colors duration-200">About</a>
            </>
          )}
        </nav>

        {/* Auth Buttons / Profile Dropdown */}
        <div className="flex items-center gap-4 flex-shrink-0 relative">
          <UserActionsBar variant="header" />
        </div>
      </div>
    </header>
  );
}
