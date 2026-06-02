import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Toaster, { showToast } from './components/Toaster';
import Landing from './pages/Landing';
import Markets from './pages/Markets';
import MarketDetail from './pages/MarketDetail';
import Portfolio from './pages/Portfolio';

export { showToast };

export default function App() {
  return (
    <div className="min-h-screen bg-mesh text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/markets/:id" element={<MarketDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}
