import { MapPin, Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../store/useThemeStore";
import { animateThemeToggle } from "../../utils/themeAnimation";
import { LogoSymbol } from "../ui/Logo";

export function Footer() {
  const { setMode, resolved } = useThemeStore();

  const toggleTheme = (e: React.MouseEvent) => {
    animateThemeToggle(e.currentTarget as HTMLElement, () =>
      setMode(resolved === "dark" ? "light" : "dark"),
    );
  };

  return (
    <footer className="w-full bg-white border-t border-primary/5 px-8 py-12 text-sm text-neutral-400 mt-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <LogoSymbol size="sm" className="text-primary" />
          <span className="font-semibold text-neutral-600">Sharing Hub</span>
        </div>

        <p className="text-neutral-400">
          © {new Date().getFullYear()} Hiram. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-neutral-500">
            <MapPin className="w-4 h-4 text-primary/70" />
            <span>Sta. Mesa, Manila</span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-primary/10 text-neutral-400 hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
            title={resolved === "dark" ? "Switch to Light" : "Switch to Dark"}
          >
            {resolved === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>
    </footer>
  );
}
