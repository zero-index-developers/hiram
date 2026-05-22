import { create } from 'zustand';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  resolved: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
}

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeClass(resolved: 'light' | 'dark') {
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

const STORAGE_KEY = 'hiram_theme';

function loadMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {}
  return 'system';
}

function computeResolved(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') return getSystemPreference();
  return mode;
}

export const useThemeStore = create<ThemeState>((set) => {
  const initialMode = loadMode();
  const initialResolved = computeResolved(initialMode);
  applyThemeClass(initialResolved);

  if (typeof window !== 'undefined') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', () => {
      const state = useThemeStore.getState();
      if (state.mode === 'system') {
        const resolved = getSystemPreference();
        applyThemeClass(resolved);
        set({ resolved });
      }
    });
  }

  return {
    mode: initialMode,
    resolved: initialResolved,
    setMode: (mode) => {
      localStorage.setItem(STORAGE_KEY, mode);
      const resolved = computeResolved(mode);
      applyThemeClass(resolved);
      set({ mode, resolved });
    },
  };
});
