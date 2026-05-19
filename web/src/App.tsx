import { DiscoverSection } from './components/features/DiscoverSection';
import { Hero } from './components/features/Hero';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';

function App() {
  return (
    <div className="min-h-screen bg-background text-neutral-800 flex flex-col font-sans w-full transition-colors duration-300">
      {/* Structural layout: Header */}
      <Header />

      {/* Hero Intro */}
      <Hero />

      {/* Discover Hub */}
      <DiscoverSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

