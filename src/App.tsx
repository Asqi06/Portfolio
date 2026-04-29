import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Satvastones from './pages/Satvastones';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ScrollToTop from './components/ScrollToTop';
import { AdminProvider } from './context/AdminContext';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-black selection:bg-brand-accent selection:text-white">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          
          <main>
            <Routes>
              <Route path="/" element={<Home onMenuClick={() => setIsSidebarOpen(true)} />} />
              <Route path="/project/:id" element={<ProjectDetail onMenuClick={() => setIsSidebarOpen(true)} />} />
              <Route path="/satvastones" element={<Satvastones onMenuClick={() => setIsSidebarOpen(true)} />} />
              <Route path="/admin-secret" element={<Admin />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AdminProvider>
  );
}
