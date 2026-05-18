import { Header } from './components/layout/Header';
import { Hero } from './components/features/Hero';
import { DiscoverSection } from './components/features/DiscoverSection';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans w-full transition-colors duration-300">
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

