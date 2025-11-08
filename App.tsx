
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { DashboardPage } from './pages/DashboardPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PropertyProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/property/:id" element={<PropertyDetailPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; {new Date().getFullYear()} Imóvel Certo. Todos os direitos reservados.</p>
            </footer>
          </div>
        </HashRouter>
      </PropertyProvider>
    </AuthProvider>
  );
};

export default App;
