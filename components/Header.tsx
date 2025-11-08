
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthForm } from './AuthForm';
import { HomeIcon } from './icons/HomeIcon';

export const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-primary hover:text-secondary">
              <HomeIcon className="h-8 w-8" />
              <span className="font-bold text-xl">Imóvel Certo</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="hidden sm:block text-gray-600">Olá, {user?.email.split('@')[0]}</span>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                >
                  Meus Anúncios
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-primary transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary transition-colors"
              >
                Login / Cadastro
              </button>
            )}
          </div>
        </div>
      </nav>
      <AuthForm isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};
